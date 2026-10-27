import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";
import { locales } from "@/i18n/config";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("lists every page once per language", () => {
    expect(entries.length % locales.length).toBe(0);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
  });

  it("carries a last-modified date on every entry", () => {
    for (const entry of entries) expect(entry.lastModified).toBe(siteConfig.contentUpdated);
    expect(Number.isNaN(Date.parse(siteConfig.contentUpdated))).toBe(false);
  });

  it("points each entry at its translations and a default", () => {
    for (const entry of entries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(Object.keys(languages).sort()).toEqual([...locales, "x-default"].sort());
      expect(entry.url.startsWith(siteConfig.url)).toBe(true);
    }
  });
});
