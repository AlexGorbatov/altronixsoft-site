export const siteConfig = {
  name: "Altronixsoft",
  legalName: "Altronixsoft OÜ",
  tagline: "Serious engineering. Practical AI.",
  title: "Enterprise Integrations, Modernization & Practical AI | Altronixsoft",
  description:
    "Senior engineering for commerce, product data and logistics systems — integrations, modernization and practical AI. For teams in Europe and the US.",
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
    registryCode: "TODO(owner): Estonian registry code",
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

/** The single label for the primary action, used by every primary CTA. */
export const CTA_LABEL = "Discuss a project →";

/** Label for the scheduling button; only shown when `siteConfig.bookingUrl` is set. */
export const BOOKING_LABEL = "Book a 30-minute call";
