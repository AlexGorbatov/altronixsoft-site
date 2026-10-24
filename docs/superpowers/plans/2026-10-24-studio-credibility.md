# Studio credibility and project presentation implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement these tasks inline. The user explicitly authorized direct implementation without an ordinary approval gate.

**Goal:** Present AltronixSoft as an independent engineering studio, improve evidence and conversion, and preserve technical depth.

**Architecture:** Extend existing typed content and server-rendered page templates; retain the current design and routes. Separate project relationship/contribution from the architecture of the whole product. Reorder the existing contact grid for mobile rather than change form behavior.

**Tech Stack:** Next.js 16.4, React 19, TypeScript, Tailwind, Vitest; temporary Playwright/Lighthouse tools already available outside the repository.

**Spec:** User attachment `/Users/oleksandrgorbatov/.codex/attachments/0fc3249f-239f-4596-be87-5eb023db50e7/Pasted text.txt` and explicit instruction to retain Nexus, Lobby9 and SAP technical details.

## Global constraints

- Preserve user changes, existing visual identity, legal details, routing, metadata and contact validation.
- Brand message: “Complex problems. Clear solutions.” Independent Software Engineering Studio; flexible project teams, not a large permanent team.
- No invented attribution, founder history, personnel, metrics, guarantees or outcomes; missing precise contribution remains a documented factual limit.
- Keep public partner links, NDA boundaries and reference-project labels.
- Keep new/changed content translated in English, Ukrainian and the retained inactive German translation.
- Do not send real contact messages. No new runtime dependencies.

## Review focus

- Technical details survive restructuring, including provider failover, chain-specific keys, unsigned CBOR, gaming integrations and SAP search/checkout details.
- Wider product architecture must not imply sole studio ownership; previous individual work must not be invented or relabeled as company work.
- Long translated project titles fit narrow cards and desktop list layout.
- All request-type CTA queries still reach the correct form; mobile intro does not bury its first field.
- New service-to-case links resolve to existing localized case studies; default/fallback rendering remains safe.

### Task 1: Baseline and regression checks

**Files:** Temporary baseline and Playwright checks under `/private/tmp/altronixsoft-audit-tools/`; existing Vitest suite.
**Interfaces:** Snapshot current technical content and UI; provide reproducible mobile and service-content checks.
- [x] Save the current source snapshot and run existing tests.
- [x] Run failing browser assertions for mobile form position, clipped titles and service evidence links.

### Task 2: Studio positioning and truthful trust content

**Files:** `src/data/hero.ts`, `src/data/site.ts`, `src/data/company.ts`, `src/data/flow.ts`, `src/i18n/{uk,de}/site.ts`, hero styles and public TODO filters.
**Interfaces:** Existing content objects keep their shapes; hero diagram retains its layout and represents engineering integrations.
- [x] Replace broad agency/AI-only wording with the user-supplied studio model; preserve legal identity.
- [x] Show only verified trust/support details; keep placeholders internal.
- [x] Keep primary hero text visible immediately to reduce avoidable LCP delay.

### Task 3: Case-study structure and attribution

**Files:** `src/data/projects.ts`, `src/i18n/{uk,de}/projects.ts`, case page template and shared case labels.
**Interfaces:** Add optional `relationship` and `contribution` strings to `CaseStudy`; render them independently from `whatWeDid`/`workItems` and architecture.
- [x] Add evidence-bounded project context without assigning unknown personal/company histories.
- [x] Split Nexus technical prose into readable workstreams; preserve every technical capability and all partner links.
- [x] Retain Lobby9 and SAP workstreams/architecture; preserve own/reference classification and supported outcomes.
- [x] Re-run technical preservation and translation checks.

### Task 4: Services with concrete scope and relevant evidence

**Files:** `src/data/services.ts`, `src/data/sap-commerce.ts`, service templates, localized content and shared UI labels.
**Interfaces:** Add `problems: string[]`, `deliverables: {title:string;text:string}[]`, `start: string`, `caseSlugs: string[]` to `Service`; SAP receives equivalent problem/case data. Shared server component links existing cases with their truthful status/context.
- [x] Add meaningful server-rendered service problems, deliverables and starting scope.
- [x] Link relevant existing cases; keep commercial and reference work distinguishable.
- [x] Synchronize translated content and protect identifier fields in translation validation.

### Task 5: Mobile presentation and verification

**Files:** `src/components/home/FinalCTA.tsx`, project card styles/template, localized contact copy; no endpoint changes.
**Interfaces:** Preserve `#contact`, query selection and `ContactForm` API; reorder grid content only.
- [x] Put the form after a short introduction on mobile, with supporting guidance afterwards.
- [x] Let project titles and important summary text wrap without ellipses.
- [x] Run lint, typecheck, full tests, isolated production build, Playwright at 320/390/768/1440, axe and Lighthouse where available.
- [x] Review final diff against the baseline; report unverified business facts and remaining limitations.
