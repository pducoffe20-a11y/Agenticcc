# D2L Sales Command Center

A practical daily operating system for Pat's D2L Brightspace sales workflow. The app is not a generic CRM dashboard: it helps decide what matters today, prep calls, analyze pipeline risk, import prospect/account data, draft review-safe follow-ups, and keep next steps from slipping.

## Quick Start

```bash
npm install
npm run dev
```

Build for Vercel:

```bash
npm run build
```

Vercel settings:

- Build command: `npm run build`
- Output directory: `dist`

## What Works In V1

- Today Command Center with meetings, action accounts, hot triggers, draft review, and highest-priority next actions.
- Meeting Prep Generator with account snapshot, contact angle, value angles, discovery questions, objections, opener, soft ask, and follow-up draft.
- Account Action Board and Account Workspace with contacts, buying committee, tasks, competitors, research gaps, and recommended next action.
- Pipeline Analyzer for CRM-style opportunity risk and next-move review.
- Import Processor for CSV, pasted text, JSON, and CRM/export-style data.
- Follow-Up Builder and Pat Voice Checker.
- Task Manager using Top Priorities, Meeting Prep And Time-Bound Tasks, Follow-Ups And Responses, and If Time Allows.

## Plugin-Informed Design

The app is shaped by the local D2L Codex plugins and the Sales plugin:

- D2L Prospect Strategy: import cleanup, prospect scoring, Work Now / Light Research / Suppress.
- D2L Account Signals: triggers, intent, signal strength, action timing.
- D2L Meeting Deal Ops: meeting prep, daily tasks, debriefs, deal next moves.
- D2L Outreach Messaging: Pat voice, review-safe follow-ups, sequencing.
- D2L Prospect Dashboards: dense seller-ready boards with visible evidence gaps.
- Sales plugin: meeting prep, follow-up packages, account prioritization, pipeline/forecast review, enrichment, and future connector lanes.

V1 does not call live Outlook, Slack, SharePoint, Zoom, or CRM connectors from the browser. It models those as future adapters and supports upload/paste/import now.

## Tests And Screenshots

```bash
npm run test:smoke
```

Playwright captures screenshots under `artifacts/screenshots`. That folder is gitignored.

## Future Integration Hooks

Use `src/data/pluginRegistry.ts` as the source map for future adapters. Use `src/types.ts` for shared contracts and `src/analysis/` for deterministic local analysis. Future connector-backed flows should preserve the same evidence fields, recommendation fields, and draft-only safety rules.
