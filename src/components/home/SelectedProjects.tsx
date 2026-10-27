import Link from "next/link";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { Labs } from "./Labs";

/** The home page's featured portfolio, in the order of `projects` (AI work first). */
export async function SelectedProjects() {
  const { lang, copy, projects } = await getContent();
  const { home } = copy.portfolio;
  // The cards are numbered 01–04 by their place in this section; the /work page numbers the whole portfolio.
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div aria-hidden="true" className="grid-backdrop" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] -left-[100px] h-[500px] w-[600px] bg-[radial-gradient(closest-side,rgba(139,92,246,.06),transparent)] lg:-left-[200px]"
      />
      <Container className="relative">
        <AnimatedReveal className="mb-7 flex flex-col items-start gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-[14px] lg:gap-[18px]">
            <div className="eyebrow">{home.eyebrow}</div>
            <h2
              id="work-title"
              className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] lg:text-[64px]"
            >
              {home.title}
            </h2>
            <p className="max-w-[560px] text-base leading-[1.5] text-muted lg:text-lg">{home.description}</p>
          </div>
          <Link href={localizedPath(lang, "/work")} className="group inline-flex items-center gap-[10px]">
            <span className="inline-flex h-12 items-center rounded-full border border-white/[.28] px-[22px] text-small font-bold transition-colors group-hover:border-white/60">
              {home.viewAll}
            </span>
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-full border border-white/[.28] text-cyan transition-colors group-hover:border-cyan"
            >
              <svg className="-rotate-45" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </AnimatedReveal>

        <ul aria-label={home.listLabel} className="grid gap-[22px] lg:grid-cols-2 lg:gap-8">
          {featured.map((project, i) => (
            <li key={project.slug} className="min-w-0">
              <AnimatedReveal delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4} className="h-full">
                <ProjectCard project={project} index={i} size="large" lang={lang} copy={copy.portfolio} />
              </AnimatedReveal>
            </li>
          ))}
        </ul>

        <Labs />
      </Container>
    </section>
  );
}
