/** Languages of the site. English is the source language and the fallback for anything not translated. */
export const locales = ["en", "de", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string | null | undefined): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Names shown in the language switcher (always in the language itself) and the codes used in markup. */
export const localeMeta: Record<Locale, { name: string; short: string; og: string }> = {
  en: { name: "English", short: "EN", og: "en_GB" },
  de: { name: "Deutsch", short: "DE", og: "de_DE" },
  uk: { name: "Українська", short: "UA", og: "uk_UA" },
};

/**
 * Prefix a locale-free path with the locale: "/" -> "/de", "/#work" -> "/de#work", "/?type=x#contact" ->
 * "/de?type=x#contact", "/services/ai" -> "/de/services/ai". Absolute and hash-only links are returned as they are.
 */
export function localizedPath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Split "/de/services/ai" into the locale and the locale-free path ("/services/ai"). */
export function splitLocale(pathname: string): { locale: Locale | undefined; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  if (!hasLocale(first)) return { locale: undefined, path: pathname || "/" };
  return { locale: first, path: rest.length > 0 ? `/${rest.join("/")}` : "/" };
}

/**
 * Pick the best supported locale from an Accept-Language header ("de-AT,de;q=0.9,en;q=0.8").
 * Matches on the primary subtag; Russian and Belarusian speakers are not guessed at, they get English.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { primary: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 0 : q };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { primary } of ranked) if (hasLocale(primary)) return primary;
  return defaultLocale;
}
