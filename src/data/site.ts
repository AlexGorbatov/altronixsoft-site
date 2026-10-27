export const siteConfig = {
  name: "AltronixSoft",
  /** Short form of the name, used by the company's profiles and its domain. */
  shortName: "AltronixSoft",
  /** The name exactly as in the Estonian commercial register (registry code 16645816). */
  legalName: "AltronixSoftware OÜ",
  tagline: "Complex problems. Clear solutions.",
  title: "AI integration, Java/Spring and SAP Commerce | AltronixSoft",
  description:
    "Independent software engineering studio for custom software, Java/Spring, integrations, modernization, SAP Commerce and AI. Senior engineering, managed delivery.",
  // Canonical placeholder — replace once the production domain is confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://altronixsoft.com",
  email: "info@altronixsoft.com",
  /** When the content of the site last changed in a way worth telling crawlers about (sitemap `lastmod`). Update it with real content changes only. */
  contentUpdated: "2026-10-27",
  // Scheduling link (Cal.com / Calendly) from the environment. While empty, every "Book a call" button is hidden.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || undefined,
  social: {
    linkedin: "https://www.linkedin.com/company/altronixsoft",
  },
  // Shown in the footer and on /privacy. Each part appears only once it is filled in.
  legal: {
    registryCode: "16645816",
    vatNumber: "TODO(owner): VAT number",
    // From the company page; confirm it is still the registered address.
    address: "Kaupmehe tn 7-120, 10114 Tallinn",
    country: "Estonia",
  },
} as const;

/** What the visitor wants to discuss. Drives the contact form's preselected request type. */
export type RequestType = "exploring" | "architecture-checkup" | "technical-review" | "proof-of-value" | "project" | "team" | "other";

/** Link to the contact form (home page `#contact`) with the request type preselected. */
export function contactHref(type?: RequestType): string {
  return type ? `/?type=${type}#contact` : "/#contact";
}

/** Build a mailto link with a prefilled subject. Kept as the secondary, plain-email option. */
export function mailto(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${query}`;
}

/** The general "Discuss a project" link. It names its topic, so it also resets a form that an earlier link had prefilled. */
export const CONTACT_HREF = contactHref("exploring");

// The labels of the primary action and of the scheduling button live in the dictionary (copy.ui.cta,
// copy.contactSection.booking). The scheduling button is only shown when `siteConfig.bookingUrl` is set.
