import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { privacy } from "@/data/privacy";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { DevTodo } from "@/components/ui/DevTodo";
import { filled } from "@/lib/todo";

export const metadata = pageMetadata({
  title: privacy.title,
  description: `How ${siteConfig.legalName} handles personal data sent through the contact form.`,
  path: "/privacy",
});

/** In development an open TODO shows as a dashed note so it is not forgotten; in production it is omitted. */
function Line({ text }: { text: string }) {
  if (filled(text)) return <p>{text}</p>;
  return <DevTodo value={text} className="block" />;
}

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-[760px]">
        <Link href="/" className="link-quiet">
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <h1 className="mt-4 text-[36px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{privacy.title}</h1>
        {filled(privacy.updated) && <p className="mt-2 text-sm text-subtle">Last updated: {privacy.updated}</p>}
        <p className="mt-6 text-[16px] leading-[1.75] text-muted">{privacy.intro}</p>

        {privacy.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-title`} className="mt-10">
            <h2 id={`${section.id}-title`} className="text-2xl font-bold tracking-[-0.03em]">
              {section.title}
            </h2>
            <div className="mt-3 grid gap-3 text-body leading-[1.75] text-muted">
              {section.body.map((text) => (
                <Line key={text} text={text} />
              ))}
              {section.bullets && (
                <ul className="list-disc pl-5">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </article>
    </PageShell>
  );
}
