# JSON Contracts

Use these contracts for Prospect Strategy workflow outputs. Keep keys stable. Use `null`, empty
arrays, or explicit `"unknown"` values instead of inventing data.

## outreach_preparation_payloads.json

```json
{
  "generated_at": "ISO-8601 timestamp or null",
  "source_name": "string or null",
  "workflow_stage": "rank-prep-json | research-refine | refresh-outreach-json | sequence-work-now | story-match | review-handoff",
  "records": [
    {
      "prospect_id": "string",
      "full_name": "string or null",
      "title": "string or null",
      "organization": "string or null",
      "email": "string or null",
      "linkedin_url": "string or null",
      "category": "Association / member organization | Credentialing / certification / CE | Healthcare / clinical education | Training provider / extended enterprise | Corporate L&D / workforce development | Poor fit / suppress",
      "status": "Work Now | Light Research | Suppress",
      "score_total": 0,
      "scores": {
        "fit": 0,
        "urgency": 0,
        "persona": 0,
        "evidence": 0
      },
      "tenure_months": null,
      "provided_input_facts": [],
      "public_research_facts": [],
      "verified_facts": [],
      "inferred_pains": [],
      "inferred_angles": [],
      "unknowns": [],
      "what_to_check_first": [],
      "evidence_notes": [],
      "matched_customer_story": null,
      "recommended_actions": [],
      "outreach_payload": {
        "ready_to_draft": false,
        "draft_goal": null,
        "recipient": null,
        "context": [],
        "constraints": [],
        "draft_inputs": [],
        "draft_outputs": {
          "subject_line": null,
          "email_body": null
        },
        "review": {
          "review_status": "needs_review",
          "reviewer_action": null,
          "review_flags": [],
          "fact_check_targets": [],
          "revision_requests": [],
          "changed_since_last_draft": []
        },
        "suppression_reason": null
      }
    }
  ]
}
```

## board_summary.json

```json
{
  "title": "string",
  "date_label": "string or null",
  "total_records": 0,
  "work_now_count": 0,
  "light_research_count": 0,
  "suppress_count": 0,
  "key_themes": [],
  "evidence_gaps": [],
  "manager_readout": []
}
```

## sequence_plan.json

```json
{
  "generated_at": "ISO-8601 timestamp or null",
  "sequence_window": "next 7 days or user-provided window",
  "records": [
    {
      "prospect_id": "string",
      "rank": 1,
      "first_touch_channel": "email | linkedin | call | other",
      "sequence_intensity": "priority | light",
      "first_action": "string",
      "follow_up_actions": [],
      "stop_conditions": [],
      "review_flags": []
    }
  ]
}
```

## review_handoff.json

```json
{
  "generated_at": "ISO-8601 timestamp or null",
  "items": [
    {
      "prospect_id": "string",
      "draft_status": "needs_review | revised | approved_by_user",
      "draft": {
        "subject_line": null,
        "email_body": null
      },
      "supporting_evidence": [],
      "claims_to_verify": [],
      "recommended_reviewer_action": "approve | revise | fact-check | suppress",
      "revision_notes": []
    }
  ]
}
```
