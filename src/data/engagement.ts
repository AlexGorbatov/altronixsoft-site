import { checkup } from "@/data/checkup";
import type { RequestType } from "@/data/site";

export interface EngagementModel {
  id: string;
  title: string;
  /** Mono line under the title: scope, price, duration. */
  meta: string;
  description: string;
  /** The first step of the path: shown with the accent border. */
  accent?: boolean;
  cta: { label: string; type: RequestType };
}

/** "How to start": a paid, fixed-scope review and the free check-up that comes before it. */
export const engagementModels: EngagementModel[] = [
  {
    id: "review",
    title: "Platform review",
    // TODO(owner): price
    meta: "Fixed scope · from €[price]",
    description:
      "A fixed-scope review of your architecture, codebase and integrations. You get a written risk register, an improvement or upgrade plan and an effort estimate.",
    accent: true,
    cta: { label: "Request a review →", type: "technical-review" },
  },
  { id: "checkup", title: checkup.title, meta: checkup.meta, description: checkup.text, cta: checkup.cta },
];

/** What follows the review. Shown as a line under the cards. */
export const afterReview = {
  text: "After the review: a fixed-scope project or ongoing support, agreed on the findings.",
  cta: { label: "Discuss a project →", type: "project" as RequestType },
};
