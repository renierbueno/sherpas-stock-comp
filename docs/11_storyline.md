# 11 · Storyline

Three orders, one per audience, so each is told the way it is used (D-083). The content is the same; only the order and the emphasis change.

| Order | For | Follows | Ends with |
|---|---|---|---|
| A · The deliverables | Whoever opens Notion, the Miro board or the repo | The product process, as a product manager works: understand, research, discover, decide, define | The spec, which is what engineering receives, with the prototype as its reference implementation |
| B · The video (3 to 5 minutes) | Sherpas, as the output of the exercise | What the brief asks: "qué propones, por qué, qué has dejado fuera, y el proceso" [brief] | The process; deliverables appear only as support |
| C · The follow-up session (30 minutes) | Jesús, live | Prepared privately | Not in the repo |

## A · The deliverables, in product order

Notion holds one page per stage, the Miro board one area per stage left to right, and the README lists the stages with their files (D-084, D-085). Each stage names what it decided and links its evidence.

| # | Stage | What it answers | Artefacts | Notion | Miro |
|---|---|---|---|---|---|
| 1 | Context and problem | What the platform does today and where stock compensation has no place | `00_brief.md`, `01_context.md`, `platform_map.md`, `questionnaire_map.md`, `data_model.md`, `design_tokens.md` | Page | Flows today: questionnaire, analysis, shared reports, advisor, secondary |
| 2 | Research | The US facts: types, vesting, tax, concentration, tools | `research.md` | Page | Key facts, each with its source |
| 3 | Discovery | What advisors and clients actually struggle with, and how sure we are | `discovery/` (synthesis, voices, SIMULATED personas and snapshots) | Page | Assumptions validated, invalidated, unknown |
| 4 | Options and decisions | The direction, the three options for the first release and the chosen one, what is left out and why | `06_direction.md`, `03_decision_log.md`, `02_open_questions.md` | Page, with key decisions | Options frame; decision map |
| 5 | How we will know | The pilot, metrics per release, continue, change or stop | `07_success_criteria.md` | Page | Pilot and metrics |
| 6 | Launch | What advisors are told and how they are trained | `08_release_notes.md`, `09_enablement.md` | Page | Not on the board |
| 7 | What the change touches | Every screen element today and with the feature; gaps and how each closed | `10_flow_review.md` | Page | Flows with the feature |
| 8 | The spec | What engineering builds: requirements with IDs, edge cases, events, the score simulator contract, traceability to tests | `spec/`, `prototype/` (pull request) | Page per feature | Not on the board; linked |
| · | How the work was done | Phases, the harness, checks, how AI was used, history | `README.md`, `.claude/skills/`, `checks/`, git log | Last page | Process strip |

Launch (6) sits before the spec so that the spec is the last thing handed over; what advisors are told is settled with the product, not after the build. [INFERENCE: from how the stages depend on each other]

## B · The video, in the brief's order

| Time | Part | What is said | Shown as support |
|---|---|---|---|
| 0:00 to 0:20 | What we propose | The first release in one sentence | Prototype, start screen |
| 0:20 to 1:00 | Why | The problem today; the three options and why the chosen one | Options frame |
| 1:00 to 3:00 | What it does | The brief's four topics in flow order: how it is entered, which types, how it is modelled, which analysis | Prototype scenes |
| 3:00 to 3:40 | What is left out, and why | Next, later, never; what would change the choice | First release cut |
| 3:40 to 4:40 | The process | Phases, evidence, how AI was used; the spec as the handover | README, decision log, traceability |

## C · The follow-up session

Prepared in `private/`, never committed (`CLAUDE.local.md`).

## Fit with the brief

| Brief asks | A, stage | B, part |
|---|---|---|
| "Cómo se introduce: qué le preguntamos al cliente (o al asesor) y cómo" | 7, 8 (F-E, F-F) | What it does |
| "Qué tipos de stock compensation contemplarías" | 2, 4, 8 | What it does |
| "Cómo se modeliza dentro del análisis" | 4, 8 (F-B, F-C, F-D) | What it does |
| "Qué análisis podríamos ofrecer al asesor a partir de ello" | 4, 7, 8 (F-A, F-C, F-D) | What it does |
| "Tú decides qué entra, qué no, y en qué orden. Lo que dejes fuera y por qué" | 4 | Why; what is left out |
| "Cuantas más herramientas uses para pensar y para enseñarnos cómo piensas, mejor" | All, and how the work was done | The process |
