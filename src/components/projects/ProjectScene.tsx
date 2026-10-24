import type { ProjectVisual } from "@/data/projects";
import { FramedCard, type FrameAccent } from "@/components/ui/FramedCard";
import { AgentFlow } from "./AgentFlow";
import { CrmFlow } from "./CrmFlow";
import { HybrisFlow } from "./HybrisFlow";
import { LobbyFlow } from "./LobbyFlow";
import { NexusCardFlow } from "./NexusCardFlow";
import { NexusFlow } from "./NexusFlow";
import { PayFlow } from "./PayFlow";
import { PimFlow } from "./PimFlow";
import { RagFlow } from "./RagFlow";
import styles from "./ProjectScene.module.css";
import type { SceneLabels } from "./scenes";

/** The colour of a project's status; it also colours the frame of the picture on the case page. */
export type Accent = "violet" | "green" | "cyan";

interface DiagramProps {
  variant: ProjectVisual;
  /** The names on the picture, in the language of the page. */
  labels: SceneLabels;
  /** `card`: the compact diagram of a project card. `panel`: the full diagram of the case page. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * One animated, flat architecture diagram per project (see FlowDiagram): how the system is built and how a request
 * moves through it. Decorative for assistive technology on a card (the card carries the title, the status and the
 * chain of names as text) and described on the case page. Free of real UI, data or client marks. Wrap it in
 * `ActiveWhenVisible` (or use `ScenePanel`) so it only animates while on screen.
 */
function Diagram({ variant, labels, mode, className }: DiagramProps) {
  switch (variant) {
    case "shop":
      return <HybrisFlow labels={labels.hybrisFlow} mode={mode} className={className} />;
    case "chain":
      return mode === "card" ? <NexusCardFlow labels={labels.nexusFlow} className={className} /> : <NexusFlow labels={labels.nexusFlow} />;
    case "lobby":
      return <LobbyFlow labels={labels.lobbyFlow} mode={mode} className={className} />;
    case "agent":
      return <AgentFlow labels={labels.agentFlow} mode={mode} className={className} />;
    case "pim":
      return <PimFlow labels={labels.pimFlow} mode={mode} className={className} />;
    case "documents":
      return <RagFlow labels={labels.ragFlow} mode={mode} className={className} />;
    case "payments":
      return <PayFlow labels={labels.payFlow} mode={mode} className={className} />;
    case "logistics":
      return <CrmFlow labels={labels.crmFlow} mode={mode} className={className} />;
  }
}

/** The diagram on a project card. */
export function ProjectScene({ variant, labels, className }: Omit<DiagramProps, "mode">) {
  return <Diagram variant={variant} labels={labels} mode="card" className={className} />;
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

/** The diagram on its own: the panel on the case page, in the same frame of light as the project cards. */
export function ScenePanel({
  variant,
  labels,
  accent,
  className,
}: Omit<DiagramProps, "mode"> & { /** The colour of the frame. */ accent: Accent }) {
  return (
    <FramedCard
      accent={FRAME[accent]}
      className={className}
      innerClassName="isolate bg-[radial-gradient(ellipse_at_50%_55%,#0f2147,#0a1430_55%,#070f22)]"
    >
      <SceneBackdrop />
      <Diagram variant={variant} labels={labels} mode="panel" />
    </FramedCard>
  );
}
