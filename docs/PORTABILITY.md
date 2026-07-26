# Portability

The D2L sales workflows can be consumed as a local Codex plugin or installed as
project-scoped Agent Skills with the Vercel Skills CLI. Both paths use the
public repository as their source.

## Local Codex plugin

Clone the repository and register its absolute path as a local marketplace:

```bash
git clone https://github.com/pducoffe20-a11y/Agenticcc.git
cd Agenticcc
codex plugin marketplace add /absolute/path/to/Agenticcc
codex plugin add d2l-sales-workflows@personal
codex plugin list
```

Replace `/absolute/path/to/Agenticcc` with the clone's real absolute path. The
marketplace ID is `personal`; the plugin ID is `d2l-sales-workflows`. Start a
new Codex session after installation so the plugin's skills are discovered.

This route installs the full plugin metadata and workflows into the local Codex
environment. Connector-backed workflows still require the relevant connector
to be enabled and authenticated, and external writes still require explicit
approval.

## Vercel Skills CLI

Use the CLI through `npx` at the reviewed version. A global installation of the
CLI is not required.

From the project where Codex should use the workflows, first inspect the skills
available at the plugin URL:

```bash
npx --yes skills@1.5.20 add \
  https://github.com/pducoffe20-a11y/Agenticcc/tree/main/plugins/d2l-sales-workflows \
  --list
```

Install all discovered workflows for Codex:

```bash
npx --yes skills@1.5.20 add \
  https://github.com/pducoffe20-a11y/Agenticcc/tree/main/plugins/d2l-sales-workflows \
  --skill '*' \
  --agent codex \
  --yes
```

Confirm the project-scoped Codex installation:

```bash
npx --yes skills@1.5.20 list --agent codex
```

Project scope is the default and is intentional: the commands omit `--global`,
so the skills stay associated with the current project. Add `--global` only
when a user deliberately wants the workflows available across projects.

## Compatibility expectations

- Each workflow remains a self-contained Agent Skill with `SKILL.md` as its
  entry point.
- Codex plugin installation preserves the plugin-level catalog and metadata.
  Skills CLI installation exposes the individual workflows but does not replace
  connector setup or approval policy.
- Re-run the same pinned command to reproduce an installation. Review release
  notes and repository changes before changing the `skills@1.5.20` pin.
- Use a fresh Codex session after adding or updating workflows.
