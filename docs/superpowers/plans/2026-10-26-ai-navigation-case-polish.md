# AI navigation and case polish

**Goal:** Address the remaining CTO-audit findings with small changes inside the existing design.

**Approved scope:** The user requested the findings be fixed. Preserve the restored hero, its scale, copy, camera, animation and responsive rules exactly. No dependencies, deployment, public personal details, invented metrics, prices or deadlines.

**Approach:** Add a mobile-only AI child link under Services; opt the two AI reference cases into a compact introduction; retain all engineering and architecture details; align the case CTA with an initial conversation; increase only the AI mobile diagram text; use an AI-relevant form example. EN and UK remain complete.

- [x] Save hero source hashes and verify they remain identical.
- [x] Add direct mobile AI navigation and test the real click path.
- [x] Compact AI introductions without affecting partner/commercial case introductions.
- [x] Preserve reference status, technical focus, all work items and architecture.
- [x] Align CTA and form example in both languages.
- [x] Increase mobile AI captions and check actual glyph bounds at 320/390 px.
- [x] Run localized responsive, keyboard/menu, hero regression, unit, lint and production checks.
- [x] Inspect before/after screenshots.


**Validation:** The new mobile-navigation test failed before implementation because the direct AI link was absent. All 8 new EN/UK tests then passed at 320, 390, 768 and 1440 px. A further 28 browser regression tests passed for hero scale/panning, card labels, navigation, keyboard handling, case details and mocked form feedback. All 44 unit tests, lint, TypeScript and the production build passed. All six saved hero source hashes remain identical.

**Visual review:** Inspected menu, desktop/mobile workflow-case comparisons and EN/UK mobile RAG screenshots. The diagrams retain their nodes, paths and content; only mobile label sizes changed. Partner case participation panels are unchanged. Comparison images are under the task visualization directory, in `ai-polish/`. The before images show the published site; the after images show localhost and include Next.js's development indicator. Nothing was deployed.
