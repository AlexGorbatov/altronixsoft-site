import type { RequestType } from "@/data/site";

/**
 * The first step before any paid work: a short call about the goal and fit. No code or system review happens here; that is the paid technical review.
 * `meta` (e.g. length or price of the call) stays empty until the owner confirms it; an empty value is not rendered.
 */
export const checkup = {
  title: "Scoping call",
  meta: "",
  text: "We discuss your goals, constraints and whether we are a good fit. No code or system review at this stage.",
  cta: { label: "Book a scoping call", type: "architecture-checkup" as RequestType },
};
