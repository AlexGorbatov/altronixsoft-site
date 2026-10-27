import { getContent } from "@/i18n/server";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";

/**
 * A slim band, not a full section: supporting context for the work below. On desktop the heading comes first and the
 * industries wrap in three columns after it; on phones and tablets it is a plain list under the heading.
 */
export async function Industries() {
  const { industries, copy } = await getContent();
  return (
    <Section id="industries" labelledBy="industries-title" compact>
      <AnimatedReveal className="relative z-[1]">
        <div className="border-y border-line lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.4fr)]">
          <div className="border-b border-line py-6 lg:border-b-0 lg:border-r lg:pr-6">
            <div className="eyebrow">{copy.industries.eyebrow}</div>
            <h2 id="industries-title" className="mt-3 text-xl leading-[1.25] font-bold tracking-[-0.02em]">
              {copy.industries.title}
            </h2>
          </div>
          <ul className="grid divide-y divide-line lg:grid-cols-3 lg:divide-y-0">
            {industries.map((industry) => (
              <li
                key={industry.id}
                className="py-5 lg:border-l lg:border-line lg:px-6 lg:py-6 lg:nth-[3n+1]:border-l-0 lg:nth-[n+4]:border-t"
              >
                <h3 className="text-base leading-[1.3] font-bold">{industry.title}</h3>
                <p className="mt-2 text-small leading-[1.6] text-muted">{industry.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
