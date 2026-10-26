import { getContent } from "@/i18n/server";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { AboutStats } from "./about/AboutStats";

const subtitle = "mono-label text-label";

/**
 * "Who we are": one gradient card in two columns. Left: who we are and key numbers.
 * Right: how we operate. About the company, not about one person.
 */
export async function Company() {
  const { about } = await getContent();
  return (
    <Section id="about" tone="deep" labelledBy="about-title">
      <AnimatedReveal>
        <div className="relative grid gap-10 overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(135deg,rgba(17,29,53,.92),rgba(17,24,52,.8))] p-6 after:pointer-events-none after:absolute after:-top-[120px] after:-right-[100px] after:size-[360px] after:rounded-full after:bg-[rgba(139,92,246,.065)] after:blur-[40px] after:content-[''] sm:p-[38px] lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="relative z-[1] grid content-center gap-8">
            <div>
              <div className="eyebrow">{about.eyebrow}</div>
              <h2
                id="about-title"
                className="mt-[14px] mb-[18px] text-[32px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[44px]"
              >
                {about.title}
              </h2>
              <p className="max-w-[68ch] text-body leading-[1.72] text-muted">{about.lead}</p>
            </div>

            <AboutStats />
          </div>

          <div className="relative z-[1] grid content-center gap-7">
            <div>
              <h3 className={subtitle}>{about.operateTitle}</h3>
              <ol className="mt-3 grid">
                {about.operate.map((item, i) => (
                  <li key={item.title} className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-2">
                    <span className="font-mono text-caption leading-[1.9] font-medium text-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-[16px] leading-[1.35] font-bold">{item.title}</h4>
                      <p className="mt-1 text-small leading-[1.6] text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
