import { describe, expect, it } from "vitest";
import { contentFor } from "@/i18n/content";
import { LEAD_MAX, splitLead } from "./lead";

describe("splitLead", () => {
  it("splits the first sentence from the rest", () => {
    expect(splitLead("The model reads the email and extracts the fields. If something is missing, it asks.")).toEqual([
      "The model reads the email and extracts the fields.",
      "If something is missing, it asks.",
    ]);
  });

  it("keeps a single sentence whole", () => {
    const text = "Operators and approvers sign in through Keycloak with their own roles.";
    expect(splitLead(text)).toEqual([text, null]);
  });

  it("does not split a first sentence longer than the limit", () => {
    const long = `${"word ".repeat(LEAD_MAX / 5 + 5).trim()}. Second sentence here.`;
    expect(splitLead(long)).toEqual([long, null]);
  });

  it("does not split inside a version number", () => {
    const text = "Spring Boot 4.1 and Spring AI 2.0 run the service and the tests together.";
    expect(splitLead(text)).toEqual([text, null]);
  });

  it.each(["en", "uk"] as const)("sets a point and a detail apart in every block of the AI cases (%s)", (lang) => {
    const { caseStudies } = contentFor(lang);
    for (const slug of ["ai-business-workflow-agent", "ai-document-processing"]) {
      const items = caseStudies.find((study) => study.slug === slug)!.workItems!;
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) expect(splitLead(item.text)[1], `${lang} ${slug}: ${item.title}`).not.toBeNull();
    }
  });
});
