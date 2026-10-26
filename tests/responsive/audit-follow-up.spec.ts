import { expect, test } from "@playwright/test";
import { contentFor } from "../../src/i18n/content";
import { locales } from "../../src/i18n/config";
import { layoutProblems, ready } from "./layout";

for (const lang of locales) for (const width of [390, 768, 1024, 1440]) {
  test(`${lang} hero keeps its original scale and panning composition at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);
    const scene = page.locator('#hero [class*="stage"] > svg:visible');
    await expect(scene).toHaveCount(1);
    const card = scene.locator('foreignObject').first();
    expect((await card.boundingBox())!.width).toBeGreaterThan(width < 768 ? 145 : 230);
    const travel = await scene.evaluate(svg => {
      const animation = document.getAnimations().find(animation => (animation.effect as KeyframeEffect)?.target === svg);
      if (!animation) return 0;
      animation.pause();
      animation.currentTime = 0;
      const start = svg.getBoundingClientRect().left;
      animation.currentTime = 7000;
      return Math.abs(svg.getBoundingClientRect().left - start);
    });
    expect(travel).toBeGreaterThan(100);
    expect(await layoutProblems(page)).toEqual([]);
    if (process.env.RESPONSIVE_SCREENSHOTS) {
      await page.screenshot({ path: info.outputPath("hero.png"), animations: "disabled" });
      await page.locator('#hero > [aria-hidden="true"]').last().screenshot({ path: info.outputPath("hero-flow.png"), animations: "disabled" });
    }
  });

  test(`${lang} AI entry, case details and contact context at ${width}px`, async ({ page }, info) => {
    const { copy } = contentFor(lang);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);
    await page.getByRole('link', { name: contentFor(lang).services.find(service => service.id === 'ai')!.title, exact: true }).last().click();
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
