---
name: deliver
description: Use to order and write what Sherpas will read or watch: the deliverables (Notion pages, Miro board, README, PR), opening with the brief answered on one screen and then the product process ending with the spec, and the video script in the brief's order. Fixes the order, what each medium carries, and the wording rules for a reader with no access to the repo. Not for taking product decisions (decide), writing requirements (spec) or auditing a phase (check).
---

# Deliver

Goal: the exercise reads as real product work. A reader finds the answer to each question of the brief on the first screen and chooses where to go deeper; below it, the deliverables show the work in the order a product manager does it and end with the spec engineering receives; the video answers what the brief asks; nothing needs the repo to be understood. The orders, the Notion pages and their sources live in `docs/11_storyline.md` (D-083, D-125).

## Input

- `docs/11_storyline.md`, `docs/00_brief.md`, and the files each stage names there.
- The Miro board (Renier's account until the upload, D-011, D-085, D-125); the Notion pages (one upload at the end, D-011, D-084).

## Orders

- **A · Deliverables (D-125):** Notion Home and the README open with what we propose: the brief's five questions (how it comes in, which types, how it is modelled, which analyses, what is left out, why and in what order), two or three plain lines each with a link deeper; then the method in short, the links and the page map. Notion pages: Home, Strategy (the PRD), Engineering deliverables (with the six feature pages in Spec Kit, D-122), Methodology, Tools, Glossary, Follow-up. Strategy and the README walk the stages in product order: context and problem, research, discovery, options and decisions, how we will know, launch, what the change touches, the spec last. Each stage document opens with a TL;DR of three to five lines. Miro carries the change maps, the options and the pilot, cards pointing to the file with the detail (D-085).
- **B · Video, brief order:** what we propose, why, what is left out, the process [brief], with the deliverables shown only as support. Most time on what the feature does, walked in the platform's flow order. Script in `private/` until Renier says otherwise.
- **C · Follow-up session:** prepared in `private/` only.

## Steps

1. **Fit check.** Every line of the brief maps to a stage of A and a part of B; a line with none is a gap to raise.
2. **Write for a reader without the repo.** First the plain statement, then the code in brackets; every claim keeps its evidence tag; short cards, no em dashes, `[Company]` instead of angle brackets on Miro. Never cite the call or the JD (`CLAUDE.local.md`).
3. **Dry run.** Show Renier one stage in one medium before the rest.
4. **Keep in step.** Write in the repo first; Notion is filled from it and names the commit (D-084). When a source file changes, its Notion page, Miro area and README line change in the same step, or are marked stale in `11_storyline.md`.
5. **Read back.** After each Notion page or Miro change, read it back and compare it with the repo.

## Output

`docs/11_storyline.md` kept current; the README and the Notion pages in structure A; the board's delivered areas current; the video script in order B.

## Done when

- Every brief line has its answer on Notion Home and in the README, with a link deeper, and maps to a part of B.
- Notion and the README share structure A, the spec last among the stages; the video script follows order B.
- Every stage document opens with a TL;DR.
- No bare code and no untagged claim in anything Sherpas reads.
- Renier saw the dry run.

## Next

The step that owns each stage's content (D-081); `/check F7` before delivery.
