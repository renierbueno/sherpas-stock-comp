// The flow map of "Start here" and the guide strip on top of every screen and scene.
import { FLOW, type Guide } from '../model/guide';

/** The five steps as one row; lit steps are the ones this screen shows. */
export function FlowRail({ lit, big = false }: { lit?: number[]; big?: boolean }) {
  return (
    <div className={big ? 'flowrail big' : 'flowrail'} role="group" aria-label="Where this is in the flow">
      {FLOW.map((s, i) => {
        const on = !lit || lit.includes(s.step);
        const here = lit?.[0] === s.step;
        return (
          <span key={s.step} className="flowstep-wrap">
            {i > 0 && <span className="flowarrow" aria-hidden>→</span>}
            <span className={`flowstep${on ? ' on' : ''}${here ? ' here' : ''}`} aria-current={here ? 'step' : undefined}>
              <span className="n">{s.step}</span>
              <span>
                <span className="who">{s.who}</span>
                {big && <span className="what">{s.what}</span>}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function GuideStrip({ guide }: { guide: Guide }) {
  return (
    <div className="guide" role="region" aria-label="Guide">
      <div className="guide-inner">
        <FlowRail lit={guide.steps} />
        <dl>
          {guide.doThis && <><dt>Do this</dt><dd className="dothis">{guide.doThis}</dd></>}
          <dt>What you see</dt><dd>{guide.see}</dd>
          <dt>Model</dt><dd>{guide.model}</dd>
        </dl>
        {guide.why && (
          <details>
            <summary>Why</summary>
            {guide.why.split('\n').map((l) => <p key={l}>{l}</p>)}
          </details>
        )}
      </div>
    </div>
  );
}

/** NEW or CHANGED next to an element the feature adds or changes; the reason shows on hover. */
export function Mark({ kind, why }: { kind: 'new' | 'changed'; why: string }) {
  return <span className={`mark ${kind}`} title={why} aria-hidden>{kind === 'new' ? 'NEW' : 'CHANGED'}</span>;
}

/** A dot on a tab that holds something new (yellow) or changed (orange). */
export function TabDot({ kind }: { kind: 'new' | 'changed' }) {
  return <span className={`tabdot ${kind}`} title={kind === 'new' ? 'Something new in this tab' : 'Something changed in this tab'} aria-hidden />;
}
