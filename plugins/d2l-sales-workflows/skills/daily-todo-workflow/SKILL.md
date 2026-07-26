---
name: daily-todo-workflow
description: "Use when Pat asks to build today's sales task list, scan calendar/email/Slack-style work signals, prep meeting-driven actions, catch follow-ups, or separate Pat-owned tasks from prospect-owned and ambiguous items."
---

# Daily To-Do Workflow

Build a seller-ready daily action list from concrete work signals. This is a prioritization and
task-extraction workflow, not a motivational planner.

## Launch Modes

- `daily-plan`: build today's prioritized to-do list.
- `meeting-driven`: focus on today's meetings and required prep/follow-up.
- `follow-up-catch`: surface concrete follow-ups from recent messages.
- `prospect-task-scan`: separate Pat-owned, prospect-owned, and ambiguous sales tasks.
- `suppression-review`: explain what was ignored and why.

## Source Intake

Use Outlook Email first for recent messages when requested, then calendar for yesterday/today when
meeting context matters. Use pasted notes or exports when connectors are unavailable. Keep scans
bounded and evidence-based.

## Task Rules

Only include actionable items with evidence. Separate:

- `Pat-owned`: Pat needs to do something.
- `Prospect-owned`: someone external owes Pat something.
- `Ambiguous`: ownership or action is unclear.
- `Suppressed`: newsletters, vendor noise, internal-only FYIs, weak guesses.

Merge duplicates and preserve due dates when available.

## Methodology

1. Set the exact date window and source scope before scanning.
2. Use Outlook Email first for the recent-message window when requested, then calendar for yesterday
   and today when meeting context matters.
3. Fetch full bodies only for narrowed candidate threads or events that may contain real sales work.
4. Extract action, owner, due date, prospect/account, and evidence for each candidate.
5. Merge duplicates, demote weak guesses to ambiguous, and explicitly suppress newsletters, vendor
   notices, internal FYIs, and noise.

## Final Deliverable

Return:

1. Executive summary.
2. Priority to-do list.
3. Ambiguous / needs confirmation.
4. Suppressed / ignored.

Each priority item should name the owner, action, account/prospect, due date if known, and compact
evidence. Do not send messages, create tasks, or update systems unless explicitly asked.
