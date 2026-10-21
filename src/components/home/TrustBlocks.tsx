import { getContent } from "@/i18n/server";
import { filled, todoLabel } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { DevTodo } from "@/components/ui/DevTodo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Support and Security. Only filled items render; a block with none is hidden, and the whole section is
 * hidden in production until something is filled. In development open TODOs show as dashed notes.
 */
export async function TrustBlocks() {
  const { trust } = await getContent();
  const blocks = trust.blocks
    .map((block) => ({
      ...block,
      shown: block.items.filter((item) => filled(item.text) || todoLabel(item.text)),
    }))
    .filter((block) => block.shown.length > 0);
  if (blocks.length === 0) return null;

  return (
    <Section id="trust" labelledBy="trust-title">
      <SectionHeading id="trust-title" eyebrow={trust.eyebrow} title={trust.title} />
      <div className="relative z-[1] grid gap-5 md:grid-cols-2">
        {blocks.map((block, i) => (
          <AnimatedReveal key={block.id} delay={((i % 2) + 1) as 1 | 2}>
            <div className="card h-full">
              <h3 className="text-[22px] font-bold tracking-[-0.03em]">{block.title}</h3>
              <p className="mt-2 text-body leading-[1.6] text-muted">{block.intro}</p>
              <dl className="mt-5 grid gap-4">
                {block.shown.map((item) => (
                  <div key={item.title} className="border-t border-line pt-4">
                    <dt className="text-body font-bold text-white">{item.title}</dt>
                    <dd className="mt-1 text-small leading-[1.6] text-muted">
                      {filled(item.text) ? item.text : <DevTodo value={item.text} />}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </Section>
  );
}
