# Discovery synthesis · F2

What the case's assumptions look like after research (`research.md`), real public voices (`voices.md`) and SIMULATED personas (`personas.md`, `snapshots/`). Weights per D-019 and the filter per D-021: an assumption is validated only by behaviour or rule-consistent items from two independent real speakers; SIMULATED material never validates. 2026-10-05.

## Assumptions

Status and evidence come from the cited sources; the "What F3 should do" column is our reading. [INFERENCE: from the evidence in each row]

| ID | Assumption | Source | Decision it changes in F3 | Status | Evidence (weight) | What F3 should do |
|---|---|---|---|---|---|---|
| A-01 | Advisors with tech or corporate clients meet stock compensation often | `05_business_lens.md` | Priority of the feature; which segment the MVP serves | **Validated in part**: it clusters in corporate and tech clients; frequency is unmeasured | V22, V25, V26, V28, V30 (medium); one firm sees it rarely, V01 | Treat it as segment-specific. Frequency stays an assumption (A-25) |
| A-02 | Missing stock compensation lowers the advisor's trust in the analysis | `05_business_lens.md` | Whether the gap is framed as a quality problem of the core analysis | **Unknown** | Adjacent only: V25 "could make you lose the client"; G2 reviewers check data before showing clients (medium, indirect) | Do not use as a premise; frame the value on what is validated (A-04, A-06, A-09) |
| A-03 | Vest dates are moments to contact the client | `05_business_lens.md` | Whether events and reminders enter the MVP or "next" | **Validated on the client side only**: clients act at vest and are surprised in April; no advisor describes scheduled vest contacts | V35, V36, V19 (medium) | Vest calendar as data, not as a workflow feature, in the MVP |
| A-04 | Stock compensation leads to tax planning | `05_business_lens.md` | Whether the analysis shows tax at vest and the withholding gap | **Validated**: the strongest pattern | V19 to V23, V35 to V37 (medium, many speakers); R-001, R-004, R-008 | Show the expected tax event and the gap between 22% withholding and the household's bracket; facts, not advice |
| A-05 | Clients know or can find their grant data | `questionnaire_map.md` | Intake design: client self-entry vs advisor entry vs document upload | **Contradicted for the detail**: clients know totals; schedules and terms sit in grant documents and plan portals; aggregation does not bring unvested grants | V01, V17, V29, V41, V42 (medium); signals V02, V03; R-013 | Ask the client only for what they know (type, employer, rough value, vest frequency); get the detail from documents or the advisor |
| A-06 | Vest income is already in reported salary, so it can be counted twice | R-001 | How income and holdings are deduplicated | **Validated, wider than assumed**: confusion between W-2 and broker forms, and double counting inside planning tools when accounts are linked | V06, V07, V38 to V41 (medium) | A deduplication rule is a requirement: vested shares counted once (holding), vest income counted once (inside or beside salary, asked explicitly) |
| A-07 | Unvested awards are left out of the household's picture | `data_model.md` | Whether unvested is an asset, future income, or both, in the model | **Split**: clients leave it out; advisors model it as future income or a separate entry, never as a current asset | V32, V33 (client side); V07, V08 (advisor side) (medium) | Model unvested as future income and future shares, with its own visibility, not as current net worth (consistent with R-002, R-012) |
| A-08 | The natural intake place is right after the income question | `questionnaire_map.md` | Questionnaire placement | **Unknown** | Weak hint only: advisors enter future vests as "other income", V08 | Decide on the brief, the platform and R-001 (it is pay); test later |
| A-09 | Concentration matters more when salary and stock come from the same employer | `data_model.md`, R-014 | Whether the concentration check adds the employer link and unvested exposure | **Validated** | V24 to V27, V31, V34 (medium); R-014 (FINRA) | Extend concentration to "employer exposure": vested shares, unvested grants and salary from the same company |
| A-10 | Vest proceeds fund near-term goals | `data_model.md` | Whether vest proceeds feed the liquidity and goals view | **Validated as a common use** | V22, V43, V44 (medium) | Vest proceeds appear as dated future cash, available for goals |
| A-11 | Stock compensation belongs in the core analysis, not a paid add-on | `05_business_lens.md` | Packaging and pricing | **Unknown** for pricing | No evidence; see the tools gap below | Keep as an assumption; pricing stays an assumption (A-28) |

**Dropped, with reason:**
- "A capability that helps win large firms weighs more" (`05_business_lens.md`, Customers): a strategy premise from the brief, not something discovery can test.
- Platform-capability inferences in the "would fit" sections of `data_model.md` and `questionnaire_map.md` (vested shares already fit the holdings model, tax at vest can be estimated from stored filing status and brackets, an award has a single owner, advisor mode can complete the equity part): they are about the platform, not about advisors or clients, so they are checked in F3 and F4 against the platform, not in discovery.
- The "Assumption carried forward" lines in `research.md` (PSU payout range, option terms, 2026 AMT amounts, aggregator coverage and others): they are about rules and data sources, so they stay with research and `02_open_questions.md`; the two that F3 depends on are covered above as A-05 and A-06.

## Interview guide

Past behaviour, not opinions about a future feature. Used for the SIMULATED snapshots, and ready for real interviews if any happen.

| ID | Question | Who |
|---|---|---|
| A-01 | Of your last ten new households, how many had equity compensation? Which types? | Advisor |
| A-02 | The last time a client had equity you could not enter properly, what did you do with the report? | Advisor |
| A-03 | When did you last contact a client because of a vest or an expiry? What triggered it? | Advisor |
| A-04 | What was the last tax surprise a client had from equity? How did you find out? | Advisor, client |
| A-05 | Where did the grant details come from for your last equity client? / Where would you look up your vest schedule? | Advisor / client |
| A-06 | When you gave your income, did it include stock that vested? How did you know? | Client |
| A-07 | Do you count shares that have not vested yet in your net worth? Why? | Client, advisor |
| A-08 | In the intake you last filled in, where did you mention your stock, if at all? | Client, advisor |
| A-09 | How much of your wealth and income depends on your employer? When did you last change that? | Client, advisor |
| A-10 | What did you do with the money from your last vest? | Client |
| A-11 | Not asked: pricing is for Sherpas. | |

## Patterns

1. **The tools gap is real and specific.** Advisors keep RSU, ESPP and options "reality" in spreadsheets beside their planning software, even with modules that exist (V10, V11, V12, V14). Planning tools differ in coverage: one has no ESPP place (V14), another double counts when accounts are linked (V06). Of 44 G2 reviews of the two leading tools, none mentions stock plans (V16). One counter-voice models it with effort (V13).
2. **The tax event at vest is the main pain, on both sides.** Under-withholding at the flat rate and surprise bills (V19, V21, V35, V37); AMT for options holders (V20); advisors and accountants disagree on timing (V23).
3. **Data lives in documents and portals, not in the client's head** (V01, V02, V03, V29, V41). Aggregation tools fail often and do not bring unvested grants (V16, R-013).
4. **Concentration is tied to employment.** Clients link holding the stock to working there (V24); advisors see executives above 20% (V25) and few hedging options for insiders (V26).
5. **Unvested equity is invisible to clients and awkward for advisors** (V32, V33, V07, V08).

## Contradicting evidence

- One advisory team rarely sees clients with equity (V01): frequency depends on the firm's client base.
- One planner models sell-vs-hold in an existing tool (V13): the gap is effort, not impossibility.
- A minority of employees hold or buy more company stock on purpose (labelled kept items in `captures/voices/`): concentration is not always a mistake to the client.
- Some clients value unvested or illiquid equity at a haircut instead of zero (V33).

## What F3 needs to decide

1. **Types in the MVP.** Evidence: almost every responding company grants RSUs and performance units, options are a falling minority, and about half offer an ESPP, more in technology (R-016, company-level and WEAK); advisors report the same shift (V04, signal). ESPP is unsupported in at least one planning tool (V14). Options and AMT matter for a different segment (V20, V28; R-003, R-004). ESOP is a retirement plan (R-007). Household-level prevalence is missing (R-015).
2. **Lifecycle states to model.** Evidence: unvested as future income and future shares, vested as a holding, with the transition dated (R-002, A-07).
3. **Vesting representation.** Evidence: a list of dated tranches covers the time-based, unequal and back-loaded schedules found; performance and double-trigger need a condition and a range (R-009 to R-011).
4. **Intake split.** Evidence: what the client knows vs what needs documents or the advisor (A-05, R-013).
5. **Deduplication rule** for income and holdings (A-06).
6. **Analysis outputs.** Candidates with evidence: employer exposure in concentration (A-09), tax at vest and the withholding gap (A-04, R-008), vest proceeds as dated cash for goals (A-10). Where they appear in the report (a check, a recommendation or a section) is open.
7. **Listed vs private employer as the scope axis, not company size.** What changes the model is whether the stock has a market price and can be sold: RSUs exist at private companies (double trigger, R-011) and options at public ones (R-003). Private-company stock has only a tax value, up to 12 months old, discounted for lack of marketability (R-017). Option for F3, grounded in the brief's own score rule ("A figure Sherpas does not have is left out of the calculation. It is not treated as a zero") [brief]: record and show private-company equity, but keep it out of the score figures until it has a price. The alternative is to value it at the 409A figure with a stated discount. [INFERENCE: from R-011, R-017 and the brief's missing-data rule] Evidence on how people value it is split (V33).
8. **The employer as a new data point.** The questionnaire asks for one gross income and a business-owner flag, but not who the employer is. [FACT: captures/questionnaire/02-opportunity, see `questionnaire_map.md`] Without it, salary, grants and shares cannot be linked into one employer exposure (A-09, R-014). The employer (and ticker if listed) also gives the sector, which adds to the sector concentration the analysis already shows [FACT: captures/client/03-investment-analysis], and the price. [INFERENCE: from A-09 and R-014] Optional: an insider flag for trading windows and hedging limits (V02, V26). Self-employment and business ownership are not stock compensation and keep their existing flag. [FACT: captures/client/07-api, business-owner flag]

## Limits

- No real interview. All voices are self-selected; advisors at large firms, Sherpas' users [brief], are under-represented.
- Translated Reddit threads are paraphrased.
- SIMULATED snapshots add no weight; they only make the hypotheses concrete and give F4 and F5 test households.
