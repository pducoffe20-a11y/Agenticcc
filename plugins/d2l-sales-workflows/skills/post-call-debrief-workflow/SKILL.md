---
name: post-call-debrief-workflow
description: "Use when Pat asks to debrief a call transcript, extract MEDDIC or qualification signals, write CRM-ready notes, capture next steps, summarize buyer pain, or turn a meeting into follow-up actions."
---

# Post-Call Debrief Workflow

Turn transcripts or notes into clean sales debriefs and CRM-ready updates. Ground every important
claim in the call evidence.

## Launch Modes

- `transcript-debrief`: summarize the call and outcomes.
- `qualification-extract`: pull MEDDIC-style or deal qualification signals.
- `crm-notes`: write CRM-ready notes without fluff.
- `follow-up-actions`: identify owners, dates, and next steps.
- `buyer-language`: capture buyer quotes, pains, and phrasing.
- `risk-and-gap`: identify missing information or deal risk.

## Methodology

1. Identify the source type, call date, attendees, and requested debrief mode.
2. Extract buyer priorities, pain, commitments, objections, owners, dates, and exact quotes only
   where they improve accuracy.
3. Separate what happened, what matters, what is unknown, and what happens next.
4. Convert the call into seller actions and CRM-ready notes without embellishment.
5. Flag unclear speaker attribution, ambiguous commitments, and missing qualification evidence.

## Final Deliverable

Return:

- `call_summary`
- `buyer_priorities`
- `pain_points`
- `qualification_signals`
- `objections_or_risks`
- `next_steps`
- `crm_update`
- `follow_up_draft` when requested
- `evidence_quotes` where useful
- `unknowns`

## Evidence Rules

Use direct quotes sparingly and only when they improve accuracy. Do not add facts that are not in
the transcript or notes. Mark unclear speakers or ambiguous commitments.

## CRM Style

CRM notes should be concise, factual, and free of performative language. Separate what happened,
what matters, and what happens next.
