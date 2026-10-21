import Image from "next/image";
import { getContent } from "@/i18n/server";
import { filled } from "@/lib/todo";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

/**
 * Reference implementations. Rendered only when `labs.showLabs` is on AND at least one project has a
 * public demo or repository, so the block never shows up as a list of unverifiable names.
 */
export async function Labs() {
  const { labs, copy } = await getContent();
  const hasPublicProject = labs.projects.some((project) => filled(project.demoUrl) || filled(project.repoUrl));
  if (!labs.showLabs || !hasPublicProject) return null;

  return (
    <AnimatedReveal className="relative z-[1] mt-[18px]">
      <div className="rounded-2xl border border-line bg-[linear-gradient(110deg,rgba(26,124,251,.08),rgba(139,92,246,.08))] p-[22px] sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-extrabold">{labs.name}</h3>
          <span className="mono-label rounded-md border border-[rgba(34,214,244,.3)] px-2 py-[5px] text-caption text-label">
            {labs.eyebrow}
          </span>
        </div>
        <p className="mt-3 max-w-[620px] text-sm leading-[1.65] text-strong">{labs.description}</p>

        <ul className="mt-5 grid gap-3 md:grid-cols-3" aria-label={copy.ui.labsAria}>
          {labs.projects.map((project) => (
            <li key={project.title} className="overflow-hidden rounded-xl border border-line bg-white/[.02]">
              {filled(project.screenshot) && (
                <div className="relative aspect-[16/9] bg-[#0a1324]">
                  <Image src={project.screenshot} alt={copy.ui.screenshotAlt.replace("{title}", project.title)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-[#dbe4f1]">{project.title}</span>
                  <span className="mono-label text-caption text-label">{project.tag}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5">
                  {filled(project.demoUrl) && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
                      {copy.ui.liveDemo} <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {filled(project.repoUrl) && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
                      {copy.ui.repository} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedReveal>
  );
}
