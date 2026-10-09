import type { RequestType } from "@/data/site";

export interface HeroFact {
  text: string;
  /** Plain text when absent; otherwise the fact is a link to the contact form with this request type. */
  type?: RequestType;
}

export const hero = {
  eyebrow: "Integrations · Modernization · Practical AI",
  /** Two parts of one sentence; the first one carries the brand gradient. */
  title: ["Senior engineering", "for commerce and operations systems."] as const,
  lead: "We connect, modernize and extend the platforms behind commerce, product data and logistics — and add AI where it's safe, auditable and worth it.",
  primaryCta: { label: "Book a platform review →", type: "technical-review" as RequestType },
  facts: [{ text: "Architecture to production" }, { text: "Free 30-minute architecture check-up", type: "architecture-checkup" }] satisfies HeroFact[],
};
