import { mailto } from "@/data/site";
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
        eyebrow="Services"
        title="AI, custom software, modernization."
        description="We start with the business problem, then choose the simplest technology that can solve it reliably."
      />

      <CardRow label="Services">
        {services.map((service, i) => (
          <AnimatedReveal key={service.id} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[linear-gradient(180deg,rgba(18,31,57,.86),rgba(11,21,40,.86))] p-7 hover:border-[rgba(129,157,255,.28)] hover:shadow-[0_22px_56px_rgba(0,0,0,.18)]">
              <div className="font-mono text-[11px] leading-none font-medium text-[#79dbe7]">{service.number}</div>
              <h3 className="mt-[18px] mb-[10px] text-2xl leading-[1.15] font-bold tracking-[-0.035em]">
                {service.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted">{service.description}</p>
              <ul className="mt-[22px] mb-[26px] flex flex-wrap gap-[7px]" aria-label="Capabilities">
                {service.capabilities.map((capability) => (
                  <li key={capability}>
                    <Tag>{capability}</Tag>
                  </li>
                ))}
              </ul>
              <a href={mailto(service.cta.subject)} className="text-link mt-auto min-h-11 self-start">
                {service.cta.label} <span aria-hidden="true">→</span>
              </a>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AiUseCases />
    </Section>
  );
}
