import { hasLocale, locales } from "@/i18n/config";
import { buildLlmsTxt, llmsHeaders } from "@/i18n/llms";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** /uk/llms.txt (and /en/llms.txt): the company summary in that language. */
export async function GET(_request: Request, { params }: RouteContext<"/[lang]/llms.txt">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  return new Response(buildLlmsTxt(lang), { headers: llmsHeaders });
}
