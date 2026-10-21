import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { contentFor, type Content } from "./content";

/**
 * The current language and its text, for any Server Component. The language is the `[lang]` segment of the
 * URL, read without passing it down as a prop. Not available in Client Components or Route Handlers.
 */
export async function getContent(): Promise<Content & { lang: Locale }> {
  const current = await lang();
  if (!hasLocale(current)) notFound();
  return { lang: current, ...contentFor(current) };
}
