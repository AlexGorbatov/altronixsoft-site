import type { EngagementModel } from "@/data/engagement";
import { contactHref, siteConfig } from "@/data/site";
import { localizedPath } from "@/i18n/config";
import type { Content } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { filled, filledItems } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CardRow } from "@/components/ui/CardRow";
import { CARD_ITEM } from "@/components/ui/cardItem";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FACT_LABEL } from "@/components/ui/factLabel";
import { FramedCard, type FrameAccent } from "@/components/ui/FramedCard";

/** Package facts: shown only once the owner has filled them in (see `filled()`). Label above value, never cramped. */
function PackageFacts({ model, copy }: { model: EngagementModel; copy: Content["copy"] }) {
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

/** One colour per format, running from cyan to violet along the row, like the timeline of the process below. */
const ACCENTS: FrameAccent[] = ["cyan", "blue", "indigo", "violet"];

/** "Start here" with a small pulsing dot: the first step of the path. */
function StartHere({ label }: { label: string }) {
  return (
    <div className="mono-label flex items-center gap-2 text-caption text-label">
      <span aria-hidden="true" className="pulse-dot size-[7px] rounded-full bg-[var(--cyan)]" />
      {label}
    </div>
  );
}

export async function EngagementModels() {
  const { lang, copy, engagementModels, checkup } = await getContent();
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <SectionHeading
        id="engagement-title"
        eyebrow={copy.engagement.eyebrow}
        title={copy.engagement.title}
        description={copy.engagement.description}
      />

      {/* Desktop: the check-up is a banner above the four formats. */}
      <AnimatedReveal className="relative z-[1] mb-5 max-lg:hidden">
        <FramedCard accent="cyan" innerClassName="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <StartHere label={copy.engagement.startHere} />
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[18px] font-bold">{checkup.title}</h3>
              {checkup.meta && <span className="mono-label text-caption text-label">{checkup.meta}</span>}
            </div>
            <p className="mt-1 max-w-[62ch] text-body leading-[1.6] text-muted">{checkup.text}</p>
          </div>
          <Button href={siteConfig.bookingUrl ?? localizedPath(lang, contactHref(checkup.cta.type))} className="shrink-0">
            {checkup.cta.label}
          </Button>
        </FramedCard>
      </AnimatedReveal>

      {/* The padding gives the corner marks of the frames room inside the scrolling row on phones. */}
      <CardRow
        label={copy.engagement.rowLabel}
        columns={4}
        controls={copy.engagement.carousel}
        emphasis
        hint
        className="max-lg:-mt-2 max-lg:pt-2"
      >
        {/* Tablet and phone: the check-up is the first card of the row. */}
        <AnimatedReveal className={cn(CARD_ITEM, "lg:hidden")}>
          <FramedCard accent="cyan" innerClassName="flex h-full flex-col p-6">
            <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-[2px] bg-[var(--c)]" />
            <StartHere label={copy.engagement.startHere} />
            <h3 className="mt-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{checkup.title}</h3>
            {checkup.meta && <span className="mono-label mt-1 text-caption text-label">{checkup.meta}</span>}
            <p className="mt-3 text-small leading-[1.55] text-muted">{checkup.text}</p>
            <div className="mt-auto flex flex-col items-stretch pt-5">
              <Button
                href={siteConfig.bookingUrl ?? localizedPath(lang, contactHref(checkup.cta.type))}
                className="h-auto min-h-14 px-3 py-2 text-center whitespace-normal"
              >
                {checkup.cta.label}
              </Button>
            </div>
          </FramedCard>
        </AnimatedReveal>
        {engagementModels.map((model, i) => (
          <AnimatedReveal key={model.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className={CARD_ITEM}>
            <FramedCard accent={ACCENTS[i % ACCENTS.length]} innerClassName="flex h-full flex-col p-6">
              <span aria-hidden="true" className="draw-line absolute inset-x-0 top-0 h-[2px] bg-[var(--c)]" />
              <h3 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{model.title}</h3>
              <p className="text-body leading-[1.5] font-medium text-strong lg:min-h-[3.1rem]">{model.description}</p>
              <p className="mt-3 text-small leading-[1.55] text-muted">{model.outcome}</p>
              <PackageFacts model={model} copy={copy} />
              <div className="mt-auto flex flex-col items-stretch pt-5">
                <Button
                  href={localizedPath(lang, contactHref(model.cta.type))}
                  variant="secondary"
                  className="h-auto min-h-14 px-3 py-2 text-center whitespace-normal"
                >
                  {model.cta.label}
                </Button>
              </div>
            </FramedCard>
          </AnimatedReveal>
        ))}
      </CardRow>
    </Section>
  );
}
