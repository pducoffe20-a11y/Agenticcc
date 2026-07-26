# Quality gates

The repository uses Node.js 24 for deterministic validation, a pinned
portability check, secret scanning, and an optional live-model regression suite.
Pull requests and pushes to `main` run only the static and secret-scanning jobs.
Live evaluation is available only through a manual `workflow_dispatch`.

## Local commands

Run commands from the repository root with Node.js 24 or newer.

| Command | What it checks | Model call |
| --- | --- | --- |
| `npm test` | Unit tests for the repository-owned validators. | No |
| `npm run quality` | Skill structure, registry synchronization, and Promptfoo configuration using the pinned Promptfoo version. | No |
| `npm run skills:list` | Lists the local plugin's discoverable skills using `skills@1.5.20`. | No |
| `npm run eval:workflows` | Runs five synthetic workflow regressions with the pinned `openai:chat:gpt-5.4-mini-2026-03-17` snapshot. | Yes |

The portability command used in CI is deliberately explicit:

```bash
npx --yes skills@1.5.20 add ./plugins/d2l-sales-workflows --list
```

`npm run quality` can download the pinned Promptfoo package through `npx`, but
its `validate config` operation does not call a model.

## Automated GitHub checks

`.github/workflows/quality-gates.yml` runs on pull requests, pushes to `main`,
and manual dispatches with repository permissions limited to `contents: read`.

- **Static quality gates** use Node.js 24, run `npm test`, run
  `npm run quality`, and verify the pinned Skills CLI can list the plugin.
- **Secret scan** checks full Git history with the pinned Gitleaks action and
  repository-default rules extended by `.gitleaks.toml`. PR comments are
  disabled.
- **Live synthetic workflow evals** run only for `workflow_dispatch`. The job
  fails clearly when the `OPENAI_API_KEY` repository secret is absent.

No workflow step uploads an eval artifact or invokes Promptfoo sharing.

## Manual live evaluation

Live evaluation is intentionally outside the default pull-request path because
it uses a paid external model and prints generated text to its runner. Configure the
`OPENAI_API_KEY` secret, open the **Quality gates** workflow in GitHub Actions,
and choose **Run workflow**. For a local run:

```bash
export OPENAI_API_KEY=your_key
npm run eval:workflows
```

The runner pins Promptfoo to `0.121.19`, disables cache, telemetry, and result
storage, and passes both `--no-share` and `--no-write`. The config also sets
`sharing: false`; CI additionally sets `PROMPTFOO_DISABLE_SHARING=true`.
Console output remains local or in the ephemeral Actions runner log.

The synthetic matrix covers:

| Workflow | Regression contract |
| --- | --- |
| `prospect-strategy-workflow` | Strict JSON and separation of provided facts, research, inference, and unknowns. |
| `cold-email` | Short human draft with no unsupported proof and no claim that it was sent. |
| `daily-todo-workflow` | All four standard output headings, ownership, ambiguity, and suppression. |
| `pre-call-brief-workflow` | Explicit unknowns with no invented account facts. |
| `post-call-debrief-workflow` | Owned, dated next steps and CRM-ready notes that are clearly not applied. |

Each test loads the shipped workflow's actual `SKILL.md` through a `file://`
variable. The remaining context is clearly marked synthetic.

## Privacy and result handling

Only synthetic fixtures may be committed or used in this eval suite. Never use
real customer or prospect names, contact details, email, calendar content,
meeting transcripts, CRM exports, SharePoint material, customer proof,
credentials, or non-public commercial data.

Do not run `promptfoo share`, upload eval output as a workflow artifact, attach
it to an issue or pull request, or copy generated results into the repository.
The ignore rules are a last line of defense, not permission to generate or
retain private data in the working tree. Review staged changes before every
commit, and treat a Gitleaks finding as a stop condition.

## External foundation implementation map

The upstream projects are design inputs or pinned tools, not vendored code.
Their immutable review references and license boundaries live in
`registry/external-sources.yaml`.

| External foundation | Repository-owned implementation |
| --- | --- |
| `zapier/gtm-cheat-codes` | Searchable workflow metadata, connector needs, approval gates, and public-safety fields in `registry/skills.csv`, with policy enforced by `AGENTS.md`. |
| `promptfoo/promptfoo` | Pinned invocation in `scripts/run-promptfoo.mjs`; suite configuration in `evals/promptfooconfig.yaml`; wrapper in `evals/prompts/skill-runner.txt`; synthetic cases in `evals/tests/core-workflows.yaml`. |
| `gitleaks/gitleaks` | Default-rule extension in `.gitleaks.toml` and pinned full-history scan in `.github/workflows/quality-gates.yml`. |
| `agentskills/agentskills` | Repository-owned `plugins/d2l-sales-workflows/skills/*/SKILL.md` packages, checked by `scripts/validate-skills.mjs` and synchronized by `scripts/validate-registry.mjs`. |
| `vercel-labs/skills` | Pinned local discovery command in `package.json` and `.github/workflows/quality-gates.yml`, with project-scoped install guidance in `docs/PORTABILITY.md`. |
