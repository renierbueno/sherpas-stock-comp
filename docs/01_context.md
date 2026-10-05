# 01 · Context

What is known about the case and the company, and nothing else. Anything not here or on the platform is unknown and lives in `02_open_questions.md`.

Source tags: `[brief]` = `00_brief.md` · `[web: URL, date]` = public source · `[demo]` = seen on the demo platform.

## Product

- Sherpas builds AI agents that automate the invisible work of financial advice. [brief]
- Users are wealth advisors at large US firms; the product reaches their clients through them. [brief]
- The advisor collects client information with a questionnaire; the platform generates a Financial Health analysis (a diagnosis with a score and a report) that the advisor uses in the conversation with the client. [brief]
- Today there is nowhere to enter stock compensation. [brief]
- The website offers document upload with data extraction: "Drop in any document. Get clean, structured financial data."; named documents are "tax returns, brokerage statements, and loan agreements"; it also offers "Custom data extraction, just type what you need". Equity plan statements and paystubs are not named; how the advisor reviews extracted data is not described; the stated "96% accuracy" is a marketing claim, not used as a fact. [web: https://sherpaswealth.com/data-extraction, accessed 2026-10-05]
- Advisors edit the generated content before it reaches the client: the platform "automatically generates personalized observations and strategies, which advisors can edit and fine-tune before presenting to clients". [web: https://sherpaswealth.com/financial-health, accessed 2026-10-05]
- The exercise is designed to be worked from the client side only; there is no advisor login. [brief, §4]
- Sherpas' own blog says account aggregation is unreliable: "many banks and brokerage firms block account aggregation" and "accounts frequently disconnect, requiring reauthorization". The website does not say Sherpas offers aggregation. [web: https://sherpaswealth.com/blog/the-data-bottleneck-the-hidden-growth-killer, published 2026-09-19, accessed 2026-10-05]
- The website says nothing about concentration measurement, tax analysis or stock compensation. [web: https://sherpaswealth.com/, /financial-health, /investment-analysis, accessed 2026-10-05]
- Public positioning: an AI-native operating layer for advisory firms, not another planning app on top of legacy systems; from initial investor intake through scenario modelling and recommendation drafting, producing structured, explainable insights in minutes rather than days. [web: https://www.privatebankerinternational.com/news/ai-wealth-tech-firm-sherpas-seed-round/, accessed 2026-10-03]

## How the analysis models a client

- Any financial element can be expressed in up to four dimensions: asset, liability, income, expense. Not all appear every time; one element can have several of each. [brief]
- The Financial Health Score (0–100): checks scored 0–100 on a scale, grouped into five areas (Cash flow, Debt, Protection, Liquidity, Investing), weighted by life stage, then capped by a few serious issues. Full article in `00_brief.md`. [brief]
- Area weights: building wealth 30/20/20/15/15; in retirement 25/10/20/20/25 (cash flow/debt/protection/liquidity/investing); households in transition sit in between. [brief]
- Missing data is left out of the calculation, never treated as zero or average. [brief]
- The Investing area already looks at concentration in the largest position. [brief]
- The demo account shows the "View more" panel, so it runs the new (beta) score the article describes. [demo, 2026-10-03]

## Company

- Seed round of $3.2M, led by 1248 (family office of Mariner Wealth Advisors' founder), with AUA Private Equity Capital and GoHub Ventures. CEO: Borja Edo. Use of funds: decision frameworks across retirement, tax, investment and risk planning, and integrations with enterprise advisory systems. [web: https://www.privatebankerinternational.com/news/ai-wealth-tech-firm-sherpas-seed-round/ and https://www.thesaasnews.com/news/sherpas-raises-3-2-million-seed-round/, accessed 2026-10-03]
