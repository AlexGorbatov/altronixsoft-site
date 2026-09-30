import { CONTACT_HREF, mailto } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FinalCTA() {
  return (
    <Section id="contact" tone="alt" labelledBy="cta-title">
      <AnimatedReveal>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-white/[.12] bg-[radial-gradient(600px_300px_at_100%_0%,rgba(125,103,217,.22),transparent_70%),linear-gradient(120deg,#0d1b35,#161838_65%,#2d1f47)] p-[30px] sm:p-[42px] lg:grid-cols-[1.2fr_.8fr] lg:gap-12 lg:p-[60px]">
          <div>
            <div className="eyebrow">Let&apos;s start with one real problem</div>
            <h2
              id="cta-title"
              className="mt-[14px] text-4xl leading-[1.06] font-bold tracking-[-0.045em] sm:text-[42px] lg:text-[48px]"
            >
              Turn a real problem into reliable software.
            </h2>
          </div>
          <div>
            <p className="mb-5 leading-[1.7] text-[#b4bfd0]">
              Bring us a workflow, system or product challenge. We&apos;ll help you find the smallest
              sensible path from problem to production.
            </p>
            <div className="flex flex-wrap gap-[10px]">
              <Button href={CONTACT_HREF}>Discuss your project →</Button>
              <Button href={mailto("Technical review")} variant="secondary">
                Book a technical review
              </Button>
            </div>
            <p className="mt-[14px] text-xs text-[#98a4b8]">
              Typical first steps: a Technical Review, then a focused Proof of Value.
            </p>
          </div>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
