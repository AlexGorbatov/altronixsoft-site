import { expect, test } from "@playwright/test";
import { contentFor } from "../../src/i18n/content";
import { locales } from "../../src/i18n/config";
import { layoutProblems, ready } from "./layout";

for (const lang of locales) for (const width of [390, 768, 1024, 1440]) {
  test(`${lang} hero scene stays readable during motion at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);
    const scene = page.locator('#hero [class*="stage"] > svg:visible');
    await expect(scene).toHaveCount(1);
    const textSizes = await scene.locator('text').evaluateAll(labels => labels.map(label => {
      const transform = (label as SVGGraphicsElement).getScreenCTM()!;
      return parseFloat(getComputedStyle(label).fontSize) * Math.hypot(transform.a, transform.b);
    }));
    expect(Math.min(...textSizes)).toBeGreaterThanOrEqual(11.5);
    const collisions = await scene.locator('text').evaluateAll(labels => {
      const boxes = labels.map(label => ({ text: label.textContent, r: label.getBoundingClientRect() }));
      return boxes.flatMap((a, index) => boxes.slice(index + 1).filter(b =>
        Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top) > 1 &&
        Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left) > -3,
      ).map(b => `${a.text} / ${b.text}`));
    });
    expect(collisions).toEqual([]);
    for (const time of [0, 10_000, 19_000]) {
      const clipped = await scene.evaluate((svg, time) => {
        for (const animation of document.getAnimations()) {
          if ((animation.effect as KeyframeEffect)?.target === svg) {
            animation.pause();
            animation.currentTime = time;
          }
        }
        const frame = svg.closest('[aria-hidden="true"]')!.getBoundingClientRect();
        return [...svg.querySelectorAll('text,foreignObject,rect[class*="tile"]')].filter(element => {
          const r = element.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.left < frame.left - 1 || r.right > frame.right + 1 || r.top < frame.top - 1 || r.bottom > frame.bottom + 1);
        }).map(element => element.textContent || element.tagName);
      }, time);
      expect(clipped).toEqual([]);
    }
    expect(await layoutProblems(page)).toEqual([]);
    if (process.env.RESPONSIVE_SCREENSHOTS) {
      await page.screenshot({ path: info.outputPath("hero.png"), animations: "disabled" });
      await page.locator('#hero > [aria-hidden="true"]').last().screenshot({ path: info.outputPath("hero-flow.png"), animations: "disabled" });
    }
  });

  test(`${lang} AI entry, case details and contact context at ${width}px`, async ({ page }, info) => {
    const { hero, copy } = contentFor(lang);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);
    await page.locator('#hero').getByRole('link', { name: hero.aiLink, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/services/ai$`));
    await ready(page);
    const firstCta = page.locator('main .btn').first();
    expect((await firstCta.boundingBox())!.y).toBeLessThan(800);
    expect(await layoutProblems(page)).toEqual([]);
    if (process.env.RESPONSIVE_SCREENSHOTS) await page.screenshot({ path: info.outputPath("ai-services.png"), fullPage: true });

    for (const slug of ['ai-business-workflow-agent', 'ai-document-processing']) {
      await page.goto(`/${lang}/work/${slug}`, { waitUntil: "networkidle" });
      await ready(page);
      const details = page.locator('details[data-case-architecture]');
      await expect(details).toHaveCount(1);
      await expect(details).not.toHaveAttribute('open', '');
      await details.locator('summary').click();
      await expect(details).toHaveAttribute('open', '');
      await expect(details.getByRole('heading', { name: copy.casePage.architecture, exact: true })).toBeVisible();
      expect(await layoutProblems(page)).toEqual([]);
      await details.locator('summary').click();
      if (process.env.RESPONSIVE_SCREENSHOTS) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: info.outputPath(`${slug}.png`), fullPage: true });
      }
    }
    await page.getByRole('link', { name: copy.pages.requestReview, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}\\?type=technical-review#contact$`));
    await expect(page.getByRole('combobox')).toHaveValue('technical-review');
  });
}
