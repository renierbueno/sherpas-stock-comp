# 06 · Direction

The F3 decisions: for each, three options with trade-offs and evidence, the recommendation and what Renier chose. Method: `.claude/skills/decide/SKILL.md`. Every option is checked against D-023 (nothing gets worse for a household without stock compensation). Inputs: `discovery/synthesis.md` ("What F3 needs to decide"), `research.md`, `data_model.md`, `questionnaire_map.md`. 2026-10-05.

## Block 1 · Scope

### F3-01 · Which stock-compensation types does the MVP support?
Each type pays the employee in company stock in a different way, with its own dates and tax rules. The MVP supports a subset fully (grant, schedule, future vests); the rest wait, but any shares the client already holds are recognised as employer stock whatever their origin.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | RSU only | Simplest model and tax rule: value at vest is wages | Leaves out performance units, granted almost as often; executives hold them | R-001, R-016 (91% of responding companies grant performance awards, WEAK) |
| B | RSU and PSU, plus an employer flag on any held position | One model covers both (a PSU is an RSU with a condition and a payout range); the flag makes concentration work for shares from ESPP or exercised options too | Future ESPP purchases and unexercised options stay out of the projection | R-002, R-011, R-016; V04 (advisors see more RSUs, fewer options); [FACT: data_model, positions already hold direct stocks] |
| C | RSU, PSU, ESPP and options (NSO, ISO) | Widest coverage, including the tech segment where ESPP is common | Each needs its own logic: purchase periods and disposition rules (ESPP), strike price, exercise and AMT (options); higher risk of tax errors; options serve a different segment | R-003 to R-005, R-016 (ESPP about half of companies, options 41% and falling, WEAK); V14, V20, V28 |

- **Recommendation:** B, because it covers the most granted types with one model, and the employer flag reaches every type once it becomes shares, so concentration is right from day one. A loses PSUs for almost no saving; C multiplies tax logic for a smaller, different segment. D-023: holds, nothing changes for households without grants.
- **Chosen:** B · D-024

### F3-02 · Listed or private employer: how is stock without a market price handled?
What changes the model is not company size but whether the stock has a market price and can be sold. At a private company, RSUs usually settle only after a liquidity event (double trigger), and the only value is a 409A valuation for tax, up to 12 months old and discounted for lack of marketability (R-011, R-017). With D-024, the private case in the MVP is double-trigger RSUs and private shares already held.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Listed employers only | Everything has a price; simplest | Startup employees still have nowhere to enter their equity, the problem the brief describes | [brief]; R-011 |
| B | Record and show private equity; keep it out of score figures until it has a price. Double-trigger RSUs show as "awaiting a liquidity event", with no invented dates. A known 409A value is shown with its date, for information only | The advisor sees it and can discuss it; follows the platform's own missing-data rule | Score figures (net worth, concentration) do not reflect it until it is priced | [brief] score article, missing data "is not treated as a zero"; R-011, R-017 |
| C | Value it at the latest 409A with a stated discount and include it in the figures | A number and a concentration reading from day one | The number is a tax value, not a sale price, and may never be realised; it can inflate net worth and concentration; people value it very differently (zero, $1, 50% haircut) | R-017 (409A rule STRONG, typical discounts WEAK); V33 |

- **Recommendation:** B, because it applies the platform's own rule for figures it does not have instead of inventing a price (C) or leaving startup employees out (A). D-023: holds, households without private equity see nothing new.
- **Chosen:** B · D-025

## Block 2 · Model

Platform checks carried from discovery: held shares fit the existing positions; every element has one owner; the model already holds future incomes with a start date. [FACT: data_model, questionnaire_map] Tax at vest from filing status and brackets is checked in block 4.

### F3-03 · Lifecycle states: what is a grant in each state?
An RSU is first a promise that is lost if the employee leaves; at vest its value is wages and the shares arrive; kept shares are a position; sold shares are cash; unmet conditions forfeit it (R-001, R-002). The question is which dimension (asset, liability, income, expense) each state takes. Example used: 400 RSUs, 100 vest per year, price $150, 100 already vested and held.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Model only held shares, flagged as employer stock; ignore unvested | Smallest change; held shares fit positions as they are | Future vests, their tax and future exposure stay invisible, the gap the brief describes | [brief]; [FACT: data_model] |
| B | Unvested is future income and future shares, per dated tranche; at the vest date a tranche becomes that year's wages and a held position; not current net worth (example: net worth $15,000 today, plus $15,000 of income and 100 shares in each of three future years) | Matches the tax rule and advisor practice; feeds the three analysis candidates (exposure, tax at vest, dated cash) | A new element type: the grant with its tranches | R-001, R-002; V07, V08 (advisors model it as future income or a separate entry); V32 |
| C | Unvested counts as current net worth at a haircut | Matches how some clients feel about it | Inflates net worth with value lost on leaving; the haircut is invented; conflicts with D-025's logic | V33 (zero, $1 or 50% haircut) |

- **Recommendation:** B, the only option that follows the tax rule and still shows the advisor the future vests, where the tax, the exposure and the cash for goals sit. D-023: holds, no grant means no new element.
- **Chosen:** B · D-026

### F3-04 · Vesting: how is the schedule stored?
Real schedules come in several shapes: a one-year cliff then equal installments, equal installments, unequal tranches (10/20/35/35), and back-loaded ones (R-009, R-010). Assuming even tranches misstates each year's income, tax and concentration. [INFERENCE: from R-010]

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Total, frequency and end date | Three fields, easy to ask | Describes only even schedules; cliffs and unequal or back-loaded schedules come out wrong | R-009, R-010 |
| B | A list of dated tranches (date, shares), generated from a simple pattern ("4 years, quarterly, 1-year cliff") and editable; a PSU adds its condition and a payout range (0% to 200% of target) | Represents every shape found; it is what the analyses read (what arrives, when, how much); a plan statement is in practice a list of tranches | The advisor may need to edit tranches; the pattern generator has to be built | R-009, R-010, R-011, R-002 |
| C | A rule engine that reads any award agreement | Covers every case, rare ones included | Over-built for an MVP | R-011 (PSU and double-trigger conditions vary by plan) |

- **Recommendation:** B, because the pattern gives A's ease and the list gives C's accuracy without its cost. D-023: holds, only grant holders see it.
- **Chosen:** B · D-027

### F3-05 · Deduplication: how is the same money not counted twice?
RSU value at vest is reported as wages on the W-2 (R-001), so a client's gross income may already include it; vested shares may also already be in a brokerage account. Counting the grant on top of either double counts.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Assume reported income excludes vest income | No extra question | Many clients include it without knowing; double counts often | R-001; V38 to V41 (confusion between W-2 and broker forms) |
| B | Ask only those who said they have stock pay: "Does your gross income include stock that vested this year?"; count vest income once, inside or beside salary, by the answer. For shares: past tranches are held positions, the grant adds future tranches only | Resolves the ambiguity where it exists; the share rule is checkable in code and holds even when accounts are linked | One more question, for that segment only | R-001; V06 (double counting when accounts are linked), V38 to V41 |
| C | Change the income question for everyone to base salary only | Clean in theory | Changes a question every household answers today | D-023 |

- **Recommendation:** B, the only option that leaves households without stock pay untouched (D-023) and fixes double counting with one question plus one rule.
- **Chosen:** B · D-028

### F3-05b · Model completeness: what each tranche keeps after vest
Checked against `research.md` after F3-03: two researched facts were not yet in the model. At settlement part of the shares is usually withheld or sold to pay the tax (net settlement, sell-to-cover), so the employee keeps fewer shares than vest; and the cost basis of kept shares is their value included in income at vest.

- **Decision:** each tranche records the shares kept after withholding and their cost basis (value at vest). Not optional variants, a completeness fix to F3-03. Evidence: R-002 (basis, INFERENCE from §83 and Pub 525), R-011 (net settlement), V39 (sell-to-cover).
- **Chosen:** D-029

## Block 3 · Intake

### F3-06 · Who enters what?
Clients know totals; schedules and terms sit in grant documents and plan portals (A-05; V01, V29); aggregation does not bring unvested grants (R-013).

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | The client enters everything in the questionnaire | One route | Clients do not know dates and terms; a longer questionnaire | A-05; V01, V17, V29, V41, V42 |
| B | The client answers only what they know (yes/no, type, employer, rough unvested value, vest frequency, the D-028 question); the advisor completes the detail through the routes that already exist, advisor mode of the questionnaire and Data & Assumptions; the firm can switch the block off, as it can the "Additional Information" box; the model is built so a document can feed it later | No friction for households without stock pay; little for those with it; the advisor flow exists | Detail depends on the advisor completing it | [FACT: questionnaire_map, two modes and firm-enabled box]; [brief] Data & Assumptions; A-05 |
| C | Upload of the plan statement with data extraction as the main route | Least friction for the client | Depends on extraction reading equity plan statements into a new element, and on the advisor reviewing what is extracted | V01, V29 (data lives in documents); R-013 (aggregators miss unvested grants) |

- **Recommendation:** B for the MVP; C next, because the detail lives in documents and the model already receives a list of tranches (D-027). D-023: holds, one yes/no question for everyone, and none if the firm switches the block off.
- **Chosen:** B · D-030

### F3-06b · Document upload after reading the public website
Added after the block was closed. The website shows document upload with extraction, including custom extraction, but does not name equity plan statements or describe the advisor's review. [web: https://sherpaswealth.com/data-extraction, accessed 2026-10-05] It changes the "next" placement of the document route in F3-06.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Keep document upload as next, now citing the website | No change | Does not use what exists; riskiest assumption 1 stays high | D-030 |
| B | MVP, as a second advisor route: the advisor uploads the plan statement, extraction proposes the tranches, the advisor confirms them (the "propose, confirm" rule of D-037) | Less work for the advisor; lowers riskiest assumption 1; uses an existing capability | Assumes extraction reads plan statements, which the website does not say | [web: sherpaswealth.com/data-extraction]; V01, V29; R-013 |
| C | Also the main client route, from the questionnaire | Least friction | A sensitive document uploaded from the questionnaire; unknown whether the questionnaire accepts uploads | none |

- **Recommendation:** B. Advisor confirmation guards against extraction errors and against a marketing accuracy figure. D-023: holds, advisor side only. To recheck when the questionnaire link is reset: whether the client-side questionnaire accepts uploads, and the placement of D-032.
- **Chosen:** B, with advisor confirmation · D-042

### F3-07 · Is the employer a new data point?
The questionnaire does not ask who the employer is. [FACT: questionnaire_map] Without it, salary, grants and held shares cannot be joined into one employer exposure. [INFERENCE: from A-09] The ticker gives price and sector, which the platform already reads. [FACT: data_model, market data for direct stocks; captures/client/03-investment-analysis, sector view]

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Do not ask; infer it from the held position | No new field | Impossible when no shares are held yet | [FACT: questionnaire_map] |
| B | Employer name and ticker if listed, per person, inside the stock-pay block | Makes employer exposure possible | One more field, only for grant holders | A-09, R-014; [FACT: data_model, market data for direct stocks] |
| C | B plus an insider flag (trading windows, hedging limits) | Sharper advice on when to sell | Not researched; changes the advice, not the model | V02 (signal only), V26 |

- **Recommendation:** B. The insider flag is listed under "Considered, not researched", not in the cut. D-023: holds.
- **Chosen:** B · D-031

### F3-08 · Where does it sit in the questionnaire?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | In Income, right after gross income, as a yes/no question that opens the block | RSU value is pay (R-001); same yes/no pattern as pension and annuity; the D-028 question sits next to the figure it affects | Evidence that clients look for it there is weak | R-001; [FACT: questionnaire_map]; A-08 |
| B | A new section | More visible | Longer path for everyone (breaks D-023); separates the D-028 question from income | D-023 |
| C | No questionnaire change; advisor only | No change for clients | The advisor does not learn of the grant unless the client mentions it | A-05 |

- **Recommendation:** A, on the tax rule and an existing pattern; A-08 stays an assumption to test.
- **Chosen:** A · D-032

## Block 4 · Analysis

### F3-09 · State withholding in the tax gap at vest
The tax owed on a vest (federal, state, FICA) is computed by the platform's existing tax engine once vest income enters as that year's wages: it already holds state, filing status and brackets and shows federal, FICA and state tax lines. [FACT: data_model; INFERENCE that vest income can feed it like salary] The gap is tax owed minus tax already withheld. Federal withholding follows a rule (22%, 37% above $1 million; R-008); state withholding rules were not researched.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Gap computed on federal only; state tax owed shown, no state withholding subtracted | No new field | The state gap is never shown | R-008; [FACT: data_model] |
| B | The advisor may enter the state withholding rate per grant; with it the gap is complete, without it the gap is federal only and says so | Uses everything the platform computes; invents no state rule; complete when the advisor has the figure | An optional advisor field and two display states | R-008; [brief] missing data "is not treated as a zero" |
| C | Research and apply every state's supplemental withholding rule | Complete without advisor input | Fifty rules to research and maintain; not feasible before delivery | none yet |

- **Recommendation:** B. D-023: holds, the field is advisor-side only.
- **Chosen:** B, with these terms · D-033
  - **Not mandatory.** A mandatory field without the figure invites a false 0, which would show a gap as if nothing were withheld. Hidden when the platform computes zero state tax for the household.
  - **Model:** one optional rate per grant, inherited by its tranches, with source "entered by advisor" and a known or unknown state.
  - **Analysis:** tax owed always computed; the gap shown by level, federal always, state only when withholding is entered; otherwise "state tax owed $X, state withholding not entered". If the gap feeds a score check (decided in F3-11), the unknown state part is left out of that figure.
  - **Advisor:** optional work (paystub or plan statement); a missing-data notice on the advisor side only. Saving in Data & Assumptions reprocesses the analysis and replaces a manual score adjustment [brief], which the notice or the release notes (F4) must say.
  - **Client:** sees the analysis read only and the reports the advisor shares [FACT: captures/client/01-financial-health, 06-reports], so the label must read on its own, for example: "Estimated state tax on this vest: $X. Your state withholding was not provided, so the gap shown is federal only."
  - **UX:** not in the client questionnaire (the client rarely knows it); only in advisor mode and Data & Assumptions; helper text "from the paystub or plan statement"; the empty state is labelled in the analysis, not hidden.

## Block 4b · Advisor

Advisors are the users; the product reaches clients through them [brief]. The advisor screens were not seen (D-034); what is known comes from the questionnaire definition (display by user role, advisor mode, firm settings), the opportunity record (automatic alerts), the reports and the score article (Data & Assumptions, View more, manual adjustment). [FACT: questionnaire_map, captures/questionnaire/02-opportunity, captures/client/06-reports; brief]

| Stage | What exists | What our decisions add |
|---|---|---|
| Send the questionnaire | Opportunity pipeline; firm settings decide which questions show | The firm can switch the stock-pay block off (D-030) |
| Receive answers | Advisor reviews and presses "Submit and continue" | A household may report stock pay with detail missing (F3-A1, F3-A2) |
| Complete detail | Advisor mode; Data & Assumptions, where saving reprocesses the analysis; document upload with extraction [web: sherpaswealth.com/data-extraction] | Upload of the plan statement, extracted tranches confirmed by the advisor (F3-06b); Tranches (D-027), shares kept and basis (D-029), state withholding (D-033), employer and ticker (D-031); in advisor mode the block opens the full tranche editor |
| Review before sharing | View more explains the score; manual adjustment within ±10; reprocessing replaces it; advisors edit generated observations and strategies before presenting [web: sherpaswealth.com/financial-health] | Our bullets and recommendations are editable like the rest; The score of a household with stock pay moves (F3-11); View more must say why |
| Talk with the client | Recommendations and "We should look into" | The F3-10 outputs, stated as facts, not tax advice (A-04) |
| Over time | Not seen | Tranches reach their dates (F3-A3) |

### F3-A1 · Stock pay reported, detail not yet complete: what does the analysis do?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Block the analysis until the advisor completes the detail | Never an incomplete analysis | Adds friction to a flow that works today | D-023 |
| B | Generate estimated tranches from the client's answers and use them in every figure | Always a number | A rough figure moves the score and the shared report; no end date, so the estimate is weak | A-05 |
| C | Keep the grant out of the figures; the analysis says "stock pay reported, detail pending"; the advisor sees the estimate only as a guide to complete it; completing it reprocesses everything | Applies the platform's missing-data rule; the score does not move on rough data | Until completed, the analysis does not reflect the grant | [brief] missing data "is not treated as a zero"; D-025, D-033 |

- **Recommendation:** C. **Chosen:** C · D-035

### F3-A2 · How does the advisor learn that detail is missing?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Only inside Data & Assumptions | No pipeline change | Missed unless the advisor opens it | [brief] |
| B | An alert on the opportunity, "stock pay: detail pending", like the existing automatic alert that an opportunity seems stalled | Reuses an existing mechanism where the advisor already works | One more alert in the list | [FACT: captures/questionnaire/02-opportunity, alerts] |
| C | B plus a notification when the questionnaire arrives | Most visible | More noise; notifications not seen | none |

- **Recommendation:** B; in advisor mode the stock-pay block opens the full tranche editor. D-023: holds, the alert exists only when stock pay is reported. **Chosen:** B · D-036

### F3-A3 · When a vest date arrives, who turns the tranche into a held position?
Time-based vesting happens without any action from the employee, if still employed (R-002). What follows does not: the employee may have left (forfeiture, R-002), a PSU waits for certification and a double-trigger RSU for the liquidity event (R-011), part of the shares is withheld for tax (R-011, V39), and many clients sell at vest (V35, V36).

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | The advisor, by hand | Full control | Repeated work; data goes stale | none |
| B | The system proposes, the advisor confirms: on the vest date the tranche becomes "vested, pending confirmation" with the estimated shares kept; the advisor records kept (how many), sold or forfeited; PSUs wait for certification, double-trigger for the event; with linked accounts the tranche is matched to the broker position; unconfirmed tranches stay out of the figures | Current data without assuming employment, retention or sale | New logic; matching with aggregated accounts | R-002, R-011, V06, V39, V35, V36 |
| C | No conversion in the MVP: the analysis is computed as of a date; past vests are held positions as entered, the grant adds future tranches only (D-028) | Fits the MVP; no double counting | When the analysis is redone months later, the advisor updates holdings | D-028; A-03 (vest as data, not workflow) |

- **Recommendation:** C in the MVP, B next. D-023: holds in both, only grants are affected. A fully automatic conversion would have to assume employment, retention net of withholding, no sale and PSU payout at target. **Chosen:** C, B next · D-037

## Block 4 · Analysis (continued)

### F3-10 · Which analyses does the advisor get?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Extend concentration only | Smallest change | Leaves out the main pain, tax at vest | A-04 |
| B | Three analyses: employer exposure; tax at vest and the withholding gap (state per D-033); vest proceeds as dated cash for goals. The vest calendar shows as data, with no reminders | Each answers a validated assumption and uses data the MVP already collects | Three pieces to specify in F4 | A-09, R-014; A-04, R-008; A-10; A-03 |
| C | B plus sell-or-hold scenarios and option AMT | More for expert advisors | Depends on options (out by D-024); closer to tax advice; higher error risk | R-003, R-004 |

- **Recommendation:** B. D-023: holds, households without stock pay get no new analysis. **Chosen:** B · D-038

### F3-11 · Where does it show, and how does it touch the score?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | A separate section, no score effect | Touches nothing | A household with most of its wealth in its employer scores the same: the score misleads | A-09 |
| B | Inside what exists, through two existing checks: Investing, concentration recognises employer stock (F3-12); Liquidity, near-term commitments counts the tax gap of vests within its horizon (unknown state part left out, D-033). In the report: bullets, "We should look into" and a recommendation when it applies; future vests as dated inflows in the projection, beside the goal markers; not liquid until they arrive. View more says why the score moved ("employer stock counted in concentration", "tax due on vests counted in near-term commitments") | Score structure unchanged; a household without stock pay sees exactly what it sees today | Scores of households with stock pay move; release notes must explain it | [FACT: data_model, platform_map]; [brief] score article; D-023 |
| C | A sixth score area | Very visible | Changes weights for every household and needs the whole score recalibrated | D-023 |

- **Recommendation:** B. Private equity (D-025) and grants pending detail (D-035) do not score. The checks' horizons and thresholds are not public [brief]; the proposal uses theirs. **Chosen:** B · D-039

### F3-12 · How does employer exposure enter the concentration check?
Concentration is the share of wealth that depends on one thing. With employer stock the risk is double: investments and job can fall together (R-014). No regulatory threshold exists; 10% of investment assets is the most cited rule of thumb, with FINRA's caveat that it "could be too high" (R-014). Today the Investing area checks "concentration in the largest position"; the demo reads "VTI about 45% of investable assets" in the score and "39% Financial Services" in the investment analysis with no financial-sector stock held, so whether the check measures by holding, by issuer or by sector with fund look-through is unknown (asked in `02`). [FACT: captures/client/02-score-breakdown, 03-investment-analysis, 03a-accounts-holdings] Measured by holding, employer stock split across two accounts hides as two smaller positions. Example: $1M invested, $150K of employer stock in each of two accounts, $400K unvested, salary from the same employer.

| | Option | In the example | Gains | Costs | Evidence |
|---|---|---|---|---|---|
| A | Leave the check as is; mention employer stock in the report | Score unchanged; report says "employer 30%" | Nothing changes in the score | If the check measures by holding, the score misses the double exposure | R-014 |
| B | The check reads employer exposure: all held employer shares (vested, kept after withholding, listed only), summed across accounts by issuer, on the check's existing scale and threshold. Unvested grants and salary from the same employer show in the report as context ("if every grant vests, 50%; your salary comes from the same company") | Score sees 30% in one company; report shows 50% and the salary link | Reflects the real risk without scoring what is not owned; invents no threshold | Unvested value does not move the score however large | R-014; D-024, D-026, D-029 |
| C | The score adds unvested grants and penalises the salary link, with a 10% threshold set by us | Score sees 50% | The hardest reading of the risk | Scores value lost on leaving (against D-026); sets a threshold that is Sherpas' product choice (R-014: no rule) | R-014 |

- **Recommendation:** B. The existing threshold is not public [brief]; the proposal does not set one, and the spec cites 10% (R-014) as reference only. Risk: that threshold may be calibrated for fund lines, not one company; listed as a riskiest assumption below. D-023: holds, without employer stock the check works as today.
- **Chosen:** B · D-040

## MVP cut

Status: confirmed by Renier, 2026-10-05 (D-041).

| Item | Cut | Why | From |
|---|---|---|---|
| RSU and PSU grants with dated tranches (pattern, editable; PSU condition and range) | MVP | Most granted types, one model | D-024, D-027 |
| Employer flag on any held position, whatever its origin | MVP | Concentration is right for every type once it is shares | D-024 |
| Unvested as future income and shares; shares kept after withholding and cost basis per tranche | MVP | Tax rule and advisor practice; no inflated holdings | D-026, D-029 |
| Deduplication question and rule | MVP | Clients and tools double count | D-028 |
| Client block in Income: yes/no, type, employer and ticker, rough value, frequency; firm can switch it off | MVP | Asks only what clients know; no change for others | D-030, D-031, D-032 |
| Advisor completes detail in advisor mode and Data & Assumptions; full tranche editor | MVP | Routes that exist today | D-030, D-036 |
| Advisor uploads the plan statement; extraction proposes tranches; the advisor confirms them | MVP | Extraction already exists; less work for the advisor; reduces riskiest assumption 1 | D-042 |
| Grant pending detail stays out of figures; alert on the opportunity | MVP | Missing-data rule; the advisor must learn of it | D-035, D-036 |
| Private-company equity recorded and shown, out of score figures | MVP | Missing-data rule; startup employees have a place | D-025 |
| Optional state withholding rate; gap labelled federal only when missing | MVP | Uses the platform's tax engine; no invented state rule | D-033 |
| Employer exposure, tax at vest and withholding gap, vest proceeds as dated cash; inside existing checks; View more explains the change | MVP | Validated assumptions A-09, A-04, A-10; score structure unchanged | D-038, D-039, D-040 |
| Vest conversion: the system proposes, the advisor confirms; year-by-year follow-up | Next | Vesting depends on employment, certification and the client's sale | D-037 |
| ESPP future purchases | Next | About half of companies offer it, more in tech; own tax logic | D-024, R-005, R-016 |
| An employer-specific concentration threshold | Next, if the existing one does not fit | Depends on the first riskiest assumption below | D-040 |
| Options (NSO, ISO) with exercise and AMT; sell-or-hold scenarios | Later | A falling minority and a different segment; heavy tax logic | D-024, D-038, R-016 |
| RSA, SAR and phantom stock | Later | Restricted stock is granted by few companies and falling; SAR and phantom are often cash-settled, adding exposure without shares | R-006, R-016 |
| 409A value in the figures | Later | A tax value, not a sale price | D-025 |
| State withholding rules applied automatically | Later | Fifty rules to research and maintain | D-033 |
| Dividend equivalents; gain or loss on sale | Later | Matter for sale decisions, not for the MVP analyses | F3-05b |
| ESOP as stock compensation | Never | It is a qualified retirement plan; it belongs with retirement accounts | R-007 |
| A separate score area for stock pay | Never | Changes every household's weights | D-039, D-023 |
| Personalised tax, exercise or sale advice | Never | The analysis states facts and gaps; advice is the advisor's | A-04, D-038 |

## Considered, not researched

Listed so the gaps are visible; none changes the MVP model.

- Insider status, trading windows and planned selling programmes (V02 signal, V26): would change advice on when to sell, not the model (D-031).
- Vesting acceleration on leaving or on a sale of the company; clawbacks.
- Lock-up of shares after an IPO (R-011: not found).
- State supplemental withholding rules (D-033).
- What large firms' compliance review requires of a shared report.

## Riskiest assumptions

| # | Assumption | Decisions that stand on it | How to validate | If wrong |
|---|---|---|---|---|
| 1 | Advisors complete the grant detail soon after the questionnaire, by hand or by confirming an extracted plan statement; the extraction reads equity plan statements [ASSUMPTION: confirm] | D-030, D-035, D-036, D-042 | Share of opportunities with stock pay reported whose detail is completed within a set number of days, in a pilot firm; extraction run on sample plan statements from the main plan providers; the A-05 interview question | The analysis stays "detail pending": make the extraction read plan statements first, or keep the advisor's manual route as the only one |
| 2 | The existing concentration threshold fits a single company | D-040 | Ask Sherpas how the check is scaled and measured; test it on SIMULATED households in the F5 score simulator | Add an employer-specific threshold, set by Sherpas (R-014) |
| 3 | Enough of Sherpas' advisors' households hold employer stock | Priority of the whole feature | Sherpas' data on clients' employers or sectors; uptake of the firm switch; the A-01 interview question | Keep it as a firm-enabled module for firms with corporate and tech clients |
