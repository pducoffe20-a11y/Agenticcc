# Codex Email Schema

Use this when `codex-email-json-bridge` needs a strict downstream payload. Keep the schema stable,
parseable, and conservative enough that a drafting step cannot mistake inference for fact.

## Required Top Level

```json
{
  "generated_at": "ISO-8601 timestamp or null",
  "source_name": "string or null",
  "workflow_stage": "rank_and_draft | revise_existing | sequence_and_draft | research_refresh",
  "records": []
}
```

## Required Record Fields

Each record should include:

- `prospect_id`
- `full_name`
- `title`
- `organization`
- `email`
- `linkedin_url`
- `status`
- `score_total`
- `scores.fit`
- `scores.urgency`
- `scores.persona`
- `scores.evidence`
- `verified_facts`
- `inferred_angles`
- `unknowns`
- `what_to_check_first`
- `codex_email_payload`

## Payload Rules

- Use the same keys for every record.
- Use arrays for repeatable facts, flags, and draft inputs.
- Use `null`, empty arrays, or explicit `"unknown"` values instead of invented data.
- Keep `ready_to_draft` false when a draft would rely on unsupported claims.
- Keep `needs_human_review` true unless Pat explicitly approves a later send-prep step.

## Final Check

Before returning, confirm the JSON parses, every record has the core keys, verified facts and
inference are separate, and any weak evidence is visible in `review_flags`.
