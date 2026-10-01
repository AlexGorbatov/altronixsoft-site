import Link from "next/link";
import { copy } from "@/data/copy";
import { checkup } from "@/data/checkup";
import { engagementModels, type EngagementModel } from "@/data/engagement";
import { contactHref, siteConfig } from "@/data/site";
import { filled, filledItems } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CardRow } from "@/components/ui/CardRow";
import { CARD_ITEM } from "@/components/ui/cardItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FACT_LABEL } from "@/components/ui/factLabel";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/** Package facts: shown only once the owner has filled them in (see `filled()`). Label above value, never cramped. */
function PackageFacts({ model }: { model: EngagementModel }) {
  const facts: [string, string][] = [];
  if (filled(model.priceFrom)) facts.push([copy.engagement.priceLabel, model.priceFrom]);
  if (filled(model.duration)) facts.push([copy.engagement.durationLabel, model.duration]);
  if (filled(model.deliverable)) facts.push([copy.engagement.deliverableLabel, model.deliverable]);
  const includes = filledItems(model.includes);

  if (facts.length === 0 && includes.length === 0) return null;

  return (
    <div className="mt-4 grid gap-3 border-t border-line pt-4 text-small">
      {facts.length > 0 && (
        <dl className="grid gap-3">
          {facts.map(([term, detail]) => (
            <div key={term}>
              <dt className={FACT_LABEL}>{term}</dt>
              <dd className="mt-1 leading-[1.5] text-strong">{detail}</dd>
            </div>
          ))}
        </dl>
      )}
      {includes.length > 0 && (
        <ul className="grid gap-1 leading-[1.5] text-strong" aria-label={copy.engagement.includedLabel}>
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-label">
                +
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function EngagementModels() {
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <SectionHeading
        id="engagement-title"
        eyebrow={copy.engagement.eyebrow}
        title={copy.engagement.title}
        description={copy.engagement.description}
      />

      <CardRow label={copy.engagement.rowLabel} columns={4}>
        {engagementModels.map((model, i) => (
          <AnimatedReveal key={model.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className={CARD_ITEM}>
            <SpotlightCard className="card flex h-full flex-col">
              <h3 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{model.title}</h3>
              <p className="text-body leading-[1.65] text-muted lg:min-h-[4.95rem]">{model.description}</p>
              <p className="mt-4 border-t border-line pt-4 text-small leading-[1.55] text-strong">{model.outcome}</p>
              <PackageFacts model={model} />
              <Link href={contactHref(model.cta.type)} className="link-quiet mt-auto self-start pt-3">
                {model.cta.label} <span aria-hidden="true">→</span>
              </Link>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AnimatedReveal className="relative z-[1] mt-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-[rgba(143,221,232,.35)] bg-[rgba(143,221,232,.04)] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[18px] font-bold">{checkup.title}</h3>
              <span className="mono-label text-caption text-label">{checkup.meta}</span>
            </div>
            <p className="mt-1 max-w-[62ch] text-body leading-[1.6] text-muted">{checkup.text}</p>
          </div>
          <Button href={siteConfig.bookingUrl ?? contactHref(checkup.cta.type)} variant="secondary" className="shrink-0">
            {checkup.cta.label}
          </Button>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
