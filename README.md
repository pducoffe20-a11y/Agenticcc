# D2L Sales Workflows Plugin

A GitHub-ready local Codex plugin containing 20 public-safe D2L sales skills for
research, prioritization, call preparation, deal strategy, outreach, and follow-up.

The public bundle intentionally omits `customer-story-matching`,
`customer-story-matching-legacy`, and `pat-voice` because those SharePoint
skills contain named-customer or named-organization proof points that should not
be copied into a public repository without explicit approval.

## Add to GitHub

1. Extract the ZIP.
2. Create an empty GitHub repository.
3. Upload everything inside this folder, including `.agents`.

## Install in local Codex

Clone the repository, then run:

```bash
codex plugin marketplace add /absolute/path/to/repository
codex plugin add d2l-sales-workflows@personal
```

Use a new Codex thread when testing the installed plugin.
