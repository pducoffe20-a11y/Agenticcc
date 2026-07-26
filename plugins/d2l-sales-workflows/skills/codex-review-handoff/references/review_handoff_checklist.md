# Review Handoff Checklist

Use this when packaging outreach drafts for human review. The handoff should make the next reviewer
faster and safer, not bury them in commentary.

## Review Layer Fields

```json
{
  "review_status": "needs_review | revise | approved_for_send_prep",
  "reviewer_action": "string",
  "review_flags": [],
  "fact_check_targets": [],
  "revision_requests": [],
  "changed_since_last_draft": []
}
```

## Reviewer Action Patterns

- `verify new-role timing`
- `soften unverified pain statement`
- `approve subject and rewrite opening line`
- `remove unsupported platform claim`
- `confirm customer-story proof point`
- `suppress until remit is clearer`

## Final Check

- The reviewer can tell what to approve, revise, fact-check, or suppress.
- Revision requests are action-oriented.
- Review flags name evidence risk, not generic caution.
- Drafts are not marked approved unless the user explicitly approved them.
- The surrounding JSON remains parseable.
