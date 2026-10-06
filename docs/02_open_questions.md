# 02 · Open questions

What we do not know. Do not guess an answer anywhere else in the repo. When one is answered, move it to "Answered" with its source.

## For the platform (answer in F1 with capture-platform)

- What do the advisor and the client call the end client in the product? The client view says "household" on screen and "opportunity" in its data; Sherpas' public announcement says "investor intake".
- Can the document extraction read an equity plan statement (grant, vest schedule, PSU terms) into tranches? Unknown from the client side; see the assumptions below (D-042, D-057).

## Assumptions we work on (D-059)

No more questions go to Sherpas, and none are left for the follow-up session. Each former question is an assumption the work stands on, with what changes if it is false.

| Assumption | If it is false |
|---|---|
| The analysis does not use the stock compensation categories of the platform's type lists today (D-058). | The mapping holds; only the net worth treatment needs checking so unvested value stays out (D-026). |
| Concentration is measured by holding, not by issuer or by sector with fund look-through (D-040). | By issuer: AC-A-04 changes nothing new. With look-through: EC-A-09 moves into the MVP. |
| The existing concentration threshold suits a single company (riskiest assumption 2). | An employer-specific threshold moves from next to the MVP (D-041). |
| The document extraction can read an equity plan statement into tranches (riskiest assumption 1, D-042, D-057). | F-F and the client upload fall back to manual entry; the riskiest-assumption test in `07_success_criteria.md` says so early. |
| The score article in the brief describes the score as it runs; the other Help Center articles add nothing the spec depends on. | The simulator parameters stay labelled `P-…`; only their SIMULATED values change. |
| The figures that differ across demo screens (net worth, equity share, concentration, cash yield) are demo-data issues. | The spec reads check inputs, not displayed figures, so it holds; the prototype uses its own SIMULATED household. |
| The advisor's "Submit and continue" turns a completed questionnaire into a profile and an analysis. | Grants are created at whichever step creates the profile (AC-E-07 is unchanged in substance). |
| Proposal conversion and time to proposal can be tracked per household (M-01). | The instrumentation events of the spec add it; the baseline comes from the first weekly readout. |
| Sharing an analysis and the advisor's edits to generated lines are not recorded today. | EV-A-04 and EV-D-01 add them; if they exist, the events reuse them. |
| Pilot advisors can tag past opportunities as with or without stock pay. | The M-01 baseline starts at the first weekly readout instead. |
| An advisor cannot resend the questionnaire, or one question of it, to an existing client. | If they can, asking existing households moves from next to the MVP (D-052). |
| When the same household is entered twice (questionnaire, then Data & Assumptions), the advisor's last save wins and versions are kept. | The reprocessing rules of AC-G-12 still apply; only which version the grant reads changes. |
| The "benefit plan income" variant of Income uses the same income rows, so the chip fits there too (EC-E-07). | The chip is added to that block separately. |
| Stock pay is common enough among these advisors' clients to matter (R-015, R-016 cover companies only). | The pilot shows it in M-06; the feature stays behind the firm setting (D-030). |
| The demand comes from advisors whose clients have stock pay and who work around the platform today; the brief does not say who raised it [brief]. | If it came from sales or a single firm, the first release still holds (behind a firm setting, D-030), and the release 1 stop rule on reach (D-088) decides whether release 2 is built for everyone. |
| How Sherpas charges does not change the MVP. | Only the business lens (`05_business_lens.md`) changes. |

## For public research (answer with research)

- Which stock-compensation types matter most for the households these advisors serve? Company-level data only (R-016: RSUs near universal, options a falling minority, ESPP about half); household-level data not found (R-015); also asked of Sherpas.
- How do advisors handle stock compensation today, in their own words? Real-voice sources to read in F2 discovery (R-012 to R-014 cover tools and guidance only).
- Does MoneyGuide model equity compensation, and does eMoney support RSUs today? Not found (R-012).
- Do Plaid, Yodlee or the stock-plan platforms (Carta, Shareworks, Fidelity, Schwab, E*Trade) pass unvested grants to aggregators? Not documented (R-013).
- 2026 AMT exemption amounts (only tax year 2025 found, R-004); Pub 15-T conditions for the optional 22% flat rate (R-008); deadline for giving Forms 3921 and 3922 to employees (R-004, R-005).
- Primary sources for back-loaded schedules at large employers (Amazon, Alphabet) and for the 90-day post-termination window as common practice (R-010, R-011, R-003).
- Tax reason for double-trigger RSUs (§83, §409A) from IRS text, and post-IPO lock-up of those shares (R-011).
- How common RSA, SAR and phantom stock are among public-company employees (R-006).
- Can clients or advisors get the latest 409A value for private-company shares, and how old is it in practice? (R-017)
- Prevalence among advisors' client households, not companies: R-016 covers companies only.
- Insider status: trading windows, planned selling programmes and hedging limits for employees who are insiders (V02, V26). Changes advice on when to sell, not the MVP model (D-031).
- Vesting acceleration on leaving or on a sale of the company, and clawbacks: how common, and what they change in a schedule.
- How is FICA (Social Security and Medicare) withheld at vest on supplemental wages, including above the Social Security wage base? `spec/F-C` shows FICA owed outside the gap until this is researched (AC-C-14).
- State supplemental withholding rules at vest (D-033: the MVP uses an optional advisor-entered rate instead).
- What large firms' compliance review requires of a report shared with the client.
- URLs of the Reddit threads read in Spanish machine translation (cited by title in `discovery/voices.md`).

## Answered

- What does each questionnaire step show, and does the client questionnaire accept uploads? Seen on 2026-10-05: income as chips with owner, amount and frequency; a documents step and per-account statement upload; holdings as instrument and balance, no cost basis. Placement changed to a chip (D-056); client upload added (D-057). [FACT: questionnaire_map, 2026-10-05]
- What does the advisor view show and allow? Not available: the exercise is designed to be worked from the client side only, so the advisor side is specified from the brief and the client view (D-034). [brief, §4]
- Could the completed questionnaire link be reset? Sherpas sent a new, unused link (2026-10-05). [brief, §4]
- Which stock-compensation types exist, their lifecycle states, and what each state changes? RSU and PSU, NSO, ISO, ESPP, RSA, SAR and phantom stock, ESOP. [R-002 to R-007]
- US federal tax treatment and timing for each type? [R-001 to R-006, R-008]
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
