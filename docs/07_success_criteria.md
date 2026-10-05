# 07 · Success criteria

How we will know the stock-compensation MVP works, and what we do when a number says it does not. Product document, for follow-up with Sherpas (D-043). The events that measure each metric are requirements in the feature specs (`spec/`, `EV-` IDs); this document holds the definitions, targets, decision rules, the pilot and the readout. 2026-10-05.

Targets marked "proposed" are our proposal for the pilot, in absolute numbers because a pilot is small (format adapted from jinjin1, credited in `NOTICE`); every target is agreed with Sherpas before the pilot starts, and those that need a baseline are set after the first weekly readout. [ASSUMPTION: confirm]

## Pilot

- **Who:** 3 to 5 advisory firms that turn on the "stock compensation" setting (D-030, D-049), ideally with corporate or tech clients (riskiest assumption 3).
- **Order:** F-A first (needs no grant), then F-B, then F-C to F-F (`spec/00_index.md`).
- **Cadence:** a readout every week, a decision every two weeks (continue, change, stop), a verdict in four to six weeks. A proposal cycle takes hours to days, not months ("8-10 hours" per client before, "20 min" with Sherpas [web: https://sherpaswealth.com, accessed 2026-10-05]), so the primary metric can be read within the pilot.
- **Comparison:** within the pilot firms, households with stock pay before and after the feature, and against households without stock pay at the same time; for the guardrail, each firm before and after turning the setting on.
- **Baseline:** the platform has no record of which past households had stock pay [FACT: questionnaire_map], so before the pilot each pilot advisor tags their opportunities of the last 3 to 6 months (stock pay: yes or no), helped by what the platform already keeps (free-text answers, uploaded documents) [ASSUMPTION: confirm, asked in `02`]. This gives conversion and time to proposal of households with stock pay before the feature.

## Metrics

| ID | Type | Metric | Definition | Events | Window | Target | Decision rule | Tests |
|---|---|---|---|---|---|---|---|---|
| M-01 | Primary | Proposal conversion and time to proposal | Share of opportunities that become clients, and days from questionnaire to shared proposal, for households with stock pay: after the feature against the tagged baseline, and against households without stock pay | EV-E-01, EV-B-01 plus the conversion data Sherpas keeps [ASSUMPTION: confirm that it is tracked, asked in `02`] | Weekly, verdict at 4 to 6 weeks | Proposed: households with stock pay convert better than their baseline, and reach a proposal no more than 2 days later than those without | If they convert worse or later: read M-02 (detail stuck?) and M-05 (lines deleted?) before changing anything | Value to the advisor |
| M-02 | Secondary | Detail completed in time | Of grants reported, how many are complete (or confirmed from a statement) within N days of being reported | EV-B-01, EV-B-02, EV-E-03, EV-C-01 | Weekly | Proposed: 7 of every 10 reported grants complete within N days; N set with Sherpas from their usual time to proposal | If fewer: make the statement route the main one, or ask the client for the plan statement in the questionnaire flow (riskiest assumption 1, "if wrong") | Riskiest assumption 1 |
| M-03 | Secondary | Extraction quality | Of statements uploaded, how many yield a grant; of proposed grants, how many are confirmed with no field changed | EV-F-01, EV-F-02, EV-F-03, EV-B-03 | Weekly | Proposed: 8 of 10 statements yield a grant; 7 of 10 proposed grants confirmed with two field changes or fewer | If lower: keep the manual route as the main one and prioritise extraction for the providers that fail | Riskiest assumption 1 |
| M-04 | Secondary | Score trust | Manual score adjustments per 100 analyses, households with employer exposure against the rest; reasons grouped (threshold too hard, data wrong, not relevant, other) | EV-A-02, EV-A-03, EV-C-02 | Weekly, by reason | Proposed: no higher for households with employer exposure; set with Sherpas after week 1 | If higher and the reasons point at concentration: the existing threshold does not fit one company; agree an employer-specific threshold with Sherpas (D-041 next) | Riskiest assumption 2 |
| M-05 | Secondary | Lines shared as generated | The feature writes new lines in the report, which the advisor can edit or delete before sharing. Of the analyses shared with those lines, the share where the advisor changed none. A line kept as generated is right and useful; a line often deleted is wrong, irrelevant or badly worded. Read per line ID. SIMULATED example: of 10 shared analyses, the tax-gap line was deleted in 4 and the concentration line in none | EV-A-04, EV-D-01 [ASSUMPTION: confirm that sharing and edits are recorded, asked in `02`] | Weekly, per line ID | Proposed: at least the share of other generated lines shared without edits; baseline after week 1 | A line deleted in more than 3 of 10 analyses is rewritten or dropped | Value to the advisor |
| M-06 | Secondary | Reach | Firms that turn the setting on; share of their households that answer "yes" to the stock-pay question or have a flagged position | EV-A-01, EV-E-01 | Weekly | Set with Sherpas from their data on clients' employers or sectors (no household-level public data, R-015) | If the share is low: keep it as a module for firms with corporate and tech clients (riskiest assumption 3, "if wrong") | Riskiest assumption 3 |
| GR-01 | Guardrail | Nothing gets worse for others | A guardrail must not get worse rather than improve. With the setting on, every household sees one new yes/no question; those who answer "no" gain nothing and must lose nothing (D-023). Measured: of those households, how many finish the questionnaire, before and after the firm turns the setting on. SIMULATED example: 82 of 100 finished before; about 82 should finish after | EV-E-02, with the completion the questionnaire already stores [FACT: questionnaire_map, progress per section]; no new tracking | Weekly | No drop beyond the firm's usual week-to-week variation | Any drop: rewrite the question. The question always ships with the feature: it is how stock pay enters (D-030, D-032) |
| GR-02 | Guardrail | Firm retention | Pilot firms that renew | Sherpas' account data | At each renewal | No pilot firm leaves citing the feature | Read at renewal; not a pilot gate | Business |

## Riskiest-assumption test cards

| | 1 · Advisors complete the detail; extraction reads plan statements | 2 · The existing concentration threshold fits one company | 3 · Enough households hold employer stock |
|---|---|---|---|
| Decisions that stand on it | D-030, D-035, D-036, D-042 | D-040, D-044 | Priority of the whole feature |
| Test before the pilot | Run extraction on 10 plan statements from the main stock-plan providers (Fidelity, Schwab, E*Trade, Shareworks, Carta for private companies; R-013); SIMULATED or anonymised | Score simulator (F6) on SIMULATED households, varying `P-CONC`, to show where the reading changes; ask Sherpas how the check is measured (`02`) | Sherpas' data on clients' employers or sectors (`02`) |
| Success (absolute) | 8 of 10 statements give every tranche right after two field changes or fewer | Sherpas confirms the check reads by issuer or by holding on a scale meant for single companies too | Set with Sherpas |
| In the pilot | M-02, M-03 | M-04 | M-06 |
| If it fails | Statement route first, or the manual route as the only one | Employer-specific threshold, set by Sherpas (R-014: no rule) | A module for firms with corporate and tech clients |

## Learning loop

The platform already learns from advisors: it "learns your voice" [web: https://sherpaswealth.com, accessed 2026-10-05], advisors edit generated observations before presenting [web: https://sherpaswealth.com/financial-health], and they adjust the score with a reason [brief]. The pilot plugs into that loop instead of building a new one:

- Every advisor correction on stock pay carries a "stock pay" tag: score adjustment reasons (EV-A-03), edits or deletions of the new lines (EV-A-04, EV-D-01), changes to extracted tranches (EV-F-02, EV-B-03).
- Each week the reasons and edits are grouped (threshold too hard, data wrong, not relevant, wording). At pilot volume this is done by hand; a small model can do it if volume grows. [ASSUMPTION: confirm]
- The advisors who edit the most are read first: their edits say what to change before wider rollout. For the rest, the bar is "shared as generated" (M-05).
- Each change made from the loop is logged as a decision with the readout that caused it.

## Weekly readout

| Week | M-01 | M-02 | M-03 | M-04 | M-05 | M-06 | GR-01 | Decision | Who |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |

## Not measured in the pilot

- Effect on firm acquisition: read in the sales pipeline over the following quarters, not a pilot gate.
- Whether clients act on the gap or the dated cash: outside the platform; asked in advisor interviews.
