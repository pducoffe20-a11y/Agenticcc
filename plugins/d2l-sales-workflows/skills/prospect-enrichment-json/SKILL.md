---
name: prospect-enrichment-json
description: "Use when the user asks to enrich, verify, fill gaps in, or quality-check prospect records for D2L Brightspace outbound work, especially when the output needs conservative scoring, explicit evidence handling, and JSON-first prospect objects rather than HTML or visual reports."
---

# Prospect Enrichment JSON

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a0028a40b348191b797df1135b2fb85
Short description: Conservative prospect enrichment for scored JSON workflows

## Instructions

Prospect Enrichment JSON

Enrich prospect records for a seller-side prospect strategy workflow. Improve the record only where evidence supports it, keep verified facts separate from inference, and preserve a machine-readable shape that can feed ranking and outreach decisions.

Do not turn this into a general research report skill. The goal is to improve prospect records so they are safer to score, route, and action.

Use This Skill For

Use this skill when the user asks to:

enrich a prospect list, spreadsheet, or pasted records before scoring

verify titles, organizations, role fit, tenure clues, or likely remit

identify missing fields that block confident prioritization

tighten evidence quality before deciding Work Now, Light Research, or Suppress

prepare structured prospect objects for downstream ranking or outreach drafting

review whether an existing prospect dataset is too speculative or too thin

Do not use this skill when the main job is:

building HTML, dashboards, or visual boards

broad account discovery from scratch

generic company research with no prospect-level output requirement

sending outreach or managing CRM updates

Request Shapes

Typical request shapes this skill should handle:

"Enrich these 25 prospects before scoring them."

Success: each record has improved identity fields, clearer evidence notes, explicit unknowns, and concrete next checks without inflated certainty.

"Verify which of these contacts are strong enough for Work Now outreach."

Success: the skill improves evidence quality, highlights remit and tenure confidence, and leaves weak records clearly marked for Light Research or Suppress instead of overpromoting them.

"Take this rough CSV export and return prospect objects ready for JSON scoring."

Success: the skill normalizes fields, preserves source provenance, deduplicates carefully, and returns records in a stable machine-readable shape.

## Methodology

Follow this order unless the user explicitly asks for a narrower task.

1. Start from the provided records

Use the user's supplied records, pasted list, or uploaded file as the source of truth.

Preserve the original row identity when possible.

Normalize obvious field variations only when needed to make the record usable.

Do not silently drop partial records; either preserve them with gaps or suppress them explicitly.

Deduplicate carefully and preserve provenance when multiple rows point to the same person.

2. Improve only what evidence can support

For each prospect, separate information into these buckets:

verified facts

inferred pains or hypotheses

unknowns

what to check first

evidence notes

Use conservative language whenever the source is indirect.

Allowed upgrades:

confirming organization name, title, domain, or professional context

identifying likely persona relevance

surfacing signals that support or weaken urgency

inferring likely pain areas only when grounded in role, org type, or verified program context

estimating whether the record is ready for Work Now, needs Light Research, or should be Suppressed

Disallowed upgrades:

inventing buying authority

inventing current platform ownership or migration intent

inventing tenure, budget, dissatisfaction, or initiative timing

converting a title clue into certainty about remit

3. Enrichment priorities

Improve fields in this priority order:

Identity clarity

full name

current title

organization

domain or professional context

Routing clarity

category

persona relevance

likely remit signals

tenure clues if actually supported

Evidence quality

explicit evidence notes

verified facts separated from inference

unknowns preserved instead of hidden

Actionability

what to check first

recommended actions

whether the record is strong enough for Work Now outreach

If a lower-priority field can only be filled by guessing, leave it null, empty, or explicitly unknown.

4. Status discipline

Use enrichment to support downstream status decisions:

Work Now only when role fit and evidence are strong enough to justify outreach

Light Research when the account or person could be promising but key uncertainty remains

Suppress when the record is a poor fit, too weakly supported, stale, duplicate, or otherwise not worth seller time

Do not pad Work Now with weak records.

When strong evidence supports a new-role contact in the last 0-4 months, treat that as a meaningful priority signal. If tenure is not actually verified, keep it as an unknown or a low-confidence clue rather than presenting it as fact.

5. JSON-first output rules

Return structured machine-readable output by default.

Use the schema patterns in references/output-schema.md when the user does not provide a narrower shape.

Preferred default objects:

prospects.json

board_summary.json

For each enriched record, preserve or fill these fields where supported:

prospect_id

full_name

title

organization

email

linkedin_url

category

status

score_total when the user asked for scoring or when scoring is already part of the workflow

scores.fit

scores.urgency

scores.persona

scores.evidence

tenure_months

verified_facts

inferred_pains

unknowns

what_to_check_first

evidence_notes

suppress_reason

recommended_actions

message_variants only when the record is truly ready for outreach or the user explicitly asked for drafts

If the user asked only for enrichment and not full outreach, do not force message drafting.

6. Quality check before finalizing

Before returning the output, confirm:

each record still has a stable identity

all certainty claims are traceable to evidence

verified facts are not mixed with inferred pains

unknowns are preserved

status recommendations match evidence quality

weak records were not promoted just because the list was short

any missing fields that materially affect prioritization are explicitly flagged

Supporting Files

references/output-schema.md - load when shaping enriched prospect records or summary objects so the JSON output stays consistent.

## Final Deliverable

When the user does not specify a different format, return:

A machine-readable prospect object collection suitable for downstream scoring or seller action.

A concise board-level summary object with counts, themes, and evidence gaps.

Brief notes on what remained unknown or what should be checked next.

If the input is too thin for confident enrichment, say so plainly and return the safest structured partial output instead of pretending the gaps were resolved.

Example Decision Pattern

If the record has a clear current role, relevant org type, and grounded evidence of remit or urgency, enrich it for scoring and allow Work Now when justified.

If the person may be relevant but remit, tenure, or program context is unclear, keep the record structured but route it to Light Research with the next best verification step.

If the person or org is clearly outside the target motion, duplicate, stale, or too weakly supported, return Suppress with a specific reason.
