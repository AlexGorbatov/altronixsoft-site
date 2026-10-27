import type { RequestType } from "@/data/site";

/** The first step before any paid work: a short free call about the goal and fit. No code or system review happens here; that is the paid technical review. */
export const checkup = {
  title: "Scoping call",
  meta: "Free, 30 minutes",
  text: "We discuss your goals, constraints and whether we are a good fit. No code or system review at this stage.",
  cta: { label: "Book a scoping call", type: "architecture-checkup" as RequestType },
};
