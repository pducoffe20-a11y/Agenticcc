import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const validator = fileURLToPath(
  new URL("../scripts/validate-skills.mjs", import.meta.url),
);
const validFixture = fileURLToPath(
  new URL("./fixtures/valid-skill", import.meta.url),
);
const invalidFixture = fileURLToPath(
  new URL("./fixtures/invalid-skill", import.meta.url),
);

function runValidator(root) {
  return spawnSync(process.execPath, [validator, "--root", root], {
    cwd: projectRoot,
    encoding: "utf8",
  });
}

test("a valid fixture passes skill validation", () => {
  const result = runValidator(validFixture);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 1 skill/);
});

test("an invalid fixture fails without being modified", async () => {
  const fixtureFile = new URL("./fixtures/invalid-skill/SKILL.md", import.meta.url);
  const before = await readFile(fixtureFile, "utf8");
  const result = runValidator(invalidFixture);
  const after = await readFile(fixtureFile, "utf8");

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /name must be 1-64 lowercase/);
  assert.match(result.stderr, /description/);
  assert.match(result.stderr, /Markdown body must be nonempty/);
  assert.equal(after, before);
});
