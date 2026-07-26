---
name: outbound-sequencing
description: "Use when the user wants ranked prospects turned into a practical outbound execution order, channel mix, follow-up sequence, or next-7-days action plan. Also use when the task is to decide who to contact first, how aggressively to sequence, or how to convert Work Now prospects into seller-ready daily action lists without overstating weak evidence."
---

# Outbound Sequencing

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a0092544e44819195e36a2aec16411e
Short description: Turn ranked prospects into seller-ready contact sequences

## Instructions

Outbound Sequencing
Overview

Use this skill to convert already-scored prospect records into a conservative, seller-ready outreach sequence.

This skill is for execution planning after scoring and triage are mostly done. It should help the agent answer questions like:

who should be contacted first

which channel should be used first

how quickly follow-up should happen

which prospects should stay light-touch despite decent scores

what the seller should do over the next 7 days

Use this skill only when sequencing or action ordering is the main task. If the core problem is missing or messy data, use
prospect-enrichment-json first. If the key blocker is weak evidence or an unresolved fact gap, use
prospect-research first. When drafting the actual message copy for a chosen sequence step, use
pat-voice so the writing stays short, human, and relevance-first.

Request Shapes

Use this skill when the user asks for requests like:

"Turn these Work Now prospects into a call/email/LinkedIn order for this week."

"Who should Pat contact first, and what should the first touch be?"

"Build a next-7-days outbound plan from this ranked list."

"Which prospects deserve multistep follow-up versus one light touch?"

Do not use this skill when the user mainly wants:

net-new scoring or status assignment

broad research without a concrete sequencing decision

polished HTML, dashboard, or UI output

message drafting alone without sequence logic

Required Inputs

Prefer to work from prospect records that already include, when available:

status

score_total

scores.fit

scores.urgency

scores.persona

scores.evidence

tenure_months

verified_facts

inferred_pains

unknowns

what_to_check_first

any existing message drafts or recommended actions

If some fields are missing, proceed conservatively from what is present. Do not invent urgency, contact readiness, or channel preference.

Sequencing Principles

Build the sequence for seller usefulness, not activity volume.

Apply these principles:

Start with the strongest credible reason to contact now, not the highest raw score alone.

Keep high-evidence new-role prospects near the top when role relevance is real.

Use lighter sequencing for records with partial evidence, unclear remit, or weak personalization angles.

Do not give aggressive follow-up plans to records that barely cleared Work Now.

If two prospects are close, prioritize the one with the clearer verified angle and cleaner first message.

Prefer fewer strong touches over bloated multi-step sequences.

If the available facts do not support a confident sequence, say so and keep the plan light.

## Methodology

For each prospect, follow this order:

1. Confirm readiness tier

Assign one of these readiness tiers:

priority_now: strong evidence, strong role relevance, clear reason for near-term outreach

standard_now: good Work Now candidate but less urgent or less differentiated

light_touch_now: outreach is reasonable, but evidence or personalization depth is still limited

research_before_followup: one touch may be acceptable, but stronger follow-up should wait for a specific missing fact

Do not promote a prospect into a higher readiness tier just to fill a quota.

2. Choose the first-touch channel

Choose one first-touch channel:

email

linkedin

call

research_hold

Use this logic:

prefer email when there is a clear role-and-organization angle that can be stated plainly

prefer linkedin when the signal is relevant but the message should stay especially light or contextual

prefer call only when the record is unusually strong, time-sensitive, and credible enough to justify interruption

use research_hold when stronger sequencing would depend on one missing fact that materially affects the outreach angle

Always state the reason for the channel choice in one plain sentence.

3. Set sequence intensity

Assign one of these intensity levels:

single_touch

two_step_light

three_step_standard

three_step_priority

Default rules:

single_touch for light-touch or borderline records

two_step_light when the record is usable now but follow-up should stay modest

three_step_standard for solid Work Now records with credible message angles

three_step_priority only for the strongest, clearest, highest-confidence prospects

Never recommend more than three touches in the default sequence unless the user explicitly asks for a more aggressive motion.

4. Place follow-up timing

Use practical timing, not artificial precision.

Default spacing:

first follow-up: 2-4 business days after the first touch

second follow-up: 4-7 business days after the prior touch

Tighten timing only when the evidence supports genuine immediacy. Loosen timing when the record is weaker, more uncertain, or less differentiated.

5. Define stop conditions

Name when the seller should stop pushing or pause for more research.

Common stop conditions:

the next touch would repeat the same weak angle

the case depends on an unverified ownership assumption

no clean message remains after the first touch

a role mismatch or fit concern becomes more likely

## Final Deliverable

Default to structured output. Unless the user asks for a different format, return:

sequence_summary

records

Shape sequence_summary like this:

title

generated_at

total_input_records

sequenced_records

research_hold_count

priority_now_count

channel_mix

manager_notes

For each item in records, include:

prospect_id

full_name

organization

title

status

readiness_tier

sequence_rank

why_now

first_touch_channel

channel_rationale

sequence_intensity

touch_plan

stop_condition

risks_or_unknowns

seller_notes

Shape each touch_plan item like this:

step_number

timing

channel

goal

message_angle

cta_style

requires_more_research

If the input includes prospects that should not be sequenced yet, keep them in the output with a low rank or null rank and explain why they are on hold.

Message-Angle Rules

For each touch, the angle must be anchored to verified facts first.

Use these rules:

open with the clearest relevant fact, role context, or new-role signal

keep the stated pain area plausible, not overclaimed

avoid stacking multiple speculative assumptions in one step

if the first angle is weak, use a lighter CTA rather than fake specificity

vary the follow-up angle only when the record supports a genuinely different point

If message drafting is requested, hand the copy portion to
pat-voice after deciding the sequence.

Ranking Rules Inside The Sequence

When ranking records inside the sequence:

sort first by seller usefulness, then by urgency, then by evidence clarity

a stronger verified angle beats a slightly higher abstract score

high Fit with weak Evidence should not crowd out cleaner ready-to-send records

new-role timing matters most when the current remit is still plausibly relevant

when two contacts are at the same account, prefer the cleaner champion path or the clearer remit

Quality Bar

Before finalizing the sequence, confirm that:

each ranked prospect has a real reason for its position

channel choice is explained, not implied

follow-up intensity matches evidence strength

weak records are not given overconfident multi-touch plans

stop conditions are explicit

unknowns remain visible instead of being flattened away

the plan would feel reasonable to a human seller working a real week of outbound

Safety

Do not fabricate contact readiness, urgency, or personalization hooks.
Do not create an aggressive cadence when the evidence only supports a light touch.
Do not imply platform ownership, budget authority, or active initiative unless verified.
When evidence is mixed, reduce intensity, shorten the sequence, or hold for research.
