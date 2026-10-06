# 05 · Business lens

The business case behind the proposal: who it serves, why now, what it competes with, and how it could be packaged. Each line cites a public source, a discovery finding, or an assumption listed in `02_open_questions.md` with what changes if it is false (D-089).

## Who it serves

- Large advisory firms are the target user [brief]. A capability that helps win or keep large firms should weigh more than one only small independent advisors value. [ASSUMPTION: A-29]
- Advisors who serve tech or corporate employees meet stock compensation more often than those who serve retirees or small-business owners; discovery validated this in part, and frequency is unmeasured (`discovery/synthesis.md`). [ASSUMPTION: A-01]

## Why it matters

- Stock compensation has nowhere to go today ("nowhere to put it") [brief]. A household with significant equity pay gets a score that misses part of its wealth, its concentration risk and its future cash flows, which can weaken the advisor's trust in the analysis; discovery found adjacent evidence only (`discovery/synthesis.md`). [ASSUMPTION: A-02]
- Tax at vest is the strongest validated pain on both sides, advisor and client (`discovery/synthesis.md`, A-04). Tax is the only domain named in Sherpas' public use of funds ("decision frameworks across retirement, tax, investment and risk planning") [web: https://www.privatebankerinternational.com/news/ai-wealth-tech-firm-sherpas-seed-round/, accessed 2026-10-03].
- Vests, expirations and trading windows are recurring moments for the advisor to contact the client; discovery validated this on the client side only (`discovery/synthesis.md`). [ASSUMPTION: A-03]

## What it competes with

- Advisor planning tools already model equity grants: RightCapital has a stock plans module with grant types, vesting schedules and a concentration chart; eMoney documents entering stock options (R-012). A platform without it leaves these households to another tool.
- Aggregators do not pass unvested grants (R-013), so grant detail has to come from documents or the advisor; document extraction is a capability the platform already offers [web: https://sherpaswealth.com/data-extraction, accessed 2026-10-05].

## How it could be packaged

- How Sherpas charges is not public; the proposal does not depend on it. [ASSUMPTION: A-28]
- Default stance: stock compensation as part of the core analysis, not a paid add-on, because a gap in the core diagnosis is a quality problem, not an upsell; the first release ships behind a firm setting so it can be turned on per firm (D-030, D-080). [ASSUMPTION: A-11]

## What would change these

- How many of the firms' client households hold employer equity (A-25; the first-release reach readout, `07_success_criteria.md`, D-088).
- How Sherpas prices, and whether large firms buy by module (A-28).
