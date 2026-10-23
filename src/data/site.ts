export const siteConfig = {
  name: "Altronix Software",
  /** Short form of the name, used by the company's profiles and its domain. */
  shortName: "AltronixSoft",
  /** The name exactly as in the Estonian commercial register (registry code 16645816). */
  legalName: "AltronixSoftware OÜ",
  tagline: "Complex systems. Clear solutions.",
  title: "SAP Commerce, Java and AI engineering | Altronix Software",
  description:
    "Altronix Software builds and modernizes enterprise software: Java/Spring, SAP Commerce Cloud, integrations and AI. Clear ownership. Transparent delivery.",
  // Canonical placeholder — replace once the production domain is confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://altronixsoft.com",
  email: "info@altronixsoft.com",
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
export type RequestType = "architecture-checkup" | "technical-review" | "proof-of-value" | "project" | "team" | "other";

/** Link to the contact form (home page `#contact`) with the request type preselected. */
export function contactHref(type?: RequestType): string {
  return type ? `/?type=${type}#contact` : "/#contact";
}

/** Build a mailto link with a prefilled subject. Kept as the secondary, plain-email option. */
export function mailto(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${query}`;
}

export const CONTACT_HREF = contactHref("project");

// The labels of the primary action and of the scheduling button live in the dictionary (copy.ui.cta,
// copy.contactSection.booking). The scheduling button is only shown when `siteConfig.bookingUrl` is set.
