---
name: setup-case
description: Use once, at the start of the Sherpas stock-compensation case (phase F0), to turn the original brief and public company facts into the six stable docs in docs/ (00_brief to 05_business_lens). Not for adding new findings later; research, capture-platform and the decision log own those.
---

# Set up the case

Goal: one place for everything the case starts from, so no later skill re-reads the original files or re-asks what is already known. Adapted from the `setup-initiative` skill of my own spec-driven harness (structure, "done when") and its open-questions format.

## Input

- The original brief files. They live OUTSIDE this repo because they contain credentials (path given by Renier). Convert with `textutil -convert txt -stdout "<file>.rtf"`; links are in the RTF hyperlinks (`grep -o 'HYPERLINK "[^"]*"'`).
- Public company facts, each with its URL and access date.

## Steps

1. Read all inputs fully. List anything that contradicts between them and show it to Renier before writing.
2. Ask Renier for the decisions this skill cannot take (language, publishing rules, what stays private). Log each one in step 5.
3. Write `docs/00_brief.md`: the brief and the email **as received, in the original language, no translation**, with every credential, demo email and one-use link replaced by `[REDACTED: <what>]`. Then the score article as provided with the brief (the Help Center needs a login; cite its URL and say so).
4. Write `docs/01_context.md`: product, how the analysis works, company; each line tagged `[brief]`, `[web: URL, date]` or `[demo]`. Only these sources; no private notes and no inferences from them.
5. Write `docs/03_decision_log.md`: one entry per decision, format below.
6. Write `docs/02_open_questions.md` (grouped by who can answer: the platform / Sherpas / public research), `docs/04_glossary.md` (only Sherpas terms with a source; finance terms are added later by `research` with their source) and `docs/05_business_lens.md` (internal hypotheses, every line tagged `[ASSUMPTION: confirm]`).
7. Run the pre-commit hook over the staged docs (`git add docs && .githooks/pre-commit`) and show the result.

Decision entry format:
```
## D-NNN · <decision in one line>
- What: <the decision>
- Why: <the reason, including what was rejected>
- Date: <YYYY-MM-DD> · Confirmed by: <Renier | Sherpas | ...>
```

## Output (fixed paths)

`docs/00_brief.md`, `docs/01_context.md`, `docs/02_open_questions.md`, `docs/03_decision_log.md`, `docs/04_glossary.md`, `docs/05_business_lens.md`.

## Done when

- All six files exist and the pre-commit hook passes on them (no credentials, demo email or one-use link).
- Every fact in `01_context.md` carries a source tag; nothing from the hiring process is in it.
- `00_brief.md` keeps the original text as received apart from redactions.
- Every decision taken in the conversation is a D-NNN entry with who confirmed it.
- Unknowns are in `02_open_questions.md`, not guessed anywhere else.

## Next

`capture-platform` (phase F1).
