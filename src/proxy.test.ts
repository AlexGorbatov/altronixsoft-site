import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/data/site";
import { proxy } from "./proxy";

const request = (url: string, host: string, headers: Record<string, string> = {}) =>
  new NextRequest(url, { headers: { host, ...headers } });

describe("proxy", () => {
  it("keeps the platform address out of the index", () => {
    const response = proxy(request("https://altronixsoft.vercel.app/en", "altronixsoft.vercel.app"));
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it("also marks the language redirect on the platform address", () => {
    const response = proxy(request("https://altronixsoft.vercel.app/", "altronixsoft.vercel.app"));
    expect(response.status).toBe(307);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
  });

  it("leaves the real domain indexable", () => {
    const host = new URL(siteConfig.url).host;
    const response = proxy(request(`${siteConfig.url}/en`, host));
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
  });

  it("leaves local development alone", () => {
    const response = proxy(request("http://localhost:3000/en", "localhost:3000"));
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
  });

  it("still sends a request without a language to the visitor's language", () => {
    const response = proxy(request("http://localhost:3000/work", "localhost:3000", { "accept-language": "uk" }));
    expect(response.headers.get("location")).toBe("http://localhost:3000/uk/work");
  });

  it("sends the retired German addresses to English", () => {
    const response = proxy(request("http://localhost:3000/de/work", "localhost:3000"));
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("http://localhost:3000/en/work");
  });
});
