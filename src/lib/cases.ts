import type { CaseStudy, Project } from "@/data/projects";
import { filled } from "@/lib/todo";

export const hasResult = (study: CaseStudy) => filled(study.result);

/**
 * A case is ready for search engines once its story is written (challenge and what we did). A measurable result makes
 * it stronger but is not required: a case without one is still indexed, and `warnIfIncomplete` reminds the owner.
 */
export const isIndexable = (study: CaseStudy) => filled(study.challenge) && filled(study.whatWeDid);

/** Development-only reminder: a case without a measurable result still renders, but the owner should fill it in. */
export function warnIfIncomplete(studies: readonly CaseStudy[]): void {
  if (process.env.NODE_ENV !== "development") return;
  for (const study of studies) {
    if (!hasResult(study)) {
      console.warn(`[content] Case study "${study.title}" has no result yet. Fill it in src/data/projects.ts.`);
    }
  }
}

/** Development-only reminder: these portfolio texts are drafts the owner has not confirmed. They are shown meanwhile. */
export function warnIfDraft(projects: readonly Project[]): void {
  if (process.env.NODE_ENV !== "development") return;
  const drafts = projects.filter((project) => project.draft).map((project) => project.title);
  if (drafts.length > 0) console.warn(`[content] Draft text, not confirmed by the owner: ${drafts.join(", ")}. See src/data/projects.ts.`);
}
