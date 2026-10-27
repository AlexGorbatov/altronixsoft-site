import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { contentFor } from "@/i18n/content";

/** The tab title of an unknown address: the page's own metadata is what the browser keeps after hydration. */
export async function generateMetadata({ params }: PageProps<"/[lang]/[...rest]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: contentFor(lang).copy.notFound.title };
}

/**
 * Any address under a language that no page claims ("/uk/nope"). Rendering the not-found page from here keeps the
 * 404 inside the language's layout, so it is translated and has the header and footer. Without it Next.js would
 * show its own English 404 for unknown paths.
 */
export default function UnknownPage() {
  notFound();
}
