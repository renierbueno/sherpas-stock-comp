# 07 · Success criteria

How we will know the stock-compensation MVP works, and what we do when a number says it does not. Product document, for follow-up with Sherpas (D-043). The events that measure each metric are requirements in the feature specs (`spec/`, `EV-` IDs); this document holds the definitions, targets, decision rules, the pilot and the readout. 2026-10-05.

Targets marked "proposed" are our proposal for the pilot, in absolute numbers because a pilot is small (format adapted from jinjin1, credited in `NOTICE`); every target is agreed with Sherpas before the pilot starts, and those that need a baseline are set after the first weekly readout. [ASSUMPTION: A-32]

## Pilot

- **Who:** 3 to 5 advisory firms that turn on the "stock compensation" setting (D-030, D-049), ideally with corporate or tech clients (riskiest assumption 3).
- **Before building:** the three test cards below and five interviews with advisors of the pilot firms run first; no public voice of Sherpas' customers confirms the demand (D-080).
- **Order:** F-A first (needs no grant), then F-B, F-C, F-E, F-F and the text lines of F-D together (D-080, `spec/00_index.md`).
- **Cadence:** a readout every week, a decision every two weeks (continue, change, stop), a verdict in four to six weeks per release. A proposal cycle takes hours to days, not months ("8-10 hours" per client before, "20 min" with Sherpas [web: https://sherpaswealth.com, accessed 2026-10-05]), so every gate metric moves within the pilot.
- **Comparison:** within the pilot firms, households with stock pay before and after the feature, and against households without stock pay at the same time; for the guardrail, each firm before and after turning the setting on.
- **Baseline:** the platform has no record of which past households had stock pay [FACT: questionnaire_map], so before the pilot each pilot advisor tags their opportunities of the last 3 to 6 months (stock pay: yes or no), helped by what the platform already keeps (free-text answers, uploaded documents) [ASSUMPTION: A-21]. This gives conversion and time to proposal of households with stock pay before the feature.

## Gates by release (D-088)

Each release answers its own question, with metrics counted per household every week, because 3 to 5 firms over four to six weeks give too few households with stock pay for conversion to decide anything [INFERENCE: pilot size above]. Conversion (M-01) is read and reported, never a gate in the pilot. Thresholds are proposed and agreed before the pilot starts.

| Release | The question | Gate metrics | Continue | Change | Stop |
|---|---|---|---|---|---|
| 1 · Employer stock in concentration (F-A) | Are there enough households with employer stock, and do advisors trust the score that reads it? | M-06 reach, M-04 score trust, GR-01 | At least 1 in 10 households of the pilot firms has a flagged position or reports stock pay; adjustments no higher than for other households | Adjustments higher with the reason "threshold too hard": set an employer threshold before release 2 (test card 2) | Fewer than 1 in 20 after six weeks: keep it as a module for firms with corporate and tech clients and do not build release 2 for everyone |
| 2 · The core loop | Does stock pay reach the client complete, without giving the advisor's time back? | M-07 stock pay reached the client, M-08 advisor work, M-03 extraction, M-05 lines kept, GR-01 | At least 7 in 10 stock-pay households shared with every grant complete; median advisor work at most one review and one confirm per grant | Fewer than 7 in 10 complete: statement route first, or ask the client for the statement in the questionnaire flow; a line deleted in more than 3 of 10 analyses is rewritten | Fewer than 4 in 10 complete after six weeks with both routes tried: the grant stays a record and the analysis lines wait for a better completion route |

## Metrics

| ID | Type | Metric | Definition | Events | Window | Target | Decision rule | Tests |
|---|---|---|---|---|---|---|---|---|
| M-01 | Lagging read | Proposal conversion and time to proposal | Share of opportunities that become clients, and days from questionnaire to shared proposal, for households with stock pay: after the feature against the tagged baseline, and against households without stock pay | EV-E-01, EV-B-01 plus the conversion data Sherpas keeps [ASSUMPTION: A-19] | Weekly, verdict at 4 to 6 weeks | Read, not a gate: households with stock pay convert at least as well as their baseline, and reach a proposal no more than 2 days later than those without | If they convert worse or later: read M-07 (did stock pay reach the client?), M-02 (detail stuck?) and M-05 (lines deleted?) before changing anything | Value to the advisor |
| M-02 | Secondary | Detail completed in time | Of grants reported, how many are complete (or confirmed from a statement) within N days of being reported | EV-B-01, EV-B-02, EV-E-03, EV-C-01 | Weekly | Proposed: 7 of every 10 reported grants complete within N days; N set with Sherpas from their usual time to proposal | If fewer: make the statement route the main one, or ask the client for the plan statement in the questionnaire flow (riskiest assumption 1, "if wrong") | Riskiest assumption 1 |
| M-03 | Secondary | Extraction quality | Of statements uploaded, how many yield a grant; of proposed grants, how many are confirmed with no field changed | EV-F-01, EV-F-02, EV-F-03, EV-B-03 | Weekly | Proposed: 8 of 10 statements yield a grant; 7 of 10 proposed grants confirmed with two field changes or fewer | If lower: keep the manual route as the main one and prioritise extraction for the providers that fail | Riskiest assumption 1 |
| M-04 | Secondary | Score trust | Manual score adjustments per 100 analyses, households with employer exposure against the rest; reasons grouped (threshold too hard, data wrong, not relevant, other) | EV-A-02, EV-A-03, EV-C-02 | Weekly, by reason | Proposed: no higher for households with employer exposure; set with Sherpas after week 1 | If higher and the reasons point at concentration: the existing threshold does not fit one company; agree an employer-specific threshold with Sherpas (D-041 next) | Riskiest assumption 2 |
| M-05 | Secondary | Lines shared as generated | The feature writes new lines in the report, which the advisor can edit or delete before sharing. Of the analyses shared with those lines, the share where the advisor changed none. A line kept as generated is right and useful; a line often deleted is wrong, irrelevant or badly worded. Read per line ID. SIMULATED example: of 10 shared analyses, the tax-gap line was deleted in 4 and the concentration line in none | EV-A-04, EV-D-01 [ASSUMPTION: A-20] | Weekly, per line ID | Proposed: at least the share of other generated lines shared without edits; baseline after week 1 | A line deleted in more than 3 of 10 analyses is rewritten or dropped | Value to the advisor |
| M-06 | Secondary | Reach | Firms that turn the setting on; share of their households that answer "yes" to the stock-pay question or have a flagged position | EV-A-01, EV-E-01 | Weekly | Proposed: at least 1 in 10 households of the pilot firms; no household-level public data exists (R-015) | Release 1 gate above | Riskiest assumption 3 |
| M-07 | Primary, release 2 | Stock pay reached the client | Of the analyses shared for households with stock pay, the share where every grant was complete when shared, so tax at vest and the lines on goals reached the client and nothing said "not yet included" | EV-G-01 | Weekly | Proposed: at least 7 in 10 | Release 2 gate above | Riskiest assumption 1 |
| M-08 | Secondary, release 2 | Advisor work added | Per household with stock pay, the advisor actions from the questionnaire to the first share: flags, grants typed, statements confirmed, fields changed, tranches edited | EV-A-01, EV-B-01, EV-B-03, EV-F-02, EV-C-01, EV-G-01 | Weekly, median and worst tenth | Proposed: median at most one review and one confirm per grant | If higher: find the step that adds the work and remove or automate it before wider rollout | The platform's promise of less manual work [brief] |
| GR-01 | Guardrail | Nothing gets worse for others | A guardrail must not get worse rather than improve. With the setting on, every household sees one new income chip and one helper line; those without stock pay gain nothing and must lose nothing (D-023, D-056). Measured: of those households, how many finish the questionnaire, before and after the firm turns the setting on. SIMULATED example: 82 of 100 finished before; about 82 should finish after | EV-E-02, with the completion the questionnaire already stores [FACT: questionnaire_map, progress per section]; no new tracking | Weekly | No drop beyond the firm's usual week-to-week variation | Any drop: rewrite the helper line. The chip always ships with the feature: it is how stock pay enters (D-030, D-056) |
| GR-02 | Guardrail | Firm retention | Pilot firms that renew | Sherpas' account data | At each renewal | No pilot firm leaves citing the feature | Read at renewal; not a pilot gate | Business |

## Riskiest-assumption test cards

| | 1 · Advisors complete the detail; extraction reads plan statements | 2 · The existing concentration threshold fits one company | 3 · Enough households hold employer stock |
|---|---|---|---|
| Decisions that stand on it | D-030, D-035, D-036, D-042 | D-040, D-044 | Priority of the whole feature |
| Test before the pilot | Run extraction on 10 plan statements from the main stock-plan providers (Fidelity, Schwab, E*Trade, Shareworks, Carta for private companies; R-013); SIMULATED or anonymised | Score simulator (F6) on SIMULATED households, varying `P-CONC`, to show where the reading changes; the work assumes the check reads by holding (`02`) | From the platform's own data before release 1: households whose holdings or reported employers match a listed employer |
| Success (absolute) | 8 of 10 statements give every tranche right after two field changes or fewer | Employer stock moves the Investing check as any single stock of the same weight would, and advisors in the five interviews call the reading right | Proposed: at least 1 in 10 households |
| In the pilot | M-07, M-02, M-03 | M-04 | M-06 |
| If it fails | Statement route first, or the manual route as the only one | Employer-specific threshold, set by Sherpas (R-014: no rule; SC-29) | A module for firms with corporate and tech clients |

## Learning loop

The platform already learns from advisors: it "learns your voice" [web: https://sherpaswealth.com, accessed 2026-10-05], advisors edit generated observations before presenting [web: https://sherpaswealth.com/financial-health], and they adjust the score with a reason [brief]. The pilot plugs into that loop instead of building a new one:

- Every advisor correction on stock pay carries a "stock pay" tag: score adjustment reasons (EV-A-03), edits or deletions of the new lines (EV-A-04, EV-D-01), changes to extracted tranches (EV-F-02, EV-B-03).
- Each week the reasons and edits are grouped (threshold too hard, data wrong, not relevant, wording). At pilot volume this is done by hand; a small model can do it if volume grows. [ASSUMPTION: A-33]
- The advisors who edit the most are read first: their edits say what to change before wider rollout. For the rest, the bar is "shared as generated" (M-05).
- Each change made from the loop is logged as a decision with the readout that caused it.

## Weekly readout

| Week | Release | M-06 | M-04 | M-07 | M-08 | M-02 | M-03 | M-05 | GR-01 | M-01 (read) | Decision | Who |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | | | | | | | | | | | |

## Not measured in the pilot

- Effect on firm acquisition: read in the sales pipeline over the following quarters, not a pilot gate.
- Whether clients act on the gap or the dated cash: outside the platform; asked in advisor interviews.
