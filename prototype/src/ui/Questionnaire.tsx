// F-E · The client's questionnaire: the Income step with the "Stock compensation" chip, and the
// documents step where a plan statement can be uploaded (AC-E-01 to AC-E-06, AC-E-19 to AC-E-21,
// AC-F-13). Imitates the step seen on screen; our own code (D-012, D-015).
import { useState } from 'react';
import { SAMPLE_DOCUMENTS } from '../model/extraction';
import { HELPER_LINE, INCOME_QUESTION, INCOME_QUESTION_TODAY, rowErrors, type StockPayRow } from '../model/intake';
import { money } from '../model/format';
import type { Firm, Household } from '../model/types';
import { Mark } from './Guide';

const OTHER_CHIPS = ['Pension', 'Annuity', 'Rental property', 'Business', 'Side hustle', 'Royalty'];
const FREQS = ['monthly', 'quarterly', 'every six months', 'yearly', 'not sure'] as const;

export interface QuestionnaireSubmit { rows: StockPayRow[]; documents: string[] }

/** The Income widget is shared by every Financial Health template (AC-E-21, ASSUMPTION). */
export function IncomeStep({ household, firm, template, onSubmit, onRowChange, initialRows = [] }: {
  household: Household; firm: Firm; template: string;
  onSubmit: (s: QuestionnaireSubmit) => void; onRowChange?: (action: 'added' | 'removed') => void; initialRows?: StockPayRow[];
}) {
  const [rows, setRows] = useState<StockPayRow[]>(initialRows);
  const [others, setOthers] = useState<string[]>([]);
  const [step, setStep] = useState<'income' | 'documents' | 'done'>('income');
  const [docs, setDocs] = useState<string[]>([]);
  const [tried, setTried] = useState(false);
  const set = (id: string, patch: Partial<StockPayRow>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const add = () => { setRows((rs) => [...rs, { id: `r${rs.length + 1}`, ownerId: household.people[0].id, employer: '' }]); onRowChange?.('added'); };
  const remove = (id: string) => { setRows((rs) => rs.filter((r) => r.id !== id)); onRowChange?.('removed'); };
  const invalid = rows.some((r) => rowErrors(r).length > 0);

  if (step === 'done') {
    return <main><section className="section q"><h2>Thank you for providing your information!</h2><p>We are going to analyze your information and will get back to you with your Financial Health Score.</p></section></main>;
  }
  if (step === 'documents') {
    return (
      <main>
        <section className="section q" aria-label="Documents step">
          <div className="caps">{template}</div>
          <h2>Let’s start gathering your info</h2>
          <p className="small">Investment & retirement accounts · SIMULATED sample documents</p>
          {Object.keys(SAMPLE_DOCUMENTS).map((d) => (
            <label key={d} className="row"><input type="checkbox" checked={docs.includes(d)} onChange={(e) => setDocs((x) => (e.target.checked ? [...x, d] : x.filter((y) => y !== d)))} />{d}</label>
          ))}
          <div className="row"><button className="btn secondary" onClick={() => setStep('income')}>Continue to Income</button></div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <section className="section q" aria-label="Income step">
        <div className="row"><div className="caps">{template} · Income</div><button className="link" onClick={() => setStep('documents')}>Back to Documents</button>{docs.length > 0 && <span className="small">{docs.length} uploaded</span>}</div>
        {household.people.map((p) => (
          <div key={p.id} className="qfield">
            <label>{p.name}: {firm.stockComp ? INCOME_QUESTION : INCOME_QUESTION_TODAY}
              {firm.stockComp && <Mark kind="changed" why="Income now excludes company stock, so each vest is counted once, beside salary." />}
              <input readOnly value={money(household.salary[p.id] ?? 0)} />
            </label>
            {firm.stockComp && <div className="helper">{HELPER_LINE}<Mark kind="new" why="Tells the client where stock pay goes." /></div>}
          </div>
        ))}
        <div className="qfield">
          <div>What other current income do you currently have right now?</div>
          <div className="chips" role="group" aria-label="Other current income">
            {OTHER_CHIPS.map((c) => <button key={c} className="chip" onClick={() => setOthers((o) => [...o, c])}>+ {c}</button>)}
            {firm.stockComp && <button className="chip" onClick={add}>+ Stock compensation<Mark kind="new" why="One row per employer; the advisor completes the detail." /></button>}
            <button className="chip" onClick={() => setOthers((o) => [...o, 'Other income'])}>+ Other income</button>
          </div>
        </div>
        {others.map((o, i) => <div key={i} className="qrow"><strong>{o}</strong> <span className="caps">owner, amount and frequency, as today</span></div>)}
        {rows.map((r) => (
          <div key={r.id} className="qrow" aria-label="Stock compensation row">
            <div className="row"><strong>Stock compensation</strong><button className="link" onClick={() => remove(r.id)}>Remove</button></div>
            <div className="row">
              <label>Owner
                <select value={r.ownerId} onChange={(e) => set(r.id, { ownerId: e.target.value })}>
                  {household.people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </label>
              <label>Employer<input value={r.employer} onChange={(e) => set(r.id, { employer: e.target.value })} aria-invalid={tried && !r.employer.trim()} /></label>
              <label>Ticker, if listed<input value={r.ticker ?? ''} onChange={(e) => set(r.id, { ticker: e.target.value.toUpperCase() || undefined })} placeholder="Search a security" /></label>
            </div>
            {tried && rowErrors(r).map((e) => <div key={e} className="warning">{e}</div>)}
            <div className="row">
              <label>Type
                <select value={r.type ?? ''} onChange={(e) => set(r.id, { type: (e.target.value || undefined) as StockPayRow['type'] })}>
                  <option value="">Choose</option><option value="RSU">RSU</option><option value="PSU">PSU</option><option value="other">Other</option><option value="not sure">Not sure</option>
                </select>
              </label>
              <label>Approximate value of unvested stock<input inputMode="numeric" value={r.unvestedValue ?? ''} onChange={(e) => set(r.id, { unvestedValue: e.target.value ? Number(e.target.value.replace(/\D/g, '')) : undefined })} /></label>
              <label>How often it vests
                <select value={r.frequency ?? ''} onChange={(e) => set(r.id, { frequency: (e.target.value || undefined) as StockPayRow['frequency'] })}>
                  <option value="">Choose</option>{FREQS.map((f) => <option key={f} value={f}>{f[0].toUpperCase() + f.slice(1)}</option>)}
                </select>
              </label>
            </div>
          </div>
        ))}
        <div className="row">
          <button className="btn" onClick={() => { setTried(true); if (!invalid) { onSubmit({ rows, documents: docs }); setStep('done'); } }}>Submit questionnaire</button>
        </div>
      </section>
    </main>
  );
}
