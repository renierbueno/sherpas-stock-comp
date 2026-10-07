// "Start here" and the guided scenes (D-065): the prototype explains itself to someone who did
// not build it. Each scene shows the client's shared view before and after, with new lines marked.
import { useState } from 'react';
import { analyze, sharedLines, type Analysis } from '../model/analysis';
import { money, pct } from '../model/format';
import { countedFutureVests, netWorth } from '../model/grants';
import { projection, vestInflows } from '../model/projection';
import { SCENES, type Scene } from '../model/scenes';
import type { Firm, Household } from '../model/types';
import { App } from './App';
import { FinancialHealth, NewLines } from './FinancialHealth';
import { SceneDetail } from './SceneDetail';
import { Evidence } from './Evidence';
import { FlowRail, GuideStrip } from './Guide';

const FIRM: Firm = { id: 'firm-sim', stockComp: true };

interface KeyNumber { label: string; value: (h: Household, a: Analysis) => string }

const area = (a: Analysis, name: string) => {
  const x = a.score.areas.find((r) => r.area === name)!;
  return `${Math.round(x.points)} / ${x.available}`;
};

const KEYS: Record<number, KeyNumber[]> = {
  1: [
    { label: 'Concentration check reads', value: (_, a) => pct(a.score.concentration.figure) },
    { label: 'Investing area', value: (_, a) => area(a, 'investing') },
    { label: 'Score', value: (_, a) => String(a.score.score) },
  ],
  2: [
    { label: 'Future vests listed', value: (h) => { const v = countedFutureVests(h, FIRM); return `${v.length} · ${money(v.reduce((s, x) => s + x.value, 0))}`; } },
    { label: 'Net worth', value: (h) => money(netWorth(h)) },
    { label: 'Score', value: (_, a) => String(a.score.score) },
  ],
  3: [
    { label: 'Tax gap counted (next 12 months)', value: (_, a) => money(a.score.liquidity.vestGaps) },
    { label: 'Near-term commitments', value: (_, a) => money(a.score.liquidity.commitments) },
    { label: 'Liquidity area', value: (_, a) => area(a, 'liquidity') },
  ],
  4: [
    { label: 'Vests after tax, by 2028', value: (h) => money(vestInflows(h, FIRM).filter((i) => i.date < '2029').reduce((s, i) => s + i.after, 0)) },
    { label: 'Projected net worth, 2028', value: (h) => money(projection(h, FIRM).find((p) => p.year === 2028)!.netWorth) },
    { label: 'Score', value: (_, a) => String(a.score.score) },
  ],
  5: [],
};

function SceneView({ scene, onNav, onTry }: { scene: Scene; onNav: (n: number | 'start' | 'evidence') => void; onTry: () => void }) {
  const [after, setAfter] = useState(true);
  const before = analyze(scene.before, FIRM);
  const now = analyze(scene.after, FIRM);
  const known = new Set(sharedLines(before).map((l) => l.id));
  const freshLines = sharedLines(now).filter((l) => !known.has(l.id));
  const fresh = new Set(freshLines.map((l) => l.id));
  // Lines that live in other tabs: named, since the scene shows the Financial health view.
  const ELSEWHERE: Record<string, string> = { 'investment.snapshot': 'the Investment analysis tab', 'statements.cashflow': 'the cash flow statement' };
  const elsewhere = [...new Set(freshLines.filter((l) => ELSEWHERE[l.surface]).map((l) => ELSEWHERE[l.surface]))];
  const here = freshLines.filter((l) => !ELSEWHERE[l.surface]).length;
  const shown = after ? now : before;
  const household = after ? scene.after : scene.before;
  return (
    <>
      <div className="scenebar" role="region" aria-label="Scene">
        <div className="inner">
          <div className="row">
            <button className="link" onClick={() => onNav('start')}>← Start here</button>
            <span className="caps">Scene {scene.id} of {SCENES.length} · {scene.feature} · SIMULATED household</span>
          </div>
          <h2>{scene.title}</h2>
          <GuideStrip guide={{ ...scene.guide, why: `Today: ${scene.problem}\nWith the change: ${scene.advisorDid}\n${scene.lookAt}` }} />
          <div className="row">
            <div className="toggle" role="group" aria-label="Before or after">
              <button aria-pressed={!after} onClick={() => setAfter(false)}>Before (today)</button>
              <button aria-pressed={after} onClick={() => setAfter(true)}>After</button>
            </div>
            {after && fresh.size > 0 && <span className="newbadge">New</span>}
            {after && <span className="caps">{here} new lines below, marked with the requirement that defines them{elsewhere.length > 0 && `; also new in ${elsewhere.join(' and ')}`}</span>}
          </div>
          {KEYS[scene.id].length > 0 && (
            <div className="keynums" aria-label="Key numbers">
              {KEYS[scene.id].map((k) => {
                const b = k.value(scene.before, before);
                const a = k.value(scene.after, now);
                return (
                  <div className="card" key={k.label}>
                    <div className="caps">{k.label}</div>
                    <div className="v">{after ? a : b}</div>
                    {after && <div className="delta">{a === b ? 'unchanged' : `was ${b}`}</div>}
                  </div>
                );
              })}
            </div>
          )}
          <div className="row">
            {scene.id > 1 && <button className="btn secondary" onClick={() => onNav(scene.id - 1)}>← Previous</button>}
            {scene.id < SCENES.length && <button className="btn" onClick={() => onNav(scene.id + 1)}>Next scene →</button>}
            <button className="link" onClick={onTry}>Try it yourself</button>
            <button className="link" onClick={() => onNav('evidence')}>How we know it works</button>
            <span className="caps">Spec: {scene.spec}</span>
          </div>
        </div>
      </div>
      {scene.ready && <SceneDetail scene={scene} />}
      {scene.ready && <div className="divider"><span>The client's view and the shared PDF {after ? '(after)' : '(before, as today)'}</span></div>}
      {scene.ready ? (
        <NewLines.Provider value={after ? fresh : new Set()}>
          <FinancialHealth household={household} analysis={shown} mode="print" />
        </NewLines.Provider>
      ) : (
        <main><section className="section unchanged"><h2>Screens for this scene come later in the build</h2><div>The model and its tests are done; see the spec file above.</div></section></main>
      )}
    </>
  );
}

export function Root() {
  const [at, setAt] = useState<number | 'start' | 'explore' | 'evidence'>('start');
  const [tryIt, setTryIt] = useState<{ household: string; mode: 'client' | 'advisor' }>({ household: 'H2', mode: 'client' });

  if (at === 'evidence') return <><div className="sim-banner"><strong>SIMULATED prototype · not Sherpas code or data</strong></div><Evidence onBack={() => setAt('start')} /></>;
  if (at === 'explore') {
    return (
      <>
        <div className="scenebar"><div className="inner"><div className="row">
          <button className="link" onClick={() => setAt('start')}>← Start here</button>
          <span className="caps">Explore freely: pick a household, switch between the client view, advisor mode and the shared PDF, and turn the firm setting on or off.</span>
        </div></div></div>
        <App key={`${tryIt.household}-${tryIt.mode}`} initialHousehold={tryIt.household} initialMode={tryIt.mode} />
      </>
    );
  }
  if (typeof at === 'number') {
    const scene = SCENES[at - 1];
    return <SceneView key={at} scene={scene} onNav={setAt} onTry={() => { setTryIt(scene.tryIt); setAt('explore'); }} />;
  }
  return (
    <>
      <div className="sim-banner"><strong>SIMULATED prototype · not Sherpas code or data</strong></div>
      <div className="start" aria-label="Start here">
        <div className="caps">Start here</div>
        <h1>Stock compensation in the Financial Health analysis</h1>
        <p className="lead">Many clients receive stock compensation. Today the analysis cannot see it: shares of the employer split across accounts look small, grants that have not vested have no place, and the tax due when they vest is a surprise.</p>
        <p>This prototype shows what changes for the advisor and the client, five scenes of about a minute each. Every figure is SIMULATED; the screens imitate the platform only where something changes. It is a reference implementation of the spec, not production code: each new line is linked to the requirement that defines it, and each requirement to its test.</p>
        <FlowRail big />
        <p className="caps">Every step is in the prototype; the firm setting is a switch in "Explore freely".</p>
        <ol className="scenelist">
          {SCENES.map((s) => (
            <li key={s.id}>
              <button onClick={() => setAt(s.id)}>
                <span className="n">{s.id}</span>
                <span>{s.title}</span>
                {!s.ready && <span className="soon">model and tests ready, screens later</span>}
              </button>
            </li>
          ))}
        </ol>
        <div className="row">
          <button className="btn secondary" onClick={() => setAt('explore')}>Explore freely →</button>
          <button className="btn secondary" onClick={() => setAt('evidence')}>How we know it works →</button>
        </div>
      </div>
    </>
  );
}
