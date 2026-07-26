# Agent Launchpad and Import Expert — Approved Design

**Status:** Approved on 2026-07-26  
**Scope:** Local-first discovery, import preparation, and honest Codex launch-package export

## Product boundary

The dashboard is a seller operating console for discovering every registered agent and skill,
preparing inputs, and exporting a reviewable Codex prompt plus a machine-readable launch request.
It has no backend, authentication, verified Codex runtime, connector calls, or external-write path.
The words **Run agent** are therefore not used. The always-available adapter copies prompts and
downloads validated packages; runtime and connector adapters remain disabled metadata boundaries.

Imported values stay in browser memory. Local history is opt-in and contains only launch metadata
and generated prompts, never imported rows. Browser storage is not represented as enterprise-secure
storage. All committed fixtures are synthetic.

## Information architecture

The persistent shell has Launchpad, Import Expert, Skill Library, and Review / History surfaces,
plus global search. Agent and skill selections open a Run Builder drawer. Import recommendations
attach the completed ImportPackage to that same builder. Recipes remain editable, inspectable
sequences and are never executed automatically.

### Launchpad

The primary screen answers: what tool should I use, what does it need, and what will happen? It
features a Start Here task selector, one recommended recipe, registry-backed agent groups, and
recent opt-in local launch metadata. Agent presentation alternates between a featured orchestration
card and compact comparison rows rather than an undifferentiated card wall.

Groups are Today / Orchestration, Research and Prioritization, Meetings and Deals, Outreach and
Follow-Up, Data / Import / Reporting, and Review and Quality.

### Import Expert

The guided flow is Add data → Choose source → Confirm profile → Map fields → Review quality →
Route and export. It accepts CSV, XLSX, JSON, TXT, and pasted text. Limits are 5 MiB per file,
5,000 data rows, and 10 inspected workbook sheets. One file is accepted unless a selected catalog
mode explicitly permits multiple files.

Mapping suggestions remain visibly unconfirmed until the user confirms them. Normalization never
invents missing values. Validation isolates bad rows, deterministic deduplication keeps the earliest
valid row for a documented identity key, and accepted/rejected/duplicate counts reconcile with the
source row count. Prompt-like content is inert string data.

Profiles cover prospects, accounts, opportunities, meetings, activities, and generic structured
data. Recommendations use only the confirmed profile, mapped fields, and stated goal.

### Skill Library

Every active row in `registry/skills.csv` appears through a generated artifact. Search and filters
cover category, connector posture, and approval boundary. A detail drawer shows exact output,
launcher relationships, and the truthful export action.

### Run Builder

The responsive right drawer (full-screen sheet on narrow viewports) combines selection, mode, user
goal, attached ImportPackages, connector requirements, fallback, expected output, and approval
boundary. It previews the exact prompt and versioned LaunchRequest. Invalid requests cannot export.
The footer exposes Copy prompt and Download payload, plus an optional Save metadata locally choice.

## Visual and interaction direction

The interface uses a warm neutral canvas, dark ink, white work surfaces, restrained blue/teal
navigation cues, amber approval warnings, and red only for blocking/rejection. System sans-serif,
tabular counts, compact tables, generous panel spacing, and direct language create a seller console
rather than a marketing page. No gradients, fake metrics, protected brand assets, or simulated
agent activity are used.

Semantic landmarks, ordered headings, visible focus, focus restoration, keyboard alternatives to
drag/drop, live import announcements, accessible tables, text-plus-icon statuses, 44px mobile
targets, sufficient contrast, and reduced-motion styles are required. Desktop uses a persistent
left rail and drawer; mobile uses a compact navigation row and full-screen builder.

## Architecture

`registry/agents.json` is authoritative for agents and `registry/skills.csv` remains authoritative
for skills. A deterministic Node generator validates both sources and selected skill frontmatter,
then writes frontend-safe JSON. React never parses Markdown and contains no duplicate catalog.

Pure TypeScript modules own profile definitions, parsing, confirmed mappings, normalization,
validation, deduplication, ImportPackage creation, recommendations, prompt construction,
LaunchRequest validation, and launch adapters. React owns only interaction and presentation.

The existing Prospect Review MVP's evidence, inference, unknown, validation, and review concepts
are retained as design foundations inside Import Expert; the former single-purpose screen is
replaced by the connected command center.

## Self-review

- All 11 agents and all active skills have one authoritative metadata path.
- Missing connectors have useful fallbacks and never appear available.
- No runtime action is implied; export is the product action.
- Imported rows are in-memory by default and absent from saved history and diagnostics.
- Approval metadata is visible in cards, prompts, and packages without becoming authorization.
- The design supports desktop and mobile core flows without hiding validation or safety details.

