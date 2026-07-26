---
name: prospect-strategy-workflow
description: "Use when Pat asks to rank prospects, enrich messy account/contact lists, choose Work Now vs Light Research vs Suppress, run research-first triage, prepare strict outreach JSON, refresh prior outreach JSON, sequence outbound work, or package draft emails for human review."
---

# Prospect Strategy Workflow

Use this as the launch skill for the Codex-native rebuild of the ChatGPT Prospect Strategy Agent.
It is not a mirror. It turns the original agent into a repeatable Codex workflow that can handle
files, pasted records, web research, local references, and review-ready JSON outputs.

## Launch Modes

Choose the smallest mode that satisfies the user:

- `rank-prep-json`: normalize, enrich, score, classify, and return strict JSON.
- `research-refine`: close specific confidence gaps before scoring or drafting.
- `refresh-outreach-json`: revise an existing outreach JSON payload from new notes or feedback.
- `sequence-work-now`: order Work Now prospects into a near-term seller action plan.
- `review-handoff`: package draft emails and evidence for human review.

If the user gives only a general request, default to `rank-prep-json`.

## Supporting Skills

Read only the supporting skills needed for the selected mode:

- `../prospect-enrichment-json/SKILL.md`: normalize messy records and fill structured gaps conservatively.
- `../prospect-research/SKILL.md`: verify evidence, close public-research gaps, and decide what to check next.
- `../outbound-sequencing/SKILL.md`: turn Work Now prospects into practical execution order.
- `../cold-email/SKILL.md`: shape email structure, subject lines, and follow-up sequence logic.
- `../codex-email-json-bridge/SKILL.md`: produce strict Codex-ready email JSON.
- `../codex-review-handoff/SKILL.md`: package drafts and evidence for review before send prep.
- `../feedback-calibration/SKILL.md`: turn keep/suppress/rewrite feedback into reusable calibration.
- `../prospect-html-email-refresh/SKILL.md`: use only when the user explicitly asks for HTML refresh.

## Source Intake

Accept prospects from pasted text, CSV/XLSX files, screenshots converted to tables, prior JSON,
or concise user notes. Preserve source row identity whenever possible.

Before scoring, identify:

- source name and date if known
- record count
- fields present
- fields missing that affect confidence
- whether public research is required for decision-quality output

Do not block on missing optional fields. Preserve unknowns explicitly.

## Methodology

1. Normalize and deduplicate records.
2. Separate provided facts, public research facts, verified facts, inferences, and unknowns.
3. Use focused public research only where it materially changes status, score, or draft quality.
4. Score Fit, Urgency, Persona, and Evidence independently.
5. Assign exactly one status: `Work Now`, `Light Research`, or `Suppress`.
6. Draft or refresh outreach inputs only for records that clear the outreach bar, unless the user asks otherwise.
7. Add review fields so emails remain human-review artifacts, not autonomous send artifacts.
8. Return strict JSON first, with a short seller readout only when useful.

## Enhanced Decision Policy

Prioritize seller usefulness over volume, but avoid being so strict that the Work Now set becomes
artificially tiny. When the input set is large enough, target a broad but still defensible Work Now
set. If weaker Work Now records are included to preserve useful coverage, flag their risk in
`review_flags`, `unknowns`, and `fact_check_targets`.

Never let a single strong signal hide weak evidence elsewhere. New-role signals from the last
0-4 months are high priority only when tenure is actually supported.

Use these score bands:

- `80-100`: strong evidence and strong seller usefulness
- `60-79`: useful but missing an important confidence layer
- `40-59`: mixed or weak signal; not ready for confident outreach
- `0-39`: poor fit, poor persona match, stale signal, or unsupported case

## Final Deliverable

Read `references/json-contracts.md` before producing the final JSON for any mode that emits
structured records.

Default primary outputs:

- `outreach_preparation_payloads.json`
- `board_summary.json`

Optional outputs by mode:

- `research_refinement_plan.json`
- `sequence_plan.json`
- `review_handoff.json`
- `calibration_update.json`

When returning JSON in chat, use fenced `json` blocks and keep prose outside the block.

## Memory

Use local memory only for durable patterns, not prospect scratch work:

- `../../memory/prospect-strategy-agent/outbound-patterns.md`
- `../../memory/prospect-strategy-agent/outreach-json-preferences.yaml`
- `../../memory/prospect-strategy-agent/review-calibration.md`

Save memory only when the user explicitly asks to remember something or when feedback clearly
establishes a durable calibration pattern.

## Safety

Do not fabricate evidence, contact data, current initiatives, platform ownership, tenure, customer
proof, buying authority, or approval state. Do not send outreach. Do not present drafts as approved
for sending. If a source cannot be verified, name the gap and proceed conservatively.
