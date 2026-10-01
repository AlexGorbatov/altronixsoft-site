import Link from "next/link";
import { copy } from "@/data/copy";
import { caseStudies, type CaseStudy } from "@/data/projects";
import { hasResult, warnIfIncomplete } from "@/lib/cases";
import { filled } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CardRow } from "@/components/ui/CardRow";
import { CARD_ITEM } from "@/components/ui/cardItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FACT_LABEL } from "@/components/ui/factLabel";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tag } from "@/components/ui/Tag";
import { Labs } from "./Labs";
import { ProjectVisual } from "./ProjectVisual";

/** Only facts that are filled in are listed; placeholders never reach the page. */
function CaseFacts({ study }: { study: CaseStudy }) {
  const facts: [string, string][] = [[copy.work.roleLabel, study.role]];
  if (filled(study.duration)) facts.push([copy.work.durationLabel, study.duration]);
  if (hasResult(study)) facts.push([copy.work.resultLabel, study.result]);

  return (
    <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-small">
      {facts.map(([term, detail]) => (
        <div key={term}>
          <dt className={FACT_LABEL}>{term}</dt>
          <dd className="mt-1 leading-[1.5] text-strong">{detail}</dd>
        </div>
      ))}
      <div>
        <dt className={FACT_LABEL}>{copy.work.stackLabel}</dt>
        <dd className="mt-2">
          <ul className="flex flex-wrap gap-[6px]" aria-label={copy.work.stackAria}>
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

export function SelectedWork() {
  warnIfIncomplete(caseStudies);

  return (
    <Section id="work" tone="deep" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow={copy.work.eyebrow}
        title={copy.work.title}
        description={copy.work.description}
      />

      <CardRow label={copy.work.rowLabel}>
        {caseStudies.map((study, i) => (
          <AnimatedReveal key={study.slug} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="card flex h-full flex-col p-0">
              <ProjectVisual variant={study.visual} />
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-caption leading-[1.2] font-medium tracking-[0.1em] text-subtle uppercase">
                  {study.industry}
                </div>
                <h3 className="mt-3 mb-2 text-[19px] font-bold">{study.title}</h3>
                <p className="text-sm leading-[1.6] text-muted">{study.summary}</p>
                <CaseFacts study={study} />
                {hasResult(study) && (
                  <Link href={`/work/${study.slug}`} className="link-quiet mt-auto self-start pt-2">
                    {copy.work.readCase} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <Labs />
    </Section>
  );
}
