import { buildLlmsTxt, llmsHeaders } from "@/i18n/llms";

export const dynamic = "force-static";

/** /llms.txt: the English summary. /de/llms.txt and /uk/llms.txt carry the other languages. */
export function GET() {
  return new Response(buildLlmsTxt("en"), { headers: llmsHeaders });
}
