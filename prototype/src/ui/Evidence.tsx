// "How we know it works" (D-071): read from src/generated/evidence.json, written by
// `npm run evidence` from the last real test run. Nothing on this page is typed by hand.
import evidence from '../generated/evidence.json';

const when = new Date(evidence.generatedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });

export function Evidence({ onBack }: { onBack: () => void }) {
  const t = evidence.totals;
  const features = Object.entries(evidence.features);
  return (
    <div className="start evidence" aria-label="How we know it works">
      <button className="link" onClick={onBack}>← Start here</button>
      <h1>How we know it works</h1>
      <p className="lead">Generated from the last test run, {when}. Each requirement of the spec is listed with the tests that name it and whether they passed.</p>
      <div className="keynums">
        <div className="card"><div className="caps">Tests passing</div><div className="v">{t.passed} of {t.tests}</div><div className="delta">{t.unit} model · {t.component} screen · {t.e2e} browser walk</div></div>
        <div className="card"><div className="caps">Requirements with a passing test</div><div className="v">{t.withPassingTest} of {t.requirements}</div><div className="delta">{t.notTestable} not testable · {t.noTestYet} not built yet</div></div>
      </div>
      <div className="section" style={{ marginTop: 16 }}>
        <h2>What this proves, and what it does not</h2>
        <ul className="bullets">
          <li><strong>Proves:</strong> the prototype does what each tested requirement says, on SIMULATED households, including the examples written in the spec (for example, employer stock split across two accounts reads 30%, not 20%).</li>
          <li><strong>Proves:</strong> the relations below hold. They are what the change must never break, whatever Sherpas' real curves are.</li>
          <li><strong>Does not prove:</strong> that Sherpas' unpublished check curves, horizons and thresholds match the SIMULATED ones, or that this tax engine matches the platform's (its 2026 federal brackets, standard deductions and Social Security and Medicare rates are real; the state rate is SIMULATED). Absolute scores and tax amounts here are illustrations.</li>
          <li><strong>Does not prove:</strong> that plan statements can be read automatically: extraction is SIMULATED (riskiest assumption 1).</li>
          <li><strong>Does not replace QA:</strong> QA verifies the production build against the same requirement IDs.</li>
        </ul>
      </div>
      <div className="section" style={{ marginTop: 16 }}>
        <h2>Relations the model keeps</h2>
        <ul className="bullets">
          {evidence.relations.map((r) => <li key={r.title}>{r.status === 'passed' ? '✓' : '✗'} {r.title}</li>)}
        </ul>
      </div>
      {features.map(([key, name]) => {
        const rows = evidence.requirements.filter((r) => r.feature === key);
        const ok = rows.filter((r) => r.status === 'passed').length;
        return (
          <details key={key} className="section" style={{ marginTop: 16 }}>
            <summary><strong>{name}</strong> · {ok} of {rows.length} with a passing test</summary>
            <table>
              <thead><tr><th>ID</th><th>Requirement</th><th>Tests</th><th>Status</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.text}</td>
                    <td>{r.tests.map((x) => <div key={x.title + x.kind}><span className="caps">{x.kind}</span> {x.title}</div>)}</td>
                    <td>{r.status === 'passed' ? '✓ passed' : r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        );
      })}
    </div>
  );
}
