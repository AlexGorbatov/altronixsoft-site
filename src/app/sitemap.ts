import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { locales, localizedPath } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { isIndexable } from "@/lib/cases";

type Entry = { path: string; changeFrequency: "monthly" | "yearly"; priority: number };

/** Every page in every language, each entry pointing at its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { services, caseStudies } = contentFor("en");
  const pages: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({ path: `/services/${service.id}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { path: "/services/sap-commerce", changeFrequency: "monthly", priority: 0.9 },
    { path: "/work", changeFrequency: "monthly", priority: 0.8 },
    // A case whose story is not written yet is noindex, so it stays out of the sitemap too.
    ...caseStudies
      .filter(isIndexable)
      .map((study) => ({ path: `/work/${study.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const url = (locale: (typeof locales)[number], path: string) => `${siteConfig.url}${localizedPath(locale, path)}`;
  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = {
      ...Object.fromEntries(locales.map((code) => [code, url(code, path)])),
      "x-default": url("en", path),
    };
    return locales.map((locale) => ({
      url: url(locale, path),
      lastModified: siteConfig.contentUpdated,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
