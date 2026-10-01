/**
 * Hero background: an automation canvas that pans sideways. One segment (SEGMENT_W wide) is a trigger that
 * fans out to three parallel checks, merges into a rules step and ends in an action, then the next segment
 * begins. Generic and illustrative only: no client names, no real data.
 */
export type NodeKind = "square" | "card";

export interface FlowNode {
  id: string;
  kind: NodeKind;
  icon: "request" | "ai" | "data" | "people" | "docs" | "rules" | "action";
  x: number; // left edge
  cy: number; // vertical centre
  label: string;
  sub: string;
}

export interface FlowLink {
  d: string;
  /** Segment-local x where the pulse starts (the source node's right edge). */
  srcX: number;
  /** Node that lights up when the pulse arrives. */
  to: string;
}

export const SEGMENT_W = 1200;
export const FRAME_H = 560;
/** Seconds for the camera to pan one full segment; also the loop length of every pulse and glow. */
export const CYCLE_S = 20;
/** Window x (in canvas px) where a source node is when its pulse leaves. Tuned for a ~560px frame. */
export const LAUNCH_X = 330;
export const PULSE_S = 1.6;

const ROWS = [112, 276, 440] as const;
const checks = [
  { id: "erp", icon: "data", label: "Checks ERP", sub: "Orders and stock" },
  { id: "crm", icon: "people", label: "Checks CRM", sub: "Customer history" },
  { id: "docs", icon: "docs", label: "Checks documents", sub: "Policies" },
] as const;

export const flowNodes: FlowNode[] = [
  { id: "trigger", kind: "square", icon: "request", x: 68, cy: 276, label: "Request received", sub: "Trigger" },
  ...ROWS.map((cy, i): FlowNode => ({ id: `agent${i}`, kind: "card", icon: "ai", x: 270, cy, label: "AI agent", sub: "Understands request" })),
  ...ROWS.map((cy, i): FlowNode => ({ id: checks[i].id, kind: "square", icon: checks[i].icon, x: 500, cy, label: checks[i].label, sub: checks[i].sub })),
  { id: "rules", kind: "square", icon: "rules", x: 710, cy: 276, label: "Business rules", sub: "Human approval" },
  { id: "action", kind: "square", icon: "action", x: 900, cy: 276, label: "Action executed", sub: "Audit logged" },
];

export const flowLinks: FlowLink[] = [
  ...ROWS.map((cy, i): FlowLink => ({ d: `M132 276 C 200 276, 200 ${cy}, 270 ${cy}`, srcX: 132, to: `agent${i}` })),
  ...ROWS.map((cy, i): FlowLink => ({ d: `M402 ${cy} H 500`, srcX: 402, to: checks[i].id })),
  ...ROWS.map((cy): FlowLink => ({ d: `M564 ${cy} C 640 ${cy}, 650 276, 710 276`, srcX: 564, to: "rules" })),
  { d: "M774 276 H 900", srcX: 774, to: "action" },
  { d: "M964 276 H 1200", srcX: 964, to: "trigger" },
  { d: "M0 276 H 68", srcX: 0, to: "trigger" },
];

const SPEED = SEGMENT_W / CYCLE_S;
/** Delay (s) at which a pulse leaving `srcX` should start so it runs while that node is inside the frame. */
export const pulseDelay = (srcX: number) => (((srcX - LAUNCH_X) / SPEED) % CYCLE_S + CYCLE_S) % CYCLE_S;

/**
 * Static scene: the pulses run in sequence from the trigger to the action, then the loop restarts.
 * Index = order of the stage by its source x.
 */
export const STATIC_STAGES: Record<number, number> = { 132: 0, 402: 1, 564: 2, 774: 3, 964: 4 };
export const STATIC_STEP_S = 1.3;
