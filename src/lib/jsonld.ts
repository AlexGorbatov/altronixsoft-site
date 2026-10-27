import { siteConfig } from "@/data/site";
import { localizedPath, type Locale } from "@/i18n/config";

/** Schema.org builders shared by every page, so the structured data stays consistent. */
export function serviceSchema(input: { lang: Locale; path: string; name: string; description: string; serviceType: string }) {
  const url = `${siteConfig.url}${localizedPath(input.lang, input.path)}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url,
    inLanguage: input.lang,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Europe",
  };
}

/** Breadcrumb trail starting at the home page; `trail` lists the pages after it. */
export function breadcrumbSchema(lang: Locale, trail: { name: string; path: string }[]) {
  const items = [
    { name: siteConfig.name, url: `${siteConfig.url}${localizedPath(lang, "/")}` },
    ...trail.map((t) => ({ name: t.name, url: `${siteConfig.url}${localizedPath(lang, t.path)}` })),
  ];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

/** The list page of the portfolio: a collection whose items are the case study pages. */
export function collectionSchema(input: {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  items: { name: string; path: string }[];
}) {
  const url = `${siteConfig.url}${localizedPath(input.lang, input.path)}`;
  return {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: input.lang,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${siteConfig.url}${localizedPath(input.lang, item.path)}`,
      })),
    },
  };
}

/** A case study: a piece of work the company did, published on its own page. */
export function caseStudySchema(input: {
  lang: Locale;
  path: string;
  name: string;
  description: string;
  about: string;
  keywords: string[];
}) {
  const url = `${siteConfig.url}${localizedPath(input.lang, input.path)}`;
  return {
    "@type": "CreativeWork",
    "@id": `${url}#case`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: input.lang,
    about: input.about,
    keywords: input.keywords.join(", "),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}
