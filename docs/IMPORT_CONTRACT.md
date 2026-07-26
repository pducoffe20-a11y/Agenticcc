# Import Expert Contract

`ImportPackage` schema version `1.0` is created entirely in browser memory. Supported inputs are CSV,
XLSX, JSON arrays, TXT key/value blocks, and pasted text. Limits are 5 MiB per file, 5,000 rows, and
10 workbook sheets; one file is accepted at a time in this release.

Profiles are Prospects / Contacts, Accounts / Organizations, Opportunities / Pipeline, Meetings /
Call Notes, Activity / Outreach History, and Generic Structured Data. Each profile defines required
and optional fields, aliases, identity precedence, and compatible agents in the pure TypeScript
profile registry. Suggested mappings do nothing until confirmed.

The package contains local source metadata, confirmed mapping, normalized accepted records,
row-isolated rejections, deterministic duplicates and canonical references, warnings, evidence,
unknowns, quality counts, recommendations, and a transformation log. Empty values remain unknown;
no values are invented. Imported strings—including instruction-like strings—remain inert data.
Diagnostics contain row references and reasons rather than private row values.

The earliest valid record wins a duplicate identity match. Counts reconcile as source rows = accepted
+ rejected + duplicates. JSON export is a lossless round trip. Cleaned CSV is deferred because generic
profiles can contain nested values whose flattening policy needs a separate design decision.

The synthetic workbook fixture is committed as Base64 text so repository and PR transports remain
text-only. The browser test decodes it into Playwright's temporary output directory before upload;
the generated `.xlsx` file is never committed.
