# Source Agent Catalog

These ChatGPT agents were inspected on July 4, 2026 and converted into Codex-native launchers under
the `d2l-sales-workflows` personal plugin.

| Source Agent | Source ID | Codex Launcher | Original Tagline |
|---|---|---|---|
| Prospect Strategy Agent | `agt_6a0026e720bc8191be930c36ba48b710` | `prospect-strategy-workflow` | Research-first prospect ranking and outreach JSON prep. |
| Sales Assistant | `agt_69f65c3d702081919b45c3999615f58c` | `sales-assistant-workflow` | Build account context and keep deal work moving. |
| Intent Outreach Drafter | `agt_6a4526054ac8819180253dcbb9e63968` | `intent-outreach-workflow` | Turns intent alerts into tailored outreach drafts. |
| Deal Journey Analyzer | `agt_6a037f7125708191b156ef6d000ddc6c` | `deal-journey-workflow` | Analyzes deal signals and recommends next buyer moves. |
| Daily To-Do Planner | `agt_6a24537a73e481918751bc4f243b5591` | `daily-todo-workflow` | Builds a daily task list from your work signals. |
| Net-New Account Identifier Agent | `agt_6a1bd13157ec81918509d9020c9d5ea8` | `net-new-account-workflow` | Finds timely outreach signals for net-new accounts. |
| Association Trigger Agent | `agt_6a1b9f998ef48191b1d2c06fd76fcb4a` | `association-trigger-workflow` | Finds timely outreach triggers for association accounts. |
| Pre-Call Brief Agent | `agt_6a03db0787848191b8e19f51b6aedded` | `pre-call-brief-workflow` | Builds sharper pre-call briefs from meeting context. |
| Post-Call Debrief Agent | `agt_6a03f49c306c819199311f9c1f3e0d03` | `post-call-debrief-workflow` | Turns call transcripts into CRM-ready debriefs. |
| Prospect Dashboard Agent | `agt_6a002758c0e08191bf96185b1115e16b` | `prospect-dashboard-workflow` | Build seller-ready HTML outreach dashboards from prospect data. |
| Seller-Side Sales Assistant | `agt_69ff914f9c708191995f5f9ec0ac63db` | `seller-side-sales-assistant-workflow` | Prioritize HTML prospects and draft careful outreach. |

## Enhancement Pattern

Each Codex launcher adds:

- explicit launch modes
- bounded source intake
- evidence and suppression rules
- explicit methodology sections that describe how to narrow, verify, classify, and hand off work
- stable final-deliverable contracts that name the artifact, field shape, and review/suppression notes
- no autonomous send/update side effects
- a clearer relationship to sibling workflows through `d2l-sales-workflow-index`

## Deliverable Standard

Every skill should make the final artifact obvious before the agent starts producing prose. Prefer
structured outputs with named sections or JSON keys, compact evidence attached to each decision, and
clear treatment of owner, confidence, unknowns, suppression, and next action. When a workflow creates
a file or local artifact, return the artifact path plus QA notes. When it drafts copy, keep it
review-only unless Pat explicitly approves a send/update action.
