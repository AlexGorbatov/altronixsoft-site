export const siteConfig = {
  name: "Altronix Software",
  legalName: "Altronixsoft OÜ",
  tagline: "Practical AI. Serious engineering.",
  title: "Altronix Software — Software Engineering & Practical AI",
  description:
    "Altronix Software designs and builds custom software, modern integrations and practical AI solutions for real business systems.",
  // Canonical placeholder — replace once the production domain is confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://altronixsoft.com",
  email: "info@altronixsoft.com",
  // Used only for structured data (JSON-LD); not shown on the page.
  founder: {
    name: "Oleksandr Gorbatov",
  },
} as const;

/** Build a mailto link with a prefilled subject. */
export function mailto(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${query}`;
}

export const CONTACT_HREF = mailto("Project discussion");

/** The single label for the primary action, used by every primary CTA. */
export const CTA_LABEL = "Discuss your project →";
