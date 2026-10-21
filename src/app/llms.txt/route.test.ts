import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("serves plain text", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
  });

  it("never leaks an unfilled TODO(owner) placeholder", async () => {
    const text = await GET().text();
    expect(text).not.toContain("TODO(owner)");
  });

  it("describes the company, its contact and its key pages", async () => {
    const text = await GET().text();
    expect(text.startsWith(`# ${siteConfig.name}`)).toBe(true);
    for (const section of ["## What we do", "## Industries", "## How engagements start", "## Contact", "## Key pages"]) {
      expect(text).toContain(section);
    }
    expect(text).toContain(siteConfig.email);
    expect(text).toContain(`${siteConfig.url}/services/sap-commerce`);
  });
});
