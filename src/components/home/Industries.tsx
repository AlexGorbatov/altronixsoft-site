import { industries } from "@/data/industries";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";

/**
 * A slim band, not a full section: supporting context for the work below. Same pattern as the
 * "Where we apply AI" strip in Services. The detail lives in the case studies.
 */
export function Industries() {
  return (
    <Section id="industries" labelledBy="industries-title" compact>
      <AnimatedReveal className="relative z-[1]">
        <div className="grid border-y border-line lg:grid-cols-[1.1fr_repeat(3,1fr)]">
          <div className="py-6 lg:border-r lg:border-line lg:pr-6">
            <div className="eyebrow">Industries</div>
            <h2 id="industries-title" className="mt-3 text-base font-bold">
              Industries we work in.
            </h2>
          </div>
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="border-t border-line py-5 lg:border-t-0 lg:border-r lg:px-6 lg:py-6 lg:last:border-r-0"
            >
              <h3 className="text-base font-bold">{industry.title}</h3>
              <p className="mt-2 text-small leading-[1.6] text-muted">{industry.line}</p>
            </div>
          ))}
        </div>
      </AnimatedReveal>
    </Section>
  );
}
