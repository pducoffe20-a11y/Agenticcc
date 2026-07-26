---
name: codex-email-json-bridge
description: "Use when the task is to turn ranked prospects, research-backed prospect objects, or draft outreach inputs into strict Codex-ready JSON for email drafting. Also use when the output must be schema-stable, machine-ingestible, easy to scrape, and conservative about evidence."
---

# Codex Email JSON Bridge

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a0165001fc48191a79b2428e249dd7a
Short description: Shape outreach into strict Codex-ready email JSON.

## Instructions

Codex Email JSON Bridge
Overview

Use this skill when the agent's main output needs to be a strict JSON payload that Codex or another downstream automation step can scrape reliably to draft emails.

This skill is for shaping and validating the handoff payload, not for replacing upstream judgment. Keep the existing prospect research, ranking, evidence handling, enrichment, and sequencing work intact. Use those outputs as inputs to the JSON handoff.

When To Use

Use this skill when the user asks for any of the following:

Codex-ready outreach JSON

email drafting payloads for a downstream scraper or drafting pipeline

strict machine-readable email objects rather than seller-facing prose

normalized output that is easy to parse, diff, and review

regeneration of message JSON after research, ranking, sequencing, or feedback updates

## Methodology

Start from the strongest available structured prospect object. Preserve prospect ids, scores, status, evidence notes, and any calibrated preferences that materially affect the email draft.

Carry forward only the fields that the downstream drafting step needs. Remove UI-only narration, long prose explanations, and decorative formatting.

Keep verified facts separate from inferred angles. Never flatten uncertain claims into copy-ready facts.

Build one JSON object per prospect that is stable enough for deterministic scraping.

Prefer explicit nulls, empty arrays, or unknown markers over invented values.

If the prospect does not clear the outreach bar, still return the object when the user asked for a full machine-readable set, but mark it clearly as not ready to draft.

When multiple output layers exist, make the Codex handoff payload the primary artifact and keep any board summary or seller notes secondary.

## Final Deliverable

Return valid JSON only unless the user explicitly asks for commentary around it.

Use a top-level structure shaped like this:

{
  "generated_at": "ISO-8601 timestamp",
  "source_name": "string or null",
  "workflow_stage": "rank_and_draft | revise_existing | sequence_and_draft | research_refresh",
  "records": []
}

Each record should be shaped like this unless the user specifies a different schema:

{
  "prospect_id": "string",
  "full_name": "string | null",
  "title": "string | null",
  "organization": "string | null",
  "email": "string | null",
  "linkedin_url": "string | null",
  "status": "Work Now | Light Research | Suppress",
  "score_total": 0,
  "scores": {
    "fit": 0,
    "urgency": 0,
    "persona": 0,
    "evidence": 0
  },
  "verified_facts": [],
  "inferred_angles": [],
  "unknowns": [],
  "what_to_check_first": [],
  "codex_email_payload": {
    "ready_to_draft": true,
    "draft_goal": "new_outreach | refresh_existing | follow_up",
    "recipient": {
      "name": "string | null",
      "title": "string | null",
      "organization": "string | null",
      "email": "string | null"
    },
    "context": {
      "seller": "Pat Ducoffe",
      "company": "D2L Brightspace",
      "reason_for_reaching_out": "string | null",
      "new_role_signal": "string | null",
      "relevant_customer_story": "string | null"
    },
    "constraints": {
      "tone": ["short", "human", "relevance_first", "not_salesy"],
      "must_use_verified_facts": true,
      "must_label_inference": true,
      "needs_human_review": true
    },
    "draft_inputs": {
      "subject_angle": "string | null",
      "opening_hook": "string | null",
      "pain_hypothesis": "string | null",
      "cta": "string | null"
    },
    "draft_outputs": {
      "subject_line": "string | null",
      "email_body": "string | null"
    },
    "review_flags": [],
    "suppression_reason": "string | null"
  }
}

Schema Rules

Keep field names stable across records in the same response.

Use arrays for repeatable evidence and review flags even when only one item exists.

Do not place seller commentary outside the JSON object unless the user explicitly asks for notes.

Do not mix HTML with the Codex handoff payload unless the user explicitly asks for HTML fields.

If a field is unavailable, keep the key and set a null, empty array, or explicit unknown value.

Escape strings normally and return syntactically valid JSON.

Decision Rules

ready_to_draft should be true only when the prospect clears the outreach bar.

If evidence is partial, keep the record machine-readable but add review flags that tell the human reviewer what is weak.

If the requested draft would rely on an unsupported claim, lower the confidence, preserve the uncertainty, and avoid generating a strong draft output.

Keep the codex payload conservative enough that a downstream drafter cannot mistake inference for fact.

Quality Bar

Before finalizing:

confirm the JSON parses cleanly

confirm every record has the same core keys

confirm verified facts and inferred angles stay separate

confirm the review flags explain why a human should look closely when evidence is thin

confirm the payload is optimized for scraping rather than presentation

Supporting Files

See references/codex_email_schema.md for the compact schema guide and example payload.
