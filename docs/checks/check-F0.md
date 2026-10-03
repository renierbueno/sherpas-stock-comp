# /check F0 · 2026-10-03

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Pre-commit hook passes on the full staged set | PASS | `git add -A && .githooks/pre-commit` → pass; nothing under `captures/` staged except `.keep` |
| 1b | Hook blocks what it must | PASS | Throwaway repo, 2026-10-03: demo email, demo password, `.rtf`, `captures/*.json`, image in `docs/`, bearer token and one-use link blocked; clean doc and `prototype/` image passed. Repo deleted after the test |
| 1d | The hook does not spell out the values it blocks | PASS | Demo user, password and tenant domain moved to a local, ignored patterns file; `grep` on `.githooks/pre-commit` finds none. Retested: still blocked with the file present; with it missing the hook warns and keeps the generic checks |
| 1c | No confidential file types tracked | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` → none |
| 2 | Sherpas facts tagged, case sources only | PASS | Every bullet in `docs/01_context.md` carries `[brief]`, `[web: URL, date]` or `[demo]` |
| 2b | US facts point at research | PASS | One so far: RSU taxation → `R-001` (IRS Information Letter 2024-0010) |
| 2c | Hypotheses tagged | PASS | Every claim in `docs/05_business_lens.md` ends in `[ASSUMPTION: confirm]` |
| 3 | SIMULATED labelled | N/A | Nothing simulated in F0 |
| 4 | Decisions logged | PASS | D-001 to D-010, each with what, why, date and who confirmed |
| 5 | Open questions captured | PASS | `docs/02_open_questions.md`: questions for the platform, for Sherpas, for research, and one answered |
| 6 | setup-case "done when" | PASS | Six docs exist; brief as received with redactions only |
| 6b | research "done when" (dry run) | PASS | `R-001` has source, access date, source date, evidence size, signal and the decision it unblocks |
| 6c | capture-platform (dry run) | PASS, partial | Run on the Help Center, not the app (the app needs Renier's login). Text, tree, screenshot, style tokens and request list landed in `captures/_dryrun/` and stayed out of git. Fixes applied from the run: start network tracking before loading a screen; wait 2 s after navigation; screenshots are JPEG; the request list has no bodies. The run also showed the Help Center needs a login. Real test on the app: first screen of F1 |
| 6d | /check | PASS | This report |
| 7 | Harness checklist | see below | |
| 8 | Git | PASS | No commits yet; ready for one F0 commit |

## Harness checklist

- Simplest thing that works: four skills, 34-line CLAUDE.md. PASS
- Built by need: the remaining five skills are written just before their phase (D-002). PASS
- CLAUDE.md holds rules only: no workflow narrative. PASS
- Routing by non-overlapping descriptions: setup-case (once, F0, the stable docs) · capture-platform (the app, in Chrome) · research (public US facts) · check (user-invoked only). PASS
- One vocabulary, concise: one set of evidence tags, English only, 40–63 lines per skill. PASS
- No duplication: CLAUDE.md points at docs and skills. The safety rules also appear in capture-platform's hard rules, on purpose. PASS with note
- Just in time: nothing preloaded; skills name the files to read. PASS
- Fixed chain with human checkpoints: each skill names its next one; gates are human. PASS
- Hooks over prose: pre-commit hook; `--no-verify` and `core.hooksPath` denied; "ask" on Chrome clicks and writes and on push, remote and PR. PASS
- Tested before more text: setup-case produced F0's docs; research and capture-platform dry runs above. PASS
- Owned and credited: skills edited for this case; sources in `NOTICE`. PASS
- Evidence over assertion: this table. PASS

## Not verified in F0 (moves to the start of F1)

- Notion and Miro MCP access: `.mcp.json` only loads in a session opened inside this repo; OAuth (`/mcp`) and a read test happen at the start of that session.
- The "ask" permission on Chrome clicks: applies from that session.

Ready for gate.
