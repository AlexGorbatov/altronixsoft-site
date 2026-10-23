import Link from "next/link";
import { contactHref } from "@/data/site";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { CardRow } from "@/components/ui/CardRow";
import { CARD_ITEM } from "@/components/ui/cardItem";
import { FramedCard, type FrameAccent } from "@/components/ui/FramedCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { AiUseCases } from "./AiUseCases";
import { SapSpecialization } from "./SapSpecialization";

/** One colour per service, so the three cards read as three different things. */
const ACCENTS: FrameAccent[] = ["cyan", "blue", "violet"];

export async function Services() {
  const { lang, copy, services } = await getContent();
  return (
    <Section id="services" tone="alt" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={copy.services.eyebrow}
        title={copy.services.title}
        description={copy.services.description}
      />

      {/* The padding gives the corner marks of the frames room inside the scrolling row on phones. */}
      <CardRow label={copy.services.rowLabel} className="max-lg:-mt-2 max-lg:pt-2">
        {services.map((service, i) => (
          <AnimatedReveal key={service.id} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <FramedCard accent={ACCENTS[i % ACCENTS.length]} innerClassName="flex h-full flex-col p-6">
              <h3 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{service.shortTitle}</h3>
              <p className="text-body leading-[1.65] text-muted lg:min-h-[3.3em]">{service.description}</p>
              <ul className="mt-5 mb-6 flex flex-wrap gap-[7px]" aria-label={copy.services.capabilitiesLabel}>
                {service.capabilities.map((capability) => (
                  <li key={capability}>
                    <Tag>{capability}</Tag>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col items-stretch gap-3 border-t border-line pt-5">
                <Button
                  href={localizedPath(lang, contactHref(service.cta.type))}
                  variant="secondary"
                  className="h-auto min-h-14 px-3 py-2 text-center whitespace-normal"
                >
                  {service.cta.label}
                </Button>
                <Link
                  href={localizedPath(lang, `/services/${service.id}`)}
                  className="link-quiet justify-center"
                  aria-label={`${copy.services.detailsLink}: ${service.title}`}
                >
                  {copy.services.detailsLink} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FramedCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <div className="relative z-[1] mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <AnimatedReveal className="h-full">
          <SapSpecialization />
        </AnimatedReveal>
        <AnimatedReveal delay={1} className="h-full">
          <AiUseCases />
        </AnimatedReveal>
      </div>
    </Section>
  );
}
