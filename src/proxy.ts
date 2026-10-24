import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, negotiateLocale } from "@/i18n/config";

/** Languages the site no longer offers: their addresses go to the same page in English. */
const RETIRED = new Set(["de"]);

/**
 * Every page lives under /en or /uk. A request without a language prefix ("/", "/services/ai") is sent to the
 * visitor's language, chosen from the Accept-Language header, falling back to English. No cookie is set:
 * the language a visitor picks is carried by the address itself, so the site stays free of cookies.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return NextResponse.next();
  if (RETIRED.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname.slice(first.length + 1)}`;
    return NextResponse.redirect(url, 308);
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Skip the API, Next internals and anything with a file extension (robots.txt, sitemap.xml, images, llms.txt).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
