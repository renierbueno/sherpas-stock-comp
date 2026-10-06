# 02 · Open questions

What we do not know. Do not guess an answer anywhere else in the repo. When one is answered, move it to "Answered" with its source.

## For the platform (answer in F1 with capture-platform)

- What do the advisor and the client call the end client in the product? The client view says "household" on screen and "opportunity" in its data; Sherpas' public announcement says "investor intake".
- Can the document extraction read an equity plan statement (grant, vest schedule, PSU terms) into tranches? Unknown from the client side; see the assumptions below (D-042, D-057).

## Assumptions we work on (D-059, D-099)

No question is sent to Sherpas before delivery (D-099). Each one is an assumption the work stands on, with what changes if it is false; together they are what is discussed with Sherpas in the follow-up session. IDs follow the discovery assumption list: A-01 to A-11 are in `discovery/synthesis.md`, A-12 onwards are here. Every `[ASSUMPTION: A-NN]` tag in the docs cites one of them.

| ID | Assumption | Source | If it is false |
|---|---|---|---|
| A-12 | The analysis does not use the stock compensation categories of the platform's type lists today (D-058). | To discuss in the follow-up session (D-099) | The mapping holds; only the net worth treatment needs checking so unvested value stays out (D-026). |
| A-13 | Concentration is measured by holding, not by issuer or by sector with fund look-through (D-040). | To discuss in the follow-up session (D-099) | By issuer: AC-A-04 changes nothing new. With look-through: EC-A-09 moves into the MVP. |
| A-14 | The existing concentration threshold suits a single company (riskiest assumption 2). | To discuss in the follow-up session (D-099) | An employer-specific threshold moves from next to the MVP (D-041). |
| A-15 | The document extraction can read an equity plan statement into tranches (riskiest assumption 1, D-042, D-057). | To discuss in the follow-up session (D-099) | F-F and the client upload fall back to manual entry; the riskiest-assumption test in `07_success_criteria.md` says so early. |
| A-16 | The score article in the brief describes the score as it runs; the other Help Center articles add nothing the spec depends on. | To discuss in the follow-up session (D-099) | The simulator parameters stay labelled `P-…`; only their SIMULATED values change. |
| A-17 | The figures that differ across demo screens (net worth, equity share, concentration, cash yield) are demo-data issues. | To discuss in the follow-up session (D-099) | The spec reads check inputs, not displayed figures, so it holds; the prototype uses its own SIMULATED household. |
| A-18 | The advisor's "Submit and continue" turns a completed questionnaire into a profile and an analysis. | To discuss in the follow-up session (D-099) | Grants are created at whichever step creates the profile (AC-E-07 is unchanged in substance). |
| A-19 | Proposal conversion and time to proposal can be tracked per household (M-01). | To discuss in the follow-up session (D-099) | The instrumentation events of the spec add it; the baseline comes from the first weekly readout. |
| A-20 | Sharing an analysis and the advisor's edits to generated lines are not recorded today. | To discuss in the follow-up session (D-099) | EV-A-04 and EV-D-01 add them; if they exist, the events reuse them. |
| A-21 | Pilot advisors can tag past opportunities as with or without stock pay. | To discuss in the follow-up session (D-099) | The M-01 baseline starts at the first weekly readout instead. |
| A-22 | An advisor cannot resend the questionnaire, or one question of it, to an existing client. | To discuss in the follow-up session (D-099) | If they can, asking existing households moves from next to the MVP (D-052). |
| A-23 | When the same household is entered twice (questionnaire, then Data & Assumptions), the advisor's last save wins and versions are kept. | To discuss in the follow-up session (D-099) | The reprocessing rules of AC-G-12 still apply; only which version the grant reads changes. |
| A-24 | The "benefit plan income" variant of Income uses the same income rows, so the chip fits there too (EC-E-07). | To discuss in the follow-up session (D-099) | The chip is added to that block separately. |
| A-25 | Stock pay is common enough among these advisors' clients to matter (R-015, R-016 cover companies only). | To discuss in the follow-up session (D-099) | The pilot shows it in M-06; the feature stays behind the firm setting (D-030). |
| A-26 | The demand comes from advisors whose clients have stock pay and who work around the platform today; the brief does not say who raised it [brief]. | `00_brief.md` | If it came from sales or a single firm, the first release still holds (behind a firm setting, D-030), and the release 1 stop rule on reach (D-088) decides whether release 2 is built for everyone. |
| A-27 | The "Anything to add" chat of each questionnaire section feeds the opportunity's context, which the platform already reads for documents, meeting notes and CRM records [FACT: questionnaire_map, line 39, for the context]. | `10_flow_review.md` GAP-40 | Stock pay mentioned only in the chat is not proposed; the enablement material asks advisors to read the chat (D-093). |
| A-28 | How Sherpas charges does not change the MVP. | To discuss in the follow-up session (D-099) | Only the business lens (`05_business_lens.md`) changes. |
| A-29 | Large advisory firms are the main buyers, so a capability that helps win or keep them weighs more than one only small independent advisors value [brief for the target user]. | `05_business_lens.md` | The first release still holds; only the priority order of Next items changes (`05_business_lens.md`). |
| A-30 | The income question and the stock compensation chip sit in the income widget shared by every Financial Health template a firm uses (AC-E-21, GAP-13). | `spec/F-E_client-reports-stock-pay.md` | The chip and question are added to each firm template separately. |
| A-31 | The score article does not publish check curves, near-term horizons or how check scores combine into an area; the simulator uses named `P-…` parameters with SIMULATED values (`spec/00_index.md`, D-066). | `spec/00_index.md` | Only the SIMULATED values change; the relation tests of the simulator still hold. |
| A-32 | Pilot targets are agreed before the pilot starts, and targets that need a baseline are set after the first weekly readout (`07_success_criteria.md`). | `07_success_criteria.md` | The pilot reads its metrics against the first week instead of a target. |
| A-33 | At pilot volume, the weekly reasons and edits can be grouped by hand. | `07_success_criteria.md` | A small model groups them; the readout format does not change. |
| A-34 | A 0% to 200% PSU payout range is typical for public companies, not a legal rule (R-002). | `research.md` | The PSU range is read from each award agreement, as F-C already allows. |
| A-35 | A 10-year term and a 90-day post-termination window are common practice for NSOs, not law (R-003). | `research.md` | Each grant keeps its own term. |
| A-36 | The 2025 AMT exemption amounts are the latest found; 2026 values are needed before any AMT estimate (R-004). | `research.md` | The 2026 values are fetched before any AMT estimate. |
| A-37 | Non-qualified ESPP tax treatment is inferred, not sourced (R-005). | `research.md` | The treatment is sourced before non-qualified ESPP is modelled. |
| A-38 | RSA, SAR and phantom stock are less common than RSU, options and ESPP for public-company employees of advisor clients (R-006). | `research.md` | Their placement as later (D-041) is reviewed. |
| A-39 | ESOP coverage under ERISA comes from secondary sources and the IRS "shared jurisdiction" note (R-007). | `research.md` | Only matters if ESOP leaves the exclusion list; a DOL source is read first. |
| A-40 | Employers withhold on each vest below $1 million with the optional flat 22% method; that method needs income tax withheld from regular wages in the current or preceding year and allows no other percentage, and the employer may aggregate with regular wages instead (R-008, R-022). | `research.md` | Withholding follows the aggregate method and the Form W-4, so it can be above or below 22%; the federal gap moves either way, and the label already says the withholding is estimated (AC-C-06). |
| A-41 | Employee grants (non-executive, non-director) follow the same shapes as the filed executive and director examples (R-009). | `research.md` | Schedules stay free-form per tranche, so the model holds. |
| A-42 | Back-loaded schedules at the largest tech employers appear in client portfolios, so tranche percentages are free-form (R-010). | `research.md` | Free-form tranches still hold; fixed presets would also work. |
| A-43 | Double-trigger RSU holders among advisor clients are mainly pre-IPO private-company employees, so the liquidity condition is a pending event with no date (R-011). | `research.md` | The liquidity event may carry a date; AC-B rules on pending grants still apply. |
| A-44 | How MoneyGuide handles equity compensation does not change the spec (R-012 found RightCapital and eMoney only). | `research.md` | The competitor comparison in the deliverable adds MoneyGuide. |
| A-45 | Aggregators do not return unvested awards from the stock-plan platforms (R-013). | `research.md` | Grant detail could also come from a linked account; the manual and upload routes stay. |
| A-46 | 10% of investable assets is the reference flag level; the denominator is undecided across sources (R-014). The spec keeps it as `P-CONC`, reference only. | `research.md` | Only the SIMULATED value of `P-CONC` changes. |
| A-47 | The equity award survey respondents are mostly public companies, so private-company practice (more options) is under-represented (R-016). | `research.md` | The placement of options and private-company grants is reviewed. |
| A-48 | Clients or advisors can obtain the latest 409A value from the employer or the grant documents (R-017). | `research.md` | Private-company grants stay pending, with no value, until one is entered. |
| A-49 | RSU shares kept take a cost basis equal to the income included at settlement, and their holding period starts at delivery; IRS text states it for restricted property, not RSU shares by name (R-024). | `research.md` | Only the Next cost basis default (AC-A-03, AC-B-14) changes; no first-release figure reads basis. |
| A-50 | Dividend equivalents are wages when paid and small against vest value, so the first release leaves them out of the vest tax (R-025). | `research.md` | The year's tax owed and gap are too low for plans that pay them; a dividend equivalents field moves into the release (conflict (e) of `12_stock_comp_rules.md`). |
| A-51 | The amount withheld by holding back or selling shares at vest equals the supplemental-rate amount (R-023). | `research.md` | The withholding estimate differs from what the plan withholds; the federal gap moves either way. |
| A-52 | No law limits the number or value of RSUs an employee can receive; any cap is a plan term (R-026). | `research.md` | The grant form needs a validation cap, as the ISO and ESPP limits would. |
| A-53 | FICA withheld at vest equals FICA owed, except with two employers above the Social Security wage base and for the Additional Medicare Tax by filing status (R-019, R-020). | `research.md` | The FICA line needs both figures, and FICA may belong in the gap (conflict (c) of `12_stock_comp_rules.md`). |
| A-54 | Shares are delivered in the same tax year as the vest date, so the vest year is the income tax year (R-001, R-002). | `research.md` | Late-year tranches are income of the next tax year; the tax-year bucket of AC-C-01 moves (conflict (b) of `12_stock_comp_rules.md`). |
| A-55 | The platform holds no other supplemental pay (bonuses) and no controlled-group data, so the $1 million test counts vest income only (R-022). | `research.md` | The 37% portion starts earlier; withholding is too low and the gap too high in the estimate (conflict (a) of `12_stock_comp_rules.md`). |
| A-56 | Each person has one employer in the year, and the reported salary is that employer's wages for the year, so per-employer withholding tests read per person (R-019, R-020). | `research.md` | Social Security and Additional Medicare withholding differ per employer; the FICA figure needs wages per employer. |
| A-57 | Tax figures for vests in later years use the 2026 federal rules, labelled "today's tax rules" (AC-C-04, R-021). | `research.md` | Later-year figures move once that year's tables are published; the label stays true. |
| A-58 | The advisor can read the value at vest from the W-2 or the plan statement when entering a cost basis (R-024). | `research.md` | The cost basis of kept shares (Next) stays empty until a statement is uploaded. |

## For public research (answer with research)

- Which stock-compensation types matter most for the households these advisors serve? Company-level data only (R-016: RSUs near universal, options a falling minority, ESPP about half); household-level data not found (R-015); worked as A-25.
- How do advisors handle stock compensation today, in their own words? Real-voice sources to read in F2 discovery (R-012 to R-014 cover tools and guidance only).
- Does MoneyGuide model equity compensation, and does eMoney support RSUs today? Not found (R-012).
- Do Plaid, Yodlee or the stock-plan platforms (Carta, Shareworks, Fidelity, Schwab, E*Trade) pass unvested grants to aggregators? Not documented (R-013).
- 2026 AMT exemption amounts (only tax year 2025 found, R-004); deadline for giving Forms 3921 and 3922 to employees (R-004, R-005).
- Primary sources for back-loaded schedules at large employers (Amazon, Alphabet) and for the 90-day post-termination window as common practice (R-010, R-011, R-003).
- Tax reason for double-trigger RSUs (§83, §409A) from IRS text, and post-IPO lock-up of those shares (R-011).
- How common RSA, SAR and phantom stock are among public-company employees (R-006).
- Can clients or advisors get the latest 409A value for private-company shares, and how old is it in practice? (R-017)
- Prevalence among advisors' client households, not companies: R-016 covers companies only.
- Insider status: trading windows, planned selling programmes and hedging limits for employees who are insiders (V02, V26). Changes advice on when to sell, not the MVP model (D-031).
- Vesting acceleration on leaving or on a sale of the company, and clawbacks: how common, and what they change in a schedule.
- State supplemental withholding rules at vest (D-033: the MVP uses an optional advisor-entered rate instead).
- What large firms' compliance review requires of a report shared with the client.
- URLs of the Reddit threads read in Spanish machine translation (cited by title in `discovery/voices.md`).

## Answered

- What does each questionnaire step show, and does the client questionnaire accept uploads? Seen on 2026-10-05: income as chips with owner, amount and frequency; a documents step and per-account statement upload; holdings as instrument and balance, no cost basis. Placement changed to a chip (D-056); client upload added (D-057). [FACT: questionnaire_map, 2026-10-05]
- What does the advisor view show and allow? Not available: the exercise is designed to be worked from the client side only, so the advisor side is specified from the brief and the client view (D-034). [brief, §4]
- Could the completed questionnaire link be reset? Sherpas sent a new, unused link (2026-10-05). [brief, §4]
- Which stock-compensation types exist, their lifecycle states, and what each state changes? RSU and PSU, NSO, ISO, ESPP, RSA, SAR and phantom stock, ESOP. [R-002 to R-007]
- US federal tax treatment and timing for each type? [R-001 to R-006, R-008]
- How is FICA (Social Security and Medicare) withheld at vest on supplemental wages, including above the Social Security wage base? In full at 6.2% up to $184,500 and 1.45% on all wages (2026), plus 0.9% withheld above $200,000 per employer; withheld can differ from owed with two employers or by filing status (conflict (c) of `12_stock_comp_rules.md`). [R-018 to R-020]
- What are the conditions for the optional 22% flat rate? Income tax withheld from regular wages in the current or preceding calendar year and supplemental wages identified separately; no other percentage allowed; otherwise the aggregate method. [R-022]
- Which vesting models exist? Time-based (cliff, even, unequal), back-loaded, performance, double trigger, with filing examples. [R-009 to R-011]
- What minimum data does an advisor need per type? The "Data an advisor needs" line of each type entry, and the planning tools' field lists. [R-002 to R-007, R-012]
- How should employer-stock concentration be judged when the same employer pays the salary? No rule; 10% of investment assets is the most cited rule of thumb, and FINRA names the double exposure. The threshold is a product decision. [R-014]
- Is the demo on the new score or the old one? New: the demo shows "View more". [demo, 2026-10-03, Renier]
- Who sees the Financial Health analysis? The end client has its own login and sees the full analysis read only: three tabs (Financial health, Investment analysis, Statements), the score breakdown and the reports the advisor shares. [FACT: captures/client/01-financial-health, 05-avatar-menu]
- What does the end client get? The live analysis in the portal plus PDF reports the advisor shares (one investment analysis PDF in the demo), downloadable. [FACT: captures/client/06-reports]
- Which checks feed each score area, and is concentration visible? Yes: each area expands into plain-language check readings; Investing includes "concentration in the largest position" (VTI about 45% of investable assets). See `data_model.md`. [FACT: captures/client/02-score-breakdown]
- What does the analysis report contain? Per section: narrative bullets, a "We should look into" box, and in the summary five recommendations; figures as cards and charts. See `platform_map.md`. [FACT: captures/client/01-financial-health]
- Does the analysis have any line for employer stock, bonus or variable pay? No: earned income is only "Salary and wages", and no account type is for equity compensation. [FACT: captures/client/04c-statements-cashflow, 03a-accounts-holdings]
- Is there an editable data view? Not in the client view; Data & Assumptions is advisor-side (see the first platform question). [FACT: captures/client/05-avatar-menu]
- Which questionnaire sections exist and what does each ask? Eight sections (personal information, goals, income, investments, expenses, assets, liabilities, insurance) plus welcome and end pages; 17 questions. See `questionnaire_map.md`. [FACT: captures/questionnaire/02-opportunity]
- Does the questionnaire ask anything about employer stock, bonuses or variable pay? No: income is one gross annual amount per person, stored as salary. Vested shares could only be entered as a plain position in an account. [FACT: captures/questionnaire/02-opportunity]
- How does a questionnaire answer become an element? It is stored already as members, goals, incomes, accounts with positions, assets, liabilities and policies, each with owners. See `questionnaire_map.md`. [FACT: captures/questionnaire/02-opportunity]
- What does completing the questionnaire trigger? Completion alone did not create a profile or an analysis in the submission we read; the end screen offers the advisor a "Submit and continue" step. The trigger is asked of Sherpas. [FACT: captures/questionnaire/02-opportunity; INFERENCE for the trigger]
- What does the "Why does the score not match" article say? Not readable with the demo login; moved to the questions for Sherpas. [FACT: captures/client/02-score-breakdown]
- Edit access to the Notion page? Granted; Renier can edit (2026-10-05). Publishing still follows D-011. [Renier]
