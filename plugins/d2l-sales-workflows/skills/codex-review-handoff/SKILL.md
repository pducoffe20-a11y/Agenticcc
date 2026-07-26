---
name: codex-review-handoff
description: "Use when the task is to package draft emails and their supporting evidence for smooth human review after a Codex-oriented JSON handoff. Also use when the output needs review flags, revision hooks, and a clean before-send checkpoint."
---

# Codex Review Handoff

Source agent: Prospect Strategy Agent (agt_6a0026e720bc8191be930c36ba48b710)
Source skill URL: https://chatgpt.com/agents/studio/edit/agt_6a0026e720bc8191be930c36ba48b710/skills/hsk_6a016502ac688191be77d79879829cab
Short description: Package draft emails for clean human review handoff.

## Instructions

Codex Review Handoff
Overview

Use this skill when the agent has already produced or is about to produce Codex-ready email JSON and the next job is to make that payload easy for a human to review, correct, and approve.

This skill keeps the review layer compact and operational. It does not replace ranking, research, or drafting. It packages the draft so the reviewer can quickly see what is safe, what is uncertain, and what should be revised before any send step.

When To Use

Use this skill when the request involves:

leaving drafts ready for human review

adding review notes, caution flags, or revision instructions to email JSON

packaging draft emails so a downstream Codex or scraper step can be revised safely

comparing updated evidence against an existing draft and marking what changed

preparing a review queue rather than final-send content

## Methodology

Start from the existing prospect object and any available Codex email payload.

Keep the draft content machine-readable.

Add a compact review layer that tells the reviewer what to verify, what changed, and what is safe to keep.

Preserve the distinction between approved facts, inference, and open questions.

When the user supplied feedback on prior drafts, capture revision guidance in fields that can be re-used by a downstream step.

Default to a review-ready package, not a send-ready package.

Default Review Layer

When this skill applies, add a review section like this inside each record or inside each codex_email_payload object:

{
  "review_status": "needs_review | revise | approved_for_send_prep",
  "reviewer_action": "string",
  "review_flags": [],
  "fact_check_targets": [],
  "revision_requests": [],
  "changed_since_last_draft": []
}

Review Rules

Default review_status to needs_review unless the user explicitly indicates the draft is already approved for send preparation.

reviewer_action should be a short, concrete next step such as verify new-role timing, soften unverified pain statement, or approve subject and rewrite opening line.

fact_check_targets should list only the claims that materially affect the draft.

revision_requests should be action-oriented and easy for a downstream step to apply.

changed_since_last_draft should be empty when there is no prior draft to compare.

Keep the review layer compact so it can be scraped just as reliably as the draft itself.

## Final Deliverable

Return JSON that preserves the original Codex handoff fields and adds only the review-specific fields required for a clean checkpoint.

Do not:

convert the output into prose-only review notes

bury the revision requests in long paragraphs

mark a draft as ready when evidence is still too weak for safe outreach

Quality Bar

Before finalizing:

confirm the review layer is machine-readable

confirm each revision request is specific enough to apply

confirm the reviewer can tell exactly what needs checking

confirm the handoff still works as strict JSON for downstream scraping

Supporting Files

See references/review_handoff_checklist.md for the compact review checklist and example fields.
