import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

// A page-level `openGraph` / `twitter` replaces the layout's, so the share images (the 1200×630 files
// in src/app: opengraph-image.png, twitter-image.png) are listed here explicitly.
const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: siteConfig.name };
const TWITTER_IMAGE = "/twitter-image.png";

interface PageMetadataInput {
  /** Page title without the site name; the layout's title template appends " | Altronix Software". */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/work/some-case". Used for the canonical URL and og:url. */
  path: string;
  /** Keep the page out of search results (e.g. a case study that is not finished yet). */
  noindex?: boolean;
}

/** One place that keeps title, description, canonical, Open Graph and Twitter consistent for every page. */
export function pageMetadata({ title, description, path, noindex }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      locale: "en_GB",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [TWITTER_IMAGE] },
  };
}
