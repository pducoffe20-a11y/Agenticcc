#!/usr/bin/env node

import { access, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = "plugins/d2l-sales-workflows/skills";
const NAME_PATTERN = /^(?!-)(?!.*--)[a-z0-9-]{1,64}(?<!-)$/;

function characterCount(value) {
  return Array.from(value).length;
}

function stripPlainScalarComment(value) {
  const comment = value.search(/\s+#/);
  return (comment === -1 ? value : value.slice(0, comment)).trim();
}

function parseQuotedScalar(value, lineNumber) {
  if (value.startsWith('"')) {
    if (!value.endsWith('"') || value.length === 1) {
      throw new Error(`unterminated double-quoted scalar on frontmatter line ${lineNumber}`);
    }

    try {
      return JSON.parse(value);
    } catch {
      throw new Error(`invalid double-quoted scalar on frontmatter line ${lineNumber}`);
    }
  }

  if (value.startsWith("'")) {
    if (!value.endsWith("'") || value.length === 1) {
      throw new Error(`unterminated single-quoted scalar on frontmatter line ${lineNumber}`);
    }

    return value.slice(1, -1).replaceAll("''", "'");
  }

  return stripPlainScalarComment(value);
}

function foldBlockLines(lines) {
  let result = "";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (index === 0) {
      result = line;
    } else if (line === "" || lines[index - 1] === "") {
      result += `\n${line}`;
    } else {
      result += ` ${line}`;
    }
  }

  return result;
}

function parseYamlFrontmatter(lines) {
  const data = Object.create(null);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "" || line.trimStart().startsWith("#")) {
      continue;
    }

    if (/^\s/.test(line)) {
      // Nested values belonging to an unneeded metadata key are allowed. Block
      // scalar indentation is consumed below before control reaches this path.
      continue;
    }

    const match = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!match) {
      throw new Error(`unsupported YAML syntax on frontmatter line ${index + 2}`);
    }

    const [, key, rawValue] = match;
    if (Object.hasOwn(data, key)) {
      throw new Error(`duplicate frontmatter key "${key}"`);
    }

    const blockHeader = /^([|>])([+-]?)(?:\s+#.*)?$/.exec(rawValue.trim());
    if (!blockHeader) {
      data[key] = parseQuotedScalar(rawValue.trim(), index + 2);
      continue;
    }

    const blockLines = [];
    let cursor = index + 1;
    while (cursor < lines.length) {
      const candidate = lines[cursor];
      if (candidate.trim() !== "" && !/^\s/.test(candidate)) {
        break;
      }
      blockLines.push(candidate);
      cursor += 1;
    }

    const nonemptyIndents = blockLines
      .filter((candidate) => candidate.trim() !== "")
      .map((candidate) => candidate.match(/^ */)[0].length);
    const indentation = nonemptyIndents.length === 0 ? 0 : Math.min(...nonemptyIndents);
    const unindented = blockLines.map((candidate) =>
      candidate.trim() === "" ? "" : candidate.slice(indentation),
    );
    let value =
      blockHeader[1] === "|" ? unindented.join("\n") : foldBlockLines(unindented);

    if (blockHeader[2] === "-") {
      value = value.replace(/\n+$/, "");
    } else if (blockHeader[2] !== "+" && value !== "") {
      value = `${value.replace(/\n+$/, "")}\n`;
    }

    data[key] = value;
    index = cursor - 1;
  }

  return data;
}

export function parseFrontmatter(source) {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");

  if (lines[0] !== "---") {
    throw new Error("SKILL.md must begin with YAML frontmatter");
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line === "---");
  if (closingIndex === -1) {
    throw new Error("YAML frontmatter is missing its closing --- delimiter");
  }

  return {
    data: parseYamlFrontmatter(lines.slice(1, closingIndex)),
    body: lines.slice(closingIndex + 1).join("\n"),
  };
}

export async function discoverSkillFiles(root) {
  const files = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(entryPath);
      } else if (entry.isFile() && entry.name === "SKILL.md") {
        files.push(path.resolve(entryPath));
      }
    }
  }

  await visit(path.resolve(root));
  return files;
}

function countLines(source) {
  if (source === "") {
    return 0;
  }

  const lines = source.split(/\r\n|\n|\r/);
  if (lines.at(-1) === "") {
    lines.pop();
  }
  return lines.length;
}

function removeMarkdownCode(text) {
  const output = [];
  let fence = null;

  for (const line of text.split("\n")) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line);
    if (marker) {
      const markerCharacter = marker[1][0];
      if (fence === null) {
        fence = markerCharacter;
      } else if (fence === markerCharacter) {
        fence = null;
      }
      output.push("");
    } else if (fence !== null) {
      output.push("");
    } else {
      output.push(line.replace(/`[^`\n]*`/g, ""));
    }
  }

  return output.join("\n");
}

function markdownDestination(rawDestination) {
  const trimmed = rawDestination.trim();
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return trimmed.slice(1, -1);
  }

  const destinationWithOptionalTitle = /^(\S+?)(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?$/.exec(
    trimmed,
  );
  return destinationWithOptionalTitle?.[1] ?? trimmed;
}

function isInside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

async function validateMarkdownLinks(body, skillDirectory, allowedRoot, displayPath) {
  const errors = [];
  const markdown = removeMarkdownCode(body);
  const linkPattern = /!?\[[^\]\n]*\]\(([^)\n]+)\)/g;
  const canonicalRoot = await realpath(allowedRoot);

  for (const match of markdown.matchAll(linkPattern)) {
    const destination = markdownDestination(match[1]);
    if (
      destination === "" ||
      destination.startsWith("#") ||
      destination.startsWith("/") ||
      destination.startsWith("//") ||
      /^[A-Za-z][A-Za-z0-9+.-]*:/.test(destination)
    ) {
      continue;
    }

    const pathPart = destination.split(/[?#]/, 1)[0];
    if (pathPart === "") {
      continue;
    }

    let decodedPath;
    try {
      decodedPath = decodeURIComponent(pathPart).replaceAll("\\", "/");
    } catch {
      errors.push(`${displayPath}: relative link has invalid percent encoding: ${destination}`);
      continue;
    }

    const target = path.resolve(skillDirectory, decodedPath);
    if (!isInside(allowedRoot, target)) {
      errors.push(`${displayPath}: relative link escapes the plugin root: ${destination}`);
      continue;
    }

    try {
      await access(target);
      const canonicalTarget = await realpath(target);
      if (!isInside(canonicalRoot, canonicalTarget)) {
        errors.push(`${displayPath}: relative link escapes the plugin root: ${destination}`);
      }
    } catch {
      errors.push(`${displayPath}: relative link target does not exist: ${destination}`);
    }
  }

  return errors;
}

export async function validateSkillsRoot(root) {
  const absoluteRoot = path.resolve(root);
  const allowedLinkRoot = path.dirname(absoluteRoot);
  const errors = [];
  const warnings = [];
  let files;

  try {
    files = await discoverSkillFiles(absoluteRoot);
  } catch (error) {
    return {
      root: absoluteRoot,
      files: [],
      errors: [`${absoluteRoot}: cannot read skill root (${error.message})`],
      warnings,
    };
  }

  if (files.length === 0) {
    errors.push(`${absoluteRoot}: no SKILL.md files found`);
  }

  const names = new Map();

  for (const file of files) {
    const displayPath = path.relative(process.cwd(), file) || file;
    let source;
    try {
      source = await readFile(file, "utf8");
    } catch (error) {
      errors.push(`${displayPath}: cannot read file (${error.message})`);
      continue;
    }

    const lineCount = countLines(source);
    if (lineCount > 500) {
      warnings.push(`${displayPath}: ${lineCount} lines (recommended maximum is 500)`);
    }

    let document;
    try {
      document = parseFrontmatter(source);
    } catch (error) {
      errors.push(`${displayPath}: ${error.message}`);
      continue;
    }

    const { data, body } = document;
    const name = data.name;
    const description = data.description;

    if (typeof name !== "string" || name.length === 0) {
      errors.push(`${displayPath}: frontmatter must include a nonempty name`);
    } else {
      if (!NAME_PATTERN.test(name)) {
        errors.push(
          `${displayPath}: name must be 1-64 lowercase alphanumeric/hyphen characters with no leading, trailing, or consecutive hyphen`,
        );
      }

      const parentDirectory = path.basename(path.dirname(file));
      if (name !== parentDirectory) {
        errors.push(
          `${displayPath}: name "${name}" must match parent directory "${parentDirectory}"`,
        );
      }

      const priorFile = names.get(name);
      if (priorFile) {
        errors.push(
          `${displayPath}: duplicate skill name "${name}" (already used by ${priorFile})`,
        );
      } else {
        names.set(name, displayPath);
      }
    }

    if (typeof description !== "string" || description.trim() === "") {
      errors.push(`${displayPath}: frontmatter must include a nonempty description`);
    } else if (characterCount(description) > 1024) {
      errors.push(`${displayPath}: description must be at most 1024 characters`);
    }

    if (
      Object.hasOwn(data, "compatibility") &&
      (typeof data.compatibility !== "string" || characterCount(data.compatibility) > 500)
    ) {
      errors.push(`${displayPath}: compatibility must be at most 500 characters`);
    }

    if (body.trim() === "") {
      errors.push(`${displayPath}: Markdown body must be nonempty`);
    }

    errors.push(
      ...(await validateMarkdownLinks(
        body,
        path.dirname(file),
        allowedLinkRoot,
        displayPath,
      )),
    );
  }

  return { root: absoluteRoot, files, errors, warnings };
}

function parseArguments(argv) {
  let root = DEFAULT_ROOT;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error("--root requires a path");
      }
      root = value;
      index += 1;
    } else if (argument.startsWith("--root=")) {
      root = argument.slice("--root=".length);
      if (root === "") {
        throw new Error("--root requires a path");
      }
    } else if (argument === "--help" || argument === "-h") {
      return { help: true, root };
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }

  return { help: false, root };
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(`error: ${error.message}`);
    console.error("usage: node scripts/validate-skills.mjs [--root PATH]");
    process.exitCode = 1;
    return;
  }

  if (options.help) {
    console.log("usage: node scripts/validate-skills.mjs [--root PATH]");
    return;
  }

  const result = await validateSkillsRoot(options.root);
  for (const warning of result.warnings) {
    console.warn(`warning: ${warning}`);
  }
  for (const error of result.errors) {
    console.error(`error: ${error}`);
  }

  if (result.errors.length > 0) {
    console.error(
      `Skill validation failed with ${result.errors.length} error(s) across ${result.files.length} file(s).`,
    );
    process.exitCode = 1;
  } else {
    console.log(`Validated ${result.files.length} skill(s).`);
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  await main();
}
