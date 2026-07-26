# D2L Agent Command Center Plugin

This public Codex plugin packages 20 evidence-aware D2L sales skills. Its router recommends the
narrowest useful workflow, names required inputs and connector fallbacks, preserves unknowns, and
keeps external actions behind their documented approval boundary.

The repository also ships a local React Agent Command Center at the repository root's `app/`
directory. The dashboard discovers 11 registry-backed launchers and all active skills, prepares
local imports, and exports validated prompts and JSON `LaunchRequest` payloads.

## Honest launch boundary

The dashboard does not execute Codex, call connectors, send email, post messages, update CRM,
create tasks, or modify calendars. Its always-available launcher is `PromptExportLauncher`: copy
the generated prompt or download the payload, then use it in an authenticated Codex session.
Runtime and connector adapters are deferred metadata boundaries.

## Development

From the repository root, use Node.js 24 and run:

```bash
npm ci --prefix app
npm run quality
npm test
npm run app:build
npm run app:dev
```

Catalog metadata comes from `registry/agents.json` and `registry/skills.csv`; it is never maintained
as a second React catalog. Import processing is local and in-memory. Optional history contains only
explicitly saved prompt/launch metadata and never imported records.
