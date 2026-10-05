# 02 · Open questions

What we do not know. Do not guess an answer anywhere else in the repo. When one is answered, move it to "Answered" with its source.

## For the platform (answer in F1 with capture-platform)

- What does the advisor view show and allow? The demo login is the end client's view; the advisor workspace (pipeline, Data & Assumptions, score adjustment) is not reachable from it. Asked once, accepting that the client view may be part of the exercise (D-034).
- What do the advisor and the client call the end client in the product? The client view says "household" on screen and "opportunity" in its data; Sherpas' public announcement says "investor intake".
- What does each questionnaire step look like on screen, and what exactly does the account and holdings block ask (cost basis, purchase date, account type list)? The link we received was already completed; only the definition and one set of answers were readable. (See "For Sherpas".)
- Can the document extraction read an equity plan statement (grant, vest schedule, PSU terms) into tranches, and how does the advisor review extracted data? The website names other document types only (D-042). Work proceeds on [ASSUMPTION: confirm]; not asked of Sherpas (D-020).
- When the questionnaire link is reset: does the client questionnaire accept document uploads, and does the Income section fit the stock-pay block as decided (D-032, D-042)?
- What does the "benefit plan income" block ask, the variant that replaces the income questions when a firm enables it?

## For Sherpas (send at the end of F1)

- Final list drafted after the capture: only what the platform and public research cannot answer.
- Candidates so far: how Sherpas charges (per seat, per firm, per analysis); what share of their advisors' clients hold employer equity, and which types (RSU, options, ESPP, other); whether advisors already ask for this (how often, in which segment).
- Could you share the element schema (asset, liability, income and expense types and their fields)? It would let the proposal name exactly where a new type goes.
- An advisor login to the demo; if the client view is part of the exercise, the work continues as is (D-034).
- A copy of the Help Center articles linked from the score panel ("Why does the score not match the sum of the areas?", "What does the Financial Health Score mean?", "How does it compare to a Monte Carlo analysis?"). They need a login the demo account does not have.
- The demo shows different figures for the same thing across screens (net worth $1.9M / $1.865M / about $1.35M; equity share 79.5% / 58.5% / about 70%; concentration "VTI 45%" vs "39% Financial Services" with no financial stock in the holdings; a cash yield of about 7,210%). Are these known demo-data issues, or do sections compute from different inputs? It matters because a stock-compensation analysis would read the same numbers.
- How is "concentration in the largest position" measured: by holding, by issuer, or by sector with fund look-through? And is its threshold suitable for a single company as well as a fund line? (riskiest assumption 2 in `06_direction.md`)
- The questionnaire link we received was already completed on 2026-09-21 by another test household. Could you reset it or send a new one, so we can go through it as a client would?
- After a client completes the questionnaire, what turns it into a profile and an analysis: the advisor's "Submit and continue", an automatic step, or both? How long does it take, and does the advisor edit the answers first?
- Do you track proposal-to-client conversion and time to proposal per advisor or firm, and can it be joined to whether a household reports stock pay? It is the primary success metric (D-043); the work proceeds on [ASSUMPTION: confirm].
- Does the platform record when an analysis or report is shared with the client, and the edits an advisor makes to generated observations and recommendations before sharing? Secondary metrics in `07_success_criteria.md` read them (D-043).
- Can pilot advisors tag their past opportunities as with or without stock pay, and does the platform keep free-text answers and uploaded documents that would help? It gives the baseline of the primary metric (`07_success_criteria.md`, M-01).
- Can an advisor send an existing client the questionnaire again, or a single question from it? It decides how existing households are asked about stock pay after the MVP (`spec/00_index.md`, existing households).
- When a client enters the same household twice (questionnaire, then advisor edits in Data & Assumptions), which wins, and is each version kept?

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
