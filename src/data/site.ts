export const siteConfig = {
  name: "Altronix Software",
  legalName: "Altronixsoft OÜ",
  tagline: "Practical AI. Serious engineering.",
  title: "Altronix Software — Practical AI & Software Engineering",
  description:
    "Altronix Software builds practical AI solutions, reliable custom software and modern integrations for real business systems.",
  // Canonical placeholder — replace once the production domain is confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://altronixsoft.com",
  email: "info@altronixsoft.com",
  founder: {
    name: "Oleksandr Gorbatov",
    role: "Founder, Altronix Software",
    // Drop the photo into /public and set the path, e.g. "/team/oleksandr.jpg".
    // While undefined, a neutral monogram placeholder is shown.
    photo: undefined as string | undefined,
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
