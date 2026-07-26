# Refresh Contract

Use this when revising prospect outreach or final HTML from new seller input.

## Input Buckets

- `fact_update`: role, organization, timing, source, proof point, or other factual correction.
- `message_direction`: new angle, use case, pain focus, or positioning emphasis.
- `tone_preference`: shorter, warmer, softer, more direct, less salesy.
- `risk_reduction`: remove assumptions, soften claims, or downgrade unsupported confidence.
- `rendering_request`: update HTML, update one block, or skip HTML.

Factual corrections win before tone or direction. Rendering should never override source truth.

## Safe Refresh Pattern

1. Identify affected prospects or segments.
2. Restate the new input in one line.
3. Classify the input into buckets.
4. Decide whether confidence increased, decreased, or stayed flat.
5. Revise subject/body fields first.
6. Refresh HTML only when it remains the right deliverable.
7. Return what changed and why.

## Final Output

For message-only refreshes, return affected records, changed fields, updated subject/body, confidence
impact, and whether HTML should be regenerated. For HTML refreshes, return the updated sections or
artifact path, plus any status changes or stale claims removed.
