---
name: research
description: Use when a US financial, tax, regulatory or market fact about stock compensation (types, vesting, taxation, concentration risk, advisor practice, competitor tools) is needed to make a decision in this case. Looks it up in public sources and records it with source, date and signal strength. Not for Sherpas-internal facts; those come from docs/01_context.md, the platform, or a question to Sherpas.
---

# Research

Goal: every external fact in the proposal has a source and a date, and its weight is stated. Adapted from product-sdd `live-research` (one question per search, decision first, honesty rule, output block); the five categories are replaced by ones for this case.

## Input

- The decision that is blocked (from `docs/02_open_questions.md` or the current phase).
- `docs/research.md` (check it first: do not re-research a fact already there).

## Categories

1. **Instruments**: what each type of stock compensation is and how it works (RSU, ISO, NSO, ESPP, restricted stock, SARs, private-company equity).
2. **Tax and regulation**: US federal treatment, timing, withholding, rules that create deadlines or risk. State tax only if a decision depends on it.
3. **Financial-health effect**: concentration, liquidity, vesting cliffs, how it moves assets, income, cash flow and risk.
4. **Advisor practice**: how planners handle it today, what data they collect, what tools exist (competitors included). Failures count, not only successes.
5. **Market size**: how common it is among the households Sherpas' advisors serve. Only if a prioritisation decision needs it.

## Steps

1. Write the question and the decision it changes. If no decision changes, do not search.
2. One question per search; at most three searches per question.
3. Prefer primary sources: IRS, SEC, FINRA, plan documents, the vendor's own site. Then established professional sources (CFP Board, large brokerages' plan-participant guides). Note when only secondary sources exist.
4. Record the finding in the block below, appended to `docs/research.md` with the next `R-NNN`.
5. Add any new finance term to `docs/04_glossary.md` with the `R-NNN` as source.
6. If nothing reliable is found: say so in the block and add the question to `docs/02_open_questions.md`. Never fill the gap with a number.

```
## R-NNN · <question>
- Category: <1–5>
- Decision it unblocks: <…>
- Finding: <one or two sentences>
- Source: <title, URL> · Accessed: <YYYY-MM-DD> · Source date: <date or "undated">
- Evidence size: <primary rule / one vendor / several sources agree>
- Signal: STRONG (primary source or several agree) | WEAK (one secondary source)
- Changes: <what this changes in the case>
- Assumption carried forward: <… [ASSUMPTION: confirm]> or "none"
```

## Honesty rule

- A tax rule from the IRS is a fact; a vendor's blog post about it is a weak signal until checked against the rule.
- Figures that change yearly (limits, thresholds, rates) always carry the tax year.
- This is not tax advice and is never presented as such in the deliverable; the proposal says what the product shows the advisor, not what the client should do.
- Nothing about Sherpas comes from here.

## Output (fixed path)

`docs/research.md` (append-only, `R-NNN` entries), plus updates to `docs/04_glossary.md` and `docs/02_open_questions.md`.

## Done when

- Every entry has source, access date, evidence size and signal.
- Every number has its tax year or source date.
- Every entry names the decision it unblocks.

## Next

`discovery` (phase F2), or back to the skill that asked for the fact.
