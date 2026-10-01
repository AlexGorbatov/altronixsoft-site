import Link from "next/link";
import { copy } from "@/data/copy";
import { services } from "@/data/services";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CARD_ITEM, CardRow } from "@/components/ui/CardRow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tag } from "@/components/ui/Tag";
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

      <CardRow label={copy.services.rowLabel}>
        {services.map((service, i) => (
          <AnimatedReveal key={service.id} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="card flex h-full flex-col">
              <h3 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{service.shortTitle}</h3>
              <p className="text-body leading-[1.65] text-muted">{service.description}</p>
              <ul className="mt-5 mb-6 flex flex-wrap gap-[7px]" aria-label={copy.services.capabilitiesLabel}>
                {service.capabilities.map((capability) => (
                  <li key={capability}>
                    <Tag>{capability}</Tag>
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.id}`}
                className="link-quiet mt-auto self-start"
                aria-label={`Service details: ${service.title}`}
              >
                {copy.services.detailsLink} <span aria-hidden="true">→</span>
              </Link>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AnimatedReveal className="relative z-[1] mt-5">
        <Link href="/services/sap-commerce" className="link-quiet">
          {copy.services.sapLink} <span aria-hidden="true">→</span>
        </Link>
      </AnimatedReveal>

      <AiUseCases />
    </Section>
  );
}
