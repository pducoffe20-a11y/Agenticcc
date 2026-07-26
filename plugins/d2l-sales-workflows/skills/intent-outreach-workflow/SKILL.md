---
name: intent-outreach-workflow
description: "Use when Pat asks to review intent alerts, summarize recent alert emails, identify accounts showing buying or research intent, create tailored D2L outreach from intent signals, or focus one account from a recent alert."
---

# Intent Outreach Workflow

Turn intent signals into credible, low-pressure outreach drafts. Do not treat every alert as a
reason to email. The workflow should decide whether the signal is useful, what it might mean, and
how Pat should act.

## Launch Modes

- `recent-alert-review`: summarize and triage recent alert items.
- `latest-alert`: work only from the newest alert supplied or retrieved.
- `single-account-draft`: build outreach for one named account.
- `intent-suppression`: explain why an alert is too weak, stale, or generic to use.
- `sequence-angles`: create a few usable first-touch and follow-up angles.

## Source Intake

Use alert emails, pasted alert text, account names, domains, public context, and any prior D2L
relationship notes. If scanning email, keep the window bounded and return evidence.

## Decision Gates

Classify every alert as:

- `Work Now`: clear account fit and a usable intent angle.
- `Watch`: plausible but missing timing, stakeholder, or pain evidence.
- `Suppress`: noisy, irrelevant, duplicate, or too generic to personalize.

Do not infer active buying from broad content consumption alone. Name the narrowest check that would
increase confidence.

## Outreach Rules

When drafting, keep the message human, specific, short, and low-pressure.
Open with the account's world, not the vendor's product. Include one soft ask and a review flag for
any claim that needs checking.

## Methodology

1. Bound the alert source and time window before triage.
2. Normalize each alert into account, signal, source, date, topic, and confidence.
3. Check account fit and relationship context before treating the signal as actionable.
4. Classify the item as Work Now, Watch, or Suppress using the decision gates.
5. Draft only when the intent signal creates a specific, low-pressure reason to contact now.

## Final Deliverable

Return:

- `intent_summary`: account, signal, source, date/window, confidence.
- `triage`: Work Now / Watch / Suppress with reason.
- `draft`: subject, email body, LinkedIn option if useful.
- `review_flags`: claims to verify, weak assumptions, alternate angles.

If several alerts are reviewed, include a compact `intent_action_plan` that separates contact-now
accounts, watchlist accounts, and suppressed/noisy alerts.
