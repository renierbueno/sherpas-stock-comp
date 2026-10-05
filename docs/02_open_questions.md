# 02 · Open questions

What we do not know. Do not guess an answer anywhere else in the repo. When one is answered, move it to "Answered" with its source.

## For the platform (answer in F1 with capture-platform)

- What does the advisor view show and allow? The demo login is the end client's view; the advisor workspace (pipeline, Data & Assumptions, score adjustment) is not reachable from it. Ask Sherpas for an advisor login or a walkthrough.
- What do the advisor and the client call the end client in the product? The client view says "household" on screen and "opportunity" in its data; Sherpas' public announcement says "investor intake".
- What does each questionnaire step look like on screen, and what exactly does the account and holdings block ask (cost basis, purchase date, account type list)? The link we received was already completed; only the definition and one set of answers were readable. (See "For Sherpas".)
- What does the "benefit plan income" block ask, the variant that replaces the income questions when a firm enables it?

## For Sherpas (send at the end of F1)

- Final list drafted after the capture: only what the platform and public research cannot answer.
- Edit access to the Notion page (Renier has guest access, read only). Renier asks on 2026-10-05. See D-011.
- Candidates so far: how Sherpas charges (per seat, per firm, per analysis); what share of their advisors' clients hold employer equity, and which types (RSU, options, ESPP, other); whether advisors already ask for this (how often, in which segment).
- Could you share the element schema (asset, liability, income and expense types and their fields)? It would let the proposal name exactly where a new type goes.
- An advisor login, or a short walkthrough of the advisor view and Data & Assumptions.
- A copy of the Help Center articles linked from the score panel ("Why does the score not match the sum of the areas?", "What does the Financial Health Score mean?", "How does it compare to a Monte Carlo analysis?"). They need a login the demo account does not have.
- The demo shows different figures for the same thing across screens (net worth $1.9M / $1.865M / about $1.35M; equity share 79.5% / 58.5% / about 70%; concentration "VTI 45%" vs "39% Financial Services" with no financial stock in the holdings; a cash yield of about 7,210%). Are these known demo-data issues, or do sections compute from different inputs? It matters because a stock-compensation analysis would read the same numbers.
- How is "concentration in the largest position" measured: by holding, by issuer, or by sector with fund look-through?
- The questionnaire link we received was already completed on 2026-09-21 by another test household. Could you reset it or send a new one, so we can go through it as a client would?
- After a client completes the questionnaire, what turns it into a profile and an analysis: the advisor's "Submit and continue", an automatic step, or both? How long does it take, and does the advisor edit the answers first?
- When a client enters the same household twice (questionnaire, then advisor edits in Data & Assumptions), which wins, and is each version kept?

## For public research (answer with research)

- Which stock-compensation types matter most for the households these advisors serve?
- US federal tax treatment and timing for each type that makes the cut.
- Lifecycle states of each candidate type (for example granted, vested, settled, exercised, expired, forfeited) and what changes at each state: ownership, income, tax, risk.
- Which vesting models exist and which are common: monthly, quarterly or annual schedules, a cliff, back-loaded schedules, performance conditions, double trigger.
- What minimum data an advisor needs per type to plan (grant, schedule, strike price, expiry, cost basis).
- How advisors and planning tools handle stock compensation today.
- How should employer-stock concentration be judged when the same employer also pays the salary (income and portfolio tied to one company)?

## Answered

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
