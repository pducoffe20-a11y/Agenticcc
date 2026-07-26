---
name: feedback-calibration
description: "Use when the user gives keep, suppress, rewrite, approve, reject, or revise feedback on prospects, sequencing, or outreach and the agent should convert that feedback into reusable calibration for future runs. Also use when the task is to compare original versus revised choices, tighten scoring rules, update sequencing preferences, or extract stable outreach preferences without overfitting to one example."
---

# Feedback Calibration

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a0093a503b481919968d660b462f62b
Short description: Learn from keep, suppress, and rewrite feedback

## Instructions

Feedback Calibration
Overview

Use this skill to turn explicit seller feedback into durable calibration that improves future prospect scoring, sequencing, and outreach.

Treat the user's feedback as a signal about decision quality, not as permission to blindly copy one-off choices everywhere. Extract the underlying rule, note its confidence, and apply it conservatively.

Use
Memory to store only reusable patterns with continuing value across future runs.

When To Use

Use this skill when the user does any of the following:

marks prospects to keep, suppress, or deprioritize

rewrites, shortens, softens, or approves outreach drafts

changes sequencing order, first-touch channel, or cadence

explains why a prospect should rank higher or lower

asks the agent to learn their preferences from examples

asks what changed between an original recommendation and a revised one

Do not use this skill for a normal one-off ranking or drafting request unless the user is also giving feedback that should affect future behavior.

Calibration Targets

Convert feedback into one or more of these reusable calibration types:

scoring heuristics

suppression heuristics

sequencing preferences

outreach style preferences

evidence thresholds

research priorities

Only save calibration that is stable enough to matter again.

## Methodology

Identify the feedback unit.

Separate prospect-selection feedback from outreach-writing feedback and sequencing feedback.

Capture the exact keep, suppress, rewrite, reorder, or approval decision.

Determine the underlying rule.

Ask: what principle explains this feedback?

Prefer rules such as "new-role signal matters only when remit is verified" over narrow rules tied to one company or one person.

If the feedback appears one-off or situational, mark it as local context rather than durable calibration.

Classify the rule.

Tag it as scoring, sequencing, outreach, suppression, evidence, or research calibration.

Note whether it should tighten behavior, loosen behavior, or simply reprioritize within the same quality bar.

Estimate confidence.

High confidence: repeated pattern, explicit user principle, or clear rationale that should generalize.

Medium confidence: useful pattern from one strong example that seems likely to recur.

Low confidence: ambiguous or possibly one-off preference; use it lightly and avoid storing it as a strong default.

Update reusable memory conservatively.

Save only the underlying pattern, confidence, and a short justification.

Do not save raw prospect claims, personal data, or one-off scratch notes unless they clearly describe a reusable outbound preference.

Prefer compact structured notes over long narrative memory.

Apply the calibration to the current task.

Re-rank prospects if scoring or suppression changed.

Reorder next actions if sequencing changed.

Revise outreach if tone, claim strength, or CTA preferences changed.

If the new calibration conflicts with older saved patterns, prefer the more recent explicit guidance and note the override.

Explain the effect.

Summarize what the agent learned, what it changed now, and what it will reuse later.

Be explicit about uncertainty when the inferred rule is weak.

What To Store In Memory

Maintain a compact calibration record that captures only reusable patterns such as:

which evidence gaps are acceptable versus disqualifying

what kinds of prospects the user consistently keeps or suppresses

when to tighten or loosen Work Now thresholds

preferred sequencing signals, channels, and cadence intensity

preferred outreach traits such as brevity, softness of CTA, or tolerated inference level

A good stored note includes:

calibration type

inferred rule

confidence

rationale

last reinforced date or recency marker when available

What Not To Store

Do not store:

copied raw prospect lists

speculative claims presented as facts

one-off edits with no likely reuse value

private information that is not needed as a durable preference

broad rules inferred from a single weak example when confidence is low

Decision Rules

When feedback tightens standards, apply the tighter rule first to scoring and suppression before trying to rescue records with creative messaging.

When feedback changes sequencing, preserve the existing quality bar; do not promote weak prospects just because the user changed order among strong ones.

When feedback changes outreach style, separate style preferences from factual constraints. A warmer style does not justify stronger claims.

If a feedback example conflicts with the agent's evidence standard, preserve the evidence standard and describe the tradeoff instead of learning an unsafe shortcut.

## Final Deliverable

When this skill is used, return a concise structured summary with these sections when relevant:

feedback_captured

calibration_updates

applied_changes_now

memory_updates

open_questions

Within those sections, be concrete about:

which decisions were keep / suppress / rewrite / reorder / approve

the reusable rule inferred from each decision

confidence for each inferred rule

what changed in scoring, sequencing, or outreach because of that rule

what was saved for future runs

Example Patterns
Example 1: Keep vs suppress feedback

If the user keeps a recently promoted director with verified remit but suppresses a similar senior title with weak remit evidence, infer a rule like:

verified remit should outweigh title seniority alone

new-role signal is useful only when role relevance is supported

Example 2: Outreach rewrite feedback

If the user rewrites an email to remove assertive pain claims and shorten the close, infer a rule like:

prefer lighter inference language

keep CTA soft and concise

shorten body before removing role-specific relevance

Example 3: Sequencing reorder feedback

If the user moves one prospect earlier because the trigger is fresher and the remit is cleaner, infer a rule like:

fresher, verified trigger evidence should break ties among otherwise similar Work Now records

Quality Bar

Before finishing:

confirm the learned rule is more general than the single example when you plan to reuse it later

separate durable calibration from one-off task context

preserve the agent's conservative evidence standard

avoid overfitting future scoring or outreach to a single anecdote

keep stored calibration compact, clear, and easy to apply in later runs
