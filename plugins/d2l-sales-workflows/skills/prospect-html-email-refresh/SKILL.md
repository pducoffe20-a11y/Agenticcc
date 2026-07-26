---
name: prospect-html-email-refresh
description: "Use when Pat wants to refresh prospect email HTML or message fields from new seller insights, corrections, feedback, or verified evidence updates; also use when deciding whether HTML is the right final output."
---

# prospect-html-email-refresh

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a009e3213888191814fc6fbc3b5b274
Short description: Refresh prospect email HTML from new seller insight.

## Instructions

Prospect Html Email Refresh
Overview

Use this skill after prospect decisions or first-pass outreach already exist and Pat wants to add insight, correct an angle, tighten claims, or regenerate final email HTML.

Treat HTML as the rendering layer, not the source of truth. Rebuild the underlying message fields first, then decide whether HTML should also be updated.

Request Shapes

Use this skill for requests like:

"Refresh these final email cards with this new insight from Pat."

"Keep the same HTML shell, but soften the claims and update the affected prospects only."

"Here is feedback on the outreach. Revise the messages and tell me whether the HTML should change or whether structured fields are enough."

Success means the output:

identifies the strongest current source of truth correctly

maps new input into the right contract bucket before revising copy

follows the safe refresh pattern in order

updates the underlying subject and email copy before any HTML rewrite

refreshes only the affected HTML sections when HTML is actually needed

returns a compact change summary that explains what changed and why

Contract Buckets

Before rewriting anything, classify each new input into one or more of these buckets:

fact_update: role correction, organization correction, new proof point, recency update, or another factual correction

message_direction: a requested angle such as credentialing, member education, CE, workforce training, or another positioning emphasis

tone_preference: shorter, warmer, softer, more direct, less salesy, or similar style guidance

risk_reduction: remove assumptions, soften urgency, avoid unverified tool or budget claims, or reduce overclaiming

rendering_request: update final HTML, update one section only, or skip HTML

If one note fits multiple buckets, let factual corrections win first, then let direction and tone shape the surviving message.

Do not keep these buckets implicit. Name them in your working logic so the revision path stays conservative and explainable.

Safe Refresh Pattern

Use this sequence by default:

restate the affected prospect or segment

restate the new insight in one line

decide whether the insight changes evidence, angle, or only tone

rewrite the plain-language subject and email body

re-check whether the prospect still qualifies for Work Now

update the final HTML only if it remains relevant

Do not skip directly to HTML edits unless the request is explicitly limited to rendering-only cleanup and the underlying message fields are still valid.

## Methodology

Identify the strongest current source of truth for each affected prospect.

Map each new instruction into the contract buckets before revising copy.

Follow the safe refresh pattern in order.

Re-evaluate whether the prospect still clears the outreach bar.

Update only the relevant final HTML blocks if HTML output is still useful.

Return a compact change summary that explains what changed and why.

Source Of Truth Order

Use this precedence order:

direct user correction of a factual detail

structured verified facts in the current prospect record

recent approved outreach copy

batch-level summary context

older HTML wording

Do not let older HTML wording overrule newer evidence or direct user guidance.

Use the strongest available source. Do not require every input if the task can be completed conservatively without it.

If multiple sources conflict, resolve them conservatively and say which newer input overrode the older wording.

Decision Rules

Regenerate final HTML only when at least one of these is true:

the user explicitly asks for updated HTML

an existing HTML artifact already contains the outreach being revised

the workflow clearly needs a final seller-facing HTML deliverable

Do not force HTML when the real need is message revision only. In that case, return updated message fields and state that HTML was not necessary.

If the new insight weakens confidence, reduce claim strength or move the prospect to Light Research instead of polishing a weak message.

If the new input changes only one part of the message, do not rewrite unrelated sections just to make the output feel fresh.

Do not regenerate every prospect's HTML when the user commented on only a subset of names.

Interaction Model

Treat Pat's follow-up inputs as actionable edits, not casual commentary.

Common forms include:

keep or suppress instructions

new pain angle ideas

corrections to role, remit, or organization context

requests to make the note shorter, softer, warmer, or less salesy

requests to mention a specific proof point

requests to remove unsupported assumptions

When the input is ambiguous, make the smallest safe change that honors the direction.

When the user mixes factual corrections with style preferences, apply the factual correction first and then restyle the surviving message.

Writing Rules

When rewriting email content:

use pat-voice for final tone

use cold-email when the task includes subject lines, first-touch email structure, or follow-up sequence quality

keep verified facts separate from plausible inference

preserve soft CTAs

avoid making HTML look more certain than the evidence supports

Board summaries can inform batch-level emphasis, but they do not count as prospect-specific proof.

Do not treat a board-level theme as if it proves an individual prospect's pain.
Do not infer new-role urgency if tenure is still unknown.

If the message no longer has enough verified support for a tailored claim, either soften the copy materially or move the prospect out of Work Now.

HTML Update Rules

Preserve the existing HTML shell, styling hooks, and non-message layout unless the user asks for a broader redesign.

Update only the content blocks that changed:

subject line display

preview or opener text

email body copy

proof point row

CTA row

status or evidence note if the artifact includes one

If the artifact mixes multiple prospects, update only the touched prospects and leave the rest alone.

If no prior HTML file exists, return the updated message content in structured form first. Generate new HTML only when the user asks for it or when the workflow clearly ends in an HTML deliverable.

Before returning updated HTML, check for stale unsupported claims elsewhere in the same affected block so the HTML does not silently preserve outdated certainty.

Do not expand the task into a full redesign unless the user asked for that.

## Final Deliverable

Return the lightest output that fits the request.

For message-only refreshes, return:

affected prospect ids or names

what changed

updated email subject

updated email draft

whether HTML regeneration is recommended

For HTML refreshes, return:

affected prospect ids or names

what changed

updated underlying message fields

updated HTML artifact or updated HTML sections

any prospect moved out of Work Now because the new input lowered confidence

Always include a compact change summary that states:

which new input drove the change

which contract bucket or buckets drove the revision

whether the change was evidence-driven, direction-driven, tone-driven, risk-reducing, or a rendering-only request

whether confidence increased, decreased, or stayed flat

whether the HTML was refreshed, partially refreshed, or intentionally skipped

Supporting Files

references/refresh-contract.md: Read this when you need the expected input shapes, priority rules, bucket definitions, safe refresh pattern, or example prompts for message-only versus HTML-refresh requests.

Quality Check

Before finalizing:

confirm that every changed sentence is supported by verified facts or clearly softer inference

confirm that user-added insight actually changed the message and was not ignored

confirm that HTML-only edits did not leave old unsupported claims elsewhere in the artifact

confirm that the updated message still sounds like Pat

confirm that uncertain records were not polished into false confidence

If any affected prospect no longer clears the outreach bar, say so directly and return the safer revised status instead of over-optimizing the copy.
