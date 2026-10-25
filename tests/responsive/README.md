# Responsive checks

Start the app in another terminal (`npm run dev`, or `npm run build` then `npm start`).

```sh
npx playwright install chromium
npm run test:responsive
```

`PLAYWRIGHT_BASE_URL` selects a different running server. `PLAYWRIGHT_CHROME_PATH` optionally selects a local Chrome executable. `PLAYWRIGHT_BROWSER=firefox` or `webkit` uses that Playwright engine when its binaries are installed; leave the Chrome path unset in that case.

The route matrix discovers services, case studies and active locales from source data. It checks 12 widths, Work tiles/list, Privacy and the localized missing-page state. The homepage includes About, Industries and Contact. Text glyph bounds, SVG node labels, header overlap and document width are checked, including content inside intentionally scrollable card rows. Intentional marquee masks, hidden accessibility text and wordmark letter-spacing are excluded.

Interaction checks exercise menu focus/Escape/resize, anchors, language selection, card scrolling, CTA form selection, native validation, error/fallback/success states and copied-email feedback. Every contact request is intercepted; no email is sent. Clipboard writes are stubbed for portable feedback checks.

The full route matrix uses reduced motion for repeatability. Separate checks run with motion enabled on the homepage and Lobby9, Nexus and SAP Commerce case pages, including pause/resume.

Dedicated hero-label checks compare content bounds, horizontal/vertical centering, individual title lines and neighboring captions at all 12 widths, including the decorative panning scene.

Failures retain screenshots and traces. `RESPONSIVE_SCREENSHOTS=1 npm run test:responsive` also saves full-page captures at 390/768/1440 and copied-email states in ignored `test-results/`. These support manual visual review; they are not pixel-diff golden baselines across operating systems. Reports live in ignored `playwright-report/`.
