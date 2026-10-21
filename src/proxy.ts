import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, negotiateLocale } from "@/i18n/config";

/**
 * Every page lives under /en, /de or /uk. A request without a language prefix ("/", "/services/ai") is sent to
 * the visitor's language, chosen from the Accept-Language header, falling back to English. No cookie is set:
 * the language a visitor picks is carried by the address itself, so the site stays free of cookies.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return NextResponse.next();

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
