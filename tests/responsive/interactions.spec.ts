import { expect, test } from "@playwright/test";
import { locales } from "../../src/i18n/config";
import { siteConfig } from "../../src/data/site";
import { layoutProblems, ready } from "./layout";

for (const locale of locales) for (const width of [320, 390, 768, 1024, 1440]) {
  test(`${locale} navigation and scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    await ready(page);
    const menu = page.locator('[aria-controls="mobile-navigation"]');
    const drawer = page.locator("#mobile-navigation");
    if (width < 1024) {
      await menu.click();
      await expect(drawer).toBeVisible();
      await expect(page.locator("main")).toHaveAttribute("inert", "");
      await expect(drawer.locator("a").first()).toBeFocused();
      await drawer.locator("a").last().focus();
      await page.keyboard.press("Tab");
      await expect(menu).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
      await expect(menu).toBeFocused();
      await menu.click();
      await drawer.locator(`a[href='/${locale}#about']`).click();
      await expect(drawer).toBeHidden();
      await expect(page.locator("main")).not.toHaveAttribute("inert", "");
      await expect(page).toHaveURL(new RegExp(`#about$`));
      await menu.click();
      await page.setViewportSize({ width: 1024, height: 844 });
      await expect(drawer).toBeHidden();
      await expect(page.locator("main")).not.toHaveAttribute("inert", "");
      await page.setViewportSize({ width, height: 844 });
    } else {
      await expect(menu).toBeHidden();
      await page.locator(`header nav:visible a[href='/${locale}#about']`).click();
      await expect(page).toHaveURL(new RegExp(`#about$`));
    }
    // Visit every card, including content initially outside the carousel viewport.
    for (const section of ["services", "engagement"]) {
      const cards = page.locator(`#${section} [role='region'] > *`);
      for (let index = 0; index < await cards.count(); index++) {
        await cards.nth(index).scrollIntoViewIfNeeded();
        expect(await layoutProblems(page)).toEqual([]);
      }
    }
    await page.goto(`/${locale}/services/software`, { waitUntil: "networkidle" });
    await page.locator("main .btn").first().click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("select[name=type]")).toHaveValue("project");
    await page.locator('header button[aria-controls]:not([aria-controls="mobile-navigation"])').click();
    const other = locale === "en" ? "uk" : "en";
    await page.locator(`header a[hreflang='${other}']`).click();
    await expect(page).toHaveURL(new RegExp(`/${other}(?:\\?|$)`));
  });
}

for (const locale of locales) for (const width of [320, 768, 1440]) {
  test(`${locale} form feedback at ${width}px (mock requests only)`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => {} } });
    });
    const replies = [
      { status: 400, body: { error: "validation", fields: { email: "email" } } },
      { status: 503, body: { error: "unavailable" } },
      { status: 200, body: { ok: true } },
    ];
    let requests = 0;
    await page.route("**/api/contact", route => {
      const response = replies[requests++];
      return route.fulfill({ status: response?.status || 500, json: response?.body || {} });
    });
    await page.goto(`/${locale}?type=technical-review#contact`, { waitUntil: "networkidle" });
    const form = page.locator("#contact form");
    await expect(form.locator("select[name=type]")).toHaveValue("technical-review");
    // Native validation blocks an empty form without touching the endpoint.
    await form.locator("button[type=submit]").click();
    expect(requests).toBe(0);
    await form.locator("input[name=name]").fill("Responsive Test");
    await form.locator("input[name=email]").fill("layout@example.invalid");
    await form.locator("textarea[name=message]").fill("Local browser layout test; the endpoint is intercepted.");
    await form.locator("input[name=consent]").check();
    await form.locator("button[type=submit]").click();
    await expect(form.locator("input[name=email]")).toHaveAttribute("aria-invalid", "true");
    await expect(form.locator("input[name=email]")).toBeFocused();
    expect(await layoutProblems(page)).toEqual([]);
    await form.locator("button[type=submit]").click();
    await expect(form.locator("[role=alert]")).toBeVisible();
    expect(await layoutProblems(page)).toEqual([]);
    const copy = page.locator(`#contact a[href='mailto:${siteConfig.email}']`).locator("..").locator("button");
    await copy.click();
    await expect(copy.locator("..").locator("[role=status]")).not.toBeEmpty();
    expect(await layoutProblems(page)).toEqual([]);
    if (process.env.RESPONSIVE_SCREENSHOTS) {
      await page.screenshot({ path: info.outputPath("copied-email.png"), animations: "disabled" });
    }
    await form.locator("button[type=submit]").click();
    await expect(form).toHaveCount(0);
    await expect(page.locator("#contact [role=status]").filter({ has: page.locator("h3") })).toBeVisible();
    expect(requests).toBe(3);
    expect(await layoutProblems(page)).toEqual([]);
  });
}
