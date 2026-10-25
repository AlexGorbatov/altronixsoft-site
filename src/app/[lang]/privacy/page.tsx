import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { filled } from "@/lib/todo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { privacy } = contentFor(lang);
  return pageMetadata({ lang, title: privacy.title, description: privacy.metaDescription, path: "/privacy" });
}

/** Unverified policy details stay internal in every environment. */
function Line({ text }: { text: string }) {
  if (filled(text)) return <p>{text}</p>;
  return null;
}

export default async function PrivacyPage() {
  const { lang, privacy } = await getContent();
  return (
    <PageShell>
      <article className="mx-auto max-w-[760px]">
        <Link href={localizedPath(lang, "/")} className="link-quiet">
          <span aria-hidden="true">←</span> {privacy.backHome}
        </Link>
        <h1 className="mt-4 text-[clamp(32px,10vw,36px)] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[52px]">{privacy.title}</h1>
        {filled(privacy.updated) && (
          <p className="mt-2 text-sm text-subtle">
            {privacy.updatedLabel}: {privacy.updated}
          </p>
        )}
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
