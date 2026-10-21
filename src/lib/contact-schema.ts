import { z } from "zod";
import { requestTypes } from "@/data/contact";

const typeValues = requestTypes.map((type) => type.value) as [string, ...string[]];

/** Shared by the form (client-side hints) and the route handler (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name_required").max(120, "name_too_long"),
  email: z.string().trim().max(200, "email_too_long").pipe(z.email("email_invalid")),
  company: z.string().trim().max(160, "company_too_long").optional().default(""),
  type: z.enum(typeValues, "type_invalid"),
  message: z
    .string()
    .trim()
    .min(10, "message_too_short")
    .max(4000, "message_too_long"),
  // The field keeps the name `consent` (the API shape), but the checkbox is an acknowledgement of the policy.
  consent: z.literal(true, "consent_required"),
  /** Honeypot. Real visitors never see or fill it; bots usually do. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = "name" | "email" | "company" | "type" | "message" | "consent";

/** Flatten zod issues into one message per field. */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const result: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !(key in result)) result[key] = issue.message;
  }
  return result;
}
