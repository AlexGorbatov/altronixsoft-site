import type { RequestType } from "@/data/site";

export interface EngagementModel {
  id: string;
  title: string;
  /** The visitor's situation as a question: the line that tells them whether this format is theirs. */
  description: string;
  /** What they get, in one line. */
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
    description: "Need an expert opinion on your system?",
    outcome: "Written findings and a recommended scope.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration, e.g. N working days",
    deliverable: "TODO(owner): deliverable, e.g. written report and walkthrough call",
    cta: { label: "Request a technical review", type: "technical-review" },
  },
  {
    id: "proof",
    title: "Proof of value",
    description: "Want to test an AI idea on real data?",
    outcome: "A working prototype and a clear go or no-go decision.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration",
    deliverable: "TODO(owner): deliverable, e.g. working prototype and findings",
    cta: { label: "Request a proof of value", type: "proof-of-value" },
  },
  {
    id: "fixed",
    title: "Fixed-scope project",
    description: "Know what you need built?",
    outcome: "Agreed scope and timeline, released to production.",
    priceFrom: "TODO(owner): price, e.g. from €X",
    duration: "TODO(owner): duration",
    deliverable: "TODO(owner): deliverable",
    cta: { label: "Discuss a fixed-scope project", type: "project" },
  },
  {
    id: "team",
    title: "Dedicated team",
    description: "Need engineers inside your team?",
    outcome: "Senior engineers, long-term or for a set period.",
    priceFrom: "TODO(owner): rate, e.g. from €X per month",
    duration: "TODO(owner): minimum term",
    deliverable: "TODO(owner): deliverable",
    cta: { label: "Discuss a dedicated team", type: "team" },
  },
];

/** The entry package of the engagement path. */
export const entryPackage = engagementModels.find((model) => model.entryPackage) ?? engagementModels[0];
