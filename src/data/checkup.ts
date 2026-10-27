import type { RequestType } from "@/data/site";

/** The first step before any paid work: a conversation, no obligation. Shown under the engagement formats. */
export const checkup = {
  title: "Architecture check-up",
  meta: "No obligation",
  text: "A call to look at your system. No preparation needed.",
  cta: { label: "Request a check-up", type: "architecture-checkup" as RequestType },
};
