import { siteConfig, contactHref } from "@/data/site";
import { filled } from "@/lib/todo";
import { localizedPath, type Locale } from "./config";
import { contentFor } from "./content";

/**
 * The plain-text company summary served at /llms.txt (English) and /uk/llms.txt. Built from the
 * same content as the pages, so the facts live in one place. Facts only: nothing here is stated that the site
 * does not already say. Add the legal name, prices or hours only after they are confirmed.
 */
export function buildLlmsTxt(locale: Locale): string {
  const { copy, hero, services, sapCommerce, industries, checkup, engagementModels } = contentFor(locale);
  const { llms } = copy;
  const { url, name, email, legal } = siteConfig;
  const country = copy.ui.country;
  const at = (path: string) => `${url}${localizedPath(locale, path)}`;
  const lines: string[] = [];

  lines.push(`# ${name}`, "", `> ${hero.lead}`, "");

  lines.push(`## ${llms.whatWeDo}`);
  for (const service of services) lines.push(`- ${service.title}: ${service.description}`);
  lines.push(`- ${sapCommerce.h1}: ${sapCommerce.specialization.text}`, "");

  lines.push(`## ${llms.industries}`);
  for (const industry of industries) lines.push(`- ${industry.title}: ${industry.line}`);
  lines.push("");

  lines.push(`## ${llms.start}`);
  lines.push(`- ${checkup.title} (${checkup.meta}): ${checkup.text}`);
  for (const model of engagementModels) lines.push(`- ${model.title}: ${model.description}`);
  lines.push("");

  lines.push(`## ${llms.company}`);
  lines.push(
    filled(legal.address)
      ? `${llms.registeredAddress}: ${legal.address}, ${country}.`
      : `${llms.basedIn} ${country}.`,
  );
  lines.push(llms.clientsConfidential, "");

  lines.push(`## ${llms.contact}`);
  lines.push(`${llms.email}: ${email}`);
  lines.push(`${llms.contactForm}: ${at(contactHref())}`, "");

  lines.push(`## ${llms.keyPages}`);
  for (const service of services) lines.push(`- ${service.title}: ${at(`/services/${service.id}`)}`);
  lines.push(`- ${sapCommerce.h1}: ${at(sapCommerce.path)}`);
  lines.push(`- ${llms.projects}: ${at("/work")}`);
  lines.push(`- ${llms.privacy}: ${at("/privacy")}`, "");

  return lines.join("\n");
}

export const llmsHeaders = { "Content-Type": "text/plain; charset=utf-8" };
