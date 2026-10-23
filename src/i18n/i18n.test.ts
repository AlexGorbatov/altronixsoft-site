import { describe, expect, it } from "vitest";
import { locales, localizedPath, negotiateLocale, splitLocale, type Locale } from "./config";
import { contentFor } from "./content";
import { overlay } from "./merge";

describe("localizedPath", () => {
  it("prefixes paths with the language", () => {
    expect(localizedPath("de", "/")).toBe("/de");
    expect(localizedPath("de", "/#work")).toBe("/de#work");
    expect(localizedPath("uk", "/?type=project#contact")).toBe("/uk?type=project#contact");
    expect(localizedPath("en", "/services/ai")).toBe("/en/services/ai");
  });
  it("leaves absolute and hash-only links alone", () => {
    expect(localizedPath("de", "#work")).toBe("#work");
    expect(localizedPath("de", "https://example.com/x")).toBe("https://example.com/x");
  });
});

describe("splitLocale", () => {
  it("separates the language from the path", () => {
    expect(splitLocale("/de")).toEqual({ locale: "de", path: "/" });
    expect(splitLocale("/uk/services/ai")).toEqual({ locale: "uk", path: "/services/ai" });
    expect(splitLocale("/services/ai")).toEqual({ locale: undefined, path: "/services/ai" });
  });
});

describe("negotiateLocale", () => {
  it("picks the best supported language from Accept-Language", () => {
    expect(negotiateLocale("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
    expect(negotiateLocale("uk-UA,uk;q=0.9")).toBe("uk");
    expect(negotiateLocale("fr-FR,fr;q=0.9,de;q=0.5")).toBe("de");
  });
  it("falls back to English", () => {
    expect(negotiateLocale("")).toBe("en");
    expect(negotiateLocale(null)).toBe("en");
    expect(negotiateLocale("ru-RU,ru;q=0.9")).toBe("en");
    expect(negotiateLocale("de;q=0")).toBe("en");
  });
});

describe("overlay", () => {
  const base = { a: "one", list: ["x", "TODO(owner): y"], items: [{ t: "p", id: "1" }, { t: "q", id: "2" }] };
  it("keeps untouched keys and merges arrays by position", () => {
    const out = overlay(base, { list: ["X"], items: [{ t: "P" }] });
    expect(out).toEqual({ a: "one", list: ["X", "TODO(owner): y"], items: [{ t: "P", id: "1" }, { t: "q", id: "2" }] });
  });
  it("does not change the source", () => {
    overlay(base, { a: "uno" });
    expect(base.a).toBe("one");
  });
});

/** Strings that are the same in every language on purpose: names, technologies, terms of art, units. */
const SAME_EVERYWHERE = new Set([
  "Java", "Spring", "Azure", "AWS", "PostgreSQL", "Docker", "Kubernetes", "Enterprise APIs", "SAP Commerce Cloud",
  "SAP Commerce Cloud (Hybris)", "Altronix Labs", "RAG", "PIM", "API", "APIs", "Repository", "Stack", "Team",
  "ERP · PIM", "Cloud", "Proof of Value", "Data Hub", "CI/CD", "OCC", "Solr", "Spartacus", "SAP Hybris 2011", "Java 11",
  "Migration", "Hybris", "Compass AI", "Secure RAG", "LLM Gateway",
  // Names on the architecture pictures that are the same in every language.
  "SAP Hybris", "OCC API", "Spring Modulith", "Next.js", "Workflows", "PIM · Workflows", "Agent", "System",
  "Retrieval", "Clients", "Gateway · Routing · Limits",
  // Loanwords and terms that are the same in German as in English.
  "Workflow", "Problem", "(optional)", "Support", "Compliance",
]);
/** Keys that hold identifiers, links or numbers rather than words. */
const NOT_TEXT_KEYS = new Set([
  "id", "slug", "number", "type", "icon", "visual", "value", "href", "path", "demoUrl", "repoUrl", "screenshot",
  "tag", "stack", "relevant", "technologies", "showLabs", "name", "kind", "status", "featured",
]);

function untranslated(english: unknown, translated: unknown, trail: string[] = []): string[] {
  if (typeof english === "string") {
    if (translated !== english) return [];
    const key = trail[trail.length - 1];
    // A technology list ("stack") is a list of names, not words to translate.
    if (NOT_TEXT_KEYS.has(key) || trail.includes("stack") || /TODO\(owner\)/.test(english) || !/\p{L}/u.test(english)) return [];
    if (SAME_EVERYWHERE.has(english) || /^(https?:|\/|[\w.-]+@[\w.-]+)/.test(english)) return [];
    return [`${trail.join(".")}: "${english}"`];
  }
  if (Array.isArray(english)) {
    return english.flatMap((item, i) => untranslated(item, (translated as unknown[])[i], [...trail, String(i)]));
  }
  if (english && typeof english === "object") {
    return Object.entries(english).flatMap(([key, value]) =>
      untranslated(value, (translated as Record<string, unknown>)[key], [...trail, key]),
    );
  }
  return [];
}

describe.each(locales.filter((code): code is Exclude<Locale, "en"> => code !== "en"))("translation %s", (locale) => {
  it("leaves no English text behind", () => {
    expect(untranslated(contentFor("en"), contentFor(locale))).toEqual([]);
  });

  it("keeps every link, id and number of the English source", () => {
    const en = contentFor("en");
    const other = contentFor(locale);
    expect(other.services.map((s) => s.id)).toEqual(en.services.map((s) => s.id));
    expect(other.caseStudies.map((c) => c.slug)).toEqual(en.caseStudies.map((c) => c.slug));
    expect(other.projects.map((p) => [p.slug, p.kind, p.status, p.href, p.visual, p.isExternal, p.featured])).toEqual(
      en.projects.map((p) => [p.slug, p.kind, p.status, p.href, p.visual, p.isExternal, p.featured]),
    );
    expect(other.navigation.map((n) => n.href)).toEqual(en.navigation.map((n) => n.href));
    expect(other.requestTypes.map((r) => r.value)).toEqual(en.requestTypes.map((r) => r.value));
    expect(other.sapCommerce.path).toBe(en.sapCommerce.path);
  });

  it("keeps the placeholders that are still open hidden", () => {
    const text = JSON.stringify(contentFor(locale));
    // Open TODOs stay in English and are hidden by filled(); a translator must never invent the answer.
    expect(text.includes("TODO(owner)")).toBe(JSON.stringify(contentFor("en")).includes("TODO(owner)"));
  });
});
