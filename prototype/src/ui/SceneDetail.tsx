// Inputs and calculation of each guided scene (D-071). Every number is read from the model at
// render time, so the explanation cannot drift from what the prototype computes.
import { analyze } from '../model/analysis';
import { employerExposures, heldPositions, investableAssets, largestPosition } from '../model/exposure';
import { dateLabel, money, pct } from '../model/format';
import { countedFutureVests, netWorth } from '../model/grants';
import { priceOf } from '../model/market';
import type { Scene } from '../model/scenes';
import type { Firm, Household } from '../model/types';
import { vestTaxes } from '../model/vestTax';

const FIRM: Firm = { id: 'firm-sim', stockComp: true };
const check = (h: Household, name: string) => Math.round(analyze(h, FIRM).score.areas.flatMap((a) => Object.entries(a.checks)).find(([c]) => c === name)![1]);

function Holdings({ h, mark }: { h: Household; mark: (ticker?: string) => boolean }) {
  const base = investableAssets(h);
  return (
    <table aria-label="Holdings">
      <thead><tr><th>Account</th><th>Holding</th><th>Value</th><th>Share of investable assets</th></tr></thead>
      <tbody>
        {heldPositions(h).map(({ account, position }) => (
          <tr key={position.id} className={mark(position.ticker) ? 'hl' : undefined}>
            <td>{account.name} ({account.type})</td>
            <td>{position.name}</td>
            <td>{position.value === null ? 'no price' : money(position.value)}</td>
            <td>{position.value === null ? '' : pct(position.value / base)}</td>
          </tr>
        ))}
        <tr><td>Cash</td><td /><td>{money(h.cash)}</td><td>{pct(h.cash / base)}</td></tr>
        <tr><td colSpan={2}><strong>Investable assets</strong></td><td><strong>{money(base)}</strong></td><td>100%</td></tr>
      </tbody>
    </table>
  );
}

function Steps({ steps }: { steps: [string, string?][] }) {
  return (
    <ol className="steps" aria-label="How it is computed">
      {steps.map(([text, ref], i) => <li key={i}>{text}{ref && <span className="ref">{ref}</span>}</li>)}
    </ol>
  );
}

function Scene1({ scene }: { scene: Scene }) {
  const h = scene.after;
  const base = investableAssets(h);
  const today = largestPosition(scene.before)!;
  const [e] = employerExposures(h, FIRM);
  const parts = heldPositions(h).filter(({ position }) => position.ticker === e.employer.ticker).map(({ position }) => position.value ?? 0);
  return (
    <>
      <h3>The household (inputs, SIMULATED)</h3>
      <Holdings h={h} mark={(t) => t === e.employer.ticker} />
      <h3>How it is computed</h3>
      <Steps steps={[
        [`Today: the largest single holding is the ${today.position.name}: ${money(today.position.value!)} / ${money(base)} = ${pct(today.share)}.`],
        [`New: Halden positions flagged as employer stock are summed across accounts: ${parts.map(money).join(' + ')} = ${money(e.value)}; ${money(e.value)} / ${money(base)} = ${pct(e.share)}.`, 'AC-A-04'],
        [`The concentration check reads the larger of the two: ${pct(Math.max(today.share, e.share))}.`, 'AC-A-09'],
        [`On the existing curve (P-CONC, SIMULATED), the check goes from ${check(scene.before, 'concentration')} to ${check(h, 'concentration')} out of 100. It is one of four checks in Investing, worth 15 of the 100 points.`, 'AC-A-10'],
      ]} />
    </>
  );
}

function Scene2({ scene }: { scene: Scene }) {
  const h = scene.after;
  const g = h.grants[0];
  const price = priceOf(h.employers.find((e) => e.id === g.employerId)?.ticker)!;
  const future = countedFutureVests(h, FIRM);
  const units = future.reduce((s, v) => s + v.tranche.units, 0);
  const value = future.reduce((s, v) => s + v.value, 0);
  const base = investableAssets(h);
  return (
    <>
      <h3>The grant (inputs, SIMULATED)</h3>
      <p className="small">{h.people.find((p) => p.id === g.ownerId)?.name} · {g.type} · Halden Robotics · {g.units?.toLocaleString('en-US')} units granted {dateLabel(g.grantDate!)} · four years, quarterly, one-year cliff · price at the analysis date {money(price)} per share (SIMULATED)</p>
      <table aria-label="Tranches">
        <thead><tr><th>Vest date</th><th>Units</th><th>Status on {dateLabel(h.analysisDate)}</th><th>Value at today’s price</th></tr></thead>
        <tbody>
          {g.tranches.map((t) => (
            <tr key={t.id} className={t.date > h.analysisDate ? 'hl' : undefined}>
              <td>{dateLabel(t.date)}</td><td>{t.units.toLocaleString('en-US')}</td>
              <td>{t.date > h.analysisDate ? 'future: counted' : 'vested: shares recorded as a held position'}</td>
              <td>{money(t.units * price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>How it is computed</h3>
      <Steps steps={[
        ['Tranches dated on or before the analysis date are left out of the figures; the advisor is prompted to record the shares kept.', 'AC-B-11, AC-B-12'],
        [`Future tranches: ${future.length}, ${units.toLocaleString('en-US')} units × ${money(price)} = ${money(value)}, listed in their own block.`, 'AC-B-23'],
        [`Net worth stays ${money(netWorth(h))} with or without the grant: unvested units are not owned yet.`, 'AC-B-22'],
        [`If every grant vests, Halden would be (0 + ${money(value)}) / (${money(base)} + ${money(value)}) = ${pct(value / (base + value))} of investable assets.`, 'AC-A-18'],
      ]} />
    </>
  );
}

function Scene3({ scene }: { scene: Scene }) {
  const h = scene.after;
  const [t] = vestTaxes(h, FIRM);
  const a = analyze(h, FIRM).score.liquidity;
  return (
    <>
      <h3>The household (inputs, SIMULATED)</h3>
      <p className="small">
        Salaries: {h.people.map((p) => `${p.name} ${money(h.salary[p.id] ?? 0)}`).join(', ')} · filing jointly · state income tax {pct(h.stateTaxRate)} (SIMULATED) ·
        federal brackets SIMULATED (not real tax rules) · cash {money(h.cash)} · near-term commitments already on file {money(h.nearTermCommitments)} ·
        vest on {dateLabel(t.vest.tranche.date)}: {t.vest.tranche.units.toLocaleString('en-US')} units × {money(t.vest.value / t.vest.tranche.units)} = {money(t.vest.value)}
      </p>
      <h3>How it is computed</h3>
      <Steps steps={[
        [`Federal tax owed on the vest = household tax with the vest − without it = ${money(t.owed.federal)}.`, 'AC-C-03'],
        [`Estimated federal withholding = 22% × ${money(t.vest.value)} = ${money(t.withheldFederal)}.`, 'AC-C-05'],
        [`Federal gap = ${money(t.owed.federal)} − ${money(t.withheldFederal)} = ${money(t.federalGap)}.`, 'AC-C-10'],
        [`State tax ${money(t.owed.state)}: no state withholding entered, so it is shown but not counted in the gap.`, 'AC-C-12, AC-C-18'],
        [`Near-term commitments = ${money(h.nearTermCommitments)} + ${money(a.vestGaps)} = ${money(a.commitments)}; cash covers ${(h.cash / a.commitments).toFixed(2)}× (was ${(h.cash / h.nearTermCommitments).toFixed(2)}×).`, 'AC-C-17'],
        [`On the curve P-LIQ (SIMULATED), the check goes from ${check(scene.before, 'nearTermCommitments')} to ${check(h, 'nearTermCommitments')} out of 100. Savings rate and debt checks read reported income and do not move.`, 'AC-G-16'],
      ]} />
    </>
  );
}

export function SceneDetail({ scene }: { scene: Scene }) {
  const body = scene.id === 1 ? <Scene1 scene={scene} /> : scene.id === 2 ? <Scene2 scene={scene} /> : scene.id === 3 ? <Scene3 scene={scene} /> : null;
  if (!body) return null;
  return <main><section className="section detail" aria-label="Inputs and calculation">{body}</section></main>;
}
