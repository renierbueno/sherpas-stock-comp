// Cross-document consistency check for docs/ (D-073). Deterministic: no model call.
// Run before every commit with `npm run check` (consistency, tests, build, trace).
// Each check prints PASS or FAIL with the file and line that failed.
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', '..');
const docs = join(root, 'docs');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const specFiles = readdirSync(join(docs, 'spec')).filter((f) => f.endsWith('.md')).map((f) => `docs/spec/${f}`);
const checked = ['docs/03_decision_log.md', 'docs/06_direction.md', 'docs/08_release_notes.md', 'docs/09_enablement.md', 'docs/10_flow_review.md', 'docs/11_storyline.md', ...specFiles];

let failures = 0;
const report = (name: string, problems: string[]) => {
  if (problems.length === 0) console.log(`PASS  ${name}`);
  else {
    failures += problems.length;
    console.log(`FAIL  ${name}`);
    for (const p of problems.slice(0, 20)) console.log(`        ${p}`);
    if (problems.length > 20) console.log(`        ... ${problems.length - 20} more`);
  }
};
const lines = (p: string) => read(p).split('\n').map((text, i) => ({ p, n: i + 1, text }));

// 1. Every decision cited exists in the decision log.
const log = read('docs/03_decision_log.md');
const decisions = new Set([...log.matchAll(/^## (D-\d{3})/gm)].map((m) => m[1]));
report('decisions cited exist in 03_decision_log', checked.flatMap(lines).flatMap(({ p, n, text }) =>
  [...text.matchAll(/\bD-(\d{3})\b/g)].map((m) => `D-${m[1]}`).filter((d) => !decisions.has(d)).map((d) => `${p}:${n} cites ${d}`)));

// 2. Every requirement, edge case and event cited exists as a row in the spec, and no row is defined twice.
const defined = new Map<string, string[]>();
for (const f of specFiles) for (const { n, text } of lines(f)) {
  const m = text.match(/^\| ((?:AC|EC|EV)-[A-Z]-\d{2}) \|/);
  if (m) defined.set(m[1], [...(defined.get(m[1]) ?? []), `${f}:${n}`]);
}
report('spec IDs defined once', [...defined].filter(([, at]) => at.length > 1).map(([id, at]) => `${id} at ${at.join(', ')}`));
report('spec IDs cited exist', checked.flatMap(lines).flatMap(({ p, n, text }) =>
  [...text.matchAll(/\b((?:AC|EC|EV)-[A-Z]-\d{2})\b/g)].map((m) => m[1]).filter((id) => !defined.has(id)).map((id) => `${p}:${n} cites ${id}`)));

// 3. Gaps: one row each, a status, and a resolved gap names a decision that exists.
const gapRows = lines('docs/10_flow_review.md').filter(({ text }) => /^\| GAP-\d{2} \|/.test(text));
const gapStatus = new Map<string, string>();
const gapProblems: string[] = [];
for (const { n, text } of gapRows) {
  const cells = text.split('|').map((c) => c.trim());
  const id = cells[1];
  const status = cells[cells.length - 2];
  if (gapStatus.has(id)) gapProblems.push(`${id} defined twice (line ${n})`);
  gapStatus.set(id, status);
  if (!/^(Resolved|Open|Decision for Renier|Out)/.test(status)) gapProblems.push(`${id} line ${n}: unknown status "${status}"`);
  if (/^Resolved/.test(status) && !/D-\d{3}/.test(status)) gapProblems.push(`${id} line ${n}: resolved without a decision`);
}
report('gaps have one row, a status and a decision when resolved', gapProblems);

// 4. Touchpoints: unique IDs; a line still "not defined yet" points at a gap that is still open.
const tp = lines('docs/10_flow_review.md').filter(({ text }) => text.startsWith('- ') && /\[TP-SF\d{2}/.test(text));
const seen = new Map<string, number>();
const tpProblems: string[] = [];
for (const { n, text } of tp) {
  for (const m of text.matchAll(/\[(TP-SF\d{2}-\d{2})/g)) {
    if (seen.has(m[1])) tpProblems.push(`${m[1]} at lines ${seen.get(m[1])} and ${n}`);
    seen.set(m[1], n);
  }
  if (text.includes('not defined yet')) {
    const gaps = [...text.matchAll(/GAP-\d{2}/g)].map((m) => m[0]);
    if (!gaps.some((g) => (gapStatus.get(g) ?? '').startsWith('Open'))) tpProblems.push(`line ${n}: "not defined yet" but no open gap cited`);
  }
  for (const g of text.matchAll(/GAP-\d{2}/g)) if (!gapStatus.has(g[0])) tpProblems.push(`line ${n}: ${g[0]} has no row`);
}
report('touchpoints unique and in step with their gaps', tpProblems);

// 5. Writing rule: no em dashes in lines added since the last commit (CLAUDE.md, Writing).
const added = execSync(`git -C "${root}" diff -U0 HEAD -- docs .claude/skills`, { encoding: 'utf8' })
  .split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++') && l.includes('—'));
report('no em dashes in added lines', added.map((l) => l.slice(0, 100)));

// 6 to 9. Living documents state the current state (D-087). Reported as WARN until the cleanup of
// step F6.4 (D-081); then they count as failures. History is excluded: the decision log and checks/.
let warnings = 0;
const warn = (name: string, problems: string[]) => {
  if (problems.length === 0) { console.log(`PASS  ${name}`); return; }
  warnings += problems.length;
  console.log(`WARN  ${name} (${problems.length})`);
  for (const p of problems.slice(0, 8)) console.log(`        ${p}`);
  if (problems.length > 8) console.log(`        ... ${problems.length - 8} more`);
};
const walk = (dir: string): string[] => readdirSync(join(root, dir), { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(`${dir}/${d.name}`) : d.name.endsWith('.md') ? [`${dir}/${d.name}`] : []);
const living = [...walk('docs').filter((f) => f !== 'docs/03_decision_log.md' && !f.startsWith('docs/checks/')), 'README.md'];

// 6. Every assumption tag cites an assumption ID (AS-NN) defined in 02_open_questions.
const assumptionIds = new Set([...read('docs/02_open_questions.md').matchAll(/^\| (AS-\d{2}) \|/gm)].map((m) => m[1]));
warn('assumption tags cite an AS-NN listed in 02_open_questions', living.flatMap(lines).flatMap(({ p, n, text }) =>
  [...text.matchAll(/\[ASSUMPTION[^\]]*\]/g)].map((m) => m[0]).filter((t) => !(t.match(/AS-\d{2}/g) ?? []).some((id) => assumptionIds.has(id)))
    .map((t) => `${p}:${n} ${t.slice(0, 60)}`)));

// 7. Nothing is asked of Sherpas any more (D-059).
warn('no questions left for Sherpas (D-059)', living.flatMap(lines).filter(({ p, text }) => p !== 'docs/02_open_questions.md' || !/D-059/.test(text))
  .filter(({ text }) => /asked in `02`|ask Sherpas|confirm with Sherpas|question for Sherpas/i.test(text)).map(({ p, n, text }) => `${p}:${n} ${text.trim().slice(0, 70)}`));

// 8. A decision replaced or superseded in full is not cited as current.
const replaced = new Map<string, string>();
// Only full replacements: "(replaces D-NNN)" or "(supersedes D-NNN)"; partial ones ("supersedes the placement of D-032") stay citable.
for (const m of log.matchAll(/^## (D-\d{3}) [^\n]*\((?:replaces|supersedes) (D-\d{3}(?:, D-\d{3})*)\)/gm)) for (const d of m[2].match(/D-\d{3}/g) ?? []) replaced.set(d, m[1]);
for (const m of log.matchAll(/^## (D-\d{3})[^\n]*\n- What:[^\n]*\(supersedes (D-\d{3})\)/gm)) replaced.set(m[2], m[1]);
warn('replaced decisions not cited as current', living.flatMap(lines).flatMap(({ p, n, text }) =>
  [...replaced].filter(([old, by]) => new RegExp(`\\b${old}\\b`).test(text) && !text.includes(by)).map(([old, by]) => `${p}:${n} cites ${old} (replaced by ${by})`)));

// 9. The README phase table matches the closed checks.
const readme = lines('README.md');
warn('README phases match the closed checks', readdirSync(join(docs, 'checks')).filter((f) => /^check-F\d\.md$/.test(f) && /Ready for gate/.test(read(`docs/checks/${f}`)))
  .map((f) => f.match(/F\d/)![0]).flatMap((ph) => readme.filter(({ text }) => text.startsWith(`| ${ph} `) && !/\| done \|\s*$/.test(text)).map(({ n }) => `README.md:${n} ${ph} has a passed check but is not "done"`)));

console.log(warnings ? `\n${warnings} cleanup warning(s), failures from F6.4.` : '');
console.log(failures === 0 ? '\nConsistency: all checks pass.' : `\nConsistency: ${failures} problem(s).`);
process.exit(failures === 0 ? 0 : 1);
