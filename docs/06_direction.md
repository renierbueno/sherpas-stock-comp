# 06 · Direction

The F3 decisions: for each, three options with trade-offs and evidence, the recommendation and what Renier chose. Method: `.claude/skills/decide/SKILL.md`. Every option is checked against D-023 (nothing gets worse for a household without stock compensation). Inputs: `discovery/synthesis.md` ("What F3 needs to decide"), `research.md`, `data_model.md`, `questionnaire_map.md`. 2026-10-05.

## Block 1 · Scope

### F3-01 · Which stock-compensation types does the MVP support?
Each type pays the employee in employer stock in a different way, with its own dates and tax rules. The MVP supports a subset fully (grant, schedule, future vests); the rest wait, but any shares the client already holds are recognised as employer stock whatever their origin.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | RSU only | Simplest model and tax rule: value at vest is wages | Leaves out performance units, granted almost as often; executives hold them | R-001 (SC-01), R-016 (91% of responding companies grant performance awards, WEAK) |
| B | RSU and PSU, plus an employer flag on any held position | One model covers both (a PSU is an RSU with a condition and a payout range); the flag makes concentration work for shares from ESPP or exercised options too | Future ESPP purchases and unexercised options stay out of the projection | R-002, R-011, R-016; V04 (advisors see more RSUs, fewer options); [FACT: data_model, positions already hold direct stocks] |
| C | RSU, PSU, ESPP and options (NSO, ISO) | Widest coverage, including the tech segment where ESPP is common | Each needs its own logic: purchase periods and disposition rules (ESPP), strike price, exercise and AMT (options); higher risk of tax errors; options serve a different segment | R-003 to R-005, R-016 (ESPP about half of companies, options 41% and falling, WEAK); V14, V20, V28 |

- **Recommendation:** B, because it covers the most granted types with one model, and the employer flag reaches every type once it becomes shares, so concentration is right from day one. A loses PSUs for almost no saving; C multiplies tax logic for a smaller, different segment. D-023: holds, nothing changes for households without grants.
- **Chosen:** B · D-024

### F3-02 · Listed or private employer: how is stock without a market price handled?
What changes the model is not company size but whether the stock has a market price and can be sold. At a private company, RSUs usually settle only after a liquidity event (double trigger), and the only value is a 409A valuation for tax, up to 12 months old and discounted for lack of marketability (R-011, R-017; SC-08, SC-31). With D-024, the private case in the MVP is double-trigger RSUs and private shares already held.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Listed employers only | Everything has a price; simplest | Startup employees still have nowhere to enter their equity, the problem the brief describes | [brief]; R-011 |
| B | Record and show private equity; keep it out of score figures until it has a price. Double-trigger RSUs show as "awaiting a liquidity event", with no invented dates. A known 409A value is shown with its date, for information only | The advisor sees it and can discuss it; follows the platform's own missing-data rule | Score figures (net worth, concentration) do not reflect it until it is priced | [brief] score article, missing data "is not treated as a zero"; R-011, R-017 |
| C | Value it at the latest 409A with a stated discount and include it in the figures | A number and a concentration reading from day one | The number is a tax value, not a sale price, and may never be realised; it can inflate net worth and concentration; people value it very differently (zero, $1, 50% haircut) | R-017 (SC-31; 409A rule STRONG, typical discounts WEAK); V33 |

- **Recommendation:** B, because it applies the platform's own rule for figures it does not have instead of inventing a price (C) or leaving startup employees out (A). D-023: holds, households without private equity see nothing new.
- **Chosen:** B · D-025

## Block 2 · Model

Platform checks carried from discovery: held shares fit the existing positions; every element has one owner; the model already holds future incomes with a start date. [FACT: data_model, questionnaire_map] Tax at vest from filing status and brackets is checked in block 4.

### F3-03 · Lifecycle states: what is a grant in each state?
An RSU is first a promise that is lost if the employee leaves; at vest its value is wages and the shares arrive; kept shares are a position; sold shares are cash; unmet conditions forfeit it (R-001, R-002; SC-01, SC-04). The question is which dimension (asset, liability, income, expense) each state takes. Example used: 400 RSUs, 100 vest per year, price $150, 100 already vested and held.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Model only held shares, flagged as employer stock; ignore unvested | Smallest change; held shares fit positions as they are | Future vests, their tax and future exposure stay invisible, the gap the brief describes | [brief]; [FACT: data_model] |
| B | Unvested is future income and future shares, per dated tranche; at the vest date a tranche becomes that year's wages and a held position; not current net worth (example: net worth $15,000 today, plus $15,000 of income and 100 shares in each of three future years) | Matches the tax rule and advisor practice; feeds the three analysis candidates (exposure, tax at vest, dated cash) | A new element type: the grant with its tranches | R-001, R-002; V07, V08 (advisors model it as future income or a separate entry); V32 |
| C | Unvested counts as current net worth at a haircut | Matches how some clients feel about it | Inflates net worth with value lost on leaving; the haircut is invented; conflicts with D-025's logic | V33 (zero, $1 or 50% haircut) |

- **Recommendation:** B, the only option that follows the tax rule and still shows the advisor the future vests, where the tax, the exposure and the cash for goals sit. D-023: holds, no grant means no new element.
- **Chosen:** B · D-026

### F3-04 · Vesting: how is the schedule stored?
Real schedules come in several shapes: a one-year cliff then equal installments, equal installments, unequal tranches (10/20/35/35), and back-loaded ones (R-009, R-010; SC-06). Assuming even tranches misstates each year's income, tax and concentration. [INFERENCE: from R-010]

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Total, frequency and end date | Three fields, easy to ask | Describes only even schedules; cliffs and unequal or back-loaded schedules come out wrong | R-009, R-010 |
| B | A list of dated tranches (date, shares), generated from a simple pattern ("4 years, quarterly, 1-year cliff") and editable; a PSU adds its condition and a payout range (0% to 200% of target) | Represents every shape found; it is what the analyses read (what arrives, when, how much); a plan statement is in practice a list of tranches | The advisor may need to edit tranches; the pattern generator has to be built | R-009, R-010, R-011, R-002 |
| C | A rule engine that reads any award agreement | Covers every case, rare ones included | Over-built for an MVP | R-011 (PSU and double-trigger conditions vary by plan) |

- **Recommendation:** B, because the pattern gives A's ease and the list gives C's accuracy without its cost. D-023: holds, only grant holders see it.
- **Chosen:** B · D-027

### F3-05 · Deduplication: how is the same money not counted twice?
RSU value at vest is reported as wages on the W-2 (R-001; SC-01), so a client's gross income may already include it; vested shares may also already be in a brokerage account. Counting the grant on top of either double counts.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Assume reported income excludes vest income | No extra question | Many clients include it without knowing; double counts often | R-001; V38 to V41 (confusion between W-2 and broker forms) |
| B | Ask only those who said they have stock compensation: "Does your gross income include stock that vested this year?"; count vest income once, inside or beside salary, by the answer. For shares: past tranches are held positions, the grant adds future tranches only | Resolves the ambiguity where it exists; the share rule is checkable in code and holds even when accounts are linked | One more question, for that segment only | R-001; V06 (double counting when accounts are linked), V38 to V41 |
| C | Change the income question for everyone to base salary only | Clean in theory | Changes a question every household answers today | D-023 |

- **Recommendation:** B, the only option that leaves households without stock compensation untouched (D-023) and fixes double counting with one question plus one rule.
- **Chosen:** B · D-028

### F3-05b · Model completeness: what each tranche keeps after vest
Checked against `research.md` after F3-03: two researched facts were not yet in the model. At settlement part of the shares is usually withheld or sold to pay the tax (net settlement, sell-to-cover), so the employee keeps fewer shares than vest; and the cost basis of kept shares is their value included in income at vest.

- **Decision:** each tranche records the shares kept after withholding and their cost basis (value at vest). Not optional variants, a completeness fix to F3-03. Evidence: R-024 (basis, SC-30), R-011 (net settlement), V39 (sell-to-cover).
- **Chosen:** D-029

## Block 3 · Intake

### F3-06 · Who enters what?
Clients know totals; schedules and terms sit in grant documents and plan portals (A-05; V01, V29); aggregation does not bring unvested grants (R-013).

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | The client enters everything in the questionnaire | One route | Clients do not know dates and terms; a longer questionnaire | A-05; V01, V17, V29, V41, V42 |
| B | The client answers only what they know (yes/no, type, employer, rough unvested value, vest frequency, the D-028 question); the advisor completes the detail through the routes that already exist, advisor mode of the questionnaire and Data & Assumptions; the firm can switch the block off, as it can the "Additional Information" box; the model is built so a document can feed it later | No friction for households without stock compensation; little for those with it; the advisor flow exists | Detail depends on the advisor completing it | [FACT: questionnaire_map, two modes and firm-enabled box]; [brief] Data & Assumptions; A-05 |
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
| B | Employer name and ticker if listed, per person, inside the stock-compensation block | Makes employer exposure possible | One more field, only for grant holders | A-09, R-014; [FACT: data_model, market data for direct stocks] |
| C | B plus an insider flag (trading windows, hedging limits) | Sharper advice on when to sell | Not researched; changes the advice, not the model | V02 (signal only), V26 |

- **Recommendation:** B. The insider flag is listed under "Considered, not researched", not in the cut. D-023: holds.
- **Chosen:** B · D-031

### F3-08 · Where does it sit in the questionnaire?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | In Income, right after gross income, as a yes/no question that opens the block | RSU value is pay (R-001; SC-01); same yes/no pattern as pension and annuity; the D-028 question sits next to the figure it affects | Evidence that clients look for it there is weak | R-001; [FACT: questionnaire_map]; A-08 |
| B | A new section | More visible | Longer path for everyone (breaks D-023); separates the D-028 question from income | D-023 |
| C | No questionnaire change; advisor only | No change for clients | The advisor does not learn of the grant unless the client mentions it | A-05 |

- **Recommendation:** A, on the tax rule and an existing pattern; A-08 stays an assumption to test.
- **Chosen:** A · D-032

## Block 4 · Analysis

### F3-09 · State withholding in the tax gap at vest
The tax owed on a vest (federal, state, FICA) is computed by the platform's existing tax engine once vest income enters as that year's wages: it already holds state, filing status and brackets and shows federal, FICA and state tax lines. [FACT: data_model; INFERENCE that vest income can feed it like salary] The gap is tax owed minus tax already withheld. Federal withholding follows a rule (22%, 37% above $1 million; R-008; SC-14); state withholding rules were not researched.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Gap computed on federal only; state tax owed shown, no state withholding subtracted | No new field | The state gap is never shown | R-008, SC-17; [FACT: data_model] |
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
| Send the questionnaire | Opportunity pipeline; firm settings decide which questions show | In the first release Sherpas switches the stock-compensation block on and off for pilot firms (D-030, D-111) |
| Receive answers | Advisor reviews and presses "Submit and continue" | A household may report stock compensation with detail missing (F3-A1, F3-A2) |
| Complete detail | Advisor mode; Data & Assumptions, where saving reprocesses the analysis; document upload with extraction [web: sherpaswealth.com/data-extraction] | Upload of the plan statement, extracted tranches confirmed by the advisor (F3-06b); Tranches (D-027), shares kept and basis (D-029), state withholding (D-033), employer and ticker (D-031); in advisor mode the block opens the full tranche editor |
| Review before sharing | View more explains the score; manual adjustment within ±10; reprocessing replaces it; advisors edit generated observations and strategies before presenting [web: sherpaswealth.com/financial-health] | Our bullets and recommendations are editable like the rest; The score of a household with stock compensation moves (F3-11); View more must say why |
| Talk with the client | Recommendations and "We should look into" | The F3-10 outputs, stated as facts, not tax advice (A-04) |
| Over time | Not seen | Tranches reach their dates (F3-A3) |

### F3-A1 · Stock compensation reported, detail not yet complete: what does the analysis do?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Block the analysis until the advisor completes the detail | Never an incomplete analysis | Adds friction to a flow that works today | D-023 |
| B | Generate estimated tranches from the client's answers and use them in every figure | Always a number | A rough figure moves the score and the shared report; no end date, so the estimate is weak | A-05 |
| C | Keep the grant out of the figures; the analysis says "stock compensation reported, detail pending"; the advisor sees the estimate only as a guide to complete it; completing it reprocesses everything | Applies the platform's missing-data rule; the score does not move on rough data | Until completed, the analysis does not reflect the grant | [brief] missing data "is not treated as a zero"; D-025, D-033 |

- **Recommendation:** C. **Chosen:** C · D-035

### F3-A2 · How does the advisor learn that detail is missing?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | Only inside Data & Assumptions | No pipeline change | Missed unless the advisor opens it | [brief] |
| B | An alert on the opportunity, "stock compensation: detail pending", like the existing automatic alert that an opportunity seems stalled | Reuses an existing mechanism where the advisor already works | One more alert in the list | [FACT: captures/questionnaire/02-opportunity, alerts] |
| C | B plus a notification when the questionnaire arrives | Most visible | More noise; notifications not seen | none |

- **Recommendation:** B; in advisor mode the stock-compensation block opens the full tranche editor. D-023: holds, the alert exists only when stock compensation is reported. **Chosen:** B · D-036

### F3-A3 · When a vest date arrives, who turns the tranche into a held position?
Time-based vesting happens without any action from the employee, if still employed (R-002). What follows does not: the employee may have left (forfeiture, R-002, SC-04), a PSU waits for certification and a double-trigger RSU for the liquidity event (R-011), part of the shares is withheld for tax (R-011, V39), and many clients sell at vest (V35, V36).

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
| C | B plus sell-or-hold scenarios and option AMT | More for expert advisors | Depends on options (out by D-024); closer to tax advice; higher error risk | R-003, R-004; SC-32, SC-33 |

- **Recommendation:** B. D-023: holds, households without stock compensation get no new analysis. **Chosen:** B · D-038

### F3-11 · Where does it show, and how does it touch the score?

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | A separate section, no score effect | Touches nothing | A household with most of its wealth in its employer scores the same: the score misleads | A-09 |
| B | Inside what exists, through two existing checks: Investing, concentration recognises employer stock (F3-12); Liquidity, near-term commitments counts the tax gap of vests within its horizon (unknown state part left out, D-033). In the report: bullets, "We should look into" and a recommendation when it applies; future vests as dated inflows in the projection, beside the goal markers; not liquid until they arrive. View more says why the score moved ("employer stock counted in concentration", "tax due on vests counted in near-term commitments") | Score structure unchanged; a household without stock compensation sees exactly what it sees today | Scores of households with stock compensation move; release notes must explain it | [FACT: data_model, platform_map]; [brief] score article; D-023 |
| C | A sixth score area | Very visible | Changes weights for every household and needs the whole score recalibrated | D-023 |

- **Recommendation:** B. Private equity (D-025) and grants pending detail (D-035) do not score. The checks' horizons and thresholds are not public [brief]; the proposal uses theirs. **Chosen:** B · D-039

### F3-12 · How does employer exposure enter the concentration check?
Concentration is the share of wealth that depends on one thing. With employer stock the risk is double: investments and job can fall together (R-014; SC-29). No regulatory threshold exists; 10% of investment assets is the most cited rule of thumb, with FINRA's caveat that it "could be too high" (R-014). Today the Investing area checks "concentration in the largest position"; the demo reads "VTI about 45% of investable assets" in the score and "39% Financial Services" in the investment analysis with no financial-sector stock held, so whether the check measures by holding, by issuer or by sector with fund look-through is unknown; the work assumes by holding [ASSUMPTION: A-13]. [FACT: captures/client/02-score-breakdown, 03-investment-analysis, 03a-accounts-holdings] Measured by holding, employer stock split across two accounts hides as two smaller positions. Example: $1M invested, $150K of employer stock in each of two accounts, $400K unvested, salary from the same employer.

| | Option | In the example | Gains | Costs | Evidence |
|---|---|---|---|---|---|
| A | Leave the check as is; mention employer stock in the report | Score unchanged; report says "employer 30%" | Nothing changes in the score | If the check measures by holding, the score misses the double exposure | R-014 |
| B | The check reads employer exposure: all held employer shares (vested, kept after withholding, listed only), summed across accounts by issuer, on the check's existing scale and threshold. Unvested grants and salary from the same employer show in the report as context ("if every grant vests, 50%; your salary comes from the same company") | Score sees 30% in one company; report shows 50% and the salary link | Reflects the real risk without scoring what is not owned; invents no threshold | Unvested value does not move the score however large | R-014; D-024, D-026, D-029 |
| C | The score adds unvested grants and penalises the salary link, with a 10% threshold set by us | Score sees 50% | The hardest reading of the risk | Scores value lost on leaving (against D-026); sets a threshold that is Sherpas' product choice (R-014: no rule) | R-014 |

- **Recommendation:** B. The existing threshold is not public [brief]; the proposal does not set one, and the spec cites 10% (R-014) as reference only. Risk: that threshold may be calibrated for fund lines, not one company; listed as a riskiest assumption below. D-023: holds, without employer stock the check works as today.
- **Chosen:** B · D-040

## MVP cut

Status: confirmed by Renier, 2026-10-05 (D-041); current scope after the first release cut (D-080) and the decisions since (D-101, D-104 to D-107). Release 1 is F-A; release 2 is the rest of the first release.

| Item | Cut | Why | From |
|---|---|---|---|
| Employer flag on any held position, whatever its origin; employer stock as one position in the existing concentration check, with flag suggestion; View more explains the change | First release (release 1) | Concentration is right for every type once it is shares; needs no grant; A-09 validated | D-024, D-040, D-080 |
| RSU and PSU grants with dated tranches (pattern, editable; PSU condition and range) | First release (release 2) | Most granted types, one model; base of tax at vest and of the lines on goals | D-024, D-027, D-080 |
| Delivery date per tranche, prefilled with the vest date and editable | First release (release 2) | Income tax falls in the delivery year (SC-02), FICA in the vest year (SC-03) | D-101, D-110 |
| Unvested as future income and shares | First release (release 2) | Tax rule and advisor practice; no inflated holdings | D-026, D-080 |
| Deduplication rule: income is asked without stock compensation, and each vest is counted once, beside it | First release (release 2) | Clients and tools double count | D-028, D-080, D-094 |
| Client block in Income: a "Stock compensation" chip whose row has the same fields as other income rows (employer, owner, optional amount per year); firm can switch it off | First release (release 2) | Entry point of the product; asks only what clients know (A-05); no change for others | D-030, D-031, D-032, D-076, D-080 |
| Advisor completes detail in advisor mode and Data & Assumptions; full tranche editor | First release (release 2) | Routes that exist today | D-030, D-036, D-080 |
| Advisor uploads the plan statement; extraction proposes tranches; the advisor confirms them | First release (release 2) | Extraction already exists; completes the grant with one review; riskiest assumption 1 | D-042, D-080 |
| Grant pending detail stays out of figures; alert on the opportunity | First release (release 2) | Missing-data rule; the advisor must learn of it | D-035, D-036, D-080 |
| Private-company equity recorded and shown, out of score figures | First release (release 2) | Missing-data rule; startup employees have a place | D-025, D-080 |
| Optional state withholding rate; gap labelled federal only when missing | First release (release 2) | Uses the platform's tax engine; no invented state rule | D-033, D-080 |
| Tax at vest and the withholding gap, inside the Liquidity check; View more explains the change | First release (release 2) | A-04, the strongest validated pain; score structure unchanged | D-038, D-039, D-080 |
| Head of household filing status in the tax figures | First release (release 2) | The spec uses the platform's tax engine with the household's filing status (AC-C-03); 2026 figures exist (SC-11); treating these households as single overstates tax; the prototype's simulator keeps single and joint | D-104, D-123 |
| Value at delivery for tranches delivered this year; their tax gap stays until year end | First release (release 2) | An under-withheld vest earlier in the year is a payment due at filing (SC-17) | D-107 |
| Vests as dated cash beside goals, as text lines | First release (release 2) | A-10 as advisors and clients use it | D-040, D-080 |
| Vests inside the projection and every figure read from it, each as wage income on its delivery date | First release (release 2) | A vest is wages of the delivery year (SC-01, SC-02), so the platform's own rules for wages apply and nothing is assumed saved [ASSUMPTION: A-62]; if the projection cannot read it, this part waits for Next | D-074, D-080, D-106 |
| Shares kept after withholding and cost basis per tranche; cost basis on a flagged position | Next | No figure of the first release reads them | D-029, D-080 |
| 409A display | Next | No figure of the first release reads it | D-080 |
| Vest conversion: the system proposes, the advisor confirms; year-by-year follow-up | Next | Vesting depends on employment, certification and the client's sale | D-037 |
| ESPP future purchases | Next | About half of companies offer it, more in tech; own tax logic | D-024, R-005, R-016; SC-34 |
| An employer-specific concentration threshold | Next, if the existing one does not fit | Depends on the first riskiest assumption below | D-040 |
| Options (NSO, ISO) with exercise and AMT; sell-or-hold scenarios | Later | A falling minority and a different segment; heavy tax logic | D-024, D-038, R-016; SC-32, SC-33 |
| RSA, SAR and phantom stock | Later | Restricted stock is granted by few companies and falling; SAR and phantom are often cash-settled, adding exposure without shares | R-006, R-016; SC-35 |
| 409A value in the figures | Later | A tax value, not a sale price | D-025 |
| State withholding rules applied automatically | Later | Fifty rules to research and maintain | D-033 |
| Gain or loss on sale | Later | Matters for sale decisions, not for the first release analyses | F3-05b |
| Dividend equivalents | Never in this release | Known edge case: no IRS text states the rule (SC-27, A-50), small against vest value, no dividend data for the employer | D-105 |
| ESOP as stock compensation | Never | It is a qualified retirement plan; it belongs with retirement accounts | R-007; SC-36 |
| A separate score area for stock compensation | Never | Changes every household's weights | D-039, D-023 |
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
| 1 | Advisors complete the grant detail soon after the questionnaire, by hand or by confirming an extracted plan statement; the extraction reads equity plan statements [ASSUMPTION: A-15] | D-030, D-035, D-036, D-042 | Share of opportunities with stock compensation reported whose detail is completed within a set number of days, in a pilot firm; extraction run on sample plan statements from the main plan providers; the A-05 interview question | The analysis stays "detail pending": make the extraction read plan statements first, or keep the advisor's manual route as the only one |
| 2 | The existing concentration threshold fits a single company | D-040 | Test it on SIMULATED households in the F5 score simulator [ASSUMPTION: A-13, A-14] | Add an employer-specific threshold, set by Sherpas (R-014) |
| 3 | Enough of Sherpas' advisors' households hold employer stock | Priority of the whole feature | Sherpas' data on clients' employers or sectors; uptake of the firm switch; the A-01 interview question | Keep it as a firm-enabled module for firms with corporate and tech clients |

## Revisited in F6 · the first release (D-080)

Building the prototype and mapping every touchpoint (`10_flow_review.md`, D-073) showed two things the F3 cut did not weigh: how much each feature reaches into figures the client reads, and what the advisor has to do before the client gets any value. This entry revisits the first release with the same method. Counts: requirements per feature F-A 23, F-B 31, F-C 29, F-D 11, F-E 21, F-F 15, shared rules 17 [FACT: `docs/spec`, 2026-10-06]. Release order before this entry: 1 F-A, 2 F-B, 3 F-C to F-F.

### F3-13 · What is the first release?
The first release is what the pilot firms get. It should be the smallest scope in which the model is whole for advisor and client, reaches the client in the report the advisor shares, and lets the pilot read a result in weeks.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | **Exposure first.** Employer stock counted as one position (F-A), the Income chip with a pending grant and an alert (F-E), grants recorded as a list of vests with no income and no tax (part of F-B). Tax at vest, extraction and the projection in later releases | About 40% to 45% of the full scope [INFERENCE: from requirement counts and engines touched]; one score check changes (concentration), so the pilot reads cleanly; no vest income anywhere, so no double counting is possible | Leaves out tax at vest, the strongest validated pain (A-04); a list of vests is what advisors already keep in spreadsheets (discovery pattern 1); no completion path for the grant, so riskiest assumption 1 is not tested | A-04, A-09; V08, V10 to V14; F-A spec "Depends on: none" |
| B | **Core loop.** F-A, F-E, F-B, F-F and F-C in full; from F-D only the text lines ("<Company> vests: $X after estimated tax", "Vests before <goal> (<year>)", AC-D-02, AC-D-06 to AC-D-08). The projection change (AC-D-01, AC-D-03 to AC-D-05, AC-D-09 to AC-D-11), the 409A display (AC-B-20, AC-B-21) and cost basis entry (AC-A-03) move to Next. Ships as one release after F-A, not F-B alone | Covers A-04, A-09, A-05, A-06 and A-10 as dated amounts beside goals, the way advisors and clients use it (V22, V43, V44); the score moves through two existing checks only, each explained in View more; tests riskiest assumption 1; the client-facing retirement figures stay as today until the pilot has read the simpler signals | About 75% to 80% of the full scope [INFERENCE]; retirement figures do not yet include vests, which understates them for households with large grants; depends on extraction reading plan statements, with typing as the fallback | A-04, A-05, A-06, A-09, A-10; R-001, R-008, R-013; 07 test card 1 |
| C | **Everything at once**, as specified: F-A to F-F, releases 1 F-A, 2 F-B, 3 the rest | The complete picture, including vests inside the projection and every figure read from it (D-074) | 100%; three kinds of change land together (concentration, liquidity, projection figures), so a pilot result is harder to attribute; retirement figures cannot be checked within a pilot of weeks; release 2 gives the advisor a grant editor with no client trigger and no analysis on top | D-074; `07_success_criteria.md` pilot length |

Two facts weigh on C's projection beyond effort:
- A vest is wages (R-001; SC-01). The projection would add each vest's after-tax amount as savings that compound until retirement (AC-D-10), while vests often fund near-term goals (A-10; V43, V44). Whether the platform's projection treats wages the same way is not known [INFERENCE: from AC-D-10 and the cash flow statement, where income reaches savings only as a share, FACT: platform_map 04c]. If it does not, retirement figures for these households would read high.
- The retirement figures are the ones the client reads most and the slowest to verify.

How the options are judged (D-082): first three gates, pass or fail; an option that fails one is out. Then five criteria, compared in words, not scored, because the evidence says which option is stronger on each but not by how much.

| Gate | A | B | C |
|---|---|---|---|
| Sound model: nothing counted twice (A-06, D-028), nothing missing treated as zero [brief], no new score area (D-039), facts not advice (AC-G-06) | Pass: no vest income anywhere | Pass: the income question settles double counting before any tax figure | Pass in its rules; the retirement figures may read high (the two facts above) |
| Nothing changes for households without stock compensation (D-023) | Pass | Pass | Pass |
| The default path reaches the client without the advisor typing grants | Pass: one flag per employer, suggested once its ticker is known (AC-E-17); the vest list is optional | Pass if extraction reads plan statements (test card 1); typing is the fallback | Same as B |

| Criterion | A · Exposure first | B · Core loop | C · Everything at once |
|---|---|---|---|
| Impact for advisor and household | Weaker: concentration only (A-09); leaves out tax at vest, the strongest validated pain (A-04) | Strong: A-04, A-09, A-05, A-06, and A-10 as dated amounts beside goals (V22, V43, V44) | Strongest: B plus vests inside the retirement figures |
| What the pilot learns in four to six weeks | Fast but narrow: reach (M-06) and score trust (M-04); not whether grants get completed | The riskiest assumption: completion and extraction (M-02, M-03, test card 1), plus M-04 on two checks | Slowest: three kinds of change at once; retirement figures cannot be checked in weeks |
| Fit with the platform | One flag read by an existing check; no use of document extraction | Questionnaire chip, document extraction, generated analysis and two existing checks (D-039); a first use of tax planning, named in Sherpas' use of funds [`01_context.md`] | As B, and it also changes the projection and six figures read from it (D-074) |
| Effort [INFERENCE: requirement counts and engines touched] | About 40% to 45% | About 75% to 80% | 100% |
| Risk of a wrong figure reaching the client | Lowest: one check changes | Low: two checks, each explained in View more; pending and private stay out of every figure (AC-G-04, AC-G-05) | Medium: retirement figures may read high and are the slowest to verify |

Rule: impact decides between options that pass the gates, because the brief asks what analysis the advisor gets [brief]; learning and risk decide between options of equal impact. B loses to A on effort, learning speed and risk, and wins on impact; C adds impact on the weakest evidence.

- **Recommendation:** B, because it is the smallest scope that keeps the whole chain (the client reports it, the advisor completes it with one review, vest income is counted once, concentration and tax at vest reach the score and the shared report). It beats A because A drops tax at vest, the strongest validated pain on both sides. It beats C because it delivers the same validated pains with about a fifth less work and leaves the figures with the widest reach and the weakest evidence for after the pilot. D-023: holds in all three; households without stock compensation see nothing new.
- **Chosen:** B · D-080, with four refinements: present it as a first use of tax planning inside the existing analysis, not a separate module; release F-A first, then the rest together; test extraction on plan statements before the pilot; validate demand before building (test cards and advisor interviews).
- **Amended (D-106):** the projection with vests joins the first release. Each vest enters the projection as a one-time wage income on its delivery date, not as savings, which removes the risk of the first fact above: the platform treats it as it treats wages. If the projection cannot read such an income (A-62), the projection part waits for Next and the rest ships.
- **What would change the choice:**
  - A becomes right if extraction fails on plan statements (test card 1) and the advisor interviews say grants will not be typed: tax at vest would then reach few clients, and A delivers concentration at about half the cost of B.
  - C becomes right if the pilot shows advisors adding vests to the retirement figures by hand (edits to Retirement & Goals, M-05) and the platform projects wages as savings the same way it would project vests.
  - Doing nothing becomes right if reach stays below the release 1 stop threshold of `07_success_criteria.md` (fewer than 1 in 20 households, M-06, D-088): stock compensation then fits a module for firms with corporate and tech clients.

### First release cut (D-080)

The first release cut now lives in the MVP cut table above (D-080, D-106).

### Riskiest assumptions of the first release

Same three as above, in the order they are tested before building (D-080): 3 (reach, from Sherpas' data and five advisor interviews), 1 (extraction on 10 plan statements), 2 (threshold, with the score simulator).

### F3-14 · How much does the advisor confirm before stock compensation reaches the analysis?
For a household with stock compensation, the advisor today confirms each grant read from a plan statement, answers whether the salary on file already includes this year's vests (the grant stays pending until then), and confirms flagging the employer shares the client holds. The platform's promise is to automate the advisor's invisible work [brief], and the client sees the analysis only once the advisor shares it [FACT: platform_map, "the end client's view of a shared analysis"].

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | **Keep each confirmation.** Confirm each grant, answer the income question before the grant is complete, confirm each flag | Lowest risk of a wrong figure; no change to the spec | About four confirmations per household; while the income question is unanswered the grant stays out of the figures, so tax at vest does not reach the client (M-07) | AC-F-06, AC-B-28, AC-B-29, AC-E-13, AC-E-18; TP-SF17-04, TP-SF17-08, TP-SF17-13 |
| B | **Apply by default.** Extracted grants, flags and a default income answer count at once, each with Undo; the advisor's review before sharing is the control | Least work | Values read from a document count before anyone looks at them; sharing becomes the only control, and editing generated content before presenting is optional for advisors [web, `01_context.md`]; reverses D-042 | D-042, AC-F-06, TP-SF21-01 |
| C | **One review, nothing blocks.** One review per statement with "Confirm all"; confirming a grant flags the held shares of its ticker at once, with Undo; the income question no longer blocks: until answered, this year's vests are taken as already inside the reported salary, labelled in the figures | One review and one click in the best case; nothing read from a document counts without the advisor; the default can never count vest income twice | If the salary did not include this year's vests, the tax on this year's vests is missing (labelled) until the advisor answers; changes AC-B-28, AC-B-29, AC-E-13, EC-E-04, AC-E-17, AC-E-18, one new F-F requirement; amends D-028 and D-070 | A-06 (double counting, validated); the score article: a missing figure is left out, not invented [brief]; D-042 kept; TP-SF17-04, TP-SF17-08, TP-SF17-13 |

- **Recommendation:** C, because it removes the confirmations that add no judgement while keeping the platform's flow (the client uploads, the platform reads, the advisor confirms, the advisor shares). It beats A because A leaves value stuck behind a question the advisor may not answer; it beats B because in B nothing a person has checked stands between a misread document and the shared report. D-023: holds in all three; only households with stock compensation are affected.
- **Chosen:** C · D-090

### F3-15 · Where does the platform's AI act on stock compensation, and where never?
Sherpas builds AI agents that automate the advisor's invisible work [brief]. In the first release, AI acts where the platform already uses it: reading uploaded documents into data, now including plan statements, and writing the analysis text, which advisors edit before presenting [web, `01_context.md`]. The open question is whether an agent also takes a step that today waits on a person.

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | **Only where AI acts today.** Extraction of plan statements and the written analysis; nothing else | No new agent, no new message to the client; smallest scope | A grant stays pending until the advisor gets the statement by hand, which is the riskiest assumption (completion, M-07); the AI part is thin for a platform built on agents | D-042, AC-G-17; `07` test card 1 |
| B | **One agent in the first release: ask for the missing statement.** While a grant is pending, the platform drafts a request to the client for the plan statement, with where to find it; the advisor sends it or edits it; the statement then comes back into the same review (F3-14). Further agent steps are Next | Attacks the step most likely to stop value reaching the client; uses the document route the platform already has; the advisor stays in control of what the client receives | A new message to the client, so its wording needs review; one more requirement and event | Sherpas' blog: clients "take weeks or months to send documents" [web, `01_context.md`]; A-05 (the detail sits in documents and portals); M-07, D-090 |
| C | **Agents across the loop.** B, plus reading the "Anything to add" chat and "Other income" for stock compensation and proposing a grant (GAP-40, GAP-45), plus proposing the shares kept at each vest from linked or uploaded statements (D-037 Next) | The fullest use of agents; closes two gaps and the follow-up at vest | Three new AI outputs to check in one release, where D-080 kept the first release small; proposing held shares reverses D-037 for this release | D-037, D-080; GAP-40, GAP-45 |

Never, in any option: sell, hold or exercise advice (AC-G-06), and reminders on vest dates to the client (AC-B-25).

- **Recommendation:** B, because the step that most often keeps stock compensation from reaching the client is getting the plan statement, and an agent that drafts the request, with the advisor sending it, removes that wait without changing what the advisor confirms. It beats A because A leaves the riskiest step to chance; it beats C because C adds three unchecked AI outputs to a release chosen to be small. D-023: holds in all three; only households with a pending grant are affected.
- **Chosen:** A · D-091, kept simple: the client uploads the plan statement, the platform reads it, the advisor confirms (F3-14). If stock compensation is reported without a statement, nothing blocks: the grant stays pending, the statement can be uploaded later, and the analysis runs again on confirmation.
