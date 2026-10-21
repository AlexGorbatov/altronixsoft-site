import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";
import { locales } from "@/i18n/config";
import { buildLlmsTxt } from "@/i18n/llms";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("serves plain text", () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
  });

  it.each(locales)("never leaks an unfilled TODO(owner) placeholder (%s)", (locale) => {
    expect(buildLlmsTxt(locale)).not.toContain("TODO(owner)");
  });

  it.each(locales)("describes the company, its contact and its key pages (%s)", (locale) => {
    const text = buildLlmsTxt(locale);
    expect(text.startsWith(`# ${siteConfig.name}`)).toBe(true);
    expect(text.match(/^## /gm)).toHaveLength(6);
    expect(text).toContain(siteConfig.email);
    expect(text).toContain(`${siteConfig.url}/${locale}/services/sap-commerce`);
  });
});
