// "Start here" and the guided scenes (D-065, D-117): the prototype explains itself to someone who
// did not build it. Each scene is a guided walk on the live prototype, in flow order.
import { useState } from 'react';
import { App } from './App';
import { Evidence } from './Evidence';
import { FlowRail } from './Guide';
import { StoryView } from './Story';
import { STORY_EXISTING, STORY_GAP, STORY_GOAL, STORY_PSU, STORY_RSU, type Story } from '../model/stories';

/** The scenes in flow order (D-117): guided walks on the live prototype. */
const TOUR: Story[] = [STORY_RSU, STORY_GAP, STORY_GOAL, STORY_PSU, STORY_EXISTING];

export function Root() {
  const [at, setAt] = useState<number | 'start' | 'explore' | 'evidence'>('start');

  if (at === 'evidence') return <><div className="sim-banner"><strong>SIMULATED prototype · not Sherpas code or data</strong></div><Evidence onBack={() => setAt('start')} /></>;
  if (at === 'explore') {
    return (
      <>
        <div className="scenebar"><div className="inner"><div className="row">
          <button className="link" onClick={() => setAt('start')}>← Start here</button>
          <span className="caps">Explore freely: pick a household, switch between the client view, advisor mode and the shared PDF, and turn the firm setting on or off.</span>
        </div></div></div>
        <App />
      </>
    );
  }
  if (typeof at === 'number') {
    return <StoryView key={at} story={TOUR[at - 1]} pos={at} total={TOUR.length} onNav={setAt} />;
  }
  return (
    <>
      <div className="sim-banner"><strong>SIMULATED prototype · not Sherpas code or data</strong></div>
      <div className="start" aria-label="Start here">
        <div className="caps">Start here</div>
        <h1>Stock compensation in the Financial Health analysis</h1>
        <p className="lead">Many clients receive stock compensation. Today the analysis cannot see it: shares of the employer split across accounts look small, grants that have not vested have no place, and the tax due when they vest is a surprise.</p>
        <p>This prototype shows what changes for the client and the advisor in five scenes, in the order things happen; in each you click through the real screens. Every figure is SIMULATED; the screens imitate the platform only where something changes. It is a reference implementation of the spec, not production code: each new line is linked to the requirement that defines it, and each requirement to its test.</p>
        <FlowRail big />
        <p className="caps">Every step is in the prototype; the firm setting is a switch in "Explore freely".</p>
        <ol className="scenelist">
          {TOUR.map((e, i) => (
            <li key={e.title}>
              <button onClick={() => setAt(i + 1)}>
                <span className="n">{i + 1}</span>
                <span>{e.title}</span>
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
