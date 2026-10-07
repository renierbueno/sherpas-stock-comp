import type { Analysis } from '../model/analysis';
import { money } from '../model/format';
import type { Firm, Household } from '../model/types';
import { useContext } from 'react';
import { Edits, visibleLines, type Mode } from './FinancialHealth';

/** Tag on a flagged position (AC-A-21); hidden when the setting is off (AC-G-13). */
export function employerTag(h: Household, firm: Firm, positionId: string): string | null {
  if (!firm.stockComp) return null;
  const flag = h.flags.find((f) => f.positionId === positionId);
  if (!flag) return null;
  const name = h.people.find((p) => p.id === flag.personId)?.name ?? flag.personId;
  return `Employer stock (${name})`;
}

/** Investment analysis tab: only the snapshot line is new (AC-A-22, D-063); the rest is as today. */
export function InvestmentAnalysis({ household, analysis, firm, mode }: { household: Household; analysis: Analysis; firm: Firm; mode: Mode }) {
  const snapshot = visibleLines(analysis, mode, useContext(Edits)?.edits).filter((l) => l.surface === 'investment.snapshot');
  return (
    <main>
      <section className="section" aria-label="Investment snapshot">
        <h2>Snapshot</h2>
        <p className="caps">Purpose buckets, targets and the proposal: unchanged, as today</p>
        {snapshot.length > 0 && (
          <ul className="bullets" aria-label="Snapshot observations">
            {snapshot.map((l) => <li key={l.id} data-line={l.id}>{l.text}</li>)}
          </ul>
        )}
      </section>
      <section className="section" aria-label="Accounts and holdings">
        <h2>Accounts and holdings</h2>
        <table>
          <thead><tr><th>Account</th><th>Holding</th><th>Value</th></tr></thead>
          <tbody>
            {household.accounts.flatMap((a) => a.positions.map((p) => {
              const tag = employerTag(household, firm, p.id);
              return (
                <tr key={p.id}>
                  <td>{a.name}</td>
                  <td>{p.ticker ? `${p.ticker} · ` : ''}{p.name}{tag && <span className="tag">{tag}</span>}</td>
                  <td>{p.value === null ? 'No price' : money(p.value)}</td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
