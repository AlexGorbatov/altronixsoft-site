/**
 * Hero diagram: one input fans out to three engineering paths and integrations, merges into delivery
 * controls and ends in working software. Generic and illustrative: no client names or real data.
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
  /** Source node's right edge; identifies the connection's stage in the pulse sequence. */
  srcX: number;
  /** Node that lights up when the pulse arrives. */
  to: string;
}

/** Room for the icon and full translated labels, including the enlarged mobile text. */
export const FLOW_CARD_WIDTH = 250;
// Grow around the existing centre so captions keep their distance from the next column.
const CARD_X = 336 - FLOW_CARD_WIDTH / 2;
const CARD_RIGHT = CARD_X + FLOW_CARD_WIDTH;

const ROWS = [112, 276, 440] as const;
// Match the output handles, mirrored and scaled to the shorter input gap.
const INPUT_GAP = CARD_X - 132;
const INPUT_CENTER_HANDLE = 132 + INPUT_GAP * (60 / 146);
const INPUT_ROW_HANDLE = CARD_X - INPUT_GAP * (76 / 146);
const checks = [
  { id: "erp", icon: "data", label: "ERP and commerce", sub: "Orders and stock" },
  { id: "crm", icon: "people", label: "CRM and APIs", sub: "Customer data" },
  { id: "docs", icon: "docs", label: "Data and documents", sub: "Knowledge and policies" },
] as const;

const engineeringSteps = [
  { icon: "action", label: "Custom software", sub: "Business logic" },
  { icon: "data", label: "Integrations", sub: "APIs and data" },
  { icon: "rules", label: "Automation", sub: "Rules and AI" },
] as const;

export const flowNodes: FlowNode[] = [
  { id: "trigger", kind: "square", icon: "request", x: 68, cy: 276, label: "Business need", sub: "System input" },
  ...ROWS.map((cy, i): FlowNode => ({ id: `agent${i}`, kind: "card", x: CARD_X, cy, ...engineeringSteps[i] })),
  ...ROWS.map((cy, i): FlowNode => ({ id: checks[i].id, kind: "square", icon: checks[i].icon, x: 500, cy, label: checks[i].label, sub: checks[i].sub })),
  { id: "rules", kind: "square", icon: "rules", x: 710, cy: 276, label: "Delivery controls", sub: "Tests and approvals" },
  { id: "action", kind: "square", icon: "action", x: 900, cy: 276, label: "Working software", sub: "Deployed and monitored" },
];

export const flowLinks: FlowLink[] = [
  ...ROWS.map((cy, i): FlowLink => ({ d: `M132 276 C ${INPUT_CENTER_HANDLE} 276, ${INPUT_ROW_HANDLE} ${cy}, ${CARD_X} ${cy}`, srcX: 132, to: `agent${i}` })),
  ...ROWS.map((cy, i): FlowLink => ({ d: `M${CARD_RIGHT} ${cy} H 500`, srcX: CARD_RIGHT, to: checks[i].id })),
  ...ROWS.map((cy): FlowLink => ({ d: `M564 ${cy} C 640 ${cy}, 650 276, 710 276`, srcX: 564, to: "rules" })),
  { d: "M774 276 H 900", srcX: 774, to: "action" },
];

/**
 * Static scene: the pulses run in sequence from the trigger to the action, then the loop restarts.
 * Index = order of the stage by its source x.
 */
export const STATIC_STAGES: Record<number, number> = { 132: 0, [CARD_RIGHT]: 1, 564: 2, 774: 3 };
export const STATIC_STEP_S = 1.3;
