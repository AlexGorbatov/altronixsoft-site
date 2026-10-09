import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { copy } from "@/data/copy";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/data/projects";
import { contactHref } from "@/data/site";
import { hasResult, warnIfIncomplete } from "@/lib/cases";
import { pageMetadata } from "@/lib/metadata";
import { filled, todoLabel } from "@/lib/todo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.title}: case study`,
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
        <p className="mt-2 rounded-lg border border-dashed border-[#ffcd80]/60 px-3 py-2 text-small text-[#ffe0b0]">{todo}</p>
      )}
    </section>
  );
}

function Facts({ study }: { study: CaseStudy }) {
  const facts: [string, string][] = [
    ["Industry", study.industry],
    ["Role", study.role],
  ];
  if (filled(study.context)) facts.push(["Context", study.context]);
  if (filled(study.duration)) facts.push(["Duration", study.duration]);

  return (
    <dl className="mt-8 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:grid-cols-2">
      {facts.map(([term, detail]) => (
        <div key={term}>
          <dt className="font-mono text-caption font-medium tracking-[0.1em] text-subtle uppercase">{term}</dt>
          <dd className="mt-1 text-body text-[#dbe4f1]">{detail}</dd>
        </div>
      ))}
      <div className="sm:col-span-2">
        <dt className="font-mono text-caption font-medium tracking-[0.1em] text-subtle uppercase">Stack</dt>
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

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  warnIfIncomplete([study]);

  const others = caseStudies.filter((item) => item.slug !== study.slug);

  return (
    <PageShell>
      <article className="mx-auto max-w-[820px]">
        <Link href="/#work" className="link-quiet">
          <span aria-hidden="true">←</span> {copy.casePage.back}
        </Link>
        <div className="eyebrow mt-4">{study.industry}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{study.title}</h1>
        <p className="mt-5 text-[17px] leading-[1.75] text-muted">{study.summary}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-[#0d182c]">
          <ProjectVisual variant={study.visual} />
        </div>

        <Facts study={study} />

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
            <Button href={contactHref("project")}>Discuss your project →</Button>
            <Button href={contactHref("technical-review")} variant="secondary">
              Request a platform review
            </Button>
          </div>
        </section>

        <nav aria-label={copy.casePage.more} className="mt-10">
          <h2 className="mono-label text-label">{copy.casePage.more}</h2>
          <ul className="mt-3 grid gap-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/work/${item.slug}`} className="link-quiet">
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
