import { principles, teamModel } from "@/data/company";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

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
              Senior engineers. Focused by design.
            </h2>
            <p className="text-[15px] leading-[1.72] text-muted">
              Altronix Software is an engineering company built around a small senior core team. We own
              architecture, implementation and client decisions, and bring in trusted specialists when a
              project requires additional expertise.
            </p>
            <p className="mt-4 text-[15px] leading-[1.72] text-ink">
              Clients work directly with the people responsible for the result.
            </p>

            <dl className="mt-7 grid gap-5 border-t border-line pt-6">
              {teamModel.map((group) => (
                <div key={group.title}>
                  <dt className="text-[15px] font-bold text-white">{group.title}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.6] text-[#9ba8bb]">{group.description}</dd>
                  <dd>
                    <ul className="mt-3 flex flex-wrap gap-[7px]" aria-label={`${group.title} roles`}>
                      {group.roles.map((role) => (
                        <li key={role}>
                          <Tag>{role}</Tag>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
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
