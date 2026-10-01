import { z } from "zod";
import { requestTypes } from "@/data/contact";

const typeValues = requestTypes.map((type) => type.value) as [string, ...string[]];

/** Shared by the form (client-side hints) and the route handler (the real check). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "That name is too long."),
  email: z.string().trim().max(200, "That email is too long.").pipe(z.email("Please enter a valid email address.")),
  company: z.string().trim().max(160, "That company name is too long.").optional().default(""),
  type: z.enum(typeValues, "Please choose what you want to discuss."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(4000, "The message is too long (4000 characters maximum)."),
  consent: z.literal(true, "Please accept the Privacy Policy to send your message."),
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
