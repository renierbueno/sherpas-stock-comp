import { useState } from 'react';
import type { Analysis } from '../model/analysis';
import { investableAssets } from '../model/exposure';
import { dateLabel, money, pct } from '../model/format';
import type { ReportLine, Surface } from '../model/lines';
import type { Area } from '../model/params';
import type { Household } from '../model/types';

export type Mode = 'client' | 'advisor' | 'print';

/** Lines a mode may show: advisor notices never reach the client view or the PDF (AC-G-11). */
export function visibleLines(a: Analysis, mode: Mode): ReportLine[] {
  return mode === 'advisor' ? a.lines : a.lines.filter((l) => l.audience === 'shared');
}

const on = (lines: ReportLine[], s: Surface) => lines.filter((l) => l.surface === s);

const AREA_LABEL: Record<Area, string> = {
  cashFlow: 'Cash flow',
  debt: 'Debt',
  protection: 'Protection',
  liquidity: 'Liquidity',
  investing: 'Investing',
};

const CHECK_LABEL: Record<string, string> = {
  savingsRate: 'Savings rate',
  fixedCommitments: 'Fixed commitments',
  housingLoad: 'Housing cost',
  revolvingBalance: 'Revolving card balance',
  coverVsNeed: 'Life cover against need',
  umbrella: 'Umbrella cover',
  monthsOfReserve: 'Months of reserve',
  nearTermCommitments: 'Near-term commitments',
  allocationVsTarget: 'Allocation against target',
  concentration: 'Concentration in the largest position',
  idleCash: 'Idle cash',
  taxLocation: 'Tax location',
};

const scoreColour = (s: number) => (s >= 70 ? 'green' : s >= 55 ? 'amber' : 'red');

function Unchanged({ title }: { title: string }) {
  return (
    <section className="section unchanged" aria-label={title}>
      <h2>{title}</h2>
      <div>Unchanged, as today.</div>
    </section>
  );
}

function Bullets({ lines, label }: { lines: ReportLine[]; label: string }) {
  if (lines.length === 0) return null;
  return (
    <ul className="bullets" aria-label={label}>
      {lines.map((l) => <li key={l.id} data-line={l.id}>{l.text}</li>)}
    </ul>
  );
}

/** AC-B-27: after the asset totals; absent without grants (AC-B-26). */
function GrantBlock({ lines }: { lines: ReportLine[] }) {
  if (lines.length === 0) return null;
  const groups = [...new Set(lines.map((l) => l.group ?? ''))];
  return (
    <div className="grantblock" aria-label="Stock compensation not yet vested">
      <h3>Stock compensation not yet vested (not in net worth)</h3>
      {groups.map((g) => (
        <div key={g}>
          <div className="caps">{g}</div>
          <Bullets lines={lines.filter((l) => (l.group ?? '') === g)} label={g} />
        </div>
      ))}
    </div>
  );
}

export function ViewMore({ analysis, household, lines, onClose }: { analysis: Analysis; household: Household; lines: ReportLine[]; onClose: () => void }) {
  const conc = analysis.score.concentration;
  const concLines = on(lines, 'viewMore.concentration');
  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="panel" role="dialog" aria-label="Score breakdown">
        <header>
          <h2>Financial health score: {analysis.score.score}</h2>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </header>
        <p className="caps">SIMULATED score: public weights, simulated curves and readings</p>
        {analysis.score.areas.map((a) => (
          <details key={a.area} className="area" open={a.area === 'investing'}>
            <summary>
              <span>{AREA_LABEL[a.area]}</span>
              <span>{Math.round(a.points)} / {a.available}</span>
            </summary>
            <ul className="checks">
              {Object.keys(a.checks).map((c) => (
                <li key={c}>
                  {CHECK_LABEL[c] ?? c}
                  {c === 'concentration' && (
                    <ul aria-label="Concentration reading">
                      {concLines.length === 0 && conc.largest && (
                        <li>{conc.largest.position.ticker ?? conc.largest.position.name} is about {pct(conc.largest.share)} of investable assets.</li>
                      )}
                      {concLines.map((l) => <li key={l.id} data-line={l.id}>{l.text}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </details>
        ))}
        <p className="caps">{household.name}</p>
      </aside>
    </>
  );
}

export function FinancialHealth({ household, analysis, mode }: { household: Household; analysis: Analysis; mode: Mode }) {
  const [panel, setPanel] = useState(false);
  const lines = visibleLines(analysis, mode);
  const s = analysis.score.score;
  const investments = household.accounts.flatMap((a) => a.positions).reduce((t, p) => t + (p.value ?? 0), 0);
  const lookInto = on(lines, 'assets.lookInto');
  return (
    <div className={mode === 'print' ? 'print' : undefined}>
      <div className="hero">
        <div className="meta">{household.name} · Analysis of {dateLabel(analysis.analysisDate)}</div>
        <h1>Financial health</h1>
        <div className={`score ${scoreColour(s)}`} aria-label="Score">{s}</div>
        {mode !== 'print' && <button className="link" onClick={() => setPanel(true)}>View more</button>}
      </div>
      <main>
        <section className="section" aria-label="Summary">
          <h2>Summary</h2>
          <div className="caps">Recommendations</div>
          <ul className="bullets" aria-label="Recommendations">
            <li>Other recommendations: unchanged, as today (SIMULATED).</li>
            {on(lines, 'summary.candidates').map((l) => <li key={l.id} data-line={l.id}>{l.text}</li>)}
          </ul>
        </section>
        <Unchanged title="Retirement & Goals" />
        <section className="section" aria-label="Assets & Investments">
          <h2>Assets & Investments</h2>
          <div className="totals">
            <div className="card"><div className="caps">Investments</div><div className="v">{money(investments)}</div></div>
            <div className="card"><div className="caps">Cash</div><div className="v">{money(household.cash)}</div></div>
            <div className="card"><div className="caps">Investable assets</div><div className="v">{money(investableAssets(household))}</div></div>
          </div>
          <Bullets lines={on(lines, 'assets.bullets')} label="Assets observations" />
          <GrantBlock lines={on(lines, 'assets.grants')} />
          {lookInto.length > 0 && (
            <div className="lookinto" aria-label="We should look into">
              <h3>We should look into</h3>
              <Bullets lines={lookInto} label="Look into" />
            </div>
          )}
        </section>
        <Unchanged title="Debt management" />
        <Unchanged title="Savings & Expenses" />
        <Unchanged title="Insurance & Protection" />
        {mode === 'print' && (
          <section className="section" aria-label="Score breakdown">
            <h2>Score breakdown</h2>
            <Bullets lines={on(lines, 'viewMore.concentration')} label="Concentration reading" />
          </section>
        )}
      </main>
      {panel && <ViewMore analysis={analysis} household={household} lines={lines} onClose={() => setPanel(false)} />}
    </div>
  );
}
