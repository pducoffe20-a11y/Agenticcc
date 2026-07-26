---
name: prospect-dashboard-workflow
description: "Use when Pat asks to turn prospect strategy files or JSON into a seller-ready dashboard, review board gaps, apply branding, build an HTML prospect board, QA dashboard inputs, or create a local visual artifact for reviewing outreach targets."
---

# Prospect Dashboard Workflow

Build practical prospect dashboards from structured prospect data. This workflow is about reviewing
and acting on prospects, not making decorative pages.

## Launch Modes

- `build-dashboard`: create a local HTML or app-style prospect board.
- `input-audit`: inspect strategy files or JSON for missing/weak data.
- `board-gap-review`: flag evidence, scoring, or draft readiness gaps.
- `brand-apply`: apply a title, visual cues, and restrained D2L seller styling.
- `qa-dashboard`: verify counts, filters, labels, and text fit.

## Source Intake

Use `outreach_preparation_payloads.json`, prospect CSV/XLSX files, board summaries, pasted JSON,
or prior Prospect Strategy outputs. Prefer structured data. If the input is messy, run an audit
before building.

## Dashboard Requirements

Prioritize:

- dense scan-friendly layout
- Work Now / Light Research / Suppress filters
- score and evidence visibility
- next action and review flags
- easy comparison across prospects
- no marketing-style hero page

If building a local frontend, follow existing repo patterns and verify rendering.

## Methodology

1. Audit the source data before building: counts, statuses, required fields, duplicate records, and
   evidence gaps.
2. Normalize the data only enough to make the board trustworthy and traceable.
3. Choose the lightest useful artifact: input audit, gap report, HTML board, or app-style dashboard.
4. Build for repeated seller scanning: filters, scores, evidence, next action, and review flags.
5. QA counts, filters, labels, text fit, and any local artifact path before returning.

## Final Deliverable

Return or create:

- `dashboard_source_summary`
- `data_quality_flags`
- `dashboard_build_notes`
- local artifact path when a file/app is created
- QA notes with any limitations

Do not hide missing evidence behind polished visuals.
