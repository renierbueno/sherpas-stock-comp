// Builds src/generated/evidence.json from the last real test run (D-071): every requirement and
// event of the spec, the tests that name it and whether they passed. Run with: npm run evidence
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SPEC_ONLY } from '../src/model/scope';

const root = join(import.meta.dirname, '..');
const specDir = join(root, '..', 'docs', 'spec');
const FEATURES: Record<string, string> = {
  G: 'Rules for every feature', A: 'F-A · Employer stock counted in concentration', B: 'F-B · Record a grant and its vests',
  C: 'F-C · Tax at vest and the withholding gap', D: 'F-D · Vest proceeds as dated cash for goals', E: 'F-E · The client reports stock compensation',
  F: 'F-F · Upload a plan statement',
};

interface Run { title: string; status: 'passed' | 'failed'; kind: 'unit' | 'component' | 'e2e' }
const runs: Run[] = [];
const vitest = JSON.parse(readFileSync(join(root, 'evidence', 'vitest.json'), 'utf8'));
for (const file of vitest.testResults) {
  const kind = file.name.includes('/component/') ? 'component' : 'unit';
  for (const a of file.assertionResults) runs.push({ title: a.title, status: a.status === 'passed' ? 'passed' : 'failed', kind });
}
const e2e = JSON.parse(readFileSync(join(root, 'evidence', 'e2e.json'), 'utf8'));
const walk = (suite: any) => { for (const s of suite.specs ?? []) runs.push({ title: s.title, status: s.ok ? 'passed' : 'failed', kind: 'e2e' }); for (const c of suite.suites ?? []) walk(c); };
for (const s of e2e.suites) walk(s);

const requirements: { id: string; feature: string; text: string; tests: { title: string; kind: string; status: string }[]; status: string }[] = [];
const order = ['G', 'A', 'B', 'C', 'D', 'E', 'F'];
for (const f of readdirSync(specDir).filter((f) => f.endsWith('.md'))) {
  for (const m of readFileSync(join(specDir, f), 'utf8').matchAll(/^\| ((?:AC|EV)-([A-Z])-\d+) \| ([^|]*) \|/gm)) {
    const id = m[1];
    const tests = runs.filter((r) => new RegExp(`\\b${id}\\b`).test(r.title)).map((r) => ({ title: r.title.split(' · ').pop()!, kind: r.kind, status: r.status }));
    const status = tests.length ? (tests.every((t) => t.status === 'passed') ? 'passed' : 'failed') : SPEC_ONLY[id] ? `not tested: ${SPEC_ONLY[id]}` : 'no test yet';
    requirements.push({ id, feature: m[2], text: m[3].trim(), tests, status });
  }
}
requirements.sort((a, b) => order.indexOf(a.feature) - order.indexOf(b.feature) || a.id.localeCompare(b.id, 'en', { numeric: true }));

const relations = runs.filter((r) => r.title.startsWith('REL-')).map((r) => ({ title: r.title.replace(/^REL-\w-\d · /, ''), status: r.status }));
const out = {
  generatedAt: new Date().toISOString(),
  features: FEATURES,
  totals: {
    tests: runs.length, passed: runs.filter((r) => r.status === 'passed').length,
    unit: runs.filter((r) => r.kind === 'unit').length, component: runs.filter((r) => r.kind === 'component').length, e2e: runs.filter((r) => r.kind === 'e2e').length,
    requirements: requirements.length, withPassingTest: requirements.filter((r) => r.status === 'passed').length,
    notTestable: requirements.filter((r) => r.status.startsWith('not tested')).length, noTestYet: requirements.filter((r) => r.status === 'no test yet').length,
  },
  relations,
  requirements,
};
writeFileSync(join(root, 'src', 'generated', 'evidence.json'), JSON.stringify(out, null, 1));
console.log(out.totals);
