import Link from "next/link";
import { copy } from "@/data/copy";
import { afterReview, engagementModels } from "@/data/engagement";
import { contactHref, siteConfig } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

/** "How to start": two steps side by side (the first one accented) and one line about what comes after. */
export function EngagementModels() {
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <SectionHeading id="engagement-title" eyebrow={copy.engagement.eyebrow} title={copy.engagement.title} />

      <div role="group" aria-label={copy.engagement.rowLabel} className="relative z-[1] grid gap-[18px] md:grid-cols-2">
        {engagementModels.map((model, i) => {
          // The check-up can go straight to a scheduling link when one is configured.
          const href = model.id === "checkup" ? (siteConfig.bookingUrl ?? contactHref(model.cta.type)) : contactHref(model.cta.type);
          return (
            <AnimatedReveal key={model.id} delay={(i + 1) as 1 | 2}>
              <SpotlightCard
                className={cn(
                  "card flex h-full flex-col",
                  model.accent && "border-[rgba(143,221,232,.35)] bg-[rgba(143,221,232,.04)]",
                )}
              >
                <h3 className="text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{model.title}</h3>
                <p className="mono-label mt-2 text-caption text-label">{model.meta}</p>
                <p className="mt-4 mb-6 text-body leading-[1.65] text-muted">{model.description}</p>
                <div className="mt-auto">
                  <Button href={href} variant={model.accent ? "primary" : "secondary"}>
                    {model.cta.label}
                  </Button>
                </div>
              </SpotlightCard>
            </AnimatedReveal>
          );
        })}
      </div>

      <AnimatedReveal className="relative z-[1] mt-5">
        <p className="flex flex-wrap items-center gap-x-4 text-body leading-[1.6] text-muted">
          {afterReview.text}
          <Link href={contactHref(afterReview.cta.type)} className="link-quiet">
            {afterReview.cta.label}
          </Link>
        </p>
      </AnimatedReveal>
    </Section>
  );
}
