import { checkup } from "@/data/checkup";
import { engagementModels } from "@/data/engagement";
import { hero } from "@/data/hero";
import { industries } from "@/data/industries";
import { sapCommerce } from "@/data/sap-commerce";
import { services } from "@/data/services";
import { contactHref, siteConfig } from "@/data/site";
import { filled } from "@/lib/todo";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of the company for language models and other machine readers.
 * Built from the same data the pages render, so the facts live in one place. Facts only: nothing here
 * is stated that the site does not already say. Add the legal entity name, founding year, prices or
 * hours only after they are confirmed (see the TODO(owner) markers in src/data).
 */
export function GET() {
  const { url, name, email, legal } = siteConfig;
  const lines: string[] = [];

  lines.push(`# ${name}`, "", `> ${hero.lead}`, "");

  lines.push("## What we do");
  for (const service of services) lines.push(`- ${service.title}: ${service.description}`);
  lines.push(`- ${sapCommerce.h1}: ${sapCommerce.specialization.text}`, "");

  lines.push("## Industries");
  for (const industry of industries) lines.push(`- ${industry.title}: ${industry.line}`);
  lines.push("");

  lines.push("## How engagements start");
  lines.push(`- ${checkup.title} (${checkup.meta}): ${checkup.text}`);
  for (const model of engagementModels) lines.push(`- ${model.title}: ${model.description}`);
  lines.push("");

  lines.push("## Company");
  lines.push(
    filled(legal.address) ? `Registered address: ${legal.address}, ${legal.country}.` : `Based in ${legal.country}.`,
  );
  lines.push("Client names are confidential.", "");

  lines.push("## Contact");
  lines.push(`Email: ${email}`);
  lines.push(`Contact form: ${url}${contactHref()}`, "");

  lines.push("## Key pages");
  for (const service of services) lines.push(`- ${service.title}: ${url}/services/${service.id}`);
  lines.push(`- ${sapCommerce.h1}: ${url}${sapCommerce.path}`);
  lines.push(`- Privacy policy: ${url}/privacy`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
