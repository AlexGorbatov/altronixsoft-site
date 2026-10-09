import type { RequestType } from "@/data/site";

/** The free first step before any paid work. Shown next to the platform review under "How to start". */
export const checkup = {
  title: "Architecture check-up",
  meta: "30 minutes · free",
  text: "A call to look at your system and decide whether a platform review makes sense.",
  cta: { label: "Book a check-up", type: "architecture-checkup" as RequestType },
};

/** Named contact for new projects, shown next to the contact form. Hidden until filled (see `filled()`). */
export const contactPerson = {
  name: "TODO(owner): contact person name",
  role: "TODO(owner): role, e.g. Solution architect",
  linkedinUrl: "TODO(owner): contact person LinkedIn URL",
};
