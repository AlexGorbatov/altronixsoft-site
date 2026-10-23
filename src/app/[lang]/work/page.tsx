import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectList, ViewToggle } from "@/components/projects/PortfolioView";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { contactHref } from "@/data/site";
import { hasLocale, localizedPath } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { warnIfDraft } from "@/lib/cases";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { copy } = contentFor(lang);
  return pageMetadata({
    lang,
    title: copy.portfolio.page.metaTitle,
    description: copy.portfolio.page.metaDescription,
    path: "/work",
  });
}

/** The whole portfolio: every project as a card, as tiles or as a list (?view=list). */
export default async function PortfolioPage() {
  const { lang, copy, projects } = await getContent();
  const { page, next } = copy.portfolio;
  warnIfDraft(projects);

  const items = projects.map((project, index) => ({
    slug: project.slug,
    node: <ProjectCard project={project} index={index} size="standard" lang={lang} copy={copy.portfolio} />,
  }));

  return (
    <PageShell backdrop>
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4">
          <p className="mono-label flex items-center gap-[10px] text-label">
            <span aria-hidden="true" className="size-2 rounded-full bg-cyan" />
            {page.eyebrow}
          </p>
          <h1 className="text-[44px] leading-[1.02] font-extrabold tracking-[-0.045em] lg:text-[72px]">{page.title}</h1>
        </div>
        <div className="flex flex-col items-start gap-[14px] lg:max-w-[520px] lg:items-end">
          <p className="text-base leading-[1.55] text-muted lg:text-right">{page.description}</p>
          <ViewToggle labels={page.view} />
        </div>
      </header>

      <section aria-labelledby="all-projects" className="mt-8 lg:mt-12">
        <h2 id="all-projects" className="sr-only">
          {page.listLabel}
        </h2>
        <ProjectList
          label={page.listLabel}
          items={items}
          footer={
            <Link
              href={localizedPath(lang, contactHref())}
              className="group flex min-h-[250px] flex-col justify-between rounded-2xl border border-dashed border-white/[.22] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.02)_0_10px,transparent_10px_20px)] p-[22px] transition-colors hover:border-white/50 lg:min-h-0 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-8"
            >
              <span className="mono-label whitespace-nowrap text-label">
                {String(projects.length + 1).padStart(2, "0")} · {next.label}
              </span>
              <span className="block lg:max-w-[640px] lg:flex-1">
                <span className="mb-[10px] block text-[22px] leading-[1.2] font-bold tracking-[-0.03em]">{next.title}</span>
                <span className="mb-4 block text-small leading-[1.55] text-muted">{next.text}</span>
                <span className="inline-flex items-center gap-2 text-small font-bold text-cyan">
                  {copy.ui.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </span>
            </Link>
          }
        />
        <p className="mt-6 text-caption leading-[1.6] text-subtle lg:mt-8">{copy.work.diagramNote}</p>
      </section>
    </PageShell>
  );
}
