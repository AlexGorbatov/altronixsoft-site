/**
 * Diagram canvases drawn by WorkflowFlow. A scene is one segment (SEGMENT_W wide): nodes joined by wires.
 * Two scenes exist: `commerceScene` (hero, panning) and `aiScene` (AI block, static). Generic and
 * illustrative only: no client names, no real data.
 */
export type NodeKind = "square" | "card";

export interface FlowNode {
  id: string;
  kind: NodeKind;
  icon:
    | "request"
    | "ai"
    | "data"
    | "people"
    | "docs"
    | "rules"
    | "action"
    | "storefront"
    | "platform"
    | "integration"
    | "payments"
    | "logistics";
  x: number; // left edge
  cy: number; // vertical centre
  label: string;
  sub: string;
  /** Caption split over several lines (used when one line would run into a wire). Replaces `sub`. */
  subLines?: string[];
}

export interface FlowLink {
  d: string;
  /** Segment-local x where the pulse starts (the source node's right edge). */
  srcX: number;
  /** Node that lights up when the pulse arrives. */
  to: string;
}

export interface FlowScene {
  nodes: FlowNode[];
  links: FlowLink[];
  /** Static scene: stage index by link `srcX`, so the pulses run in sequence. */
  staticStages: Record<number, number>;
  /** Static scene: the part of the canvas that is shown, in canvas px. */
  staticView: { x: number; y: number; w: number; h: number };
  /** Text alternative for the whole diagram. */
  label: string;
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

const aiNodes: FlowNode[] = [
  { id: "trigger", kind: "square", icon: "request", x: 68, cy: 276, label: "Request received", sub: "Trigger" },
  ...ROWS.map((cy, i): FlowNode => ({ id: `agent${i}`, kind: "card", icon: "ai", x: 270, cy, label: "AI agent", sub: "Understands request" })),
  ...ROWS.map((cy, i): FlowNode => ({ id: checks[i].id, kind: "square", icon: checks[i].icon, x: 500, cy, label: checks[i].label, sub: checks[i].sub })),
  { id: "rules", kind: "square", icon: "rules", x: 710, cy: 276, label: "Business rules", sub: "Human approval" },
  { id: "action", kind: "square", icon: "action", x: 900, cy: 276, label: "Action executed", sub: "Audit logged" },
];

const aiLinks: FlowLink[] = [
  ...ROWS.map((cy, i): FlowLink => ({ d: `M132 276 C 200 276, 200 ${cy}, 270 ${cy}`, srcX: 132, to: `agent${i}` })),
  ...ROWS.map((cy, i): FlowLink => ({ d: `M402 ${cy} H 500`, srcX: 402, to: checks[i].id })),
  ...ROWS.map((cy): FlowLink => ({ d: `M564 ${cy} C 640 ${cy}, 650 276, 710 276`, srcX: 564, to: "rules" })),
  { d: "M774 276 H 900", srcX: 774, to: "action" },
  { d: "M964 276 H 1200", srcX: 964, to: "trigger" },
  { d: "M0 276 H 68", srcX: 0, to: "trigger" },
];


/**
 * Static scene: the pulses run in sequence from the trigger to the action, then the loop restarts.
 * Index = order of the stage by its source x.
 */
export const aiScene: FlowScene = {
  nodes: aiNodes,
  links: aiLinks,
  staticStages: { 132: 0, 402: 1, 564: 2, 774: 3, 964: 4 },
  staticView: { x: 14, y: 50, w: 1022, h: 470 },
  label:
    "Diagram: a request goes to an AI agent, which checks the ERP, the CRM and policy documents. Business rules and human approval come next; only then is the action executed and written to an audit log.",
};

const TARGETS = [96, 216, 336, 456] as const;
const targets = [
  { id: "erp", icon: "data", label: "ERP", sub: "Orders and stock" },
  { id: "pim", icon: "docs", label: "PIM", sub: "Product data" },
  { id: "payments", icon: "payments", label: "Payments", sub: "Transactions" },
  { id: "logistics", icon: "logistics", label: "Logistics", sub: "Shipping and tracking" },
] as const;

const commerceNodes: FlowNode[] = [
  { id: "channels", kind: "square", icon: "storefront", x: 60, cy: 276, label: "Storefront & channels", sub: "Web · mobile · B2B" },
  { id: "platform", kind: "square", icon: "platform", x: 330, cy: 276, label: "Commerce platform", sub: "Catalog · cart · orders" },
  { id: "integration", kind: "square", icon: "integration", x: 600, cy: 276, label: "Integration layer", sub: "queues · retries · monitoring" },
  {
    id: "ai",
    kind: "card",
    icon: "ai",
    x: 380,
    cy: 96,
    label: "AI assistant",
    sub: "access control · audit log · human approval",
    subLines: ["access control", "audit log", "human approval"],
  },
  ...TARGETS.map((cy, i): FlowNode => ({ id: targets[i].id, kind: "square", icon: targets[i].icon, x: 900, cy, label: targets[i].label, sub: targets[i].sub })),
];

const commerceLinks: FlowLink[] = [
  { d: "M0 276 H60", srcX: 0, to: "channels" },
  { d: "M124 276 H330", srcX: 124, to: "platform" },
  { d: "M394 276 H600", srcX: 394, to: "integration" },
  // The AI assistant hangs off the integration layer: same governed access as every other consumer.
  { d: "M632 244 C 632 170, 590 96, 512 96", srcX: 632, to: "ai" },
  ...TARGETS.map((cy, i): FlowLink => ({ d: `M664 276 C 780 276, 790 ${cy}, 900 ${cy}`, srcX: 664, to: targets[i].id })),
];

/** Hero scene: how the commerce, data and logistics systems are connected, with AI as one governed consumer. */
export const commerceScene: FlowScene = {
  nodes: commerceNodes,
  links: commerceLinks,
  staticStages: { 0: 0, 124: 1, 394: 2, 632: 3, 664: 3 },
  staticView: { x: 20, y: 40, w: 980, h: 490 },
  label:
    "Diagram: storefront and channels connect to the commerce platform, then to an integration layer with queues, retries and monitoring, which links ERP, PIM, payments and logistics systems. An AI assistant attached to the integration layer works under access control, an audit log and human approval.",
};

const SPEED = SEGMENT_W / CYCLE_S;
/** Delay (s) at which a pulse leaving `srcX` should start so it runs while that node is inside the frame. */
export const pulseDelay = (srcX: number) => (((srcX - LAUNCH_X) / SPEED) % CYCLE_S + CYCLE_S) % CYCLE_S;

export const STATIC_STEP_S = 1.3;
