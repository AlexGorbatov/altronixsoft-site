import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors } from "./contact-schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  type: "project",
  message: "We need to modernize a Java platform.",
  consent: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims the name and defaults the optional company", () => {
    const parsed = contactSchema.parse({ ...valid, name: "  Ada  ", company: undefined });
    expect(parsed.name).toBe("Ada");
    expect(parsed.company).toBe("");
  });

  it("accepts every request type offered in the form", () => {
    for (const type of ["architecture-checkup", "technical-review", "proof-of-value", "project", "team", "other"]) {
      expect(contactSchema.safeParse({ ...valid, type }).success).toBe(true);
    }
  });

  it("rejects bad input with one message per field", () => {
    const result = contactSchema.safeParse({ name: "A", email: "nope", type: "zzz", message: "short", consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(fieldErrors(result.error)).sort()).toEqual(["consent", "email", "message", "name", "type"]);
    }
  });

  it("accepts the optional budget and timeline and rejects unknown values", () => {
    const parsed = contactSchema.parse(valid);
    expect(parsed.budget).toBe("");
    expect(parsed.timeline).toBe("");
    expect(contactSchema.safeParse({ ...valid, budget: "30k-60k", timeline: "within-month" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, budget: "1m" }).success).toBe(false);
  });

  it("requires consent", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("rejects an over-long message and a filled honeypot", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false);
  });
});
