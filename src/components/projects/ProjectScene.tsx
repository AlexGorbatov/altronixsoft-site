import type { ProjectVisual } from "@/data/projects";
import { FramedCard, type FrameAccent } from "@/components/ui/FramedCard";
import { cn } from "@/lib/utils";
import styles from "./ProjectScene.module.css";
import type { Accent } from "./sceneKit";
import { buildScene, type SceneLabels } from "./scenes";

interface ProjectSceneProps {
  variant: ProjectVisual;
  /** The names on the picture, in the language of the page. */
  labels: SceneLabels;
  /** The colour of the project's status; it tints the central component, the main beams and the floor glow. */
  accent: Accent;
  className?: string;
}

/**
 * One animated isometric scene per project: how the application is built, drawn as glass blocks, beams of data
 * and named components. Decorative for assistive technology (a card carries its title and status as text), and
 * free of real UI, data or client marks. It fills its container and keeps its proportions, centred; wrap it in
 * `ActiveWhenVisible` (or use `ScenePanel`) so it only animates while on screen.
 */
export function ProjectScene({ variant, labels, accent, className }: ProjectSceneProps) {
  const { viewBox, node } = buildScene(variant, labels, accent);
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
      focusable="false"
      className={cn("block", className)}
    >
      {node}
    </svg>
  );
}

/** The light behind a scene: drifting fields of colour and a faint grain. Put it inside a positioned, clipped box. */
export function SceneBackdrop() {
  return (
    <>
      <div className={styles.aurora} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={styles.grain} aria-hidden="true" />
    </>
  );
}

const FRAME: Record<Accent, FrameAccent> = { violet: "violet", green: "green", cyan: "cyan" };

/** A scene on its own: the panel on the case page, in the same frame of light as the project cards. */
export function ScenePanel({ variant, labels, accent, className }: ProjectSceneProps) {
  return (
    <FramedCard
      accent={FRAME[accent]}
      className={className}
      innerClassName="isolate bg-[radial-gradient(ellipse_at_50%_55%,#0f2147,#0a1430_55%,#070f22)]"
    >
      <SceneBackdrop />
      <ProjectScene variant={variant} labels={labels} accent={accent} className="relative z-[1] aspect-[400/240] w-full" />
    </FramedCard>
  );
}
