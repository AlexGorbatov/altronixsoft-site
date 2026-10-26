import type { RequestType } from "@/data/site";

export interface EngagementModel {
  id: string;
  title: string;
  description: string;
  outcome: string;
  /** Package facts. `TODO(owner)` values are hidden until the owner fills them in (see `filled()`). */
  priceFrom: string;
  duration: string;
  deliverable: string;
  /** Extra "what is included" bullets, rendered only for packages that define them. */
  includes?: string[];
  /** Kept only for the unused data/faq.ts; remove together with it. */
  entryPackage?: boolean;
  cta: { label: string; type: RequestType };
}

export const engagementModels: EngagementModel[] = [
  {
    id: "review",
    title: "Technical review",
    description: "A paid review of one workflow, its code and integrations. Scope, fee and timeline are agreed after an initial conversation.",
    outcome: "Clear findings, a written report and a walkthrough call.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration, e.g. N working days",
    deliverable: "TODO(owner): deliverable, e.g. written report and walkthrough call",
    includes: ["Current systems and integration boundaries", "Access requirements and delivery risks", "Recommended scope and acceptance checks"],
    cta: { label: "Request a review", type: "technical-review" },
  },
  {
    id: "proof",
    title: "Proof of value",
    description: "One bounded workflow tested on representative data, with agreed acceptance checks, fee and timeline.",
    outcome: "A working prototype and a go / no-go recommendation.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration",
    deliverable: "TODO(owner): deliverable, e.g. working prototype and findings",
    cta: { label: "Scope a proof of value", type: "proof-of-value" },
  },
  {
    id: "fixed",
    title: "Fixed-scope project",
    description: "Agreed scope, timeline and result. Code and documentation are handed over at the end.",
    outcome: "A release running in production.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration",
    deliverable: "TODO(owner): deliverable",
    cta: { label: "Scope a project", type: "project" },
  },
  {
    id: "team",
    title: "Dedicated team",
    description: "Senior engineers embedded in your product team, long-term or for a defined period.",
    outcome: "Engineers working inside your team.",
    priceFrom: "TODO(owner): rate, e.g. from €X per month",
    duration: "TODO(owner): minimum term",
    deliverable: "TODO(owner): deliverable",
    cta: { label: "Discuss a dedicated team", type: "team" },
  },
];

/** The entry package of the engagement path. */
export const entryPackage = engagementModels.find((model) => model.entryPackage) ?? engagementModels[0];
