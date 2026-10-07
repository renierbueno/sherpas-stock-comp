import { createContext, useContext, useState } from 'react';
import { applyEdits, type LineEdits } from '../model/sharing';
import type { Analysis } from '../model/analysis';
import { investableAssets } from '../model/exposure';
import { dateLabel, money, pct } from '../model/format';
import type { ReportLine, Surface } from '../model/lines';
import type { Area } from '../model/params';
import type { Firm, Household } from '../model/types';
import { projectedFigure, projectedFigureText, projection } from '../model/projection';
import { ProjectionChart } from './ProjectionChart';
import { Mark, TabDot } from './Guide';

export type Mode = 'client' | 'advisor' | 'print';

/** Advisor edits of new lines (AC-G-07); provided by the app, absent in the scenes. */
export const Edits = createContext<{ edits: LineEdits; setEdit: (id: string, text: string | null | undefined) => void; canEdit: boolean } | null>(null);

/**
 * Lines a mode may show: advisor notices never reach the client view or the PDF (AC-G-11);
 * the client view and the PDF show the advisor's edits (AC-G-07, AC-G-10).
 */
export function visibleLines(a: Analysis, mode: Mode, edits: LineEdits = {}): ReportLine[] {
  return mode === 'advisor' ? a.lines : applyEdits(a.lines.filter((l) => l.audience === 'shared'), edits);
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

/** Line IDs to mark "New" in a guided scene (D-065); null outside the scenes. */
export const NewLines = createContext<Set<string> | null>(null);

function Line({ l }: { l: ReportLine }) {
  const fresh = useContext(NewLines)?.has(l.id);
  const ed = useContext(Edits);
  const [editing, setEditing] = useState(false);
  const edit = ed?.canEdit && l.audience === 'shared' ? ed.edits[l.id] : undefined;
  if (ed?.canEdit && l.audience === 'shared') {
    // Advisor mode: every new client-facing line can be edited or deleted before sharing (AC-G-07)
    return (
      <li data-line={l.id} className={edit === null ? 'deleted' : undefined}>
        {editing ? (
          <span className="row">
            <input aria-label={`Edit line ${l.id}`} defaultValue={edit ?? l.text} size={60}
              onKeyDown={(e) => { if (e.key === 'Enter') { ed.setEdit(l.id, (e.target as HTMLInputElement).value); setEditing(false); } }} />
            <button className="link" onClick={() => setEditing(false)}>Done</button>
          </span>
        ) : (
          <>{edit ?? l.text}</>
        )}
        <span className="lineactions">
          {edit === null
            ? <button className="link" onClick={() => ed.setEdit(l.id, undefined)}>Restore</button>
            : <><button className="link" onClick={() => setEditing(true)}>Edit</button><button className="link" onClick={() => ed.setEdit(l.id, null)}>Delete</button></>}
        </span>
      </li>
    );
  }
  return (
    <li data-line={l.id} className={fresh ? 'new' : undefined}>
      {fresh && <span className="newbadge" title={`Requirement ${l.ac} in the spec`}>New · {l.ac}</span>}
      {l.text}
    </li>
  );
}

function Bullets({ lines, label }: { lines: ReportLine[]; label: string }) {
  if (lines.length === 0) return null;
  return (
    <ul className="bullets" aria-label={label}>
      {lines.map((l) => <Line key={l.id} l={l} />)}
    </ul>
  );
}

/** F-D: Retirement & Goals shows the vests beside the goals (AC-D-03 to AC-D-08). */
function GoalsSection({ household, analysis, lines }: { household: Household; analysis: Analysis; lines: ReportLine[] }) {
  const bullets = on(lines, 'goals.bullets');
  if (bullets.length === 0) return <Unchanged title="Retirement & Goals" />;
  const firm = { id: 'view', stockComp: analysis.firmStockComp };
  return (
    <section className="section" aria-label="Retirement & Goals">
      <h2>Retirement & Goals</h2>
      <ProjectionChart points={projection(household, firm)} goals={household.goals} />
      <RetirementFigure household={household} firm={firm} />
      <Bullets lines={bullets} label="Vests and goals" />
    </section>
  );
}

/** AC-D-11: a figure read from the projection carries its label when it includes vests. */
function RetirementFigure({ household, firm }: { household: Household; firm: Firm }) {
  const f = projectedFigure(household, firm);
  return (
    <p className="figure" aria-label="Projected net worth figure">
      {projectedFigureText(household, firm)}
      {f.label && <><span className="small"> · {f.label}</span><Mark kind="changed" why="Every figure read from the projection includes future vests, as wages of their year (AC-D-11, D-106)." /></>}
    </p>
  );
}

/** F-C: Savings & Expenses carries the vest bullets, the tax on each vest and its look-into. */
function SavingsSection({ lines }: { lines: ReportLine[] }) {
  const scene = useContext(NewLines);
  const bullets = on(lines, 'savings.bullets');
  if (bullets.length === 0) return <Unchanged title="Savings & Expenses" />;
  const perVest = on(lines, 'savings.vestTax');
  const groups = [...new Set(perVest.filter((l) => l.group).map((l) => l.group!))];
  const look = on(lines, 'savings.lookInto');
  return (
    <section className="section" aria-label="Savings & Expenses">
      <h2>Savings & Expenses</h2>
      <p className="caps">Income flow: unchanged, as today</p>
      <Bullets lines={bullets} label="Vests by year" />
      <details className="grantblock" aria-label="Tax on each vest" open={!!scene}>
        <summary><strong>Tax on each vest</strong><Mark kind="new" why="Estimated tax and the gap after withholding, per vest (F-C)." /></summary>
        <Bullets lines={perVest.filter((l) => !l.group)} label="Withholding estimate" />
        {groups.map((g) => (
          <div key={g}>
            <div className="caps">{g}</div>
            <Bullets lines={perVest.filter((l) => l.group === g)} label={g} />
          </div>
        ))}
      </details>
      {look.length > 0 && (
        <div className="lookinto" aria-label="We should look into (savings)">
          <h3>We should look into</h3>
          <Bullets lines={look} label="Look into" />
        </div>
      )}
    </section>
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
  // Areas holding a new reading open by default and carry the dot, so nothing new hides folded.
  const fresh = (area: string) => (area === 'investing' && concLines.length > 0)
    || (area === 'liquidity' && on(lines, 'viewMore.liquidity').length > 0)
    || (area === 'cashFlow' && on(lines, 'viewMore.cashFlow').length > 0);
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
          <details key={a.area} className="area" open={a.area === 'investing' || fresh(a.area)}>
            <summary>
              <span>{AREA_LABEL[a.area]}{fresh(a.area) && <TabDot kind="new" />}</span>
              <span>{Math.round(a.points)} / {a.available}</span>
            </summary>
            <ul className="checks">
              {Object.keys(a.checks).map((c) => (
                <li key={c}>
                  {CHECK_LABEL[c] ?? c}
                  {c === 'nearTermCommitments' && on(lines, 'viewMore.liquidity').length > 0 && (
                    <ul aria-label="Near-term commitments reading">
                      {on(lines, 'viewMore.liquidity').map((l) => <li key={l.id} data-line={l.id}>{l.text}<Mark kind="new" why={`Requirement ${l.ac} in the spec`} /></li>)}
                    </ul>
                  )}
                  {c === 'savingsRate' && on(lines, 'viewMore.cashFlow').length > 0 && (
                    <ul aria-label="Savings rate reading">
                      {on(lines, 'viewMore.cashFlow').map((l) => <li key={l.id} data-line={l.id}>{l.text}<Mark kind="new" why={`Requirement ${l.ac} in the spec`} /></li>)}
                    </ul>
                  )}
                  {c === 'concentration' && (
                    <ul aria-label="Concentration reading">
                      {concLines.length === 0 && conc.largest && (
                        <li>{conc.largest.position.ticker ?? conc.largest.position.name} is about {pct(conc.largest.share)} of investable assets.</li>
                      )}
                      {concLines.map((l) => <li key={l.id} data-line={l.id}>{l.text}<Mark kind="new" why={`Requirement ${l.ac} in the spec`} /></li>)}
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
  const ed = useContext(Edits);
  const lines = visibleLines(analysis, mode, ed?.edits);
  const s = analysis.score.score + (household.manualAdjustment?.points ?? 0);
  const investments = household.accounts.flatMap((a) => a.positions).reduce((t, p) => t + (p.value ?? 0), 0);
  const lookInto = on(lines, 'assets.lookInto');
  return (
    <div className={mode === 'print' ? 'print' : undefined}>
      <div className="hero">
        <div className="meta">{household.name} · Analysis of {dateLabel(analysis.analysisDate)}</div>
        <h1>Financial health</h1>
        <div className={`score ${scoreColour(s)}`} aria-label="Score">{s}</div>
        {household.manualAdjustment && mode === 'advisor' && <div className="meta">Includes a manual adjustment of {household.manualAdjustment.points > 0 ? '+' : ''}{household.manualAdjustment.points}: {household.manualAdjustment.reason}</div>}
        {mode !== 'print' && <button className="link" onClick={() => setPanel(true)}>View more{lines.some((l) => l.surface.startsWith('viewMore.')) && <TabDot kind="new" />}</button>}
      </div>
      <main>
        <section className="section" aria-label="Summary">
          <h2>Summary</h2>
          <div className="caps">Recommendations</div>
          <ul className="bullets" aria-label="Recommendations">
            <li>Other recommendations: unchanged, as today (SIMULATED).</li>
            {on(lines, 'summary.candidates').map((l) => <Line key={l.id} l={l} />)}
          </ul>
        </section>
        <GoalsSection household={household} analysis={analysis} lines={lines} />
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
        <SavingsSection lines={lines} />
        <Unchanged title="Insurance & Protection" />
        {mode === 'print' && [...on(lines, 'viewMore.concentration'), ...on(lines, 'viewMore.liquidity'), ...on(lines, 'viewMore.cashFlow')].length > 0 && (
          <section className="section" aria-label="Score breakdown">
            <h2>Score breakdown</h2>
            <Bullets lines={[...on(lines, 'viewMore.concentration'), ...on(lines, 'viewMore.liquidity'), ...on(lines, 'viewMore.cashFlow')]} label="Score readings" />
          </section>
        )}
      </main>
      {panel && <ViewMore analysis={analysis} household={household} lines={lines} onClose={() => setPanel(false)} />}
    </div>
  );
}

/** Statements tab: only the cash flow line of AC-C-26 is new. */
export function Statements({ analysis, mode }: { analysis: Analysis; mode: Mode }) {
  const l = on(visibleLines(analysis, mode, useContext(Edits)?.edits), 'statements.cashflow');
  return (
    <main>
      <section className="section" aria-label="Cash flow statement">
        <h2>Cash flow statement</h2>
        <p className="caps">Inflows, taxes, outflows and totals: unchanged, as today</p>
        <Bullets lines={l} label="Below the totals" />
      </section>
    </main>
  );
}
