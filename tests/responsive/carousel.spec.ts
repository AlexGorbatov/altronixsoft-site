import { expect, test } from "@playwright/test";
import { contentFor } from "../../src/i18n/content";
import { locales } from "../../src/i18n/config";
import { ready } from "./layout";

for (const lang of locales) for (const width of [390, 768]) {
  test(`${lang} engagement row moves with its arrows and dots at ${width}px`, async ({ page }) => {
    const { copy, engagementModels } = contentFor(lang);
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/${lang}`, { waitUntil: "networkidle" });
    await ready(page);

    const section = page.locator("#engagement");
    const row = section.getByRole("region", { name: copy.engagement.rowLabel });
    await row.scrollIntoViewIfNeeded();
    const cards = row.locator("> *");
    const prev = section.getByRole("button", { name: copy.engagement.carousel.prev });
    const next = section.getByRole("button", { name: copy.engagement.carousel.next });
    const dot = (n: number) => section.getByRole("button", { name: copy.engagement.carousel.goTo.replace("{n}", String(n)) });

    // The check-up leads the row, then the four formats.
    await expect(cards).toHaveCount(engagementModels.length + 1);
    await expect(cards.first()).toContainText(copy.engagement.startHere);
    await expect(prev).toBeDisabled();
    await expect(dot(1)).toHaveAttribute("aria-current", "true");
    await expect(cards.first()).toHaveAttribute("data-current", "");

    await next.click();
    await expect(dot(2)).toHaveAttribute("aria-current", "true");
    await expect(cards.nth(1)).toHaveAttribute("data-current", "");
    await expect(prev).toBeEnabled();
    expect(await row.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

    await dot(engagementModels.length + 1).click();
    await expect(next).toBeDisabled();
    await expect(cards.last()).toHaveAttribute("data-current", "");

    await prev.click();
    await expect(dot(engagementModels.length)).toHaveAttribute("aria-current", "true");
  });
}

test("engagement on desktop is a banner above four cards, with no arrows", async ({ page }) => {
  const { copy, engagementModels } = contentFor("en");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en", { waitUntil: "networkidle" });
  await ready(page);
  const section = page.locator("#engagement");
  await expect(section.getByRole("button", { name: copy.engagement.carousel.next })).toBeHidden();
  await expect(section.getByRole("region", { name: copy.engagement.rowLabel }).locator("> *:visible")).toHaveCount(engagementModels.length);
  await expect(section.getByText(copy.engagement.startHere)).toHaveCount(2);
  await expect(section.getByText(copy.engagement.startHere).first()).toBeVisible();
});
