import type { Page } from "@playwright/test";

/** Measure actual glyphs as well as boxes: scrollWidth alone misses clipped SVG labels. */
export async function layoutProblems(page: Page) {
  return page.evaluate(() => {
    const issues: string[] = [];
    const describe = (e: Element) => `${e.tagName.toLowerCase()} ${e.textContent?.trim().slice(0, 75)}`;
    const visible = (e: Element) => {
      const r = e.getBoundingClientRect(), s = getComputedStyle(e);
      return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none" &&
        !e.closest('[hidden],.sr-only,[aria-hidden="true"]');
    };
    const rail = (e: Element) => {
      for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) {
        if (["auto", "scroll"].includes(getComputedStyle(p).overflowX) && p.scrollWidth > p.clientWidth + 2) return p;
      }
      return null;
    };
    if (document.documentElement.scrollWidth > innerWidth + 1) issues.push(`Document width ${document.documentElement.scrollWidth} > ${innerWidth}`);
    const header = document.querySelector("header");
    if (header?.firstElementChild) {
      const bounds = header.getBoundingClientRect();
      const items = [...header.firstElementChild.children].filter(visible).map(e => e.getBoundingClientRect());
      for (let index = 0; index < items.length; index++) {
        if (items[index].top < bounds.top - 1 || items[index].bottom > bounds.bottom + 1) issues.push("Header content exceeds its height");
        if (index && items[index - 1].right > items[index].left + 1) issues.push("Header logo, navigation or actions overlap");
      }
    }
    for (const e of document.querySelectorAll("header a,header button,main h1,main h2,main h3,main h4,main .btn,main .field,footer a")) {
      if (!visible(e)) continue;
      const r = e.getBoundingClientRect();
      if (!rail(e) && (r.left < -1 || r.right > innerWidth + 1)) issues.push(`Outside viewport: ${describe(e)}`);
      // Wordmark deliberately cancels its final letter-spacing with a negative margin.
      const wordmark = e.matches("header a,footer a") && e.querySelector("b")?.textContent === "ALTRONIX";
      if (!wordmark && !e.matches("input,textarea,select") && e.clientWidth > 1 && e.scrollWidth > e.clientWidth + 2) {
        issues.push(`Box overflow ${e.scrollWidth}/${e.clientWidth}: ${describe(e)}`);
      }
    }
    const walker = document.createTreeWalker(document.querySelector("main") || document.body, NodeFilter.SHOW_TEXT);
    let text: Node | null;
    while ((text = walker.nextNode())) {
      const e = text.parentElement;
      if (!text.textContent?.trim() || !e || !visible(e) || e.closest("svg,script,style,textarea,select,option")) continue;
      const intentionalRail = rail(e);
      const range = document.createRange();
      range.selectNodeContents(text);
      for (const r of range.getClientRects()) {
        if (r.width < 2 || r.height < 2) continue;
        for (let p: Element | null = e; p && p !== document.body && p !== intentionalRail; p = p.parentElement) {
          const s = getComputedStyle(p), b = p.getBoundingClientRect();
          // The animated technology marquee intentionally fades its repeated chips.
          if (s.maskImage !== "none") break;
          if (b.width < 2) continue;
          if ((["hidden", "clip", "auto", "scroll"].includes(s.overflowX) && (r.left < b.left - 2 || r.right > b.right + 2)) ||
              (["hidden", "clip"].includes(s.overflowY) && (r.top < b.top - 2 || r.bottom > b.bottom + 2))) {
            issues.push(`Clipped text: ${describe(e)} in ${p.tagName.toLowerCase()}`);
            break;
          }
        }
      }
    }
    for (const svg of document.querySelectorAll("main svg[data-flow],main svg[role='img']")) {
      const bounds = svg.getBoundingClientRect();
      if (bounds.width < 2 || bounds.height < 2) continue;
      for (const label of svg.querySelectorAll("text")) {
        const r = label.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        if (r.left < bounds.left - 2 || r.right > bounds.right + 2 || r.top < bounds.top - 2 || r.bottom > bounds.bottom + 2) {
          issues.push(`SVG canvas clips: ${label.textContent}`);
        }
        const node = [...(label.parentElement?.children || [])].find(el => el.tagName === "rect" && /node/.test(el.getAttribute("class") || ""));
        if (node) {
          const b = node.getBoundingClientRect();
          if (r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1) {
            issues.push(`SVG node label escapes: ${label.textContent}`);
          }
        }
      }
    }
    return [...new Set(issues)];
  });
}

export async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator("main").waitFor();
}
