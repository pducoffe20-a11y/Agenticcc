#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverSkillFiles, parseFrontmatter } from "./validate-skills.mjs";

const DEFAULT_REGISTRY = "registry/skills.csv";
const DEFAULT_ROOT = "plugins/d2l-sales-workflows/skills";
const EXPECTED_HEADER = [
  "skill_name",
  "display_name",
  "category",
  "repo_path",
  "status",
  "primary_output",
  "approval_gate",
  "public_safe",
];

export function parseCsv(source) {
  const text = source.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let afterQuote = false;

  function finishField() {
    row.push(field);
    field = "";
    afterQuote = false;
  }

  function finishRow() {
    finishField();
    rows.push(row);
    row = [];
  }

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (inQuotes) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
          afterQuote = true;
        }
      } else if (character === "\r" && text[index + 1] === "\n") {
        field += "\n";
        index += 1;
      } else {
        field += character;
      }
      continue;
    }

    if (afterQuote) {
      if (character === ",") {
        finishField();
      } else if (character === "\n") {
        finishRow();
      } else if (character === "\r") {
        if (text[index + 1] === "\n") {
          index += 1;
        }
        finishRow();
      } else {
        throw new Error(`unexpected character after closing quote at offset ${index}`);
      }
      continue;
    }

    if (character === '"') {
      if (field !== "") {
        throw new Error(`unexpected quote in unquoted field at offset ${index}`);
      }
      inQuotes = true;
    } else if (character === ",") {
      finishField();
    } else if (character === "\n") {
      finishRow();
    } else if (character === "\r") {
      if (text[index + 1] === "\n") {
        index += 1;
      }
      finishRow();
    } else {
      field += character;
    }
  }

  if (inQuotes) {
    throw new Error("unterminated quoted CSV field");
  }

  if (afterQuote || field !== "" || row.length > 0) {
    finishRow();
  }

  return rows;
}

function parseArguments(argv) {
  let registry = DEFAULT_REGISTRY;
  let root = DEFAULT_ROOT;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--registry" || argument === "--root") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${argument} requires a path`);
      }
      if (argument === "--registry") {
        registry = value;
      } else {
        root = value;
      }
      index += 1;
    } else if (argument.startsWith("--registry=")) {
      registry = argument.slice("--registry=".length);
      if (registry === "") {
        throw new Error("--registry requires a path");
      }
    } else if (argument.startsWith("--root=")) {
      root = argument.slice("--root=".length);
      if (root === "") {
        throw new Error("--root requires a path");
      }
    } else if (argument === "--help" || argument === "-h") {
      return { help: true, registry, root };
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }

  return { help: false, registry, root };
}

async function isFile(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

export async function validateRegistry(registryPath, root) {
  const absoluteRegistry = path.resolve(registryPath);
  const absoluteRoot = path.resolve(root);
  const errors = [];
  let source;

  try {
    source = await readFile(absoluteRegistry, "utf8");
  } catch (error) {
    return {
      registry: absoluteRegistry,
      root: absoluteRoot,
      rowCount: 0,
      skillCount: 0,
      errors: [`${absoluteRegistry}: cannot read registry (${error.message})`],
    };
  }

  let rows;
  try {
    rows = parseCsv(source);
  } catch (error) {
    return {
      registry: absoluteRegistry,
      root: absoluteRoot,
      rowCount: 0,
      skillCount: 0,
      errors: [`${absoluteRegistry}: invalid CSV (${error.message})`],
    };
  }

  const header = rows.shift();
  if (!header || header.length !== EXPECTED_HEADER.length || !header.every((value, index) => value === EXPECTED_HEADER[index])) {
    errors.push(
      `${absoluteRegistry}: header must be exactly ${EXPECTED_HEADER.join(",")}`,
    );
  }

  let skillFiles = [];
  try {
    skillFiles = await discoverSkillFiles(absoluteRoot);
  } catch (error) {
    errors.push(`${absoluteRoot}: cannot read skill root (${error.message})`);
  }

  const discoveredByPath = new Map();
  const discoveredNames = new Map();
  for (const skillFile of skillFiles) {
    let skillName;
    try {
      const sourceText = await readFile(skillFile, "utf8");
      skillName = parseFrontmatter(sourceText).data.name;
    } catch (error) {
      errors.push(`${skillFile}: cannot determine skill name (${error.message})`);
      continue;
    }

    if (typeof skillName !== "string" || skillName === "") {
      errors.push(`${skillFile}: cannot determine skill name`);
      continue;
    }

    const normalizedFile = path.resolve(skillFile);
    discoveredByPath.set(normalizedFile, skillName);
    if (discoveredNames.has(skillName)) {
      errors.push(
        `${skillFile}: duplicate discovered skill name "${skillName}" (also in ${discoveredNames.get(skillName)})`,
      );
    } else {
      discoveredNames.set(skillName, skillFile);
    }
  }

  const seenRows = new Set();
  const seenNames = new Map();
  const seenPaths = new Map();
  const synchronizedPaths = new Set();

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const rowNumber = index + 2;
    const rowLabel = `${absoluteRegistry}:${rowNumber}`;

    if (row.length !== EXPECTED_HEADER.length) {
      errors.push(
        `${rowLabel}: expected ${EXPECTED_HEADER.length} columns, found ${row.length}`,
      );
      continue;
    }

    const serializedRow = JSON.stringify(row);
    if (seenRows.has(serializedRow)) {
      errors.push(`${rowLabel}: duplicate registry row`);
    } else {
      seenRows.add(serializedRow);
    }

    for (let column = 0; column < row.length; column += 1) {
      if (row[column].trim() === "") {
        errors.push(`${rowLabel}: ${EXPECTED_HEADER[column]} must be nonempty`);
      }
    }

    const [skillName, , , repoPath, , , , publicSafe] = row;

    if (seenNames.has(skillName)) {
      errors.push(
        `${rowLabel}: duplicate skill_name "${skillName}" (first used on row ${seenNames.get(skillName)})`,
      );
    } else {
      seenNames.set(skillName, rowNumber);
    }

    if (publicSafe !== "yes" && publicSafe !== "no") {
      errors.push(`${rowLabel}: public_safe must be "yes" or "no"`);
    }

    const slashNormalizedPath = repoPath.replaceAll("\\", "/");
    if (path.posix.basename(slashNormalizedPath) !== "SKILL.md") {
      errors.push(`${rowLabel}: repo_path must end at a SKILL.md file`);
    }

    const resolvedRepoPath = path.resolve(repoPath);
    if (seenPaths.has(resolvedRepoPath)) {
      errors.push(
        `${rowLabel}: duplicate repo_path "${repoPath}" (first used on row ${seenPaths.get(resolvedRepoPath)})`,
      );
    } else {
      seenPaths.set(resolvedRepoPath, rowNumber);
    }

    if (!(await isFile(resolvedRepoPath))) {
      errors.push(`${rowLabel}: repo_path does not exist as a file: ${repoPath}`);
    }

    const discoveredName = discoveredByPath.get(resolvedRepoPath);
    if (discoveredName === undefined) {
      errors.push(`${rowLabel}: repo_path is not a discovered skill under ${absoluteRoot}`);
    } else {
      synchronizedPaths.add(resolvedRepoPath);
      if (discoveredName !== skillName) {
        errors.push(
          `${rowLabel}: skill_name "${skillName}" does not match "${discoveredName}" in ${repoPath}`,
        );
      }
    }
  }

  for (const [skillFile, skillName] of discoveredByPath) {
    if (!synchronizedPaths.has(skillFile)) {
      errors.push(`${skillFile}: discovered skill "${skillName}" is missing from the registry`);
    }
  }

  for (const [skillName, rowNumber] of seenNames) {
    if (!discoveredNames.has(skillName)) {
      errors.push(
        `${absoluteRegistry}:${rowNumber}: registry skill_name "${skillName}" has no discovered skill`,
      );
    }
  }

  return {
    registry: absoluteRegistry,
    root: absoluteRoot,
    rowCount: rows.length,
    skillCount: skillFiles.length,
    errors,
  };
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(`error: ${error.message}`);
    console.error(
      "usage: node scripts/validate-registry.mjs [--registry PATH] [--root PATH]",
    );
    process.exitCode = 1;
    return;
  }

  if (options.help) {
    console.log(
      "usage: node scripts/validate-registry.mjs [--registry PATH] [--root PATH]",
    );
    return;
  }

  const result = await validateRegistry(options.registry, options.root);
  for (const error of result.errors) {
    console.error(`error: ${error}`);
  }

  if (result.errors.length > 0) {
    console.error(
      `Registry validation failed with ${result.errors.length} error(s) across ${result.rowCount} row(s).`,
    );
    process.exitCode = 1;
  } else {
    console.log(
      `Validated ${result.rowCount} registry row(s) against ${result.skillCount} skill(s).`,
    );
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  await main();
}
