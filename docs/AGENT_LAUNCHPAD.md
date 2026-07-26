# Agent Command Center

## Run locally

Use Node.js 24, then run `npm ci --prefix app` and `npm run app:dev`. Build the generated catalog and
production app with `npm run app:build`; run local tests with `npm test`.

## Catalog generation

`registry/agents.json` owns the 11 agent records and `registry/skills.csv` owns active skills.
`scripts/generate-launchpad-catalog.mjs` validates references, approval gates, public-safety flags,
duplicate IDs/modes/names, recipes, and the prompt-export-only runtime posture before writing
`app/src/generated/launchpad-catalog.json`. `npm run quality` regenerates the artifact and fails on
uncommitted drift. To add an agent, add one registry record whose launcher and related skills are
active. To add a skill, follow `AGENTS.md`, then regenerate the catalog.

## What launch means

Launch means prepare and validate a `LaunchRequest`, copy its exact Codex-ready prompt, or download
its JSON payload. There is no verified Codex runtime adapter and no working-looking Run button.
Connectors are requirements/fallback metadata only. Email, messaging, CRM, task, and calendar writes
are prohibited and impossible in this MVP; a workflow approval gate remains a pause, not permission.

## Import and privacy

See `docs/IMPORT_CONTRACT.md` for formats, profiles, limits, mapping, validation, deduplication, and
export behavior. Processing defaults to memory and uploads nothing. Optional history stores only
user-approved launch metadata and prompts in browser local storage, never imported rows. Users can
clear it at any time. Browser storage is not enterprise-secure storage.

## Known limitations

There is no backend, authentication, connector execution, runtime execution, automatic chaining,
multi-file import, CSV re-export, or secure synchronized history. Recipes are inspectable examples;
they do not recursively or automatically execute skills.
