import Link from "next/link";
import type { Project, ProjectStatus } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { Content } from "@/i18n/content";
import { filled } from "@/lib/todo";
import { cn } from "@/lib/utils";
import { ActiveWhenVisible } from "./ActiveWhenVisible";
import { ProjectScene, SceneBackdrop } from "./ProjectScene";
import { sceneChain } from "./scenes";
import styles from "./ProjectCard.module.css";

const STATUS_CLASS: Record<ProjectStatus, string> = {
  nda: styles.nda,
  partner: styles.partner,
  "open-source": styles.openSource,
  own: styles.own,
  "in-development": styles.inDevelopment,
};

const MONO = "font-mono text-caption leading-[1.2] font-medium uppercase";

interface ProjectCardProps {
  project: Project;
  /** Zero-based position in the full portfolio; shown as 01–08. */
  index: number;
  /** `large`: 344px picture (home). `standard`: 290px picture (portfolio page). Phones get 250 / 200. */
  size: "large" | "standard";
  lang: Locale;
  copy: Content["copy"]["portfolio"];
}

/**
 * One project: a picture with its index and status, a caption of fixed height, a coloured frame by status.
 * With a real link the whole card is one `<a>`; without one (`href` still `TODO(owner)`) it is shown as it is,
 * with its status, and nothing on it pretends to open. Every card is the same size.
 */
export function ProjectCard({ project, index, size, lang, copy }: ProjectCardProps) {
  const linked = filled(project.href);
  const href = project.isExternal ? project.href : localizedPath(lang, project.href);
  const status = copy.status[project.status];

  return (
    <ActiveWhenVisible
      className={cn(
        styles.frame,
        STATUS_CLASS[project.status],
        linked ? styles.link : styles.static,
        linked && project.isExternal && styles.external,
      )}
    >
      <article className={cn(styles.inner, styles[size])}>
        <div className={styles.img}>
          <span aria-hidden="true" className={cn(MONO, "absolute top-[14px] left-4 z-[3] tracking-[0.12em] text-label")}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn(MONO, styles.badge, styles.onImage, "absolute top-[10px] right-3 z-[3] tracking-[0.08em]")}>
            <i aria-hidden="true" />
            {status}
          </span>
          <SceneBackdrop />
          <div className={styles.scene}>
            <ProjectScene variant={project.visual} labels={copy.scene} className="size-full" />
          </div>
        </div>

        <div className={cn(styles.cap, "flex min-h-[132px] flex-1 items-end justify-between gap-4 px-[18px] pt-4 pb-[18px] sm:px-6 sm:pt-5 sm:pb-[22px]")}>
          <div className="min-w-0">
            <h3 className={cn(styles.title, "text-xl leading-[1.2] font-bold tracking-[-0.03em] sm:text-2xl")}>{project.title}</h3>
            <p className="mt-2 min-h-[44px] text-small leading-[1.55] text-muted">{project.summary}</p>
            {/* The picture already names every step; the same chain stays in the page as text for screen readers. */}
            <p className="sr-only">
              {sceneChain(project.visual, copy.scene).join(" → ")}
            </p>
            <div className="mt-[10px] flex items-center gap-3">
              <span className={cn(MONO, "leading-relaxed tracking-[0.1em] text-subtle")}>{project.category}</span>
              {/* In the list layout the status sits here instead of on the picture. */}
              <span className={cn(MONO, styles.badge, styles.inline, "tracking-[0.08em]")}>
                <i aria-hidden="true" />
                {status}
              </span>
            </div>
          </div>
          {!linked && <span className="max-w-[112px] text-right text-caption leading-[1.35] text-subtle">{copy.noLink}</span>}
          {linked && (
            <span className={styles.go} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>

        {linked &&
          (project.isExternal ? (
            <a
              className={styles.stretch}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.openProjectExternal.replace("{title}", project.title)}
            />
          ) : (
            <Link className={styles.stretch} href={href} aria-label={copy.openProject.replace("{title}", project.title)} />
          ))}
      </article>
    </ActiveWhenVisible>
  );
}
