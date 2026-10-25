import { expect, test } from "@playwright/test";
import { services } from "../../src/data/services";
import { caseStudies } from "../../src/data/projects";
import { locales } from "../../src/i18n/config";
import { layoutProblems, ready } from "./layout";

const widths = [320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1920];
const routes = ["", ...services.map(s => `/services/${s.id}`), "/services/sap-commerce", "/work",
  ...caseStudies.map(s => `/work/${s.slug}`), "/privacy", "/responsive-missing-page"];

for (const locale of locales) for (const width of widths) {
  test(`${locale} layout at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error" && !message.text().includes("404 (Not Found)")) errors.push(message.text());
    });
    for (const route of [...routes, ...(width >= 640 ? ["/work?view=list"] : [])]) {
      await test.step(route || "home (includes About and Contact)", async () => {
        const response = await page.goto(`/${locale}${route}`, { waitUntil: "networkidle" });
        expect(response?.status()).toBe(route === "/responsive-missing-page" ? 404 : 200);
        await ready(page);
        expect(await layoutProblems(page), `${locale}${route} at ${width}px`).toEqual([]);
        if (process.env.RESPONSIVE_SCREENSHOTS && [390, 768, 1440].includes(width)) {
          await page.screenshot({ path: info.outputPath(`${route.replace(/[^a-z0-9]/gi, "-") || "home"}.png`), fullPage: true, animations: "disabled" });
        }
      });
    }
    expect(errors).toEqual([]);
  });
}

// These three cases failed on the pre-fix baseline, including when root overflow was clipped.
for (const [route, width] of [["/en/services/software", 320], ["/uk/privacy", 320], ["/uk/work", 768]] as const) {
  test(`confirmed regression: ${route} at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(route, { waitUntil: "networkidle" });
    await ready(page);
    expect(await layoutProblems(page)).toEqual([]);
  });
}
