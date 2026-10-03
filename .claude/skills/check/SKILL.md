---
name: check
description: Run with /check <phase> (F0–F6) before asking Renier to close a phase gate. Audits the repo against the case rules and the phase's "done when" criteria and writes a pass/fail report with evidence. Read-only on everything except its report.
disable-model-invocation: true
---

# /check

Goal: a gate is closed on evidence, not on assertion. Every line of the report points at a file, a command output or a line number.

## Input

- The phase to check (argument: `F0` … `F6`).
- The "Done when" section of each skill used in that phase.

## Steps

1. **Secrets and confidentiality.** Run `git add -A --dry-run` and the pre-commit hook against the staged set (`git add -A && .githooks/pre-commit; git reset -q`). Confirm `git status` shows nothing under `captures/` or `inputs/`, and `git ls-files | grep -iE '\.(rtf|har|png|jpe?g)$'` lists nothing outside `prototype/`.
2. **No invented facts.** In every doc changed in the phase: each Sherpas fact has a source tag (`[brief]`, `[web: …]`, `[demo]`, `[FACT: captures/…]`); no other source; each US financial or regulatory fact points at an `R-NNN` in `docs/research.md`; anything else is tagged `[INFERENCE: …]` or `[ASSUMPTION: confirm]`. List untagged claims by file and line.
3. **Simulated is labelled.** Every persona, interview or data set that is not real carries `SIMULATED` in its title and first line.
4. **Decisions logged.** Every decision taken in the phase has a `D-NNN` with what, why, date and who confirmed it.
5. **Open questions.** Unknowns found in the phase are in `docs/02_open_questions.md`.
6. **Phase criteria.** Each "Done when" line of the skills used in the phase: PASS or FAIL with evidence.
7. **Harness (only if skills changed in the phase).** Checklist Y1–Y12 below, one line each.
8. **Git.** Main has no "wip" commits (`git log --oneline | grep -i wip`); the phase's work is ready for one commit with a "why" message.

Y1–Y12 (documented best practice for Claude Code skills and agents): Y1 simplest thing that works · Y2 built by trigger, not up front · Y3 CLAUDE.md holds always-on rules only, under 200 lines · Y4 routing lives in non-overlapping descriptions · Y5 one vocabulary, concise, under 500 lines per skill · Y6 no duplicated content across files · Y7 load files just in time · Y8 fixed chain with human checkpoints · Y9 rules that must hold are hooks or permissions · Y10 each skill tested on a real run before more text · Y11 skills owned and edited, sources credited · Y12 evidence shown, not asserted.

## Output (fixed path)

`docs/checks/check-<phase>.md`: date, one table (check · PASS/FAIL · evidence), and a final line: "Ready for gate" or the list of FAILs to fix.

## Done when

- Every check above has PASS or FAIL with evidence (a path, a line, or command output).
- No FAIL is reported as ready for the gate.

## Next

Renier closes the gate (or not). Then one commit on main for the phase.
