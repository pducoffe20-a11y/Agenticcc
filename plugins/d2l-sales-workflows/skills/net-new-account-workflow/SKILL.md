---
name: net-new-account-workflow
description: "Use when Pat asks to find timely outreach signals for net-new accounts, run a weekly scan, validate one target, rank account triggers, prep tracker rows, or identify credible new-account outreach timing."
---

# Net-New Account Workflow

Find and validate net-new account opportunities with evidence strong enough to guide outreach.
Avoid broad account discovery unless the user asks for it; this workflow is strongest when it turns
signals into ranked, follow-up-ready accounts.

## Launch Modes

- `weekly-scan`: review a target set and rank trigger strength.
- `one-account-validation`: validate one target's fit, timing, and outreach angle.
- `trigger-ranking`: compare signals across accounts.
- `tracker-row-prep`: package validated findings for a tracker or follow-up list.
- `icp-onboarding`: clarify ICP criteria and suppression rules for future scans.

## Trigger Evidence

Prioritize triggers such as leadership change, learning program expansion, certification/CE motion,
new partnerships, compliance pressure, member education initiatives, workforce training growth, or
technology modernization.

Each trigger needs:

- source and date
- what changed
- why it matters for D2L
- confidence level
- outreach angle
- next check

## Methodology

1. Define the target segment, account set, scan window, and ICP/suppression rules.
2. Gather timely trigger evidence with source and date before assigning priority.
3. Score fit, trigger strength, D2L relevance, and evidence confidence separately.
4. Rank only accounts with a specific reason to act or a narrow next check.
5. Prepare tracker rows only after status and suppression decisions are clear.

## Final Deliverable

Return:

- `ranked_accounts`: account, trigger, evidence, score, status.
- `work_now`: accounts ready for outreach with angle.
- `research_next`: accounts needing one narrow check.
- `suppress`: weak, stale, or poor-fit accounts.
- `tracker_rows`: optional structured rows when requested.

Do not inflate weak signals to create volume.
