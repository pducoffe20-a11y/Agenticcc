---
name: deal-journey-workflow
description: "Use when Pat asks to analyze a deal, review account or call context, identify deal gaps, recommend next buyer moves, support proposal messaging, extract deal evidence, or coach next-step execution."
---

# Deal Journey Workflow

Use this for active opportunities and complex account motion. The goal is to turn scattered deal
signals into a clear next move, not to produce a generic pipeline summary.

## Launch Modes

- `structured-deal-review`: assess current state, risks, evidence, and next move.
- `call-to-deal-guidance`: turn transcript or call notes into deal implications.
- `proposal-support`: shape proposal narrative, proof, and stakeholder framing.
- `evidence-gap-finder`: identify missing evidence blocking progress.
- `deal-coaching`: suggest the next buyer conversation, internal action, or negotiation move.
- `dashboard-readout`: produce a compact manager-ready deal readout.

## Source Intake

Use transcripts, emails, notes, CRM exports, proposal drafts, stakeholder notes, competitive context,
and user-provided deal facts. Preserve quoted evidence when it matters.

## Analysis Frame

Review:

- business problem and urgency
- stakeholders and influence
- decision process and timing
- current solution / incumbent / competitor
- value proof and missing proof
- risks, blockers, and next commitment

Do not fill MEDDIC-style fields with guesses. Mark unknowns.

## Methodology

1. Identify the deal decision the user needs to make: next buyer move, risk diagnosis, proposal
   framing, evidence gap, or manager readout.
2. Inventory provided deal facts, quoted buyer language, stakeholder context, and source dates.
3. Split confirmed evidence from inference and unknowns before filling any qualification fields.
4. Analyze the deal through problem, urgency, stakeholders, decision process, proof, risk, and next
   commitment.
5. Recommend the smallest next move that advances the deal or exposes the next missing fact.

## Final Deliverable

Return:

- `deal_state`: stage, evidence, confidence, timeline.
- `buyer_map`: known stakeholders, likely roles, gaps.
- `risk_register`: risk, evidence, severity, mitigation.
- `next_moves`: ordered actions with owner and message angle.
- `proposal_guidance`: only when requested or clearly useful.

## Safety

Do not invent customer commitments, budgets, authority, decision criteria, or competitor facts.
Keep recommendations practical and tied to evidence.
