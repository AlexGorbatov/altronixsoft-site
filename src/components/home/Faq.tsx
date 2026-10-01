import { Plus } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/data/faq";
import { BOOKING_LABEL, CONTACT_HREF, siteConfig } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Native <details> accordion: accessible, keyboard-friendly and needs no client JS. */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <SectionHeading
        id="faq-title"
        eyebrow="FAQ"
        title="Common questions."
        description="Short, direct answers. If yours isn't here, just ask."
      />

      <div className="relative z-[1] grid max-w-[860px] gap-3">
        {faqs.map((item) => (
          <AnimatedReveal key={item.question}>
            <details className="group rounded-xl border border-line bg-[rgba(13,24,44,.6)] transition-colors open:border-[rgba(129,157,255,.28)]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="size-4 shrink-0 text-label transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-[1.7] text-muted">{item.answer}</p>
            </details>
          </AnimatedReveal>
        ))}
      </div>

      <AnimatedReveal className="relative z-[1] mt-8">
        <div className="flex flex-wrap items-center gap-x-6 text-body text-muted">
          <span>Still have a question?</span>
          <Link href={CONTACT_HREF} className="text-link min-h-11">
            Write to us <span aria-hidden="true">→</span>
          </Link>
          {siteConfig.bookingUrl && (
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-link min-h-11">
              {BOOKING_LABEL} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </AnimatedReveal>
    </Section>
  );
}
