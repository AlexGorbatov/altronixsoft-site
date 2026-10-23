import Link from "next/link";
import type { CaseStudy } from "@/data/projects";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { hasResult, warnIfIncomplete } from "@/lib/cases";
import { filled } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FACT_LABEL } from "@/components/ui/factLabel";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tag } from "@/components/ui/Tag";
import type { Content } from "@/i18n/content";
import type { Locale as Lang } from "@/i18n/config";
import { Labs } from "./Labs";
import { ProjectVisual } from "./ProjectVisual";

const EYEBROW = "font-mono text-caption leading-[1.2] font-medium tracking-[0.12em] text-label uppercase";

/** The measurable outcome, set apart from the other facts so it is what the eye lands on. Only when filled. */
function CaseResult({ study, label }: { study: CaseStudy; label: string }) {
  if (!hasResult(study)) return null;
  return (
    <div className="rounded-xl border border-cyan/40 bg-cyan/[.07] px-[18px] py-4">
      <div className={`${FACT_LABEL} text-label`}>{label}</div>
      <p className="mt-2 text-[16px] leading-[1.5] font-semibold text-ink">{study.result}</p>
    </div>
  );
}

function StackList({ study, copy }: { study: CaseStudy; copy: Content["copy"] }) {
  return (
    <div>
      <div className={FACT_LABEL}>{copy.work.stackLabel}</div>
      <ul className="mt-[10px] flex flex-wrap gap-2" aria-label={copy.work.stackAria}>
        {study.stack.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Only facts that are filled in are listed; placeholders never reach the page. */
function caseFacts(study: CaseStudy, copy: Content["copy"]) {
  const facts: { term: string; detail: string; long: boolean }[] = [];
  if (filled(study.role)) facts.push({ term: copy.work.roleLabel, detail: study.role, long: true });
  if (filled(study.focus)) facts.push({ term: copy.work.focusLabel, detail: study.focus, long: true });
  if (filled(study.team)) facts.push({ term: copy.work.teamLabel, detail: study.team, long: false });
  if (filled(study.duration)) facts.push({ term: copy.work.durationLabel, detail: study.duration, long: false });
  return facts;
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <>
      <dt className={FACT_LABEL}>{term}</dt>
      <dd className="mt-[6px] text-body leading-[1.5] text-strong">{detail}</dd>
    </>
  );
}

/** The wide card for the case with a result: text on the left, the diagram and its note on the right. */
function FeaturedCase({ study, lang, copy }: { study: CaseStudy; lang: Lang; copy: Content["copy"] }) {
  const facts = caseFacts(study, copy);
  return (
    <SpotlightCard className="card grid gap-[22px] p-6 lg:grid-cols-[1fr_520px] lg:items-start lg:gap-12 lg:p-10">
      <div className="lg:order-2">
        <ProjectVisual variant={study.visual} size="featured" />
        <p className="mt-4 hidden text-caption leading-[1.5] text-subtle lg:block">{copy.work.diagramNote}</p>
      </div>

      <div className="flex flex-col gap-4 lg:order-1 lg:gap-[18px]">
        <div className={EYEBROW}>{study.industry}</div>
        <h3 className="text-[26px] leading-[1.1] font-bold tracking-[-0.04em] lg:text-[34px]">{study.title}</h3>
        <p className="text-[16px] leading-[1.6] text-muted">{study.summary}</p>
        <CaseResult study={study} label={copy.work.resultLabel} />
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 lg:flex">
          {facts.map((fact) => (
            <div key={fact.term} className={fact.long ? "col-span-2 lg:flex-[2]" : "lg:flex-1"}>
              <Fact term={fact.term} detail={fact.detail} />
            </div>
          ))}
        </dl>
        <StackList study={study} copy={copy} />
        {hasResult(study) && (
          <Link href={localizedPath(lang, `/work/${study.slug}`)} className="link-quiet self-start">
            {copy.work.readCase} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </SpotlightCard>
  );
}

/** A grid card: diagram on top, then the text. */
function CompactCase({ study, lang, copy }: { study: CaseStudy; lang: Lang; copy: Content["copy"] }) {
  const facts = caseFacts(study, copy);
  return (
    <SpotlightCard className="card flex h-full flex-col p-0">
      <div className="px-[14px] pt-[14px] lg:px-[18px] lg:pt-[18px]">
        <ProjectVisual variant={study.visual} />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 pt-[22px] pb-6 lg:px-7 lg:pt-[26px] lg:pb-[30px]">
        <div className={EYEBROW}>{study.industry}</div>
        <h3 className="text-[22px] leading-[1.1] font-bold tracking-[-0.04em] lg:text-2xl">{study.title}</h3>
        <p className="text-body leading-[1.6] text-muted">{study.summary}</p>
        <CaseResult study={study} label={copy.work.resultLabel} />
        <div className="flex flex-col gap-4 border-t border-line pt-[18px]">
          <dl className="flex flex-col gap-4">
            {facts.map((fact) => (
              <div key={fact.term}>
                <Fact term={fact.term} detail={fact.detail} />
              </div>
            ))}
          </dl>
          <StackList study={study} copy={copy} />
        </div>
        {hasResult(study) && (
          <Link href={localizedPath(lang, `/work/${study.slug}`)} className="link-quiet mt-auto self-start">
            {copy.work.readCase} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </SpotlightCard>
  );
}

export async function SelectedWork() {
  const { lang, copy, caseStudies } = await getContent();
  warnIfIncomplete(caseStudies);
  const [featured, ...rest] = caseStudies;

  return (
    <Section id="work" tone="deep" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow={copy.work.eyebrow}
        title={copy.work.title}
        description={copy.work.description}
      />

      <div role="group" aria-label={copy.work.rowLabel} className="relative z-[1] flex flex-col gap-5 lg:gap-7">
        {featured && (
          <AnimatedReveal delay={1}>
            <FeaturedCase study={featured} lang={lang} copy={copy} />
          </AnimatedReveal>
        )}
        {rest.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
            {rest.map((study, i) => (
              <AnimatedReveal key={study.slug} delay={Math.min(i + 2, 4) as 2 | 3 | 4} className="h-full">
                <CompactCase study={study} lang={lang} copy={copy} />
              </AnimatedReveal>
            ))}
          </div>
        )}
      </div>

      <Labs />
    </Section>
  );
}
