import { expect, test } from "@playwright/test";
import { locales } from "../../src/i18n/config";
import { layoutProblems, ready } from "./layout";

test.use({ reducedMotion: "no-preference" });

for (const locale of locales) for (const width of [390, 768, 1440]) {
  test(`${locale} animated layout and pause at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    await ready(page);
    expect(await layoutProblems(page)).toEqual([]);
    await page.locator(".motion-toggle").first().click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    expect(await layoutProblems(page)).toEqual([]);
    await page.locator(".motion-toggle").first().click();
    await expect(page.locator("html")).not.toHaveAttribute("data-motion", "paused");
    for (const slug of ["lobby9", "nexus", "enterprise-ecommerce-platform"]) {
      await page.goto(`/${locale}/work/${slug}`, { waitUntil: "networkidle" });
      await ready(page);
      await page.locator("main svg[data-flow]:visible,main svg[role='img']:visible").first().scrollIntoViewIfNeeded();
      expect(await layoutProblems(page)).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}
