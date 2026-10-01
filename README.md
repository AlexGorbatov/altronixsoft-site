<div align="center">

# Altronix Software

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**The corporate website of [Altronix Software](https://altronixsoft.com) — an engineering partner for custom software, integrations and practical AI.**
<br />
Custom software · modernization & integrations · AI solutions & automation.

[Highlights](#-highlights) · [Design system](#-design-system) · [Stack](#-stack) · [Structure](#-project-structure) · [Getting started](#-getting-started) · [Before launch](#-before-launch)

</div>

<br />

## ✨ Highlights

- **"How we work" stepper.** Four steps visible at once (columns on desktop, a vertical list on phones); clicking a step lights the matching part of the workflow diagram. It never captures page scrolling. Isolated in [`ProcessJourney.tsx`](src/components/home/ProcessJourney.tsx).
- **Enterprise-architecture hero visual.** Animated connectors, staggered node reveals, status pulses and a barely-there pointer tilt — restrained on purpose.
- **Case studies, not slogans.** Each anonymous client engagement has its own page (`/work/[slug]`) with context, challenge, what we did, result, stack, duration and role. Fields still waiting for real facts are `TODO(owner)` placeholders that never reach production. *Altronix Labs* shows up only when a demo or repository exists.
- **A real contact path.** A validated form (zod) with a honeypot, rate limit and Resend/SMTP delivery, an optional booking link, and a prefilled-`mailto:` fallback when no provider is configured.
- **Premium but quiet motion.** Short section reveals that are visible without JS and never hide content on fast scrolling, pointer-following card glow, a subtle capability marquee. Everything respects `prefers-reduced-motion`.
- **Built for every screen.** Desktop, tablet and phone, with horizontal snap-scrolling rows instead of endless card stacks.
- **Accessible by default.** Semantic landmarks, a keyboard-operable mobile drawer (focus trap, `Esc`, focus return), visible focus rings, `aria-pressed` on the active step, skip link, 44px tap targets.
- **SEO ready.** Per-page metadata, canonical, Open Graph & Twitter tags (1200×630), `robots` + `sitemap`, and JSON-LD (`Organization` with `sameAs`, `ProfessionalService`) with no made-up addresses or ratings.

<br />

## 🎨 Design system

Deep navy (~70%), indigo surfaces (~20%), cyan / violet ambient light (~10%) — localized radial glows, never full-width gradient walls. Tokens live in [`globals.css`](src/app/globals.css) as CSS variables and are exposed to Tailwind.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | ![#07101f](https://img.shields.io/badge/%20%20%20-%2307101f-07101f?style=flat-square) `#07101f` | Page background |
| `--surface` / `--surface-raised` | ![#0f1a30](https://img.shields.io/badge/%20%20%20-%230f1a30-0f1a30?style=flat-square) `#0f1a30` · ![#121f39](https://img.shields.io/badge/%20%20%20-%23121f39-121f39?style=flat-square) `#121f39` | Cards, panels |
| `--blue` | ![#1670ef](https://img.shields.io/badge/%20%20%20-%231670ef-1670ef?style=flat-square) `#1670ef` | Primary actions |
| `--cyan` | ![#25c8dd](https://img.shields.io/badge/%20%20%20-%2325c8dd-25c8dd?style=flat-square) `#25c8dd` | Active states, links |
| `--indigo` / `--violet` | ![#4548a8](https://img.shields.io/badge/%20%20%20-%234548a8-4548a8?style=flat-square) `#4548a8` · ![#7d67d9](https://img.shields.io/badge/%20%20%20-%237d67d9-7d67d9?style=flat-square) `#7d67d9` | Ambient light |
| `--text-primary` / `--text-secondary` | `#f7f9fc` · `#a7b2c5` | Text |

**Type:** [Manrope](https://fonts.google.com/specimen/Manrope) for everything; [JetBrains Mono](https://www.jetbrains.com/lp/mono/) only for technical labels (numbers, status, eyebrows).

<br />

## 🧱 Stack

| | |
| --- | --- |
| **Framework** | Next.js (App Router), React, Server Components by default |
| **Language** | TypeScript, `strict` mode, no `any` |
| **Styling** | Tailwind CSS v4 + CSS variables; CSS Modules for the two bespoke visuals |
| **Icons** | `lucide-react` |
| **Animation** | CSS-first — no animation library |
| **Hosting** | Next.js runtime (Vercel or any Node host): static pages plus one route handler for the contact form |

Client components are limited to what genuinely needs the browser: `Header` (drawer), `AnimatedReveal`, `SpotlightCard`, `TiltCard`, `HeroGlows`, `ProcessJourney`.

<br />

## 📁 Project structure

```text
src/
├─ app/                    layout, home page, /work/[slug], /services/[slug], /privacy, api/contact,
│                          metadata, robots, sitemap, icon / apple-icon / opengraph-image, globals.css (tokens)
├─ components/
│  ├─ layout/              Header (sticky + accessible drawer), Footer (legal line), Logo, PageShell
│  ├─ home/                Hero, TrustStrip, Services, AiUseCases, Industries, SelectedWork, Labs,
│  │                       ProcessJourney, EngagementModels, Company ("Who we are"), FinalCTA
│  ├─ contact/             ContactForm
│  ├─ ui/                  Button, Container, Section, SectionHeading, Tag, Avatar,
│  │                       AnimatedReveal, SpotlightCard, CardRow
│  └─ JsonLd.tsx           structured data
├─ data/                   all copy & content as typed data
│                          (hero, services, industries, projects, process, engagement, company,
│                           contact, privacy, navigation, site)
└─ lib/                    utils, todo (TODO(owner) helpers), cases, metadata, contact-schema
docs/superpowers/          design specs and implementation plans
```

<br />

## 🚀 Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
npm test           # unit tests (vitest): contact schema, API route, TODO helpers
```

Requires Node.js 20+.

<br />

## ✅ Before launch

Content that only the owner can provide is written as `TODO(owner): ...` in `src/data/*` and `site.ts`. Components render a value only once it is real, so placeholders never reach production; in development they show as dashed notes. List everything still open:

```bash
npm run todo     # every open placeholder with file:line, grouped by file
```

| Area | File | What to provide |
|---|---|---|
| Case studies (×3) | `src/data/projects.ts` | context, challenge, what we did, result, duration |
| Labs | `src/data/projects.ts` | demo URL, repository, screenshot (block stays hidden without them) |
| Engagement packages | `src/data/engagement.ts` | price, duration, deliverable per format |
| Company | `src/data/company.ts` | production-systems count, industries and countries, check of "Since 2019" |
| Legal | `src/data/site.ts` | registry code, VAT number |
| Contact person | `src/data/checkup.ts` | name, role, LinkedIn |
| Support and Security | `src/data/trust.ts` | real conditions (the whole section stays hidden until filled) |
| SAP Commerce page | `src/data/sap-commerce.ts` | versions and storefronts, certifications, typical engagement |
| Privacy policy | `src/data/privacy.ts` | last updated, retention period, email provider |

- [ ] Fill the `TODO(owner)` values: legal details, company numbers, case-study facts, package prices, privacy-policy specifics.
- [ ] Configure the environment (see [`.env.example`](.env.example)): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`, and a mail provider (`RESEND_API_KEY` or `SMTP_*`, plus `CONTACT_TO` / `CONTACT_FROM`). Without a provider the form falls back to a prefilled `mailto:` link.
- [ ] Hero headline is in [`src/data/hero.ts`](src/data/hero.ts); currently "Serious engineering. Practical AI."
- [ ] Review the privacy policy template in [`src/data/privacy.ts`](src/data/privacy.ts) (not legal advice: have it reviewed).
- [ ] Case studies without a filled `result` are `noindex` and stay out of the sitemap until they have one.

The contact form needs a server runtime (it posts to `/api/contact`), so deploy on a platform that runs Next.js route handlers (Vercel, Node, containers), not a static export.

<br />

<div align="center">
  <sub>© Altronixsoft OÜ · <i>Serious engineering. Practical AI.</i></sub>
</div>
