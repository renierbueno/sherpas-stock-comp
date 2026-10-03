---
name: capture-platform
description: Use in phase F1 to record what the Sherpas demo platform and questionnaire actually show, screen by screen, in Chrome, after Renier has logged in. Saves raw captures outside git and writes derived notes (screen map, data model, design tokens) in docs/. Not for public sources; that is research.
---

# Capture the platform

Goal: know the product and the advisor flow from the real screens, so the proposal and the prototype match what exists. Raw material stays private; only our own derived notes go to git. New skill (no source harness had one); structure follows the product-sdd template.

## Input

- `docs/01_context.md` and `docs/02_open_questions.md` (what to look for).
- A Chrome tab Renier has already logged into. Never type a password; if a login screen appears, stop and ask Renier.
- The view to capture: `advisor` (diagnostic link, edit mode), `client` (end-client view), or `questionnaire` (one-use link).

## Hard rules

- **Questionnaire is one-use.** Moving between steps is allowed; every click goes through the "ask" permission. Never click submit, send, finish or the last step. If a button's effect is unclear, ask first.
- **Read only on their systems.** Network data is re-read with same-origin `GET` only. Never POST, PUT, PATCH or DELETE. Never edit a field on the advisor view unless Renier asks for that specific edit.
- **Nothing raw in git.** Screenshots, HTML, text dumps and JSON go to `captures/` (ignored and blocked by the pre-commit hook). Strip auth headers, cookies and tokens before saving anything.
- **No copied code.** Never save or reuse their JavaScript or source. Design tokens are values (colours, fonts, sizes), not code.

## Steps (per screen)

1. Name the screen `NN-<slug>` in visit order. Folder: `captures/<view>/NN-<slug>/`.
   Call `read_network_requests` once BEFORE opening the screen: tracking only starts on the first call, so requests made earlier are lost.
   After navigating or clicking, wait 2 seconds before reading; reads during load fail with "unparseable URL".
2. `get_page_text` → `page.txt`. `read_page` (filter all) → `tree.txt`.
3. Screenshot with `save_to_disk` (saved as JPEG in a temp folder; move it to `shot-1.jpg`); scroll and repeat (`shot-2.jpg`, …) until the full page is covered.
4. Key views only (the analysis, the score breakdown, each questionnaire section): `document.documentElement.outerHTML` → `page.html`.
5. `read_network_requests` (filter to the app's own API host). It returns method, URL and status only, with no headers or bodies. For the analysis and the questionnaire payloads, re-read the JSON with a same-origin `fetch` GET → `network/<name>.json`. Keep the request list (method, path, status) in `network/requests.txt`, without headers.
6. One line per screen in `docs/platform_map.md`: view, NN-slug, what it shows, what the user can do there, which open question it answers. Tag each line `[FACT: captures/<view>/NN-slug]`.

## Steps (once per view)

7. **Design tokens** (once, from the advisor view): read CSS custom properties on `:root` and computed styles of body text, headings, buttons, cards, inputs and score badges → `docs/design_tokens.md` (colour, type scale, spacing, radius, shadow, component notes). Values only.
8. **Data model** → `docs/data_model.md`: the entities and fields the client data uses, described in our own words around the four dimensions (asset, liability, income, expense) and the five score areas, plus where stock compensation would fit. No endpoint paths, no auth details, no internal IDs. Every inference tagged `[INFERENCE: from …]`.
9. Move answered questions in `docs/02_open_questions.md` to an "Answered" section with the capture as source; add new questions found.

## Output (fixed paths)

- Private: `captures/<view>/NN-<slug>/{page.txt, tree.txt, shot-N.jpg, page.html, network/}`.
- In git: `docs/platform_map.md`, `docs/design_tokens.md`, `docs/data_model.md`, updates to `docs/02_open_questions.md`.

## Done when

- Every screen visited has a folder in `captures/` and one line in `docs/platform_map.md`.
- The questionnaire was captured to its last step without submitting it (or the submit decision is logged in `docs/03_decision_log.md`, taken by Renier).
- `docs/design_tokens.md` and `docs/data_model.md` exist and the pre-commit hook passes on them.
- `git status` shows nothing under `captures/`.

## Next

`research` (the US stock-compensation facts the data model needs).
