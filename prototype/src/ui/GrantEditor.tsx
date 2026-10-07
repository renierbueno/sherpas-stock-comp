// Advisor side: record a grant and its vests (F-B). Shown in Data & Assumptions and, from the
// stock-pay block, in advisor mode (AC-B-01, AC-E-15).
import { useState } from 'react';
import { ADJUSTMENT_WARNING, SALARY_CHECK } from '../model/actions';
import { money } from '../model/format';
import { generateTranches, PSU_DEFAULT_RANGE, statusOf, trancheUnitsMismatch } from '../model/grants';
import { duplicateOf, NO_GRANTS, proposedLabel, SAMPLE_DOCUMENTS } from '../model/extraction';
import { dateLabel } from '../model/format';
import { Mark } from './Guide';
import type { Employer, Grant, Household, Tranche } from '../model/types';

export interface GrantSave {
  grant: Grant;
  employer: Employer;
  generated?: Tranche[];
}

const FREQ: [string, number][] = [['Monthly', 1], ['Quarterly', 3], ['Every six months', 6], ['Yearly', 12]];

function estimateText(g: Grant): string | null {
  const e = g.clientEstimate;
  if (!e) return null;
  const parts = [e.type && `type ${e.type}`, e.unvestedValue !== undefined && `about ${money(e.unvestedValue)} unvested`, e.frequency && `vests ${e.frequency}`].filter(Boolean);
  return parts.length ? parts.join(', ') : 'employer only';
}

export function GrantForm({ household, grant, onSave, onCancel, saveLabel = 'Save grant' }: { household: Household; grant: Grant; onSave: (s: GrantSave) => void; onCancel: () => void; saveLabel?: string }) {
  const [g, setG] = useState<Grant>(grant);
  const [employer, setEmployer] = useState<Employer>(household.employers.find((e) => e.id === grant.employerId) ?? household.employers[0]);
  const [pattern, setPattern] = useState({ lengthMonths: 48, frequencyMonths: 3, cliffMonths: 12 });
  const [generated, setGenerated] = useState<Tranche[] | undefined>();
  const [confirming, setConfirming] = useState(false);

  const set = (patch: Partial<Grant>) => setG((x) => ({ ...x, ...patch }));
  const setTranche = (id: string, patch: Partial<Tranche>) => set({ tranches: g.tranches.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  const mismatch = trancheUnitsMismatch(g);
  const estimate = estimateText(grant);
  const num = (v: string) => (v === '' ? undefined : Number(v));

  const save = () => {
    if (household.manualAdjustment && !confirming) return setConfirming(true);
    onSave({ grant: g, employer, generated });
  };

  return (
    <div className="form" aria-label="Grant editor">
      {grant.proposed && <div className="notice" data-ac="AC-F-12">{proposedLabel(grant.proposed.document)}</div>}
      {estimate && <div className="notice" data-ac="AC-E-14">Client estimate, not used in the figures: {estimate}.</div>}
      <div className="row">
        <label>Owner
          <select value={g.ownerId} onChange={(e) => set({ ownerId: e.target.value })}>
            {household.people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <label>Type
          <select value={g.type} onChange={(e) => set(e.target.value === 'PSU' ? { type: 'PSU', psu: g.psu ?? { condition: '', periodEnd: '', ...PSU_DEFAULT_RANGE } } : { type: 'RSU', psu: undefined })}>
            <option value="RSU">RSU</option>
            <option value="PSU">PSU</option>
          </select>
        </label>
        <label>Employer
          <input value={employer.name} readOnly />
        </label>
        <label className="row"><input type="checkbox" checked={employer.listed} onChange={(e) => setEmployer({ ...employer, listed: e.target.checked, listedUnknown: undefined })} /> Listed{employer.listedUnknown ? ' (not known yet: the client gave no ticker)' : ''}</label>
        {employer.listed && <label>Ticker<input value={employer.ticker ?? ''} onChange={(e) => setEmployer({ ...employer, ticker: e.target.value.toUpperCase() })} /></label>}
      </div>
      {!employer.listed && (
        <div className="row">
          <label>Latest 409A value per share<input inputMode="decimal" value={employer.fmv409a?.value ?? ''} onChange={(e) => setEmployer({ ...employer, fmv409a: { date: employer.fmv409a?.date ?? '', value: Number(e.target.value) } })} /></label>
          <label>409A date<input type="date" value={employer.fmv409a?.date ?? ''} onChange={(e) => setEmployer({ ...employer, fmv409a: { value: employer.fmv409a?.value ?? 0, date: e.target.value } })} /></label>
        </div>
      )}
      <div className="row">
        <label>Grant date<input type="date" value={g.grantDate ?? ''} onChange={(e) => set({ grantDate: e.target.value })} /></label>
        <label>{g.type === 'PSU' ? 'Target units' : 'Units'}<input inputMode="numeric" value={g.units ?? ''} onChange={(e) => set({ units: num(e.target.value) })} /></label>
      </div>
      {g.type === 'PSU' && g.psu && (
        <div className="row" aria-label="Performance terms">
          <label>Performance condition<input value={g.psu.condition} onChange={(e) => set({ psu: { ...g.psu!, condition: e.target.value } })} /></label>
          <label>End of performance period<input type="date" value={g.psu.periodEnd} onChange={(e) => set({ psu: { ...g.psu!, periodEnd: e.target.value } })} /></label>
          <label>Payout from (% of target)<input inputMode="numeric" value={Math.round(g.psu.rangeMin * 100)} onChange={(e) => set({ psu: { ...g.psu!, rangeMin: Number(e.target.value) / 100 } })} /></label>
          <label>Payout to (% of target)<input inputMode="numeric" value={Math.round(g.psu.rangeMax * 100)} onChange={(e) => set({ psu: { ...g.psu!, rangeMax: Number(e.target.value) / 100 } })} /></label>
        </div>
      )}
      <fieldset>
        <legend>Vesting pattern</legend>
        <div className="row">
          <label>Length (months)<input inputMode="numeric" value={pattern.lengthMonths} onChange={(e) => setPattern({ ...pattern, lengthMonths: Number(e.target.value) })} /></label>
          <label>Frequency
            <select value={pattern.frequencyMonths} onChange={(e) => setPattern({ ...pattern, frequencyMonths: Number(e.target.value) })}>
              {FREQ.map(([l, m]) => <option key={m} value={m}>{l}</option>)}
            </select>
          </label>
          <label>Cliff (months)<input inputMode="numeric" value={pattern.cliffMonths} onChange={(e) => setPattern({ ...pattern, cliffMonths: Number(e.target.value) })} /></label>
          <button className="btn secondary" disabled={!g.grantDate || !g.units} onClick={() => { const t = generateTranches(g.grantDate!, g.units!, pattern); setGenerated(t); set({ tranches: t }); }}>Generate tranches</button>
        </div>
      </fieldset>
      {g.tranches.length > 0 && (
        <table aria-label="Tranches">
          <thead><tr><th>Vest date</th><th>{g.type === 'PSU' ? 'Target units' : 'Units'}</th><th>Forfeited</th><th>Shares kept</th><th>Cost basis</th><th /></tr></thead>
          <tbody>
            {g.tranches.map((t, i) => (
              <tr key={t.id}>
                <td><input type="date" aria-label={`Tranche ${i + 1} date`} value={t.date} onChange={(e) => setTranche(t.id, { date: e.target.value })} /></td>
                <td><input inputMode="numeric" aria-label={`Tranche ${i + 1} units`} value={t.units} onChange={(e) => setTranche(t.id, { units: Number(e.target.value) })} size={6} /></td>
                <td><input type="checkbox" aria-label={`Tranche ${i + 1} forfeited`} checked={!!t.forfeited} onChange={(e) => setTranche(t.id, { forfeited: e.target.checked })} /></td>
                <td><input inputMode="numeric" aria-label={`Tranche ${i + 1} shares kept`} value={t.sharesKept ?? ''} onChange={(e) => setTranche(t.id, { sharesKept: num(e.target.value) })} size={6} /></td>
                <td><input inputMode="numeric" aria-label={`Tranche ${i + 1} cost basis`} value={t.costBasis ?? ''} onChange={(e) => setTranche(t.id, { costBasis: num(e.target.value) })} size={8} /></td>
                <td><button className="link" onClick={() => set({ tranches: g.tranches.filter((x) => x.id !== t.id) })}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="row">
        <button className="link" onClick={() => set({ tranches: [...g.tranches, { id: `n${Date.now()}`, date: household.analysisDate, units: 0 }] })}>Add tranche</button>
      </div>
      {mismatch && <div className="notice" data-ac="AC-B-10">Tranches add up to {mismatch.sum.toLocaleString('en-US')} of {mismatch.units.toLocaleString('en-US')} units.</div>}
      {household.stateTaxRate > 0 && (
        <label>State withholding rate (%)
          <input inputMode="decimal" value={g.stateWithholdingRate === undefined ? '' : String(+(g.stateWithholdingRate * 100).toFixed(2))}
            onChange={(e) => set({ stateWithholdingRate: e.target.value === '' ? undefined : Number(e.target.value) / 100 })} />
          <span className="caps">From the paystub or plan statement</span>
        </label>
      )}
      <div className="helper" role="note">{SALARY_CHECK}<Mark kind="new" why="Replaces the income question: salary on file must not include stock, or vests count twice." /></div>
      {confirming && <div className="warning" role="alert">{ADJUSTMENT_WARNING}</div>}
      <div className="row">
        <button className="btn" onClick={save}>{confirming ? 'Save and reprocess' : saveLabel}</button>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/** F-F: what the extraction found, shown as the document's own lines (SIMULATED), beside the proposal (AC-F-04). */
function DocumentPreview({ household, doc }: { household: Household; doc: string }) {
  const found = (SAMPLE_DOCUMENTS[doc] ?? (() => []))(household);
  return (
    <div className="docpreview" aria-label={`Document ${doc}`}>
      <div className="caps">{doc}</div>
      {found.length === 0 ? <div className="small">[unreadable scan]</div> : found.map((f, i) => (
        <div key={i} className="small">
          Award {i + 1} · {f.type} · granted {f.grantDate ? dateLabel(f.grantDate) : '?'} · {f.units?.toLocaleString('en-US')} units
          {f.tranches.map((t) => <div key={t.id}>&nbsp;&nbsp;{dateLabel(t.date)} · {t.units.toLocaleString('en-US')} units{t.sharesKept ? ` · ${t.sharesKept} shares kept after withholding` : ''}</div>)}
        </div>
      ))}
    </div>
  );
}

export interface ProposalActions {
  onUpload: (doc: string) => void;
  onConfirm: (s: GrantSave, keep?: 'proposed' | 'existing') => void;
  onReject: (id: string) => void;
  onConfirmAll: (doc: string) => void;
}

export function GrantsPanel({ household, onSave, enabled, proposals, onDelete }: { household: Household; onSave: (s: GrantSave) => void; enabled: boolean; proposals?: ProposalActions; onDelete?: (id: string) => void }) {
  const [editing, setEditing] = useState<Grant | null>(null);
  const [doc, setDoc] = useState(Object.keys(SAMPLE_DOCUMENTS)[0]);
  const [lastUpload, setLastUpload] = useState<{ doc: string; found: number } | null>(null);
  const [reviewing, setReviewing] = useState<Grant | null>(null);
  if (!enabled) return null;
  const proposed = household.grants.filter((g) => g.proposed);
  const blank = (): Grant => ({ id: `g${Date.now()}`, category: 'stockCompensation', subType: 'RSU', ownerId: household.people[0].id, type: 'RSU',
    employerId: household.employers[0]?.id ?? '', tranches: [], source: 'advisor' });
  return (
    <section className="section" aria-label="Stock compensation grants">
      <h2>Stock compensation</h2>
      <table>
        <thead><tr><th>Grant</th><th>Owner</th><th>Status</th><th /></tr></thead>
        <tbody>
          {household.grants.filter((g) => !g.proposed).map((g) => (
            <tr key={g.id}>
              <td>{household.employers.find((e) => e.id === g.employerId)?.name} {g.type}{g.units ? ` · ${g.units.toLocaleString('en-US')} units` : ''}</td>
              <td>{household.people.find((p) => p.id === g.ownerId)?.name}</td>
              <td>{statusOf(household, g)}</td>
              <td className="row"><button className="link" onClick={() => setEditing(g)}>Edit</button>{onDelete && <button className="link" onClick={() => onDelete(g.id)}>Delete grant</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {household.employers.length > 0 && !editing && <button className="btn secondary" onClick={() => setEditing(blank())}>Add grant</button>}
      {editing && <GrantForm key={editing.id} household={household} grant={editing} onCancel={() => setEditing(null)} onSave={(s) => { onSave(s); setEditing(null); }} />}
      {proposals && (
        <div className="upload" aria-label="Plan statement">
          <h3>Plan statement</h3>
          <div className="row">
            <select aria-label="Sample document" value={doc} onChange={(e) => setDoc(e.target.value)}>
              {Object.keys(SAMPLE_DOCUMENTS).map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button className="btn secondary" onClick={() => { proposals.onUpload(doc); setLastUpload({ doc, found: (SAMPLE_DOCUMENTS[doc] ?? (() => []))(household).length }); }}>Upload plan statement</button>
          </div>
          {lastUpload && lastUpload.found === 0 && <div className="notice" data-ac="AC-F-08">{NO_GRANTS}</div>}
          {proposed.length > 0 && (
            <div className="proposals" aria-label="Proposed grants">
              {[...new Set(proposed.map((g) => g.proposed!.document))].map((d) => (
                <div key={d} className="split">
                  <DocumentPreview household={household} doc={d} />
                  <div>
                    {proposed.filter((g) => g.proposed!.document === d).length > 1 && (
                      <div className="row">
                        <button className="btn" onClick={() => proposals.onConfirmAll(d)}>Confirm all</button>
                        <Mark kind="new" why="Confirms every grant of this statement at once (AC-F-18)." />
                      </div>
                    )}
                    {proposed.filter((g) => g.proposed!.document === d).map((g) => {
                      const dup = duplicateOf(household, g);
                      const past = g.tranches.filter((t) => t.date <= household.analysisDate);
                      return (
                        <div key={g.id} className="proposal" aria-label="Proposed grant">
                          <div className="notice">{proposedLabel(d)}</div>
                          <div className="small">{household.employers.find((e) => e.id === g.employerId)?.name} {g.type} · {g.units?.toLocaleString('en-US')} units · granted {g.grantDate && dateLabel(g.grantDate)} · {g.tranches.length} tranches</div>
                          {past.map((t) => <div key={t.id} className="small" data-ac="AC-F-10">Vested on {dateLabel(t.date)}: record the shares kept as a held position.</div>)}
                          {dup && <div className="warning" data-ac="AC-F-09">Same employer, grant date and type as an existing grant. Choose which to keep.</div>}
                          <div className="row">
                            {dup ? (
                              <>
                                <button className="btn" onClick={() => proposals.onConfirm({ grant: g, employer: household.employers.find((e) => e.id === g.employerId)! }, 'proposed')}>Keep extracted</button>
                                <button className="btn secondary" onClick={() => proposals.onConfirm({ grant: g, employer: household.employers.find((e) => e.id === g.employerId)! }, 'existing')}>Keep existing</button>
                              </>
                            ) : (
                              <button className="btn" onClick={() => setReviewing(g)}>Review and confirm</button>
                            )}
                            <button className="btn secondary" onClick={() => proposals.onReject(g.id)}>Reject</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          {reviewing && <GrantForm key={reviewing.id} household={household} grant={reviewing} saveLabel="Confirm grant" onCancel={() => setReviewing(null)} onSave={(s) => { proposals.onConfirm(s); setReviewing(null); }} />}
        </div>
      )}
    </section>
  );
}
