// A guided scene on the live prototype (D-117): a bar with the step, what to do and how the model
// changes, over the real App. "Next step" switches view and tab; what the reader did carries over.
import { useState } from 'react';
import { analyze, type Analysis } from '../model/analysis';
import { money, pct } from '../model/format';
import { countedFutureVests } from '../model/grants';
import type { Story } from '../model/stories';
import type { Firm, Household } from '../model/types';
import { App } from './App';
import { GuideStrip } from './Guide';

const FIRM: Firm = { id: 'firm-sim', stockComp: true };

const MOVED: { label: string; value: (h: Household, a: Analysis) => string }[] = [
  { label: 'Score', value: (_, a) => String(a.score.score) },
  { label: 'Concentration check reads', value: (_, a) => pct(a.score.concentration.figure) },
  { label: 'Future vests listed', value: (h) => { const v = countedFutureVests(h, FIRM); return `${v.length} · ${money(v.reduce((s, x) => s + x.value, 0))}`; } },
  { label: 'Tax gap counted (next 12 months)', value: (_, a) => money(a.score.liquidity.vestGaps) },
];

export function StoryView({ story, pos, total, onNav }: { story: Story; pos: number; total: number; onNav: (n: number | 'start') => void }) {
  const [i, setI] = useState(0);
  const [now, setNow] = useState<{ h: Household; a: Analysis } | null>(null);
  const [done, setDone] = useState<Record<number, number>>({});
  const step = story.steps[i];
  const start = analyze(story.household, FIRM);
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
              {MOVED.map((k) => {
                const b = k.value(story.household, start);
                const a = k.value(now.h, now.a);
                return (
                  <div className="card" key={k.label}>
                    <div className="caps">{k.label}</div>
                    <div className="v">{a}</div>
                    <div className="delta">{a === b ? 'unchanged' : `was ${b}`}</div>
                  </div>
                );
              })}
            </div>
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
          run: step.act && done[i] ? { id: done[i], kind: step.act.kind, document: step.act.document } : undefined }}
        onState={(h, a) => setNow({ h, a })} />
    </>
  );
}
