// A guided scene on the live prototype (D-117): a bar with the step, what to do and how the model
// changes, over the real App. "Next step" switches view and tab; what the reader did carries over.
import { useEffect, useState } from 'react';
import { analyze, type Analysis } from '../model/analysis';
import { money, pct } from '../model/format';
import { countedFutureVests } from '../model/grants';
import type { MetricKey, Story } from '../model/stories';
import { projectedFigure } from '../model/projection';
import type { Firm, Household } from '../model/types';
import { App } from './App';
import { GuideStrip } from './Guide';
import { SceneDetail } from './SceneDetail';
import { SCENES } from '../model/scenes';

const FIRM: Firm = { id: 'firm-sim', stockComp: true };

const area = (a: Analysis, name: string) => {
  const x = a.score.areas.find((r) => r.area === name)!;
  return `${Math.round(x.points)} / ${x.available}`;
};

const METRICS: Record<MetricKey, { label: string; value: (h: Household, a: Analysis) => string }> = {
  score: { label: 'Score', value: (h, a) => String(a.score.score + (h.manualAdjustment?.points ?? 0)) },
  concentration: { label: 'Concentration check reads', value: (_, a) => pct(a.score.concentration.figure) },
  vests: { label: 'Future vests listed', value: (h) => { const v = countedFutureVests(h, FIRM); return `${v.length} · ${money(v.reduce((s, x) => s + x.value, 0))}`; } },
  taxGap: { label: 'Tax gap counted (next 12 months)', value: (_, a) => money(a.score.liquidity.vestGaps) },
  liquidity: { label: 'Liquidity area', value: (_, a) => area(a, 'liquidity') },
  projected: { label: 'Projected net worth', value: (h) => { const f = projectedFigure(h, FIRM); return `${f.year} · ${money(f.value)}`; } },
};
const DEFAULT_KEYS: MetricKey[] = ['score', 'concentration', 'vests', 'taxGap'];

export function StoryView({ story, pos, total, onNav }: { story: Story; pos: number; total: number; onNav: (n: number | 'start') => void }) {
  const [i, setI] = useState(0);
  const [now, setNow] = useState<{ h: Household; a: Analysis } | null>(null);
  const [done, setDone] = useState<Record<number, number>>({});
  const step = story.steps[i];
  useEffect(() => { window.scrollTo?.(0, 0); }, [i]);
  const base = story.baseline?.household ?? story.household;
  const start = analyze(base, FIRM);
  return (
    <>
      <div className="scenebar" role="region" aria-label="Scene">
        <div className="inner">
          <div className="row">
            <button className="link" onClick={() => onNav('start')}>← Start here</button>
            <span className="caps">Scene {pos} of {total} · SIMULATED household · Step {i + 1} of {story.steps.length}</span>
          </div>
          <h2>{story.title}</h2>
          <GuideStrip guide={step.guide} />
          {step.showMoved && now && (
            <div className="keynums" aria-label="Key numbers">
              {(story.keys ?? DEFAULT_KEYS).map((key) => METRICS[key]).map((k) => {
                const b = k.value(base, start);
                const a = k.value(now.h, now.a);
                return (
                  <div className="card" key={k.label}>
                    <div className="caps">{k.label}</div>
                    <div className="v">{a}</div>
                    <div className="delta">{a === b ? 'unchanged' : story.baseline ? `${story.baseline.label}: ${b}` : `was ${b}`}</div>
                  </div>
                );
              })}
            </div>
          )}
          {story.calculation && (
            <details className="calc">
              <summary>How it is computed (inputs and calculation, SIMULATED)</summary>
              {story.calculation.map((id) => <SceneDetail key={id} scene={SCENES[id - 1]} />)}
            </details>
          )}
          <div className="row">
            {step.act && (done[i]
              ? <span className="caps">Done: {step.act.label}</span>
              : <button className="btn" onClick={() => setDone({ ...done, [i]: Date.now() })}>Do it: {step.act.label}</button>)}
            {i > 0 && <button className="btn secondary" onClick={() => setI(i - 1)}>← Previous step</button>}
            {i < story.steps.length - 1 && <button className={step.act && !done[i] ? 'btn secondary' : 'btn'} onClick={() => setI(i + 1)}>Next step →</button>}
            {i === story.steps.length - 1 && pos < total && <button className="btn" onClick={() => onNav(pos + 1)}>Next scene →</button>}
          </div>
        </div>
      </div>
      <App households={[story.household]} initialHousehold={story.household.id}
        steer={{ mode: step.mode, tab: step.tab, step: i, questionnaire: step.questionnaire,
          run: step.act && done[i] ? { id: done[i], kind: step.act.kind, document: step.act.document, grant: step.act.grant } : undefined }}
        onState={(h, a) => setNow({ h, a })} />
    </>
  );
}
