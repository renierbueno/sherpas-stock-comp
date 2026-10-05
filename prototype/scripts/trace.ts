// Traceability: every AC and EV of the spec against the tests whose titles name it.
// Usage: npm run trace            (prints the table; pending allowed while building)
//        npm run trace -- --strict (fails if any criterion is pending)
//        npm run trace -- --md     (markdown for docs/spec/00_index.md)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { SPEC_ONLY } from '../src/model/scope';

const root = join(import.meta.dirname, '..');
const specDir = join(root, '..', 'docs', 'spec');
const testDirs = ['tests/unit', 'tests/component', 'e2e'].map((d) => join(root, d));

const ids = new Map<string, string>(); // id -> feature
for (const f of readdirSync(specDir).filter((f) => f.endsWith('.md'))) {
  for (const m of readFileSync(join(specDir, f), 'utf8').matchAll(/^\| ((?:AC|EV)-([A-Z])-\d+) \|/gm)) ids.set(m[1], m[2]);
}

const tests = new Map<string, string[]>(); // id -> test references
for (const dir of testDirs) {
  let files: string[] = [];
  try { files = readdirSync(dir).filter((f) => /\.(test|spec)\.tsx?$/.test(f)); } catch { continue; }
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/\b(?:it|test)\(\s*['"`]([^'"`]+)['"`]/g)) {
      const title = m[1];
      const kind = dir.endsWith('e2e') ? 'e2e' : dir.endsWith('component') ? 'component' : 'unit';
      for (const id of title.match(/\b(?:AC|EV)-[A-Z]-\d+\b/g) ?? []) {
        tests.set(id, [...(tests.get(id) ?? []), `${kind}:${f.replace(/\.(test|spec)\.tsx?$/, '')} "${title.split(' · ').pop()}"`]);
      }
    }
  }
}

const args = process.argv.slice(2);
const order = ['G', 'A', 'B', 'C', 'D', 'E', 'F'];
const rows = [...ids.entries()].sort(([a, fa], [b, fb]) => order.indexOf(fa) - order.indexOf(fb) || a.localeCompare(b, 'en', { numeric: true }));
let pending = 0;
const counts = { tested: 0, specOnly: 0, pending: 0 };
const out: string[] = args.includes('--md') ? ['| Feature | ID | Tests | Status |', '|---|---|---|---|'] : [];
for (const [id, feature] of rows) {
  const t = tests.get(id);
  const status = t ? 'tested' : SPEC_ONLY[id] ? `spec only: ${SPEC_ONLY[id]}` : 'pending';
  if (t) counts.tested++; else if (SPEC_ONLY[id]) counts.specOnly++; else { counts.pending++; pending++; }
  const refs = t ? [...new Set(t.map((r) => r.split(' "')[0]))].join(', ') : '';
  out.push(args.includes('--md') ? `| F-${feature} | ${id} | ${refs} | ${t ? 'tested' : status} |` : `${id.padEnd(8)} ${status.padEnd(9)} ${refs}`);
}
console.log(out.join('\n'));
console.log(`\n${ids.size} criteria and events · ${counts.tested} tested · ${counts.specOnly} spec only · ${counts.pending} pending`);
const unknown = [...tests.keys()].filter((id) => !ids.has(id));
if (unknown.length) { console.error(`Test titles name IDs not in the spec: ${unknown.join(', ')}`); process.exit(1); }
if (args.includes('--strict') && pending > 0) process.exit(1);
