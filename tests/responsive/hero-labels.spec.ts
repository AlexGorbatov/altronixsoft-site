import { expect, test } from "@playwright/test";
import { locales } from "../../src/i18n/config";
import { ready } from "./layout";

for (const locale of locales) for (const width of [320, 360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1920]) {
  test(`${locale} hero labels stay inside their cards at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    await ready(page);
    // Compare content with its own frame; the shared pan does not affect relative alignment.
    const labels = await page.locator('#hero [class*="cardTitle"]:visible').evaluateAll(elements => elements.map(element => {
      const group = element.closest("foreignObject")?.parentElement ?? element.parentElement!;
      const tile = group.querySelector('rect[class*="tile"]')!;
      const icon = group.querySelector('foreignObject svg,g[class*="icon"]')!;
      const label = element.getBoundingClientRect(), box = tile.getBoundingClientRect();
      const iconBox = icon.getBoundingClientRect();
      const centreX = box.x + box.width / 2, centreY = box.y + box.height / 2;
      const contentLeft = Math.min(label.left, iconBox.left), contentRight = Math.max(label.right, iconBox.right);
      const contentTop = Math.min(label.top, iconBox.top), contentBottom = Math.max(label.bottom, iconBox.bottom);
      const linesCentred = [...element.children].every(line => {
        const range = document.createRange();
        range.selectNodeContents(line);
        const r = range.getBoundingClientRect();
        return Math.abs(r.x + r.width / 2 - (label.x + label.width / 2)) < 1.5;
      });
      const subtitle = group.querySelector('text[class*="sub"]')!;
      const next = [...group.parentElement!.children].find(group => {
        const rect = group.querySelector('rect[class*="tile"]') as SVGGraphicsElement | null;
        return rect && rect.getBoundingClientRect().x > box.right && Math.abs(rect.getBoundingClientRect().y - box.y) < 1;
      });
      const nextLabel = next?.querySelector('text[class*="label"]') as SVGGraphicsElement | undefined;
      const sub = subtitle.getBoundingClientRect();
      return { text: element.textContent,
        fits: contentLeft > box.left && contentRight < box.right && contentTop > box.top && contentBottom < box.bottom,
        centred: Math.abs(label.x + label.width / 2 - centreX) < 1.5 &&
          Math.abs(label.y + label.height / 2 - centreY) < 1.5 &&
          Math.abs(iconBox.y + iconBox.height / 2 - centreY) < 1.5 && linesCentred &&
          Math.abs(sub.x + sub.width / 2 - centreX) < 1.5,
        iconClear: iconBox.right + 2 < label.left,
        captionFits: !nextLabel || sub.right + 2 <= nextLabel.getBoundingClientRect().left };
    }));
    expect(labels.length).toBeGreaterThan(0);
    if (process.env.RESPONSIVE_SCREENSHOTS) {
      await page.locator('#hero > [aria-hidden="true"]').last().screenshot({ path: info.outputPath("hero-flow.png"), animations: "disabled" });
    }
    expect(labels.filter(label => !label.fits)).toEqual([]);
    expect(labels.filter(label => !label.centred)).toEqual([]);
    expect(labels.filter(label => !label.iconClear)).toEqual([]);
    expect(labels.filter(label => !label.captionFits)).toEqual([]);
  });
}
