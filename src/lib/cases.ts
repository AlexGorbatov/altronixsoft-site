import type { CaseStudy } from "@/data/projects";
import { filled } from "@/lib/todo";

export const hasResult = (study: CaseStudy) => filled(study.result);

/** Development-only reminder: a case without a measurable result still renders, but the owner should fill it in. */
export function warnIfIncomplete(studies: readonly CaseStudy[]): void {
  if (process.env.NODE_ENV !== "development") return;
  for (const study of studies) {
    if (!hasResult(study)) {
      console.warn(`[content] Case study "${study.title}" has no result yet. Fill it in src/data/projects.ts.`);
    }
  }
}
