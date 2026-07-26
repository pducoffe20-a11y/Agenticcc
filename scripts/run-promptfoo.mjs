#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const mode = process.argv[2];
const commands = {
  validate: ["validate", "config", "-c", "evals/promptfooconfig.yaml"],
  eval: [
    "eval",
    "-c",
    "evals/promptfooconfig.yaml",
    "--no-share",
    "--no-cache",
    "--no-write",
  ],
};

if (!Object.hasOwn(commands, mode) || process.argv.length !== 3) {
  console.error("usage: node scripts/run-promptfoo.mjs <validate|eval>");
  process.exitCode = 1;
} else {
  const executable = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = spawnSync(
    executable,
    ["--yes", "promptfoo@0.121.19", ...commands[mode]],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        PROMPTFOO_CONFIG_DIR: ".promptfoo",
        PROMPTFOO_DISABLE_SHARING: "1",
        PROMPTFOO_DISABLE_TELEMETRY: "1",
      },
    },
  );

  if (result.error) {
    console.error(`Unable to run Promptfoo: ${result.error.message}`);
    process.exitCode = 1;
  } else if (result.signal) {
    console.error(`Promptfoo terminated from signal ${result.signal}.`);
    process.exitCode = 1;
  } else {
    process.exitCode = result.status ?? 1;
  }
}
