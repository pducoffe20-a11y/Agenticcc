# Agenticcc: D2L Sales Workflows

A public-safe Codex plugin containing 20 D2L sales workflows for research,
prioritization, call preparation, deal strategy, outreach, follow-up, and
seller review.

The repository keeps workflow instructions as the source of truth. The quality
tooling around them makes those instructions easier to find, safer to publish,
portable across agent clients, and testable before a change reaches `main`.

## What is included

- `plugins/d2l-sales-workflows/skills/` — the 20 production workflow skills.
- `registry/skills.csv` — searchable workflow catalog with outputs and approval
  gates.
- `evals/` — synthetic Promptfoo regression cases for the highest-risk seller
  workflows.
- `scripts/` — Agent Skills and registry validation.
- `.github/workflows/quality-gates.yml` — automated validation and secret
  scanning.
- `docs/` — quality-gate and portable-install guidance.

## Public-safety boundary

This repository must not contain credentials, private customer notes, restricted
SharePoint material, meeting transcripts, or unapproved customer proof.

`customer-story-matching`, `customer-story-matching-legacy`, and `pat-voice`
remain outside this public bundle because their source material contains named
customer or organization context. Drafts remain review-only, and no workflow
may send a message or update an external system without explicit approval.

## Install as a Codex plugin

Clone the repository and register its local marketplace:

```bash
codex plugin marketplace add /absolute/path/to/Agenticcc
codex plugin add d2l-sales-workflows@personal
```

Start a new Codex thread after installation. See
[`docs/PORTABILITY.md`](docs/PORTABILITY.md) for portable Agent Skills
installation through the pinned `skills` CLI.

## Run the quality gates

The tooling requires Node.js 24 or newer. It has no checked-in runtime
dependencies.

```bash
npm test
npm run quality
```

`npm run quality` validates the Agent Skills structure, confirms the registry is
in sync, and validates the Promptfoo configuration. Live model evaluation is
deliberately separate:

```bash
export OPENAI_API_KEY=your_key
npm run eval:workflows
```

Only synthetic fixtures belong in evaluations. Never use real account, contact,
email, transcript, or customer-proof data.

## Repository guidance

Read [`AGENTS.md`](AGENTS.md) before changing workflows. It defines the evidence
standard, external-action boundary, provenance rules, validation commands, and
pull-request checklist.

The five external foundations used here are recorded—without vendored upstream
code—in [`registry/external-sources.yaml`](registry/external-sources.yaml).
