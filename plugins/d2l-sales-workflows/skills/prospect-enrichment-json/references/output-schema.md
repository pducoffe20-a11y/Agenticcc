# Prospect Enrichment Output Schema

Use this when `prospect-enrichment-json` needs a stable default output. Preserve unknowns and avoid
promoting weak evidence into confident fields.

## Top Level

```json
{
  "generated_at": "ISO-8601 timestamp or null",
  "source_name": "string or null",
  "records": [],
  "board_summary": {}
}
```

## Record Fields

```json
{
  "prospect_id": "string",
  "full_name": "string or null",
  "title": "string or null",
  "organization": "string or null",
  "email": "string or null",
  "linkedin_url": "string or null",
  "category": "string or null",
  "status": "Work Now | Light Research | Suppress",
  "score_total": 0,
  "scores": {
    "fit": 0,
    "urgency": 0,
    "persona": 0,
    "evidence": 0
  },
  "tenure_months": null,
  "verified_facts": [],
  "inferred_pains": [],
  "unknowns": [],
  "what_to_check_first": [],
  "evidence_notes": [],
  "suppress_reason": null,
  "recommended_actions": [],
  "message_variants": []
}
```

## Board Summary

Include total counts, Work Now / Light Research / Suppress counts, common themes, evidence gaps, and
recommended next checks. Keep message variants empty unless the record clears the outreach bar or
the user explicitly asks for drafts.
