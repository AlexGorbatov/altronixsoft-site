import { buildLlmsTxt, llmsHeaders } from "@/i18n/llms";

export const dynamic = "force-static";

/** /llms.txt: the English summary. /uk/llms.txt carries the Ukrainian one. */
export function GET() {
  return new Response(buildLlmsTxt("en"), { headers: llmsHeaders });
}
