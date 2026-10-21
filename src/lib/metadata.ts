import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { localeMeta, locales, localizedPath, type Locale } from "@/i18n/config";

// A page-level `openGraph` / `twitter` replaces the layout's, so the 1200×630 share images (in /public:
// opengraph-image.png, twitter-image.png) are listed here explicitly.
const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: siteConfig.name };
const TWITTER_IMAGE = "/twitter-image.png";

interface PageMetadataInput {
  lang: Locale;
  /** Page title without the site name; the layout's title template appends " | Altronix Software". */
  title: string;
  description: string;
  /** Language-free path, e.g. "/work/some-case" or "/" for the home page. */
  path: string;
  /** Keep the page out of search results (e.g. a case study that is not finished yet). */
  noindex?: boolean;
  /** Use the title as it is, without the site name appended (the home page). */
  absoluteTitle?: boolean;
}

/** The same page in every language, for `<link rel="alternate" hreflang>`; English doubles as x-default. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((code) => [code, localizedPath(code, path)])),
    "x-default": localizedPath("en", path),
  };
}

/** One place that keeps title, description, canonical, languages, Open Graph and Twitter consistent for every page. */
export function pageMetadata({ lang, title, description, path, noindex, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const url = localizedPath(lang, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      locale: localeMeta[lang].og,
      alternateLocale: locales.filter((code) => code !== lang).map((code) => localeMeta[code].og),
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [TWITTER_IMAGE] },
  };
}
