import { expect, test } from "@playwright/test";
import { contentFor } from "../../src/i18n/content";
import { locales } from "../../src/i18n/config";
import { layoutProblems, ready } from "./layout";

for (const lang of locales) for (const width of [320, 390, 768, 1440]) {
  test(`${lang} direct AI navigation and complete reference cases at ${width}px`, async ({ page }, info) => {
    const { copy, caseStudies, services } = contentFor(lang);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);
    await page.getByRole('link', { name: copy.ui.cta, exact: true }).first().click();
    await expect(page.getByRole('combobox')).toHaveValue('other');
    await page.goto(`/${lang}`, { waitUntil: 'networkidle' });
    if (width < 1024) {
      await page.getByRole('button', { name: copy.ui.menuOpen, exact: true }).click();
      const menu = page.locator('#mobile-navigation');
      const ai = menu.getByRole('link', { name: lang === 'en' ? 'AI services' : 'Послуги ШІ', exact: true });
      await expect(ai).toBeVisible();
      if (process.env.RESPONSIVE_SCREENSHOTS) await page.screenshot({ path: info.outputPath('mobile-menu.png') });
      await ai.click();
      await expect(menu).toBeHidden();
    } else {
      await page.getByRole('link', { name: services.find(service => service.id === 'ai')!.title, exact: true }).last().click();
    }
    await expect(page).toHaveURL(new RegExp(`/${lang}/services/ai$`));

    for (const slug of ['ai-business-workflow-agent', 'ai-document-processing']) {
      const study = caseStudies.find(study => study.slug === slug)!;
      await page.goto(`/${lang}/work/${slug}`, { waitUntil: 'networkidle' });
      await ready(page);
      await expect(page.getByText(study.relationship!, { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: copy.casePage.contribution, exact: true })).toHaveCount(0);
      await expect(page.getByRole('heading', { name: copy.casePage.focus, exact: true })).toHaveCount(0);
      await expect(page.getByText(`${study.focus}.`, { exact: true })).toBeVisible();
      const earlyContact = page.locator('main a[data-case-contact]');
      await expect(earlyContact).toHaveCount(1);
      const linkBox = (await earlyContact.boundingBox())!;
      const diagramBox = (await page.locator('svg[data-flow]:visible').boundingBox())!;
      expect(linkBox.y + linkBox.height).toBeLessThan(diagramBox.y);
      expect(linkBox.height).toBeGreaterThanOrEqual(44);
      for (const item of study.workItems ?? []) await expect(page.getByText(item.text, { exact: true })).toBeVisible();
      const details = page.locator('details[data-case-architecture]');
      await details.locator('summary').click();
      for (const item of study.architecture ?? []) await expect(details.getByText(item.text, { exact: true })).toBeVisible();
      expect(await layoutProblems(page)).toEqual([]);
      if (width === 390) {
        const sizes = await page.locator('svg[data-flow]:visible text').evaluateAll(labels => labels.map(label => {
          const matrix = (label as SVGGraphicsElement).getScreenCTM()!;
          return parseFloat(getComputedStyle(label).fontSize) * Math.hypot(matrix.a, matrix.b);
        }));
        expect(Math.min(...sizes)).toBeGreaterThanOrEqual(11.5);
      }
      await details.locator('summary').click();
      if (process.env.RESPONSIVE_SCREENSHOTS) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: info.outputPath(`${slug}.png`), fullPage: true });
      }
    }
    await page.getByRole('link', { name: copy.pages.requestReview, exact: true }).click();
    await expect(page.getByRole('combobox')).toHaveValue('technical-review');
    await expect(page.getByRole('textbox', { name: copy.form.message, exact: true })).toHaveAttribute('placeholder', copy.form.placeholder);
    await page.getByRole('textbox', { name: copy.form.message, exact: true }).fill('Keep this inquiry while changing the request topic.');
    await page.getByRole('link', { name: copy.ui.cta, exact: true }).first().click();
    await expect(page.getByRole('combobox')).toHaveValue('other');
    await expect(page.getByRole('textbox', { name: copy.form.message, exact: true })).toHaveValue('Keep this inquiry while changing the request topic.');
  });
}
