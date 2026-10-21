import type { RequestType } from "@/data/site";

/** The free first step before any paid work. Shown under the engagement formats. */
export const checkup = {
  title: "Architecture check-up",
  meta: "30 minutes · free",
  text: "A call to look at your system and decide whether a technical review makes sense. No preparation needed.",
  cta: { label: "Request a check-up", type: "architecture-checkup" as RequestType },
};
