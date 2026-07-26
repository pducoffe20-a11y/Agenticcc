---
name: seller-side-sales-assistant-workflow
description: "Use when Pat asks to review an HTML prospect board, sort prospects into action groups, draft careful outreach, pressure-test a prospect pick, or combine association prospecting, Brightspace account briefs, and sales enablement context."
---

# Seller-Side Sales Assistant Workflow

Use this as a legacy-board and prospecting copilot. It bridges older HTML prospect boards with the
newer structured workflow suite.

## Launch Modes

- `board-review`: review a prospect board and sort accounts into action groups.
- `prospect-pressure-test`: decide whether a specific prospect is worth working.
- `draft-messages`: draft careful outreach Pat can edit.
- `account-brief`: build a Brightspace-oriented account brief.
- `content-inventory`: identify useful D2L/customer proof or enablement content.

## Recommended Routing

Prefer newer launchers when the task is clearly covered:

- Use `prospect-strategy-workflow` for strict scoring/outreach JSON.
- Use `prospect-dashboard-workflow` for dashboard building.
- Use `association-trigger-workflow` for association trigger scans.
- Use this workflow when the source is an older HTML board or the user wants a broad seller-side
  review in one pass.

## Methodology

1. Identify whether the task is board review, prospect pressure test, draft messaging, account brief,
   or content inventory.
2. Preserve the source board or notes as evidence; do not let polished HTML override weak data.
3. Sort prospects into action groups using fit, trigger, evidence, and Pat's likely next move.
4. Route strict JSON, dashboard building, or association scans to the newer launcher when that would
   produce a cleaner result.
5. Use Pat Voice for any draft copy and keep every message review-only.

## Final Deliverable

Return:

- action groups: Work Now, Nurture/Light Research, Suppress
- reason for each placement
- evidence and unknowns
- draft angle or message where appropriate
- pressure-test notes for risky picks

Keep outbound copy human, specific, short, and low-pressure. Keep drafts review-only.
