import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { ScenePanel } from "@/components/projects/ProjectScene";
import { Button } from "@/components/ui/Button";
import { FramedCard, type FrameAccent } from "@/components/ui/FramedCard";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/data/projects";
import { contactHref } from "@/data/site";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor, type Content } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { isIndexable, warnIfIncomplete } from "@/lib/cases";
import { splitLead } from "@/lib/lead";
import { JsonLdScript } from "@/components/JsonLdScript";
import { breadcrumbSchema, caseStudySchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { filled } from "@/lib/todo";
import type { ReactNode } from "react";

/** The live product, tagged as a referral from this site so the partner sees where the visit came from. */
function referral(url: string) {
  const link = new URL(url);
  // Only a partner's site gets the tags; a code repository is just linked.
  if (link.host === "github.com") return link.toString();
  link.searchParams.set("utm_source", "altronixsoft.com");
  link.searchParams.set("utm_medium", "referral");
  link.searchParams.set("utm_campaign", "partner");
  return link.toString();
}

/** The domain of a site as people say it: "lobby9.com", not "www.lobby9.com". */
const siteName = (url: string, withPath = false) => {
  const { host, pathname } = new URL(url);
  const name = host.replace(/^www\./, "");
  return withPath && pathname.length > 1 ? name + pathname.replace(/\/$/, "") : name;
};

/** A link to the live product. No `noreferrer`: the visit should arrive as a referral. */
function LiveLink({ url, className, newTab, children }: { url: string; className?: string; newTab: string; children: ReactNode }) {
  return (
    <a href={referral(url)} target="_blank" rel="noopener" className={className}>
      {children}
      <span className="sr-only"> {newTab}</span>
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
  if (!study) return { title: copy.notFound.title };
  return pageMetadata({
    lang,
    title: `${study.metaTitle ?? study.title}: ${copy.casePage.metaSuffix}`,
    description: study.metaDescription ?? study.summary,
    path: `/work/${study.slug}`,
    // A case whose story is not written yet is not ready to be indexed.
    noindex: !isIndexable(study),
  });
}

/** Figures the case text already states, so a skimming reader gets them without reading the paragraphs. */
function Highlights({ items, label }: { items: { value: string; label: string }[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
    >
      {items.map((item) => (
        <li key={item.label} className="bg-[#0b1527] p-4 sm:p-5">
          <span className="block font-mono text-[28px] leading-none font-medium text-cyan sm:text-[32px]">{item.value}</span>
          <span className="mt-2 block text-small leading-[1.4] text-muted">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** A narrative block only renders verified, filled content. */
function Story({ title, text }: { title: string; text: string }) {
  if (!filled(text)) return null;
  return (
    <section aria-label={title} className="mt-8">
      <h2 className="text-xl font-bold tracking-[-0.03em]">{title}</h2>
      <p className="mt-2 text-body leading-[1.75] text-muted">{text}</p>
    </section>
  );
}

/** Frame colours of the blocks, in order: from cyan to violet, as in the diagram above. */
const LAYER_ACCENTS: FrameAccent[] = ["cyan", "cyan", "blue", "indigo", "violet", "violet"];

interface BlockGridProps {
  id: string;
  title: string;
  /** A sentence above the blocks; hidden while it is empty or an open TODO. */
  intro?: string;
  items: { title: string; text: string }[];
  /** Set the first sentence of each block apart from the detail that follows it. */
  lead?: boolean;
}

/**
 * Numbered blocks, each in the frame of light of the project cards: the layers of an architecture, or the areas
 * of the work.
 */
function BlockGrid({ id, title, intro, items, lead }: BlockGridProps) {
  return (
    <section aria-labelledby={id} className="mt-8">
      <h2 id={id} className="text-xl font-bold tracking-[-0.03em]">
        {title}
      </h2>
      {intro && filled(intro) && <p className="mt-2 text-body leading-[1.75] text-muted">{intro}</p>}
      <ol aria-labelledby={id} className="mt-5 grid gap-5 sm:grid-cols-2">
        {items.map((layer, i) => (
          <li key={layer.title}>
            <FramedCard accent={LAYER_ACCENTS[i % LAYER_ACCENTS.length]} innerClassName="relative p-5">
              {/* A soft light in the frame's colour behind the text. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-[var(--c)] opacity-[0.06] blur-3xl"
              />
              <span className="relative font-mono text-caption font-medium tracking-[0.1em] text-[var(--c)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mt-1 text-body font-semibold text-[#dbe4f1]">{layer.title}</h3>
              {(() => {
                const [point, detail] = lead ? splitLead(layer.text) : [layer.text, null];
                return detail ? (
                  <>
                    <p className="relative mt-2 text-body leading-[1.6] font-medium text-[#dbe4f1]">{point}</p>
                    <p className="relative mt-2 text-small leading-[1.65] text-muted">{detail}</p>
                  </>
                ) : (
                  <p className="relative mt-1.5 text-body leading-[1.7] text-muted">{layer.text}</p>
                );
              })()}
            </FramedCard>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Facts({ study, copy }: { study: CaseStudy; copy: Content["copy"] }) {
  const { work } = copy;
  const facts: [string, ReactNode][] = study.compactIntro ? [] : [[work.industryLabel, study.industry]];
  if (study.liveUrl && filled(study.liveUrl)) {
    facts.push([
      work.websiteLabel,
      <LiveLink key="site" url={study.liveUrl} className="link-quiet" newTab={copy.casePage.newTab}>
        {siteName(study.liveUrl, true)} <span aria-hidden="true">↗</span>
      </LiveLink>,
    ]);
  }
  if (filled(study.role)) facts.push([work.roleLabel, study.role]);
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
  const { lang, copy, caseStudies, services, sapCommerce, navigation } = await getContent();
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  warnIfIncomplete([study]);

  const others = caseStudies.filter((item) => item.slug !== study.slug);
  const isAi = study.relatedService === "ai";

  const path = `/work/${study.slug}`;
  // The same label in the visible trail and in the structured data.
  const workLabel = navigation.find((item) => item.href === "/work")?.label ?? copy.casePage.back;
  const graph = [
    breadcrumbSchema(lang, [{ name: workLabel, path: "/work" }, { name: study.title, path }]),
    caseStudySchema({
      lang,
      path,
      name: study.title,
      description: study.metaDescription ?? study.summary,
      about: study.industry,
      keywords: study.stack,
    }),
  ];
  const related =
    study.relatedService === "sap-commerce"
      ? { title: sapCommerce.title, path: sapCommerce.path }
      : (() => {
          const service = services.find((item) => item.id === study.relatedService);
          return service ? { title: service.title, path: `/services/${service.id}` } : null;
        })();

  return (
    <PageShell>
      <JsonLdScript graph={graph} />
      <article className="mx-auto max-w-[820px]">
        <Breadcrumb
          lang={lang}
          label={copy.pages.breadcrumbAria}
          home={copy.pages.home}
          parent={{ label: workLabel, href: "/work" }}
          current={study.title}
        />
        <div className="eyebrow mt-6 flex w-fit">{study.industry}</div>
        <h1
          className={cn(
            "mt-3 text-[36px] leading-[1.1] font-bold tracking-[-0.04em]",
            // A long title gets a smaller size from 640px up, so it stays on one line.
            study.title.length > 30 ? "sm:text-[40px]" : "sm:text-[52px]",
          )}
        >
          {study.title}
        </h1>
        <p className="mt-5 text-[17px] leading-[1.75] text-muted">{study.summary}</p>
        {study.compactIntro ? (
          <div className="mt-5">
            {study.relationship && <p className="text-small font-medium leading-relaxed text-label">{study.relationship}</p>}
            <p className="mt-2 text-body leading-[1.75] text-muted">{study.focus}.</p>
          </div>
        ) : filled(study.contribution) && (
          <section aria-labelledby="contribution-title" className="mt-6 rounded-2xl border border-line bg-white/[.02] p-5 sm:p-6">
            {study.relationship && <p className="text-small font-medium leading-relaxed text-label">{study.relationship}</p>}
            <h2 id="contribution-title" className="mt-2 text-xl font-bold tracking-[-0.03em]">{copy.casePage.contribution}</h2>
            <p className="mt-2 text-body leading-[1.75] text-muted">{study.contribution}</p>
            {study.attribution && <p className="mt-4 border-t border-line pt-4 text-small leading-[1.7] text-subtle">{study.attribution}</p>}
          </section>
        )}
        {study.liveUrl && filled(study.liveUrl) && (
          <FramedCard accent="violet" compact className="mt-6 sm:w-fit" innerClassName="flex">
            <LiveLink url={study.liveUrl} className="btn btn-primary w-full" newTab={copy.casePage.newTab}>
              {copy.casePage.visit.replace("{site}", siteName(study.liveUrl))} <span aria-hidden="true">↗</span>
            </LiveLink>
          </FramedCard>
        )}

        {study.repoUrl && filled(study.repoUrl) && (
          <div className="mt-6">
            <a href={study.repoUrl} target="_blank" rel="noopener" className="btn btn-secondary sm:w-fit">
              {copy.casePage.sourceCode} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {copy.casePage.newTab}</span>
            </a>
            {study.repoLicense && (
              <p className="mt-2 text-caption text-subtle">{copy.casePage.sourceLicense.replace("{license}", study.repoLicense)}</p>
            )}
          </div>
        )}

        <ScenePanel variant={study.visual} labels={copy.portfolio.scene} accent="violet" className="mt-8" />

        {study.highlights && study.highlights.length > 0 && <Highlights items={study.highlights} label={copy.casePage.keyFigures} />}

        <Facts study={study} copy={copy} />

        {!study.compactIntro && <Story title={copy.casePage.overview} text={study.context} />}
        <Story title={copy.casePage.challenge} text={study.challenge} />
        {isAi && <Story title={copy.casePage.demonstrated} text={study.result} />}
        {study.workItems ? (
          <BlockGrid id="work-title" title={copy.casePage.whatWeDid} intro={study.whatWeDid} items={study.workItems} lead={isAi} />
        ) : (
          <Story title={copy.casePage.whatWeDid} text={study.whatWeDid} />
        )}
        {isAi && (
          <div className="actions mt-8">
            <Button href={localizedPath(lang, contactHref("exploring"))}>{copy.pages.discussProject} →</Button>
          </div>
        )}
        {study.architecture && (isAi ? (
          <details data-case-architecture className="mt-8 rounded-2xl border border-line bg-white/[.02] p-5 sm:p-6">
            <summary className="cursor-pointer py-2 text-body font-semibold text-strong marker:text-label">
              {copy.casePage.architectureDetails}
            </summary>
            <BlockGrid id="architecture-title" title={copy.casePage.architecture} items={study.architecture} />
          </details>
        ) : (
          <BlockGrid id="architecture-title" title={copy.casePage.architecture} items={study.architecture} />
        ))}
        {!isAi && (
          <Story title={copy.casePage.result} text={study.result} />
        )}

        {related && (
          <p className="mt-10 text-body text-muted">
            {copy.casePage.relatedService}:{" "}
            <Link href={localizedPath(lang, related.path)} className="link-quiet">
              {related.title} <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}

        <section aria-labelledby="similar-title" className="mt-12 rounded-2xl border border-line bg-[rgba(13,24,44,.6)] p-6 sm:p-8">
          <h2 id="similar-title" className="text-2xl font-bold tracking-[-0.03em]">
            {copy.casePage.similarTitle}
          </h2>
          <p className="mt-3 text-body leading-[1.7] text-muted">
            {copy.casePage.similarText}
          </p>
          <div className="actions mt-6">
            <Button href={localizedPath(lang, contactHref("exploring"))}>{copy.pages.discussProject} →</Button>
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
