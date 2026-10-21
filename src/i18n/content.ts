import { checkup } from "@/data/checkup";
import { about } from "@/data/company";
import { requestTypes } from "@/data/contact";
import { copy } from "@/data/copy";
import { engagementModels } from "@/data/engagement";
import { flowNodes } from "@/data/flow";
import { hero } from "@/data/hero";
import { industries } from "@/data/industries";
import { navigation } from "@/data/navigation";
import { processPhases } from "@/data/process";
import { privacy } from "@/data/privacy";
import { caseStudies, labs } from "@/data/projects";
import { sapCommerce } from "@/data/sap-commerce";
import { aiUseCases, services, technologies } from "@/data/services";
import { siteConfig } from "@/data/site";
import { trust } from "@/data/trust";
import type { Locale } from "./config";
import { de } from "./de";
import { overlay, type Overlay } from "./merge";
import { uk } from "./uk";

/** Everything on the site that is text. English is the source; `de` and `uk` are translations laid over it. */
const en = {
  copy,
  hero,
  navigation,
  services,
  aiUseCases,
  technologies,
  industries,
  engagementModels,
  checkup,
  about,
  processPhases,
  caseStudies,
  labs,
  sapCommerce,
  trust,
  privacy,
  requestTypes,
  flowNodes,
  site: { title: siteConfig.title, description: siteConfig.description, tagline: siteConfig.tagline },
};

export type Content = typeof en;
export type Translation = Overlay<Content>;
/** The translation of one part of the content, e.g. `Part<"copy">`. */
export type Part<K extends keyof Content> = Overlay<Content[K]>;

const translations: Record<Exclude<Locale, "en">, Translation> = { de, uk };
const cache = new Map<Locale, Content>();

/** The site's text in one language. Anything a translation leaves out stays English. */
export function contentFor(locale: Locale): Content {
  const cached = cache.get(locale);
  if (cached) return cached;
  const content = locale === "en" ? en : overlay(en, translations[locale]);
  cache.set(locale, content);
  return content;
}
