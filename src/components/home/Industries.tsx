import { getContent } from "@/i18n/server";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Section } from "@/components/ui/Section";

/**
 * A slim band, not a full section: supporting context for the work below. The heading sits on its own row,
 * the industries below it in one row on desktop and a plain list on phones and tablets.
 */
export async function Industries() {
  const { industries, copy } = await getContent();
  return (
    <Section id="industries" labelledBy="industries-title" compact>
      <AnimatedReveal className="relative z-[1]">
        <div className="border-y border-line">
          <div className="border-b border-line py-6">
            <div className="eyebrow">{copy.industries.eyebrow}</div>
            <h2 id="industries-title" className="mt-3 text-base font-bold">
              {copy.industries.title}
            </h2>
          </div>
          <ul className="grid divide-y divide-line lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {industries.map((industry) => (
              <li key={industry.id} className="py-5 lg:px-6 lg:py-6 lg:first:pl-0 lg:last:pr-0">
                {/* Two lines of room on desktop, so the descriptions start at the same height. */}
                <h3 className="text-base leading-[1.3] font-bold lg:min-h-[2.6em]">{industry.title}</h3>
                <p className="mt-2 text-small leading-[1.6] text-muted">{industry.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedReveal>
    </Section>
  );
}
