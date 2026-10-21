import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/data/projects";
import { contactHref } from "@/data/site";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor, type Content } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { hasResult, warnIfIncomplete } from "@/lib/cases";
import { pageMetadata } from "@/lib/metadata";
import { DevTodo } from "@/components/ui/DevTodo";
import { filled, todoLabel } from "@/lib/todo";

export function generateStaticParams() {
  return contentFor("en").caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { caseStudies, copy } = contentFor(lang);
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return pageMetadata({
    lang,
    title: `${study.title}: ${copy.casePage.metaSuffix}`,
    description: study.summary,
    path: `/work/${study.slug}`,
    // A case without a measurable result is not ready to be indexed yet.
    noindex: !hasResult(study),
  });
}

/** A narrative block: real text in production; in development an open TODO is shown as a dashed note. */
function Story({ title, text }: { title: string; text: string }) {
  const todo = todoLabel(text);
  if (!filled(text) && !todo) return null;
  return (
    <section aria-label={title} className="mt-8">
      <h2 className="text-xl font-bold tracking-[-0.03em]">{title}</h2>
      {filled(text) ? (
        <p className="mt-2 text-body leading-[1.75] text-muted">{text}</p>
      ) : (
        <DevTodo value={text} className="mt-2 block" />
      )}
    </section>
  );
}

function Facts({ study, copy }: { study: CaseStudy; copy: Content["copy"] }) {
  const { work } = copy;
  const facts: [string, string][] = [[work.industryLabel, study.industry]];
  if (filled(study.role)) facts.push([work.roleLabel, study.role]);
  if (filled(study.context)) facts.push([work.contextLabel, study.context]);
  if (filled(study.team)) facts.push([work.teamLabel, study.team]);
  if (filled(study.duration)) facts.push([work.durationLabel, study.duration]);

  return (
    <dl className="mt-8 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:grid-cols-2">
      {facts.map(([term, detail]) => (
        <div key={term}>
          <dt className="font-mono text-caption font-medium tracking-[0.1em] text-subtle uppercase">{term}</dt>
          <dd className="mt-1 text-body text-[#dbe4f1]">{detail}</dd>
        </div>
      ))}
      <div className="sm:col-span-2">
        <dt className="font-mono text-caption font-medium tracking-[0.1em] text-subtle uppercase">{work.stackLabel}</dt>
        <dd>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label={copy.work.stackAria}>
            {study.stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const { lang, copy, caseStudies } = await getContent();
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  warnIfIncomplete([study]);

  const others = caseStudies.filter((item) => item.slug !== study.slug);

  return (
    <PageShell>
      <article className="mx-auto max-w-[820px]">
        <Link href={localizedPath(lang, "/#work")} className="link-quiet">
          <span aria-hidden="true">←</span> {copy.casePage.back}
        </Link>
        <div className="eyebrow mt-4">{study.industry}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{study.title}</h1>
        <p className="mt-5 text-[17px] leading-[1.75] text-muted">{study.summary}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-[#0d182c]">
          <ProjectVisual variant={study.visual} />
        </div>

        <Facts study={study} copy={copy} />

        <section aria-label={copy.casePage.focus} className="mt-8">
          <h2 className="text-xl font-bold tracking-[-0.03em]">{copy.casePage.focus}</h2>
          <p className="mt-2 text-body leading-[1.75] text-muted">{study.focus}.</p>
        </section>
        <Story title={copy.casePage.challenge} text={study.challenge} />
        <Story title={copy.casePage.whatWeDid} text={study.whatWeDid} />
        <Story title={copy.casePage.result} text={study.result} />

        <section aria-labelledby="similar-title" className="mt-12 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:p-8">
          <h2 id="similar-title" className="text-2xl font-bold tracking-[-0.03em]">
            {copy.casePage.similarTitle}
          </h2>
          <p className="mt-3 text-body leading-[1.7] text-muted">
            {copy.casePage.similarText}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={localizedPath(lang, contactHref("project"))}>{copy.pages.discussProject} →</Button>
            <Button href={localizedPath(lang, contactHref("technical-review"))} variant="secondary">
              {copy.pages.requestReview}
            </Button>
          </div>
        </section>

        <nav aria-label={copy.casePage.more} className="mt-10">
          <h2 className="mono-label text-label">{copy.casePage.more}</h2>
          <ul className="mt-3 grid gap-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={localizedPath(lang, `/work/${item.slug}`)} className="link-quiet">
                  {item.title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
