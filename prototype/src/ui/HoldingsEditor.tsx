// Advisor side: flag a held position as employer stock (AC-A-01 to AC-A-03, AC-A-20).
// Used in Data & Assumptions and in the advisor-mode Investments block.
import { useState } from 'react';
import { ADJUSTMENT_WARNING } from '../model/actions';
import { money } from '../model/format';
import type { EmployerFlag, Firm, Household, YesNoUnknown } from '../model/types';
import { employerTag } from './InvestmentAnalysis';

interface Props {
  household: Household;
  firm: Firm;
  where: string;
  onSaveFlag: (flag: EmployerFlag) => void;
  onRemoveFlag: (positionId: string) => void;
}

function FlagForm({ household, positionId, onCancel, onSave }: { household: Household; positionId: string; onCancel: () => void; onSave: (f: EmployerFlag) => void }) {
  const existing = household.flags.find((f) => f.positionId === positionId);
  const [employerId, setEmployerId] = useState(existing?.employerId ?? household.employers[0]?.id ?? '');
  const [personId, setPersonId] = useState(existing?.personId ?? household.people[0].id);
  const [current, setCurrent] = useState<YesNoUnknown | ''>(existing?.currentEmployer ?? '');
  const [basis, setBasis] = useState(existing?.costBasis?.toString() ?? '');
  const [confirming, setConfirming] = useState(false);

  const flag = (): EmployerFlag => ({
    positionId, employerId, personId, currentEmployer: current || 'unknown',
    ...(basis ? { costBasis: Number(basis) } : {}),
  });
  const save = () => (household.manualAdjustment && !confirming ? setConfirming(true) : onSave(flag()));

  return (
    <div className="form" aria-label="Employer stock flag">
      <label>Employer
        <select value={employerId} onChange={(e) => setEmployerId(e.target.value)}>
          {household.employers.map((e) => <option key={e.id} value={e.id}>{e.name}{e.listed ? ` (${e.ticker})` : ' (private)'}</option>)}
        </select>
      </label>
      <label>Person
        <select value={personId} onChange={(e) => setPersonId(e.target.value)}>
          {household.people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <fieldset>
        <legend>Is it this person's current employer?</legend>
        {(['yes', 'no', 'unknown'] as const).map((v) => (
          <label key={v} className="row"><input type="radio" name="current" checked={current === v} onChange={() => setCurrent(v)} />{v === 'unknown' ? 'Unknown' : v === 'yes' ? 'Yes' : 'No'}</label>
        ))}
      </fieldset>
      <label>Cost basis (optional)
        <input inputMode="numeric" value={basis} onChange={(e) => setBasis(e.target.value.replace(/[^0-9.]/g, ''))} />
      </label>
      {confirming && <div className="warning" role="alert">{ADJUSTMENT_WARNING}</div>}
      <div className="row">
        <button className="btn" onClick={save}>{confirming ? 'Save and reprocess' : 'Save'}</button>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export function HoldingsEditor({ household, firm, where, onSaveFlag, onRemoveFlag }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  // Removing a flag is a stock-compensation save too: same warning first (AC-G-12).
  const [removing, setRemoving] = useState<string | null>(null);
  const remove = (id: string) => {
    if (household.manualAdjustment && removing !== id) return setRemoving(id);
    setRemoving(null);
    onRemoveFlag(id);
  };
  return (
    <section className="section" aria-label={where}>
      <h2>{where}</h2>
      <table>
        <thead><tr><th>Account</th><th>Holding</th><th>Value</th><th /></tr></thead>
        <tbody>
          {household.accounts.flatMap((a) => a.positions.map((p) => {
            const tag = employerTag(household, firm, p.id);
            return (
              <tr key={p.id}>
                <td>{a.name}</td>
                <td>
                  {p.ticker ? `${p.ticker} · ` : ''}{p.name}{tag && <span className="tag">{tag}</span>}
                  {editing === p.id && (
                    <FlagForm household={household} positionId={p.id} onCancel={() => setEditing(null)}
                      onSave={(f) => { onSaveFlag(f); setEditing(null); }} />
                  )}
                </td>
                <td>{p.value === null ? 'No price' : money(p.value)}</td>
                <td>
                  {firm.stockComp && editing !== p.id && (
                    tag
                      ? <div className="row"><button className="link" onClick={() => setEditing(p.id)}>Edit flag</button><button className="link" onClick={() => remove(p.id)}>{removing === p.id ? 'Remove and reprocess' : 'Remove flag'}</button>{removing === p.id && <div className="warning" role="alert">{ADJUSTMENT_WARNING}</div>}</div>
                      : <button className="link" onClick={() => setEditing(p.id)} aria-label={`Flag ${p.name} as employer stock`}>Flag as employer stock</button>
                  )}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </section>
  );
}
