export type Status = 'Work Now' | 'Light Research' | 'Suppress';
export type ReviewStatus = 'needs_review' | 'changes_requested' | 'approved_for_send_prep' | 'rejected' | 'suppressed';

export interface Evidence { id: string; field: string; value: string; sourceKind: 'provided'; sourceLabel: string; observedAt: string | null; sourceRef: string }
export interface Prospect {
  id: string; row: number; fullName: string; title: string | null; organization: string; email: string | null;
  note: string | null; evidence: Evidence[]; inferredAngles: string[]; unknowns: string[];
  scores: { fit: number; urgency: number; persona: number; evidence: number; total: number };
  status: Status; explanation: string[]; reviewStatus: ReviewStatus; revisionRequest: string;
  draft: { subject: string; body: string; claims: { text: string; evidenceIds: string[] }[]; flags: string[] } | null;
}
export interface Rejection { row: number; reasons: string[] }
export interface Duplicate { row: number; canonicalRow: number; key: string }
export interface Session { sourceName: string; accepted: Prospect[]; rejected: Rejection[]; duplicates: Duplicate[]; audit: string[] }

const aliases: Record<string, string> = { name: 'full_name', company: 'organization', domain: 'organization_domain', note: 'provided_note' };
const clean = (value: unknown) => typeof value === 'string' && value.trim() ? value.trim() : null;

export function parseCsv(text: string): Record<string, unknown>[] {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new Error('CSV must include a header and at least one data row.');
  const parseLine = (line: string) => {
    const out: string[] = []; let value = ''; let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"' && quoted && line[i + 1] === '"') { value += '"'; i += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === ',' && !quoted) { out.push(value); value = ''; }
      else value += char;
    }
    if (quoted) throw new Error('CSV contains an unclosed quoted value.');
    out.push(value); return out;
  };
  const headers = parseLine(lines[0]).map((header) => aliases[header.trim().toLowerCase()] ?? header.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) throw new Error('CSV contains ambiguous duplicate headers.');
  return lines.slice(1).map((line) => Object.fromEntries(headers.map((header, index) => [header, parseLine(line)[index] ?? ''])));
}

export function parseInput(text: string, kind: 'csv' | 'json'): Record<string, unknown>[] {
  if (kind === 'csv') return parseCsv(text);
  const value: unknown = JSON.parse(text);
  const rows = Array.isArray(value) ? value : value && typeof value === 'object' && Array.isArray((value as { records?: unknown }).records) ? (value as { records: unknown[] }).records : null;
  if (!rows || !rows.every((row) => row && typeof row === 'object' && !Array.isArray(row))) throw new Error('JSON must be an array of records or an object with a records array.');
  return rows as Record<string, unknown>[];
}

function score(title: string | null, note: string | null, evidenceCount: number) {
  const haystack = `${title ?? ''} ${note ?? ''}`.toLowerCase();
  const fit = /learning|education|training|talent|enablement/.test(haystack) ? 27 : /member|workforce|people/.test(haystack) ? 19 : 10;
  const urgency = /review|refresh|launch|this (quarter|year)|currently|now/.test(haystack) ? 21 : note ? 10 : 3;
  const normalizedTitle = (title ?? '').toLowerCase();
  const persona = /vp|vice president|chief|director|head/.test(normalizedTitle) ? 23 : /manager|lead/.test(normalizedTitle) ? 16 : 8;
  const evidence = Math.min(20, evidenceCount * 3 + 5);
  return { fit, urgency, persona, evidence, total: fit + urgency + persona + evidence };
}

export function buildSession(rows: Record<string, unknown>[], sourceName: string): Session {
  const accepted: Prospect[] = []; const rejected: Rejection[] = []; const duplicates: Duplicate[] = []; const seen = new Map<string, number>();
  rows.forEach((raw, index) => {
    const row = index + 2; const fullName = clean(raw.full_name ?? raw.name); const organization = clean(raw.organization ?? raw.company);
    const id = clean(raw.prospect_id); const email = clean(raw.email)?.toLowerCase() ?? null; const title = clean(raw.title); const note = clean(raw.provided_note ?? raw.note);
    const reasons: string[] = [];
    if (!id && (!fullName || !organization)) reasons.push('Missing stable identity: provide prospect_id or full_name and organization.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) reasons.push('Email address is invalid.');
    if (reasons.length) { rejected.push({ row, reasons }); return; }
    const key = id ? `id:${id.toLowerCase()}` : email ? `email:${email}` : `person:${fullName!.toLowerCase()}|${organization!.toLowerCase()}`;
    if (seen.has(key)) { duplicates.push({ row, canonicalRow: seen.get(key)!, key }); return; }
    seen.set(key, row);
    const values = { full_name: fullName!, title, organization: organization!, email, provided_note: note };
    const evidence = Object.entries(values).filter(([, value]) => value).map(([field, value], evidenceIndex) => ({ id: `row-${row}-e${evidenceIndex + 1}`, field, value: value!, sourceKind: 'provided' as const, sourceLabel: sourceName, observedAt: clean(raw.source_observed_at), sourceRef: `row ${row}` }));
    const scores = score(title, note, evidence.length + (id ? 1 : 0));
    const status: Status = scores.total >= 80 ? 'Work Now' : scores.total >= 40 ? 'Light Research' : 'Suppress';
    const unknowns = ['buying authority', 'budget', 'current learning platform', 'decision timeline'].filter((item) => !note?.toLowerCase().includes(item));
    const inferredAngles = /onboarding/.test(note?.toLowerCase() ?? '') ? ['Inference: simplifying learner onboarding may be relevant.'] : ['Inference: learning operations may be a relevant discovery area.'];
    const claims = [{ text: `${fullName} leads learning-related work at ${organization}.`, evidenceIds: evidence.filter((item) => ['full_name', 'title', 'organization'].includes(item.field)).map((item) => item.id) }];
    const draft = status === 'Suppress' ? null : { subject: 'learning priorities', body: `Hi ${fullName!.split(' ')[0]},\n\nYour work at ${organization} caught my attention. Would exploring a simpler approach to learning delivery be useful?`, claims, flags: title ? [] : ['Role is missing; verify recipient relevance before approval.'] };
    accepted.push({ id: id ?? `row-${row}`, row, fullName: fullName!, title, organization: organization!, email, note, evidence, inferredAngles, unknowns, scores, status, explanation: [`Fit ${scores.fit}/30 from supplied organization and role signals.`, `Urgency ${scores.urgency}/25 from supplied note signals.`, `Persona ${scores.persona}/25 from title rules.`, `Evidence ${scores.evidence}/20 from traceable field coverage.`], reviewStatus: 'needs_review', revisionRequest: '', draft });
  });
  return { sourceName, accepted, rejected, duplicates, audit: [`Loaded ${rows.length} rows from ${sourceName}.`, `Normalized ${accepted.length} accepted records; rejected ${rejected.length}; duplicates ${duplicates.length}.`, 'Applied scoring rules v1 and deterministic draft rules v1.'] };
}

export function transition(prospect: Prospect, next: ReviewStatus, request = ''): Prospect {
  const allowed: Record<ReviewStatus, ReviewStatus[]> = { needs_review: ['changes_requested', 'approved_for_send_prep', 'rejected', 'suppressed'], changes_requested: ['needs_review', 'suppressed'], approved_for_send_prep: ['suppressed'], rejected: [], suppressed: [] };
  if (!allowed[prospect.reviewStatus].includes(next)) throw new Error(`Cannot move from ${prospect.reviewStatus} to ${next}.`);
  return { ...prospect, reviewStatus: next, revisionRequest: request };
}
