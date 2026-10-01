import { siteConfig } from "@/data/site";

/** Schema.org builders shared by every page, so the structured data stays consistent. */
export function serviceSchema(input: { path: string; name: string; description: string; serviceType: string }) {
  const url = `${siteConfig.url}${input.path}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Europe",
  };
}

/** Breadcrumb trail starting at the home page; `trail` lists the pages after it. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: siteConfig.name, url: siteConfig.url }, ...trail.map((t) => ({ name: t.name, url: `${siteConfig.url}${t.path}` }))];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}
