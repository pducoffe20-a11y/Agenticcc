import { describe, expect, it } from 'vitest';
import { buildSession, parseInput, transition } from './domain';
import { sampleCsv } from './fixtures';

describe('prospect pipeline', () => {
  it('reconciles accepted, rejected, and duplicate CSV rows', () => {
    const rows = parseInput(sampleCsv, 'csv');
    const session = buildSession(rows, 'sample.csv');
    expect(rows).toHaveLength(6);
    expect(session.accepted).toHaveLength(3);
    expect(session.rejected).toHaveLength(2);
    expect(session.duplicates).toEqual([{ row: 5, canonicalRow: 4, key: 'id:syn-003' }]);
  });

  it('keeps supplied evidence, inference, and unknowns separate', () => {
    const session = buildSession([{ prospect_id: 'SYN-9', full_name: 'Avery Chen', title: 'Director of Learning', organization: 'Example Cooperative', provided_note: 'Reviewing onboarding now' }], 'fixture.json');
    const prospect = session.accepted[0];
    expect(prospect.evidence.every((item) => item.sourceKind === 'provided' && item.sourceRef === 'row 2')).toBe(true);
    expect(prospect.inferredAngles[0]).toMatch(/^Inference:/);
    expect(prospect.unknowns).toContain('buying authority');
    expect(prospect.scores).toEqual({ fit: 27, urgency: 21, persona: 23, evidence: 20, total: 91 });
    expect(prospect.draft?.claims[0].evidenceIds.length).toBeGreaterThan(0);
  });

  it('rejects malformed identity and ambiguous inputs', () => {
    expect(() => parseInput('{"wrong":[]}', 'json')).toThrow(/records array/);
    expect(() => parseInput('name,name\nA,B', 'csv')).toThrow(/ambiguous/);
    expect(buildSession([{ full_name: 'Only a name' }], 'x').rejected[0].reasons[0]).toMatch(/stable identity/);
  });

  it('enforces review transitions and never exposes a send state', () => {
    const prospect = buildSession([{ prospect_id: '1', full_name: 'A B', organization: 'Example Org' }], 'x').accepted[0];
    expect(transition(prospect, 'approved_for_send_prep').reviewStatus).toBe('approved_for_send_prep');
    expect(() => transition({ ...prospect, reviewStatus: 'rejected' }, 'needs_review')).toThrow(/Cannot move/);
  });
});
