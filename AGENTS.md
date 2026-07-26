# Contributor and Agent Guidance

This repository publishes reusable D2L sales workflow skills as a public Codex
plugin. These instructions apply to the entire repository.

## Project layout

- `plugins/d2l-sales-workflows/` contains the Codex plugin manifest and plugin
  assets.
- `plugins/d2l-sales-workflows/skills/<skill-name>/` contains one workflow per
  directory, anchored by `SKILL.md` and, when needed, local `scripts/`,
  `references/`, or `assets/`.
- `registry/skills.csv` is the searchable catalog of shipped workflows,
  outputs, approval gates, and public-safety status.
- `registry/external-sources.yaml` records reviewed upstream projects, pinned
  review references, licenses, and the boundary between inspiration and
  repository-owned implementation.
- `docs/` contains operator and portability documentation.
- `evals/` and repository scripts, when present, contain deterministic quality
  checks and workflow evaluations.

The registry is authoritative for discovery. Keep each `skill_name` identical
to its directory name and keep `repo_path` repository-relative. `public_safe`
describes whether the committed skill definition and examples are safe for a
public repository; it does not authorize publishing runtime inputs or outputs.

## Public-safe content

Treat every committed file as public. Never add customer-private data,
prospect or employee personal data, credentials, access tokens, internal
identifiers, CRM exports, call transcripts, private email, non-public pricing,
or confidential account strategy. Use clearly synthetic names, domains, and
values in examples and fixtures.

Runtime workflows may process data supplied through approved connectors, but
that data must not be copied into source files, fixtures, snapshots, logs, PR
descriptions, or issue comments. Minimize retained data and redact sensitive
fields from diagnostics.

## Evidence, inference, and actions

- Separate evidence from inference. Cite the source and observation date for
  factual claims; label conclusions, estimates, and recommendations as
  inference.
- Do not imply that a connector is available. Each workflow must name its
  required connectors, the minimum data or tool access needed, and a useful
  fallback when a connector is unavailable.
- External reads must stay within the user's authorized scope.
- Do not send email, post messages, update CRM records, create tasks, modify
  calendars, or perform any other external write without the user's explicit
  approval at the point of action.
- Drafting and previewing are allowed before approval. Present the exact target
  and material payload before requesting approval.
- Keep `approval_gate` in `registry/skills.csv` consistent with the workflow.
  `before_external_write` means the skill may prepare an action but must pause
  before executing it; `none_read_only` means the documented workflow produces
  only local analysis or drafts.

## Verification

Run both the static quality suite and the relevant live workflow evaluations
before proposing behavioral changes:

```bash
npm run quality
npm run eval:workflows
```

`npm run quality` validates skill structure, registry synchronization, and the
Promptfoo configuration without calling a model. `npm run eval:workflows`
requires `OPENAI_API_KEY` and uses synthetic inputs only.

## Adding or changing a workflow

1. Create or update `plugins/d2l-sales-workflows/skills/<skill-name>/SKILL.md`.
2. Define the trigger, inputs, primary output, evidence rules, failure path, and
   connector needs using least-privilege access.
3. Add an explicit approval pause before every possible external write.
4. Use synthetic, public-safe examples and ensure no customer-private data is
   present.
5. Add or update exactly one matching row in `registry/skills.csv`, including
   `primary_output`, `approval_gate`, and `public_safe`.
6. Add deterministic fixtures or eval cases for the main path, unavailable
   connectors, ambiguous inputs, and rejected approval.
7. Record any new external influence in
   `registry/external-sources.yaml`, including its license, immutable reviewed
   reference, and integration boundary.
8. Run the quality and workflow eval commands when available and record any
   unavailable checks in the PR.

## Provenance and licensing

Review ideas and interoperability patterns; do not copy upstream prose or code
by default. Every upstream used for design input must have a repository URL,
license, immutable `reviewed_ref`, `vendored: false`, and a narrow integration
boundary in `registry/external-sources.yaml`.

No upstream code is vendored in this repository. A future vendoring proposal
requires maintainer approval, license compatibility review, preserved notices,
and a separate change that makes the copied files and modifications explicit.
Do not copy material from sources with unknown or incompatible terms.

## Pull request checklist

- [ ] The change is limited to the stated workflow or repository concern.
- [ ] Skill directories and `registry/skills.csv` match one-for-one.
- [ ] Connector requirements and least-privilege access are documented.
- [ ] External writes have an explicit, correctly registered approval gate.
- [ ] Evidence and inference are distinguishable in prompts and examples.
- [ ] All committed content is synthetic and public-safe.
- [ ] Upstream provenance, reviewed refs, and licenses are recorded.
- [ ] No upstream code or prose was copied without an approved license review.
- [ ] `npm run quality` passed.
- [ ] Relevant live evaluations passed, or their absence and reason are called
      out.
- [ ] The PR description contains no customer-private data or secrets.
