import { siteConfig } from "@/data/site";
import { getContent } from "@/i18n/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Section } from "@/components/ui/Section";

export async function FinalCTA() {
  const { lang, copy, requestTypes } = await getContent();
  const section = copy.contactSection;
  return (
    <Section id="contact" tone="alt" labelledBy="cta-title" compact>
      <AnimatedReveal>
        <div className="relative grid items-start gap-6 overflow-hidden rounded-3xl border border-white/[.12] bg-[radial-gradient(600px_300px_at_100%_0%,rgba(139,92,246,.1),transparent_70%),linear-gradient(120deg,#0d1b35,#161838_65%,#211c36)] p-5 sm:gap-8 sm:p-[42px] lg:grid-cols-[.85fr_1.15fr] lg:gap-x-14 lg:p-[56px]">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="eyebrow">{section.eyebrow}</div>
            <h2 id="cta-title" className="mt-3 text-[28px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[44px]">
              {section.title}
            </h2>
            <p className="mt-3 leading-[1.7] text-strong">{section.text}</p>
            <p className="mt-4 text-small leading-[1.7] text-muted lg:hidden">{section.nextText}</p>
          </div>

          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactForm lang={lang} form={copy.form} requestTypes={requestTypes} />
          </div>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <h3 className="hidden text-body font-semibold lg:block">{section.nextTitle}</h3>
            <p className="mt-2 hidden text-small leading-[1.7] text-muted lg:block">{section.nextText}</p>
            {siteConfig.bookingUrl && (
              <Button href={siteConfig.bookingUrl} variant="secondary" target="_blank" rel="noopener noreferrer" className="mt-5 w-full sm:w-auto">
                {section.booking}
              </Button>
            )}
            <p className="mt-5 text-sm text-strong">
              {section.orEmail}{" "}
              <CopyEmail email={siteConfig.email} labels={{ copy: copy.ui.copyEmail, copied: copy.ui.emailCopied, status: copy.ui.copied }} />
            </p>
            <div className="mt-5 border-t border-white/10 pt-4">
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
          </div>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
