# 11 · Storyline

**TL;DR:** three audiences, three orders. Notion and the README open with the brief answered on one screen, each answer linking to depth, then the work stage by stage (D-125). The video follows the brief: what we propose, why, what is left out, the process. The follow-up session is prepared privately.

| Order | For | Follows | Ends with |
|---|---|---|---|
| A · The deliverables | Whoever opens Notion, the Miro board or the repo | First the brief answered on one screen; then the product process, as a product manager works: understand, research, discover, decide, define (D-125) | The spec, which is what engineering receives, with the prototype as its reference implementation |
| B · The video (3 to 5 minutes) | Sherpas, as the output of the exercise | What the brief asks: "qué propones, por qué, qué has dejado fuera, y el proceso" [brief] | The process; deliverables appear only as support |
| C · The follow-up session (30 minutes) | Jesús, live | Prepared privately | Not in the repo |

## A · The deliverables

Notion and the README share one structure (D-125). Everything is written in the repo first; Notion is filled from it and names the commit (D-084).

### Notion pages

| Page | What it holds | From |
|---|---|---|
| Home | What we propose: the brief's five questions answered in two or three plain lines, each linking deeper; the method in short; the links (brief, protected prototype copy, pull request, repository, Miro board, video); the map of pages | `README.md` |
| Strategy | The PRD: problem, research, platform mapping, scope in and out with the reason, hypotheses, options and recommendation, "How we will know it works", flows, prototype, validation with advisors, tracking, non-obvious impacts, decisions pending | Stages 1 to 7 below |
| Engineering deliverables | The model diagram, the proposed definition of done, the three kinds of tests (product's scenarios and edge cases, QA's test cases, engineering's tests), release notes and enablement with their TL;DR, and one page per feature in the GitHub Spec Kit template (D-122) | Stage 8, `08_release_notes.md`, `09_enablement.md` |
| Methodology | Phases, checks and gates, how AI was used, what the tests prove | `README.md`, `checks/` |
| Tools | Each tool used or built, and what it made objective | `README.md`, `.claude/skills/`, `prototype/scripts/` |
| Glossary | The terms the feature introduces | `04_glossary.md` |
| Follow-up | Assumptions with their fallback, work left for after delivery | `02_open_questions.md` |

### The stages, in product order

Strategy and the README walk these stages in order; each names what it decided and links its evidence.

| # | Stage | What it answers | Artefacts | Miro |
|---|---|---|---|---|
| 1 | Context and problem | What the platform does today and where stock compensation has no place | `00_brief.md`, `01_context.md`, `platform_map.md`, `questionnaire_map.md`, `data_model.md`, `design_tokens.md` | Flows today, in their own format (D-127) |
| 2 | Research | The US facts: types, vesting, tax, concentration, tools | `research.md`, `12_stock_comp_rules.md` | Not on the board |
| 3 | Discovery | What advisors and clients actually struggle with, and how sure we are | `discovery/` (synthesis, voices, SIMULATED personas and snapshots) | Not on the board |
| 4 | Options and decisions | The direction, the three options for the first release and the chosen one, what is left out and why | `06_direction.md`, `03_decision_log.md`, `02_open_questions.md` | What we propose; options frame; decision map of 10 decisions; what is left out (D-127) |
| 5 | How we will know | The pilot, metrics per release, continue, change or stop | `07_success_criteria.md` | Pilot and metrics |
| 6 | Launch | What advisors are told and how they are trained | `08_release_notes.md`, `09_enablement.md` | Not on the board |
| 7 | What the change touches | Every screen element today and with the feature; gaps and how each closed | `10_flow_review.md` | Change maps |
| 8 | The spec | What engineering builds: requirements with IDs, edge cases, events, the score simulator contract, traceability to tests | `spec/`, `prototype/` (pull request) | Not on the board; linked |
| · | How the work was done | Phases, the harness, checks, how AI was used, history | `README.md`, `.claude/skills/`, `checks/`, git log | Not on the board |

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

| Brief asks | A: Home answer, then stage | B, part |
|---|---|---|
| "Cómo se introduce: qué le preguntamos al cliente (o al asesor) y cómo" | How it comes in; 7, 8 (F-E, F-F) | What it does |
| "Qué tipos de stock compensation contemplarías" | Which types; 2, 4, 8 | What it does |
| "Cómo se modeliza dentro del análisis" | How it is modelled; 4, 8 (F-B, F-C, F-D) | What it does |
| "Qué análisis podríamos ofrecer al asesor a partir de ello" | Which analyses; 4, 7, 8 (F-A, F-C, F-D) | What it does |
| "Tú decides qué entra, qué no, y en qué orden. Lo que dejes fuera y por qué" | What is left out; 4 | Why; what is left out |
| "Cuantas más herramientas uses para pensar y para enseñarnos cómo piensas, mejor" | Methodology and Tools pages; how the work was done | The process |
