# Prospect Review MVP — Design Proposal

**Status:** Proposed; implementation is blocked on product approval  
**Scope:** One local, public-safe vertical slice from file intake to a human review queue  
**Primary user:** Senior Account Executive conducting a daily prospect review

## Product decision

Build a local-first React application backed by a small TypeScript domain layer. The first slice
will process a user-selected CSV or JSON file entirely in the browser and keep the resulting review
session in memory. This is the smallest coherent production-shaped boundary: it demonstrates the
whole workflow without introducing authentication, cloud storage, connectors, or an external-write
path before those systems have explicit requirements.

The application will ship with synthetic fixtures and a **Load sample** action, so a clean clone is
usable without credentials. Uploaded records will not be written to the repository, logged, or
sent to a service.

## Primary screen concept

The interface is a dense seller control center, not a marketing page:

```text
┌ Prospect Review ─ Session: synthetic-prospects.csv ─ External actions disabled ┐
│ [Upload CSV/JSON] [Load sample]  Accepted 6  Rejected 2  Duplicates 1          │
├ Queue / filters ───────────┬ Prospect evidence and decision ────────────────────┤
│ Work Now (2)               │ Avery Chen · Northstar Skills Cooperative  82      │
│ Light Research (3)         │ Classification: Work Now                           │
│ Suppress (1)               │ Why: Fit 24 · Urgency 18 · Persona 22 · Evidence 18│
│ Rejected (2)               │                                                     │
│                            │ VERIFIED       INFERRED       UNKNOWNS              │
│ ● Avery Chen          82   │ sourced facts  labeled angles missing evidence      │
│ ○ Morgan Lee          71   │                                                     │
│ ○ Jordan Reyes        54   ├ Draft review ───────────────────────────────────────┤
│                            │ subject / body / claim-to-evidence checks            │
│                            │ [Request changes] [Approve for prep] [Reject]        │
├ Intake report ─────────────┴ Audit trail ─────────────────────────────────────────┤
│ row outcomes and reasons     normalized → deduplicated → scored → drafted → review│
└───────────────────────────────────────────────────────────────────────────────────┘
```

Desktop uses a queue/detail split; narrow screens stack the selected prospect beneath the queue.
Every status uses both text and color. The persistent **External actions disabled** notice and the
absence of a send control make the safety boundary visible.

## Small design system

- **Typography:** system sans-serif; tabular numerals for scores and counts.
- **Palette:** neutral ink and warm canvas, blue for verified evidence, amber for inference, gray
  for unknown, green for Work Now, gold for Light Research, and red for rejected/suppressed states.
- **Spacing:** 4 px base scale; compact 8/12/16 px control and panel spacing.
- **Components:** status badge, metric tile, filter chip, evidence item, score breakdown, review
  action group, validation row, and audit event.
- **Accessibility:** semantic landmarks, keyboard-operable controls, visible focus, associated
  upload labels, non-color state cues, and live announcements for file-processing results.

## User flow

1. The user loads the bundled sample or chooses one `.csv` or `.json` file.
2. Intake parses rows, normalizes supported fields, validates them, and reports accepted,
   rejected, and duplicate rows with stable row references and reasons.
3. The deterministic pipeline creates evidence, inference, and unknown buckets without research.
4. Rules calculate four component scores and one classification, each with an explanation.
5. Eligible records receive a deterministic structured draft assembled only from allowed facts and
   explicitly labeled inference. Each factual draft claim records supporting evidence IDs; an
   unsupported claim becomes a review flag rather than a fact.
6. The reviewer can request changes, approve for send preparation, or reject/suppress. These are
   local workflow-state transitions only.
7. An append-only session audit list records inputs, rule versions, transitions, and timestamps.

## Deterministic domain model

### Intake

Supported input fields are `prospect_id`, `full_name`, `title`, `organization`, `email`,
`organization_domain`, `source_url`, `source_observed_at`, and `provided_note`. Header aliases will
be documented and deliberately small.

- Required: a stable identity consisting of `prospect_id`, or the combination of full name and
  organization.
- Validation rejects malformed JSON, unsupported top-level shapes, invalid emails/URLs/dates, and
  rows without stable identity.
- Deduplication first matches normalized `prospect_id`, then normalized email, then the normalized
  full-name plus organization pair. The earliest valid row is canonical; later matches are reported
  with the chosen key and canonical row reference.
- Normalization trims strings, maps empty strings to `null`, lowercases email/domain values, and
  preserves the source row number. It never invents missing values.

### Evidence

Every evidence item has an ID, field, value, source kind, source label, observed date, and source
reference. Uploaded values are **provided evidence**, not independently verified public research.
The UI will label that distinction. Inferred angles reference the evidence IDs that motivated them
and carry an explicit `inference` label. Missing decision inputs remain in `unknowns`.

### Classification and scoring

Scoring uses a versioned pure function with integer components totaling 100:

- **Fit (0–30):** organization/category signals available in the supplied record.
- **Urgency (0–25):** time-bound or initiative signals explicitly present in supplied evidence.
- **Persona (0–25):** title-to-learning-remit rules, treated as role fit rather than buying authority.
- **Evidence (0–20):** identity completeness, traceable sources, and key-field coverage.

Initial bands follow the existing workflow: 80–100 `Work Now`, 60–79 `Light Research`, 40–59
`Light Research` with a low-confidence flag, and 0–39 `Suppress`. Hard suppression rules (duplicate,
invalid, explicit opt-out, or clearly poor fit) override the numeric band and are shown in the
explanation. No model output can modify scores, status, or authorization.

### Draft and review state

Drafts use `subject_line`, `email_body`, `claims`, `evidence_used`, `claims_to_verify`, and
`revision_notes`. A claim is either linked to one or more evidence IDs or flagged for review.

Allowed transitions are:

```text
needs_review → changes_requested → needs_review
needs_review → approved_for_send_prep
needs_review → rejected
any non-rejected review state → suppressed
```

`approved_for_send_prep` explicitly does not mean approved to send. There is no external-action
adapter in this slice. If a future interface is required during implementation, it will return a
typed denial for every call and have a test proving execution is impossible.

## Architecture and repository shape

The proposed implementation will add:

```text
app/                         React/Vite application shell and UI
app/src/domain/              parser, normalization, dedupe, evidence, scoring, review state
app/src/components/          control-center components
app/src/fixtures/            synthetic CSV and JSON samples
app/src/**/*.test.ts(x)      domain and interaction tests
app/e2e/                     primary flow and safety-boundary browser tests
docs/                        input contract and operator notes
```

The domain layer will have no React dependency, enabling fast deterministic tests. No Insforge
project, schema, migration, RLS policy, or SDK integration is proposed for this local-first slice;
adding a backend now would expand risk without supporting the approved MVP outcome. A later adapter
can persist the same versioned session model after authentication, retention, and RLS requirements
are approved.

## Failure paths

- File type/size errors leave the current session unchanged and provide an actionable message.
- Parse failures identify the format problem without echoing full uploaded records.
- Row failures are isolated; valid rows continue through the pipeline.
- A record without enough evidence remains `Light Research` or `Suppress` and does not receive an
  evidence-presented-as-fact draft.
- Review transition errors are rejected by the state machine and recorded without changing state.
- Refreshing clears uploaded runtime data because the MVP intentionally has no persistence.

## Verification plan

Deterministic tests will cover CSV and JSON happy paths, malformed inputs, ambiguous headers,
missing identity, duplicate precedence, evidence provenance, score boundaries, hard suppression,
unsupported draft claims, every allowed/rejected review transition, and the no-external-action
boundary. UI tests will cover upload/sample selection, count reconciliation, filters, detail
inspection, review actions, audit visibility, keyboard navigation, and narrow-screen layout.

Required repository checks remain:

```bash
npm test
npm run quality
npm run eval:workflows
```

The live workflow evaluation will be reported as unavailable if `OPENAI_API_KEY` is absent. Browser
verification will use Playwright because the requested Browser plugin is not available in this
session. A screenshot will be captured after implementation because the change will be perceptible.

## Acceptance criteria

- A clean clone can install, run, and load a synthetic sample without credentials.
- CSV and JSON produce deterministic, reconcilable intake outcomes.
- Verified/provided evidence, inference, and unknowns are visually and structurally distinct.
- Scores and classifications are reproducible and explained by versioned rules.
- Draft factual claims are evidence-linked or visibly flagged.
- Review actions update only local state and appear in an audit trail.
- No send, CRM, calendar, task, connector, network-write, or external execution path exists.
- Static, domain, component, and end-to-end tests pass; live eval status is honestly reported.

## Decisions requested before implementation

Approval of this proposal also approves these defaults:

1. **Local-first, in-memory MVP** instead of an Insforge backend.
2. **One dense queue/detail control-center screen** instead of a multi-page application.
3. **Deterministic template drafting** instead of introducing an OpenAI API dependency.
4. **The initial scoring weights and bands above**, versioned so they can be calibrated later.

Implementation should begin only after explicit approval, with requested adjustments incorporated
into the concrete implementation plan.
