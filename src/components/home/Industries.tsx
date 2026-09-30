import { industries } from "@/data/industries";
import { mailto } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { CARD_ITEM, CardRow } from "@/components/ui/CardRow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Tag } from "@/components/ui/Tag";

export function Industries() {
  return (
    <Section id="industries" labelledBy="industries-title">
      <SectionHeading
        id="industries-title"
        eyebrow="Industries"
        title="Built for complex business systems."
        description="Our delivery experience comes from enterprise environments where integrations, data and reliability matter more than novelty."
      />

      <CardRow label="Industries">
        {industries.map((industry, i) => (
          <AnimatedReveal key={industry.id} delay={(i + 1) as 1 | 2 | 3} className={CARD_ITEM}>
            <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[linear-gradient(180deg,rgba(18,31,57,.86),rgba(11,21,40,.86))] p-7 hover:border-[rgba(129,157,255,.28)] hover:shadow-[0_22px_56px_rgba(0,0,0,.18)]">
              <div className="font-mono text-[11px] leading-none font-medium text-[#79dbe7]">{industry.number}</div>
              <h3 className="mt-[18px] mb-[10px] text-2xl leading-[1.15] font-bold tracking-[-0.035em]">
                {industry.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted">{industry.description}</p>
              <ul className="mt-[22px] flex flex-wrap gap-[7px]" aria-label="Focus areas">
                {industry.focus.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedReveal>
        ))}
      </CardRow>

      <AnimatedReveal className="relative z-[1] mt-8">
        <div className="flex flex-wrap items-center gap-x-4 text-[15px] text-muted">
          <span>Other complex business systems?</span>
          <a href={mailto("Project discussion")} className="text-link min-h-11">
            Let&apos;s talk <span aria-hidden="true">→</span>
          </a>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
