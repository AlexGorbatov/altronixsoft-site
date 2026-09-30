# Altronix Software — website

Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS v4. Static, deployable to Vercel as-is; no backend.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

- `src/app` — layout, page, metadata, `robots.ts`, `sitemap.ts`, `icon.svg`, `globals.css` (design tokens + shared classes)
- `src/components/layout` — Header (sticky, accessible mobile drawer), Footer
- `src/components/home` — page sections; `ProcessJourney` holds all scroll-driven logic
- `src/components/ui` — Button, Container, Section, SectionHeading, Tag, AnimatedReveal, SpotlightCard, CardRow, ImagePlaceholder
- `src/data` — copy and content (services, projects, process, company, navigation, site config)
- `reference/` — the approved HTML prototype (v6), kept for visual comparison

## Things to fill in before launch

- `NEXT_PUBLIC_SITE_URL` (canonical / Open Graph base; defaults to `https://altronixsoft.com`)
- Founder photo: pass `src` to `<ImagePlaceholder>` in `Company.tsx` (file in `public/`)
- Confirm the role / environment / focus wording of the three commercial projects in `src/data/projects.ts`
- Optional: `opengraph-image` for link previews

## Notes

- Server Components by default. Client components: `Header`, `AnimatedReveal`, `SpotlightCard`, `TiltCard`, `HeroGlows`, `ProcessJourney`.
- Animations are CSS-first; `prefers-reduced-motion` disables them (the process section still follows scroll, without dashes/transitions).
- All CTAs are `mailto:` links to `info@altronixsoft.com`.
