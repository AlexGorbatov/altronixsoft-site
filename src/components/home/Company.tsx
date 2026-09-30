import { principles } from "@/data/company";
import { siteConfig } from "@/data/site";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";

export function Company() {
  return (
    <Section id="company" tone="deep" labelledBy="company-title">
      <AnimatedReveal>
        <div className="relative grid gap-10 overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(135deg,rgba(17,29,53,.92),rgba(17,24,52,.8))] p-6 after:pointer-events-none after:absolute after:-top-[120px] after:-right-[100px] after:size-[360px] after:rounded-full after:bg-[rgba(139, 92, 246,.12)] after:blur-[40px] after:content-[''] sm:p-[38px] lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="relative z-[1]">
            <div className="eyebrow">Company</div>
            <h2
              id="company-title"
              className="mt-[14px] mb-[18px] text-[34px] leading-[1.08] font-bold tracking-[-0.045em] sm:text-[40px]"
            >
              Senior-led. Focused by design.
            </h2>
            <p className="text-[15px] leading-[1.72] text-muted">
              Altronix Software is a focused engineering studio. We stay close to architecture,
              implementation and client decisions, bringing in trusted specialists when a project
              requires additional expertise.
            </p>
            <p className="mt-4 text-[15px] leading-[1.72] text-ink">
              Clients work directly with the people responsible for the result.
            </p>

            <figure className="mt-7 flex items-start gap-4 border-t border-line pt-6">
              <ImagePlaceholder src={siteConfig.founder.photo} alt={siteConfig.founder.name} initials="OG" />
              <div>
                <blockquote className="text-sm leading-[1.65] text-[#9ba8bb]">
                  I&apos;ve spent 16+ years building enterprise software, integrations and backend
                  systems. Today I apply that experience to modern software and practical AI solutions.
                </blockquote>
                <figcaption className="mt-3 text-[13px]">
                  <strong className="font-bold text-white">{siteConfig.founder.name}</strong>
                  <span className="text-subtle"> · {siteConfig.founder.role}</span>
                </figcaption>
              </div>
            </figure>
          </div>

          <ol className="relative z-[1] grid content-start gap-3">
            {principles.map((principle, i) => (
              <li key={principle.title} className="rounded-xl border border-line bg-[rgba(5,12,25,.28)] p-[18px] pr-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-medium text-[#79dbe7]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-bold">{principle.title}</h3>
                </div>
                <p className="mt-2 pl-[26px] text-[13px] leading-[1.55] text-[#93a1b6]">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
