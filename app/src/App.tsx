import { useMemo, useRef, useState } from 'react';
import { buildSession, parseInput, transition, type ReviewStatus, type Session, type Status } from './domain';
import { sampleCsv } from './fixtures';

type Filter = 'All' | Status;
const statusClass = (value: string) => value.toLowerCase().replaceAll(' ', '-').replaceAll('_', '-');

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [error, setError] = useState('');
  const [revision, setRevision] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = session?.accepted.find((item) => item.id === selectedId) ?? session?.accepted[0] ?? null;
  const visible = useMemo(() => session?.accepted.filter((item) => filter === 'All' || item.status === filter) ?? [], [session, filter]);

  const load = (rows: Record<string, unknown>[], source: string) => {
    const next = buildSession(rows, source); setSession(next); setSelectedId(next.accepted[0]?.id ?? null); setFilter('All'); setError(''); setRevision('');
  };
  const loadSample = () => load(parseInput(sampleCsv, 'csv'), 'synthetic-prospects.csv');
  const upload = async (file?: File) => {
    if (!file) return;
    if (file.size > 2_000_000) { setError('Choose a CSV or JSON file smaller than 2 MB.'); return; }
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'csv' && extension !== 'json') { setError('Choose a .csv or .json file.'); return; }
    try { load(parseInput(await file.text(), extension), file.name); } catch (reason) { setError(reason instanceof Error ? reason.message : 'The file could not be processed.'); }
    if (inputRef.current) inputRef.current.value = '';
  };
  const review = (next: ReviewStatus) => {
    if (!session || !selected) return;
    try {
      const updated = transition(selected, next, revision.trim());
      setSession({ ...session, accepted: session.accepted.map((item) => item.id === selected.id ? updated : item), audit: [...session.audit, `${selected.fullName}: review moved from ${selected.reviewStatus} to ${next}.`] });
      setRevision('');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Review state could not be changed.'); }
  };

  return <div className="app-shell">
    <header className="topbar">
      <div><p className="eyebrow">Seller control center</p><h1>Prospect Review</h1></div>
      <div className="safety"><span aria-hidden="true">●</span><div><strong>External actions disabled</strong><small>Review state stays in this browser session</small></div></div>
    </header>

    <main>
      <section className="intake" aria-labelledby="intake-heading">
        <div><p className="eyebrow">Today’s workspace</p><h2 id="intake-heading">Start with source data</h2><p>Load the synthetic sample or inspect your own local CSV/JSON. Nothing is uploaded.</p></div>
        <div className="intake-actions">
          <button className="secondary" onClick={loadSample}>Load synthetic sample</button>
          <button onClick={() => inputRef.current?.click()}>Choose CSV or JSON</button>
          <input ref={inputRef} className="sr-only" type="file" accept=".csv,.json" aria-label="Choose prospect CSV or JSON" onChange={(event) => void upload(event.target.files?.[0])}/>
        </div>
      </section>
      <div className="announce" aria-live="polite">{error || (session ? `${session.accepted.length} accepted, ${session.rejected.length} rejected, ${session.duplicates.length} duplicates.` : '')}</div>

      {!session ? <section className="empty-state"><div className="empty-icon">PR</div><h2>Your review queue is ready to build</h2><p>Try the public-safe sample to see evidence, deterministic scores, drafts, decisions, and audit history.</p><button onClick={loadSample}>Load synthetic sample</button></section> : <>
        <section className="metrics" aria-label="Intake summary">
          {[['Accepted', session.accepted.length], ['Rejected', session.rejected.length], ['Duplicates', session.duplicates.length], ['Needs review', session.accepted.filter((p) => p.reviewStatus === 'needs_review').length]].map(([label, value]) => <div className="metric" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          <div className="source"><span>Active source</span><strong>{session.sourceName}</strong></div>
        </section>

        <div className="workspace">
          <aside className="queue" aria-label="Prospect queue">
            <div className="panel-heading"><div><p className="eyebrow">Prioritized queue</p><h2>Prospects</h2></div><span>{visible.length}</span></div>
            <div className="filters" aria-label="Filter prospects">{(['All', 'Work Now', 'Light Research', 'Suppress'] as Filter[]).map((item) => <button className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
            <div className="prospect-list">{visible.map((item) => <button className={`prospect-card ${selected?.id === item.id ? 'selected' : ''}`} onClick={() => { setSelectedId(item.id); setRevision(''); }} key={item.id}>
              <div><strong>{item.fullName}</strong><span>{item.title ?? 'Title unknown'} · {item.organization}</span></div><b>{item.scores.total}</b><i className={statusClass(item.status)}>{item.status}</i>
            </button>)}</div>
          </aside>

          {selected && <section className="detail" aria-label={`Review ${selected.fullName}`}>
            <div className="detail-header"><div><p className="eyebrow">Decision brief · row {selected.row}</p><h2>{selected.fullName}</h2><p>{selected.title ?? 'Title unknown'} · {selected.organization}</p></div><div className="score"><strong>{selected.scores.total}</strong><span>/ 100</span><i className={statusClass(selected.status)}>{selected.status}</i></div></div>
            <div className="score-grid">{Object.entries(selected.scores).filter(([key]) => key !== 'total').map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong><small>/{key === 'fit' ? 30 : key === 'evidence' ? 20 : 25}</small></div>)}</div>
            <details><summary>Why this score</summary><ul>{selected.explanation.map((item) => <li key={item}>{item}</li>)}</ul></details>

            <div className="evidence-grid">
              <section><div className="bucket-title verified"><span>01</span><h3>Provided evidence</h3></div>{selected.evidence.map((item) => <article className="evidence-item" key={item.id}><strong>{item.field.replaceAll('_', ' ')}</strong><p>{item.value}</p><small>{item.sourceLabel} · {item.sourceRef}{item.observedAt ? ` · ${item.observedAt}` : ''}</small></article>)}</section>
              <section><div className="bucket-title inferred"><span>02</span><h3>Inferred angles</h3></div>{selected.inferredAngles.map((item) => <article className="evidence-item inference" key={item}><p>{item}</p><small>Hypothesis only · verify before use</small></article>)}</section>
              <section><div className="bucket-title unknown"><span>03</span><h3>Unknowns</h3></div><ul className="unknown-list">{selected.unknowns.map((item) => <li key={item}>{item}</li>)}</ul></section>
            </div>

            <section className="draft"><div className="section-heading"><div><p className="eyebrow">Human checkpoint</p><h3>Message draft</h3></div><i className={statusClass(selected.reviewStatus)}>{selected.reviewStatus.replaceAll('_', ' ')}</i></div>
              {selected.draft ? <><label>Subject<input readOnly value={selected.draft.subject}/></label><label>Draft<textarea readOnly rows={5} value={selected.draft.body}/></label><div className="claim"><strong>Claim-to-evidence check</strong>{selected.draft.claims.map((claim) => <p key={claim.text}>✓ {claim.text} <small>{claim.evidenceIds.length} evidence links</small></p>)}{selected.draft.flags.map((flag) => <p className="flag" key={flag}>! {flag}</p>)}</div>
                <label>Revision request<textarea value={revision} onChange={(event) => setRevision(event.target.value)} rows={2} placeholder="Describe the exact change needed"/></label>
                <div className="review-actions"><button className="secondary" disabled={selected.reviewStatus !== 'needs_review' || !revision.trim()} onClick={() => review('changes_requested')}>Request changes</button><button className="secondary danger" disabled={selected.reviewStatus !== 'needs_review'} onClick={() => review('rejected')}>Reject</button><button disabled={selected.reviewStatus !== 'needs_review'} onClick={() => review('approved_for_send_prep')}>Approve for preparation</button></div>
                <p className="guardrail">Approval records a review decision only. Sending and external execution do not exist in this application.</p></> : <p className="muted">Draft suppressed because this record did not clear the outreach threshold.</p>}
            </section>
          </section>}
        </div>

        <div className="lower-grid">
          <section className="report"><div className="panel-heading"><div><p className="eyebrow">Input quality</p><h2>Intake report</h2></div></div>{session.rejected.map((item) => <p key={`r${item.row}`}><b>Row {item.row} · Rejected</b><span>{item.reasons.join(' ')}</span></p>)}{session.duplicates.map((item) => <p key={`d${item.row}`}><b>Row {item.row} · Duplicate</b><span>Matches canonical row {item.canonicalRow} using {item.key}.</span></p>)}</section>
          <section className="audit" aria-label="Traceability"><div className="panel-heading"><div><p className="eyebrow">Traceability</p><h2>Audit trail</h2></div><span>rules v1</span></div><ol>{session.audit.map((item, index) => <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol></section>
        </div>
      </>}
    </main>
    <footer>Agenticcc Prospect Review · Local session · Public-safe fixtures</footer>
  </div>;
}
