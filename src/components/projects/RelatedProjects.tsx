import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";

/** Relevant project evidence, with the relationship visible before the technical summary. */
export async function RelatedProjects({ slugs }: { slugs: readonly string[] }) {
  const { lang, copy, caseStudies } = await getContent();
  const studies = slugs.flatMap((slug) => caseStudies.filter((study) => study.slug === slug));
  if (studies.length === 0) return null;

  return (
    <section aria-labelledby="related-projects-title" className="mt-12">
      <h2 id="related-projects-title" className="text-2xl font-bold tracking-[-0.03em]">
        {copy.pages.relatedProjectsTitle}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {studies.map((study) => (
          <li key={study.slug} className="rounded-2xl border border-line bg-white/[.02] p-5">
            {study.relationship && <p className="text-caption leading-relaxed text-label">{study.relationship}</p>}
            <h3 className="mt-2 text-lg font-semibold leading-snug">
              <Link href={localizedPath(lang, `/work/${study.slug}`)} className="inline-flex min-h-11 items-center gap-2 rounded-sm hover:text-label">
                {study.title} <span aria-hidden="true">→</span>
              </Link>
            </h3>
            <p className="mt-2 text-small leading-[1.7] text-muted">{study.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
