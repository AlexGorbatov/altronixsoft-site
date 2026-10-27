/**
 * Hero background: an automation canvas that pans sideways. One segment (SEGMENT_W wide) is a trigger that
 * fans out to three parallel checks, merges into a rules step and ends in an action, then the next segment
 * begins. Nodes name the kinds of systems the studio works on; no client names, no real data. A short
 * "next iteration" wire closes the loop from production back to the next business need.
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

export const SEGMENT_W = 1120;
export const FRAME_H = 560;
/** Room for the icon and full translated labels, including the enlarged mobile text. */
export const FLOW_CARD_WIDTH = 250;
// Grow around the existing centre so captions keep their distance from the next column.
const CARD_X = 336 - FLOW_CARD_WIDTH / 2;
const CARD_RIGHT = CARD_X + FLOW_CARD_WIDTH;
/** Seconds for the camera to pan one full segment; also the loop length of every pulse and glow. */
export const CYCLE_S = 26;
/** Window x (in canvas px) where a source node is when its pulse leaves. Tuned for a ~560px frame. */
export const LAUNCH_X = 330;
export const PULSE_S = CYCLE_S * 0.08;

const ROWS = [112, 276, 440] as const;
// Mirror the output curve's handles across the shorter input gap without moving any nodes.
const INPUT_GAP = CARD_X - 132;
const INPUT_CENTER_HANDLE = 132 + INPUT_GAP * (60 / 146);
const INPUT_ROW_HANDLE = CARD_X - INPUT_GAP * (76 / 146);
const checks = [
  { id: "erp", icon: "data", label: "SAP Commerce", sub: "Orders and catalog" },
  { id: "crm", icon: "people", label: "ERP and CRM", sub: "Customers and stock" },
  { id: "docs", icon: "docs", label: "Documents", sub: "Knowledge and policies" },
] as const;

const engineeringSteps = [
  { icon: "action", label: "Custom software", sub: "Java and Spring" },
  { icon: "data", label: "Integrations", sub: "REST, SOAP, events" },
  { icon: "rules", label: "AI automation", sub: "Agents and RAG" },
] as const;

export const flowNodes: FlowNode[] = [
  { id: "trigger", kind: "square", icon: "request", x: 68, cy: 276, label: "Business need", sub: "Goal and constraints" },
  ...ROWS.map((cy, i): FlowNode => ({ id: `agent${i}`, kind: "card", x: CARD_X, cy, ...engineeringSteps[i] })),
  ...ROWS.map((cy, i): FlowNode => ({ id: checks[i].id, kind: "square", icon: checks[i].icon, x: 500, cy, label: checks[i].label, sub: checks[i].sub })),
  { id: "rules", kind: "square", icon: "rules", x: 710, cy: 276, label: "CI/CD", sub: "Tests and reviews" },
  { id: "action", kind: "square", icon: "action", x: 900, cy: 276, label: "Production", sub: "Live and monitored" },
];

export const flowLinks: FlowLink[] = [
  ...ROWS.map((cy, i): FlowLink => ({ d: `M132 276 C ${INPUT_CENTER_HANDLE} 276, ${INPUT_ROW_HANDLE} ${cy}, ${CARD_X} ${cy}`, srcX: 132, to: `agent${i}` })),
  ...ROWS.map((cy, i): FlowLink => ({ d: `M${CARD_RIGHT} ${cy} H 500`, srcX: CARD_RIGHT, to: checks[i].id })),
  ...ROWS.map((cy): FlowLink => ({ d: `M564 ${cy} C 640 ${cy}, 650 276, 710 276`, srcX: 564, to: "rules" })),
  { d: "M774 276 H 900", srcX: 774, to: "action" },
  { d: `M964 276 H ${SEGMENT_W}`, srcX: 964, to: "trigger" },
  { d: "M0 276 H 68", srcX: 0, to: "trigger" },
];

/** The caption over the wire from production back to the next business need, centred in its gap. */
export const flowLoop = { label: "Next iteration" };
export const LOOP_LABEL_X = (964 + SEGMENT_W) / 2;
export const LOOP_LABEL_Y = 262;

const SPEED = SEGMENT_W / CYCLE_S;
/** Delay (s) at which a pulse leaving `srcX` should start so it runs while that node is inside the frame. */
export const pulseDelay = (srcX: number) => (((srcX - LAUNCH_X) / SPEED) % CYCLE_S + CYCLE_S) % CYCLE_S;

/**
 * Static scene: the pulses run in sequence from the trigger to the action, then the loop restarts.
 * Index = order of the stage by its source x.
 */
export const STATIC_STAGES: Record<number, number> = { 132: 0, [CARD_RIGHT]: 1, 564: 2, 774: 3, 964: 4 };
export const STATIC_STEP_S = 1.3;
