import { describe, expect, it } from "vitest";
import { locales, localizedPath, negotiateLocale, splitLocale, type Locale } from "./config";
import { contentFor } from "./content";
import { overlay } from "./merge";

describe("localizedPath", () => {
  it("prefixes paths with the language", () => {
    expect(localizedPath("uk", "/")).toBe("/uk");
    expect(localizedPath("uk", "/#work")).toBe("/uk#work");
    expect(localizedPath("uk", "/?type=project#contact")).toBe("/uk?type=project#contact");
    expect(localizedPath("en", "/services/ai")).toBe("/en/services/ai");
  });
  it("leaves absolute and hash-only links alone", () => {
    expect(localizedPath("uk", "#work")).toBe("#work");
    expect(localizedPath("uk", "https://example.com/x")).toBe("https://example.com/x");
  });
});

describe("splitLocale", () => {
  it("separates the language from the path", () => {
    expect(splitLocale("/uk")).toEqual({ locale: "uk", path: "/" });
    expect(splitLocale("/uk/services/ai")).toEqual({ locale: "uk", path: "/services/ai" });
    expect(splitLocale("/services/ai")).toEqual({ locale: undefined, path: "/services/ai" });
  });
});

describe("negotiateLocale", () => {
  it("picks the best supported language from Accept-Language", () => {
    expect(negotiateLocale("uk-UA,uk;q=0.9,en;q=0.8")).toBe("uk");
    expect(negotiateLocale("uk-UA,uk;q=0.9")).toBe("uk");
    expect(negotiateLocale("fr-FR,fr;q=0.9,uk;q=0.5")).toBe("uk");
  });
  it("falls back to English", () => {
    expect(negotiateLocale("")).toBe("en");
    expect(negotiateLocale(null)).toBe("en");
    expect(negotiateLocale("ru-RU,ru;q=0.9")).toBe("en");
    expect(negotiateLocale("uk;q=0")).toBe("en");
    // German is switched off: German speakers get English.
    expect(negotiateLocale("de-DE,de;q=0.9")).toBe("en");
    expect(splitLocale("/de/work")).toEqual({ locale: undefined, path: "/de/work" });
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
  "Java", "Spring", "Azure", "AWS", "PostgreSQL", "Docker", "Kubernetes", "Enterprise APIs", "SAP Commerce", "SAP Commerce Cloud",
  "SAP Commerce Cloud (Hybris)", "Altronix Labs", "RAG", "PIM", "API", "APIs", "Repository", "Stack", "Team",
  "ERP · PIM", "Cloud", "Proof of Value", "Proof of value", "Data Hub", "CI/CD", "OCC", "Solr", "Spartacus", "SAP Hybris 2011", "SAP Commerce (Hybris) 2011", "Java 11",
  "Migration", "Hybris", "Nexus", "Lobby9", "Stripe", "Kafka", "PostgreSQL", "OpenAPI", "CRM", "Amazon S3", "MySQL",
  // Names on the architecture pictures that are the same in every language.
  "SAP Hybris", "OCC API", "Spring Modulith", "Next.js", "Workflows", "PIM · Workflows", "Agent", "System",
  "Retrieval", "Cardano", "Midnight", "Bitcoin", "Yaci · Koios · Blockfrost", "Clients", "Upstreams", "Chains", "Wallets & dApps", "HR · all-staff", "Keycloak", "login · PKCE · JWT", "OAuth2 resource server", "JWT", "PostgreSQL + pgvector", "Cache", "Checkout", "Storefront", "REST · WebSocket · MCP", "OpenAPI 3.1", "Clients", "Gateway · Routing · Limits", "Blockchain & Web3",
  // Loanwords and terms that are the same in German as in English.
  "Workflow", "Website", "Problem", "(optional)", "Support", "Compliance",
]);
/** Keys that hold identifiers, links or numbers rather than words. */
const NOT_TEXT_KEYS = new Set([
  "id", "slug", "number", "type", "icon", "visual", "value", "href", "path", "demoUrl", "repoUrl", "repoLicense", "liveUrl", "screenshot",
  "tag", "stack", "relevant", "technologies", "showLabs", "name", "kind", "status", "featured", "relatedService",
]);

function untranslated(english: unknown, translated: unknown, trail: string[] = []): string[] {
  if (typeof english === "string") {
    if (translated !== english) return [];
    const key = trail[trail.length - 1];
    // A technology list ("stack") is a list of names, not words to translate.
    if (NOT_TEXT_KEYS.has(key) || (trail.includes("stack") || trail.includes("caseSlugs")) || /TODO\(owner\)/.test(english) || !/\p{L}/u.test(english)) return [];
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
    expect(other.services.map((s) => s.caseSlugs)).toEqual(en.services.map((s) => s.caseSlugs));
    expect(other.caseStudies.map((c) => c.slug)).toEqual(en.caseStudies.map((c) => c.slug));
    expect(other.projects.map((p) => [p.slug, p.kind, p.status, p.href, p.visual, p.isExternal, p.featured])).toEqual(
      en.projects.map((p) => [p.slug, p.kind, p.status, p.href, p.visual, p.isExternal, p.featured]),
    );
    expect(other.navigation.map((n) => n.href)).toEqual(en.navigation.map((n) => n.href));
    expect(other.requestTypes.map((r) => r.value)).toEqual(en.requestTypes.map((r) => r.value));
    expect(other.sapCommerce.path).toBe(en.sapCommerce.path);
    expect(other.sapCommerce.caseSlugs).toEqual(en.sapCommerce.caseSlugs);
  });

  it("gives every portfolio tile the title of its own case study", () => {
    // The overlay merges tiles by position, so a translation listed in another order puts names on the wrong tiles.
    const other = contentFor(locale);
    for (const project of other.projects) {
      const study = other.caseStudies.find((c) => c.slug === project.slug);
      if (study) expect(project.title).toBe(study.title);
    }
  });

  it("keeps the placeholders that are still open hidden", () => {
    const text = JSON.stringify(contentFor(locale));
    // Open TODOs stay in English and are hidden by filled(); a translator must never invent the answer.
    expect(text.includes("TODO(owner)")).toBe(JSON.stringify(contentFor("en")).includes("TODO(owner)"));
  });
});
