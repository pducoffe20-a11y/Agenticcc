---
name: d2l-sales-workflow-index
description: "Use when Pat asks what D2L sales workflow to use, mentions the D2L Sales Workflows plugin, or gives a broad request that could fit prospect strategy, intent outreach, deal journey, to-do planning, net-new accounts, association triggers, pre-call briefs, post-call debriefs, prospect dashboards, or seller-side board review."
---

# D2L Sales Workflow Index

Use this as the plugin router. Pick one launcher, or sequence two when the handoff is obvious.

## Launcher Map

- `prospect-strategy-workflow`: rank prospects, prep strict outreach JSON, and refresh JSON.
- `sales-assistant-workflow`: broad account prioritization, account brief, next seller move.
- `intent-outreach-workflow`: intent alerts to outreach drafts.
- `deal-journey-workflow`: active deal analysis, proposal support, next buyer move.
- `daily-todo-workflow`: seller daily plan and concrete task extraction.
- `net-new-account-workflow`: net-new account trigger scans and tracker prep.
- `association-trigger-workflow`: association-specific trigger scans.
- `pre-call-brief-workflow`: meeting prep and discovery plan.
- `post-call-debrief-workflow`: transcript debriefs, MEDDIC, CRM notes.
- `prospect-dashboard-workflow`: build or QA prospect dashboards.
- `seller-side-sales-assistant-workflow`: legacy HTML board review and broad seller-side prospecting copilot.

## Routing Rules

If the user asks for a broad result, choose the workflow that produces the first useful output.
If the request needs a natural sequence, run it in order:

- trigger scan -> prospect strategy -> outreach draft
- pre-call brief -> post-call debrief
- prospect strategy JSON -> prospect dashboard
- deal journey -> follow-up draft

## Methodology

1. Identify the user's underlying seller job: prioritize, research, draft, brief, debrief, build,
   calibrate, or route.
2. Choose the narrowest launcher that can produce the first useful deliverable.
3. Sequence two launchers only when the handoff is natural and the first output materially improves
   the second.
4. Load supporting skills only after the launcher is chosen.
5. Preserve the shared D2L standard: evidence first, compact output, visible uncertainty, and no
   autonomous send/update side effects.

## Final Deliverable

Return the chosen launcher, why it fits, any secondary launcher to run next, and the expected
deliverable shape. If the user asked for work rather than routing advice, run the selected launcher
and return that workflow's final deliverable instead of a long explanation.

Keep outputs seller-ready and concise. Do not take side effects like sending outreach, updating CRM,
or creating calendar tasks unless explicitly asked.
