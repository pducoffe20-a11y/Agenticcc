---
name: prospect-research
description: "Use when the user asks to research a prospect, account, contact, buying signal, role change, organization, or evidence gap for outbound work; also use when the request needs stronger verified facts, clearer uncertainty handling, or a narrow next-step research plan before ranking or outreach."
---

# Prospect Research

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a002943995881918d37c5edc201f95b
Short description: Sharper prospect research and evidence-first triage

## Instructions

Prospect Research
Overview

Use this skill to improve seller-side prospect research quality before ranking, drafting outreach, or recommending next actions.

The goal is not to produce the biggest pile of facts. The goal is to produce the smallest set of reliable facts that most improves seller confidence.

Use This Skill When

Reach for this skill when the request is about any of the following:

researching a person, organization, or account before outreach

checking whether a new role, initiative, remit, or likely pain area is actually supported

filling high-value gaps in a prospect record

deciding what remains unknown and what to verify next

turning messy notes into conservative verified facts, inference, and unknowns

identifying whether the current evidence is strong enough for Work Now versus Light Research

Do not use this skill when the task is mainly about message tone, full outreach drafting, or UI/report presentation and the research basis is already settled.

Core Principles

Be conservative. Weak or partial signals should stay weak or partial.

Separate verified facts from inference every time.

Preserve unknowns instead of smoothing them away.

Prefer the narrowest next research step that would change the decision.

Optimize for seller usefulness, not for volume or trivia.

## Methodology

Follow this order:

Identify the decision the research needs to support.

Examples: rank this prospect, decide Work Now vs Light Research, draft outreach, confirm likely remit, confirm whether the org is a fit.

Inventory the evidence already available in the request.

Pull out explicit facts, source-backed claims, timestamps, and confidence-lowering contradictions.

Split the information into three buckets:

verified facts

plausible inference

unknowns

Decide whether the current evidence is already enough.

If yes, stop researching and return the conservative result.

If no, identify the 1-3 highest-value missing answers.

Prioritize research targets in this order unless the request clearly requires something else:

role and remit clarity

tenure or recent role change

organization type and likely use case

evidence of urgency or active change

reachable contact context that improves message precision

Recommend the smallest next-step checks.

Each check should explain what to verify and why it matters.

Only elevate to stronger ranking or outreach support when the evidence actually improved.

Decision Rules
When evidence is strong enough

Treat evidence as strong enough when the available facts directly support the recommended seller action without requiring the user to guess at the main claim.

Examples:

the contact is clearly in a relevant role and the organization clearly fits the target segment

the role change is recent enough and supported clearly enough to justify outreach

the likely pain area is tied to the remit, organization type, or verified initiative without stretching

When evidence is not strong enough

Default to caution when:

role relevance is vague

tenure is unknown but being used as a core signal

initiative or platform claims are speculative

the organization's fit is thin or conflicting

the proposed pain statement depends on stacked assumptions

In those cases, preserve the record as uncertain and recommend a focused next research step.

## Final Deliverable

When this skill is used, return research in a compact seller-ready structure.

Prefer this shape unless the surrounding task already has a stricter required format:

research_goal

verified_facts

plausible_inference

unknowns

confidence_level (high, medium, or low)

why_confidence_is_limited

recommended_next_checks

impact_on_decision

Field Guidance

verified_facts: only claims supported by the provided material or clearly stated source-backed information

plausible_inference: reasonable but unverified interpretation; write these carefully

unknowns: open questions that materially affect ranking, outreach, or escalation

recommended_next_checks: ordered from highest value to lowest value

impact_on_decision: explain how the evidence changes ranking, suppression, research priority, or outreach readiness

Outreach Handoff Rules

If this research will feed outreach:

do not turn inference into personalized certainty

keep pain framing conditional when support is partial

explicitly carry forward any important unknowns

note whether outreach is ready now or should wait for one more check

Quality Bar

Before finishing, confirm that:

verified facts and inference are clearly separated

uncertainty is visible, not hidden

next checks are specific and worth doing

the result helps a seller decide what to do next

no speculative claim is doing the work of a verified fact

Example Request Shapes
Example 1

User request:

Research this contact before I decide whether to work them now.

Success criteria:

clarify whether the contact looks relevant enough for near-term outreach

preserve uncertainty

recommend only the next checks that would materially change the decision

Example 2

User request:

What can we actually say with confidence about this prospect and what are we just inferring?

Success criteria:

split the record cleanly into verified facts, inference, and unknowns

call out any overreach risk

keep the answer compact and seller-ready

Example 3

User request:

Fill the biggest gaps before drafting outreach.

Success criteria:

identify the minimum missing facts needed for credible outreach

avoid generic research suggestions

state whether outreach is ready now, risky, or premature
