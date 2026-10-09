import Link from "next/link";
import { copy } from "@/data/copy";
import { serviceCards } from "@/data/services";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CardRow } from "@/components/ui/CardRow";
import { CARD_ITEM } from "@/components/ui/cardItem";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AiUseCases } from "./AiUseCases";

export function Services() {
  return (
    <Section id="services" tone="alt" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={copy.services.eyebrow}
        title={copy.services.title}
        description={copy.services.description}
      />

      <CardRow label={copy.services.rowLabel} columns={4}>
        {serviceCards.map((service, i) => (
          <AnimatedReveal key={service.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className={CARD_ITEM}>
            <SpotlightCard className="card flex h-full flex-col">
              <h3 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{service.title}</h3>
              <p className="mb-6 text-body leading-[1.65] text-muted">{service.description}</p>
              <div className="mt-auto border-t border-line pt-4">
                <Link href={service.href} className="link-quiet" aria-label={`Service details: ${service.title}`}>
                  {copy.services.detailsLink} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AiUseCases />
    </Section>
  );
}
