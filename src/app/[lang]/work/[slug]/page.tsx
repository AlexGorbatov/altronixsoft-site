import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ScenePanel } from "@/components/projects/ProjectScene";
import { Button } from "@/components/ui/Button";
import { FramedCard } from "@/components/ui/FramedCard";
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
import type { ReactNode } from "react";

/** The live product, tagged as a referral from this site so the partner sees where the visit came from. */
function referral(url: string) {
  const link = new URL(url);
  link.searchParams.set("utm_source", "altronixsoft.com");
  link.searchParams.set("utm_medium", "referral");
  link.searchParams.set("utm_campaign", "partner");
  return link.toString();
}

/** A link to the live product. No `noreferrer`: the visit should arrive as a referral. */
function LiveLink({ url, className, children }: { url: string; className?: string; children: ReactNode }) {
  return (
    <a href={referral(url)} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
}

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

/** The layers of the system, from the user down to the data. */
function Architecture({ layers, title }: { layers: NonNullable<CaseStudy["architecture"]>; title: string }) {
  return (
    <section aria-labelledby="architecture-title" className="mt-8">
      <h2 id="architecture-title" className="text-xl font-bold tracking-[-0.03em]">
        {title}
      </h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {layers.map((layer, i) => (
          <li key={layer.title} className="rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-5">
            <span className="font-mono text-caption font-medium tracking-[0.1em] text-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 text-body font-semibold text-[#dbe4f1]">{layer.title}</h3>
            <p className="mt-1.5 text-body leading-[1.7] text-muted">{layer.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Facts({ study, copy }: { study: CaseStudy; copy: Content["copy"] }) {
  const { work } = copy;
  const facts: [string, ReactNode][] = [[work.industryLabel, study.industry]];
  if (study.liveUrl && filled(study.liveUrl)) {
    facts.push([
      work.websiteLabel,
      <LiveLink key="site" url={study.liveUrl} className="link-quiet">
        {new URL(study.liveUrl).host} <span aria-hidden="true">↗</span>
      </LiveLink>,
    ]);
  }
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
        <Link href={localizedPath(lang, "/work")} className="link-quiet">
          <span aria-hidden="true">←</span> {copy.casePage.back}
        </Link>
        <div className="eyebrow mt-4 flex w-fit">{study.industry}</div>
        <h1 className="mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{study.title}</h1>
        <p className="mt-5 text-[17px] leading-[1.75] text-muted">{study.summary}</p>
        {study.liveUrl && filled(study.liveUrl) && (
          <FramedCard accent="violet" compact className="mt-6 sm:w-fit" innerClassName="flex">
            <LiveLink url={study.liveUrl} className="btn btn-primary w-full">
              {copy.casePage.visit.replace("{site}", new URL(study.liveUrl).host)} <span aria-hidden="true">↗</span>
            </LiveLink>
          </FramedCard>
        )}

        <ScenePanel variant={study.visual} labels={copy.portfolio.scene} accent="violet" className="mt-8" />

        <Facts study={study} copy={copy} />

        <section aria-label={copy.casePage.focus} className="mt-8">
          <h2 className="text-xl font-bold tracking-[-0.03em]">{copy.casePage.focus}</h2>
          <p className="mt-2 text-body leading-[1.75] text-muted">{study.focus}.</p>
        </section>
        <Story title={copy.casePage.challenge} text={study.challenge} />
        <Story title={copy.casePage.whatWeDid} text={study.whatWeDid} />
        {study.architecture && <Architecture layers={study.architecture} title={copy.casePage.architecture} />}
        <Story title={copy.casePage.result} text={study.result} />

        <section aria-labelledby="similar-title" className="mt-12 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:p-8">
          <h2 id="similar-title" className="text-2xl font-bold tracking-[-0.03em]">
            {copy.casePage.similarTitle}
          </h2>
          <p className="mt-3 text-body leading-[1.7] text-muted">
            {copy.casePage.similarText}
          </p>
          <div className="actions mt-6">
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
