import { BOOKING_LABEL, siteConfig } from "@/data/site";
import { copy } from "@/data/copy";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Section } from "@/components/ui/Section";

export function FinalCTA() {
  return (
    <Section id="contact" tone="alt" labelledBy="cta-title">
      <AnimatedReveal>
        <div className="relative grid items-start gap-10 overflow-hidden rounded-3xl border border-white/[.12] bg-[radial-gradient(600px_300px_at_100%_0%,rgba(139,92,246,.22),transparent_70%),linear-gradient(120deg,#0d1b35,#161838_65%,#2d1f47)] p-[26px] sm:p-[42px] lg:grid-cols-[.85fr_1.15fr] lg:gap-14 lg:p-[56px]">
          <div>
            <div className="eyebrow">Contact</div>
            <h2
              id="cta-title"
              className="mt-[14px] text-[32px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[44px]"
            >
              Describe the system and the problem.
            </h2>
            <p className="mt-5 leading-[1.7] text-strong">
              Name the workflow, platform or product. We reply with the shortest path to production.
            </p>

            {siteConfig.bookingUrl && (
              <Button
                href={siteConfig.bookingUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full max-w-[320px]"
              >
                {BOOKING_LABEL}
              </Button>
            )}

            <p className="mt-6 text-sm text-strong">
              Or email <CopyEmail email={siteConfig.email} />
            </p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-caption font-medium tracking-[0.1em] text-subtle uppercase">{copy.contact.hintTitle}</p>
              <ul className="mt-3 grid gap-2 text-small text-muted">
                {copy.contact.hints.map((hint) => (
                  <li key={hint} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-label" />
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-small text-muted">
              {copy.shared.typicalStart}
            </p>
          </div>

          <ContactForm />
        </div>
      </AnimatedReveal>
    </Section>
  );
}
