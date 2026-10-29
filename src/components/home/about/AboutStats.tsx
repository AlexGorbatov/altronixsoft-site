import { getContent } from "@/i18n/server";
import { CountUp } from "@/components/ui/CountUp";
import { DevTodo } from "@/components/ui/DevTodo";
import { filled, todoLabel } from "@/lib/todo";

/** Key numbers. Filled ones render as cards; open TODOs show as dashed notes in development only. */
export async function AboutStats() {
  const { about } = await getContent();
  const stats = about.stats.filter((stat) => filled(stat.value) || todoLabel(stat.value));
  if (stats.length === 0) return null;

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse">
          <dt className="mt-2 text-small leading-[1.45] text-muted">{stat.label}</dt>
          {filled(stat.value) ? (
            <dd className="bg-[image:var(--brand-gradient)] bg-clip-text text-[28px] leading-[1.1] font-extrabold tracking-[-0.04em] text-transparent sm:text-[44px]">
              <CountUp value={stat.value} />
            </dd>
          ) : (
            <dd>
              <DevTodo value={stat.value} />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
