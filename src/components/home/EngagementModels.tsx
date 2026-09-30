import { engagementModels } from "@/data/engagement";
import { mailto } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function EngagementModels() {
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <SectionHeading
        id="engagement-title"
        eyebrow="Ways to work together"
        title="Start with a review. Scale with a team."
        description="Pick the format that fits where you are, from a short technical review to a dedicated engineering team."
      />

      <ol className="relative z-[1] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
        {engagementModels.map((model, i) => (
          <li key={model.id}>
            <AnimatedReveal delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="h-full">
              <SpotlightCard className="flex h-full flex-col rounded-[18px] border border-line bg-[linear-gradient(180deg,rgba(18,31,57,.86),rgba(11,21,40,.86))] p-6 hover:border-[rgba(129,157,255,.28)]">
                <div className="font-mono text-[11px] leading-none font-medium text-[#79dbe7]">{model.number}</div>
                <h3 className="mt-4 mb-[10px] text-xl leading-[1.15] font-bold tracking-[-0.03em]">{model.title}</h3>
                <p className="text-sm leading-[1.65] text-muted">{model.description}</p>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-[1.55] text-[#c2ccda]">
                  {model.outcome}
                </p>
                <a href={mailto(model.cta.subject)} className="text-link mt-auto min-h-11 self-start pt-3">
                  {model.cta.label} <span aria-hidden="true">→</span>
                </a>
              </SpotlightCard>
            </AnimatedReveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
