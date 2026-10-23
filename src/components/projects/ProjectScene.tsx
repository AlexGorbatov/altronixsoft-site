import type { ProjectVisual } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ActiveWhenVisible } from "./ActiveWhenVisible";
import { Scene, VIEWBOX } from "./scenes";

interface ProjectSceneProps {
  variant: ProjectVisual;
  className?: string;
}

/**
 * One animated isometric scene per project. Decorative only: no real UI, data or client marks, hidden from
 * assistive technology (a card carries its title and status as text). It fills its container and keeps its
 * aspect ratio; wrap it in `ActiveWhenVisible` (or use `ScenePanel`) so it only animates while on screen.
 */
export function ProjectScene({ variant, className }: ProjectSceneProps) {
  return (
    <svg
      viewBox={VIEWBOX[variant]}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      focusable="false"
      className={cn("block", className)}
    >
      <Scene variant={variant} />
    </svg>
  );
}

/** A scene on its own: the dark panel used on the case page. The panel keeps the scene's ratio, so nothing shifts. */
export function ScenePanel({ variant, className }: ProjectSceneProps) {
  return (
    <ActiveWhenVisible
      className={cn(
        "rounded-xl border border-line bg-[radial-gradient(ellipse_at_50%_45%,#10203f,#0a1224)] p-2 sm:p-2.5",
        className,
      )}
    >
      <ProjectScene variant={variant} className="aspect-[400/240] size-full" />
    </ActiveWhenVisible>
  );
}
