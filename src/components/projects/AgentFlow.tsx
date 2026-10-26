import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop, type Rect } from "./FlowDiagram";

export type AgentFlowLabels = Content["copy"]["portfolio"]["scene"]["agentFlow"];

type Block = "email" | "crm" | "rates" | "understand" | "enrich" | "price" | "policy" | "kc" | "approval" | "respond" | "record";
type Wire =
  | "emailIn" | "crmIn" | "ratesIn" | "uToE" | "eToP" | "pToPol"
  | "polToResp" | "polToAppr" | "kcToAppr" | "apprToResp" | "respToRec";

/** Cards and wide screens: the email comes in on the left, the durable workflow runs in the middle, the secured outcome is on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    email: { x: 12, y: 54, w: 140, h: 46 },
    crm: { x: 12, y: 114, w: 140, h: 46 },
    rates: { x: 12, y: 174, w: 140, h: 46 },
    understand: { x: 188, y: 54, w: 276, h: 46 },
    enrich: { x: 188, y: 114, w: 276, h: 46 },
    price: { x: 188, y: 174, w: 133, h: 46 },
    policy: { x: 331, y: 174, w: 133, h: 46 },
    kc: { x: 500, y: 40, w: 188, h: 40 },
    approval: { x: 500, y: 90, w: 188, h: 40 },
    respond: { x: 500, y: 140, w: 188, h: 40 },
    record: { x: 500, y: 190, w: 188, h: 40 },
  },
  edges: {
    emailIn: { from: "email", to: "understand", axis: "h" },
    crmIn: { from: "crm", to: "enrich", axis: "h" },
    ratesIn: { from: "rates", to: "price", axis: "h" },
    uToE: { from: "understand", to: "enrich", axis: "v" },
    eToP: { from: "enrich", to: "price", axis: "v", offA: -71.5 },
    pToPol: { from: "price", to: "policy", axis: "h" },
    polToResp: { from: "policy", to: "respond", axis: "h", mid: 482, offA: -8 },
    polToAppr: { from: "policy", to: "approval", axis: "h", mid: 482, offA: 8 },
    kcToAppr: { from: "kc", to: "approval", axis: "v" },
    apprToResp: { from: "approval", to: "respond", axis: "v" },
    respToRec: { from: "respond", to: "record", axis: "v" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 560],
  font: { title: 13, sub: 10.5 },
  panels: [],
  log: { x: 12, y: 514, w: 336 },
  rects: {
    email: { x: 12, y: 30, w: 336, h: 46 },
    understand: { x: 24, y: 128, w: 312, h: 46 },
    enrich: { x: 24, y: 186, w: 196, h: 46 },
    crm: { x: 232, y: 186, w: 104, h: 46 },
    price: { x: 24, y: 244, w: 196, h: 46 },
    rates: { x: 232, y: 244, w: 104, h: 46 },
    policy: { x: 24, y: 302, w: 312, h: 46 },
    kc: { x: 12, y: 384, w: 104, h: 46 },
    approval: { x: 128, y: 384, w: 104, h: 46 },
    respond: { x: 244, y: 384, w: 104, h: 46 },
    record: { x: 12, y: 452, w: 336, h: 46 },
  },
  edges: {
    emailIn: { from: "email", to: "understand", axis: "v" },
    crmIn: { from: "crm", to: "enrich", axis: "h" },
    ratesIn: { from: "rates", to: "price", axis: "h" },
    uToE: { from: "understand", to: "enrich", axis: "v", offA: -58 },
    eToP: { from: "enrich", to: "price", axis: "v" },
    pToPol: { from: "price", to: "policy", axis: "v", offB: -58 },
    polToAppr: { from: "policy", to: "approval", axis: "v" },
    // Out of the panel and across the gap under it.
    polToResp: { from: "policy", to: "respond", axis: "v", mid: 366, offA: 60 },
    kcToAppr: { from: "kc", to: "approval", axis: "h" },
    apprToResp: { from: "approval", to: "respond", axis: "h" },
    respToRec: { from: "respond", to: "record", axis: "v", mid: 441 },
  },
};

/** Phones (card) and the small picture of the list layout: six blocks, the approver's login among them, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 224],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 180, w: 336 },
  rects: {
    email: { x: 12, y: 24, w: 96, h: 44 },
    understand: { x: 132, y: 24, w: 96, h: 44 },
    price: { x: 252, y: 24, w: 96, h: 44 },
    kc: { x: 12, y: 112, w: 96, h: 44 },
    approval: { x: 132, y: 112, w: 96, h: 44 },
    policy: { x: 252, y: 112, w: 96, h: 44 },
  },
  edges: {
    emailIn: { from: "email", to: "understand", axis: "h" },
    uToE: { from: "understand", to: "price", axis: "h" },
    eToP: { from: "price", to: "policy", axis: "v" },
    polToAppr: { from: "policy", to: "approval", axis: "h" },
    kcToAppr: { from: "kc", to: "approval", axis: "h" },
  },
};

/**
 * The loop (12 s). First an ordinary request: a known customer, under the limits; the CRM and the rates answer, the
 * policy lets the quote through, the reply leaves and the CRM is written through the tool gateway. Then an email
 * carrying an injected discount: the price is the same as without it, the policy flags it, and an approver who signed
 * in through Keycloak decides.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "emailIn", at: 0 },
  { edge: "uToE", at: 0.85 },
  { edge: "crmIn", at: 0.85, reply: true },
  { edge: "eToP", at: 1.7 },
  { edge: "ratesIn", at: 1.7, reply: true },
  { edge: "pToPol", at: 2.55 },
  { edge: "polToResp", at: 3.4 },
  { edge: "respToRec", at: 4.25 },
  { edge: "emailIn", at: 6 },
  { edge: "uToE", at: 6.85 },
  { edge: "eToP", at: 7.7 },
  { edge: "pToPol", at: 8.55 },
  { edge: "polToAppr", at: 9.4 },
  { edge: "kcToAppr", at: 9.4, reply: true },
  { edge: "apprToResp", at: 10.25, reply: true },
  { edge: "respToRec", at: 11.1 },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "understand", at: 0.84 },
  { block: "enrich", at: 1.69 },
  { block: "price", at: 2.54 },
  { block: "policy", at: 3.39 },
  { block: "respond", at: 4.24 },
  { block: "record", at: 5.09 },
  { block: "understand", at: 6.84 },
  { block: "enrich", at: 7.69 },
  { block: "price", at: 8.54 },
  { block: "policy", at: 9.39 },
  { block: "kc", at: 9.4 },
  { block: "approval", at: 10.24 },
  { block: "respond", at: 11.09 },
];

function blocks(t: AgentFlowLabels): Record<Block, FlowBlock> {
  return {
    email: { title: t.customerEmail, sub: "SMTP" },
    crm: { title: "CRM", sub: "MCP" },
    rates: { title: t.ratesTitle, sub: "REST" },
    understand: { title: t.understand, sub: t.understandSub, accent: true },
    enrich: { title: t.enrich, sub: t.enrichSub, accent: true },
    price: { title: t.price, sub: t.priceSub },
    policy: { title: t.policy, sub: t.policySub },
    kc: { title: "Keycloak", sub: "OIDC · PKCE · roles", accent: true },
    approval: { title: t.approval, sub: t.approvalSub },
    respond: { title: t.respond, sub: t.respondSub, accent: true },
    record: { title: t.record, sub: t.recordSub },
  };
}

/** The tall layout has narrow blocks along the bottom: short names, no second line. */
function tallBlocks(t: AgentFlowLabels): Record<Block, FlowBlock> {
  return {
    ...blocks(t),
    email: { title: t.customerEmail, sub: "SMTP", centred: true },
    crm: { title: "CRM", sub: "MCP", centred: true },
    rates: { title: t.ratesTitle, sub: "REST", centred: true },
    kc: { title: "Keycloak", centred: true, accent: true },
    approval: { title: t.approvalShort, centred: true },
    respond: { title: t.respond, centred: true },
    record: { title: t.record, sub: t.recordSub, centred: true },
  };
}

function miniBlocks(t: AgentFlowLabels): Record<Block, FlowBlock> {
  const centre = (title: string, accent = false): FlowBlock => ({ title, centred: true, accent });
  return {
    ...blocks(t),
    email: centre(t.emailShort),
    understand: centre(t.understand, true),
    price: centre(t.price),
    policy: centre(t.policy),
    kc: centre("Keycloak", true),
    approval: centre(t.approvalShort),
  };
}

/**
 * The injected-discount email, in the second half of the loop: the policy and the approver are marked, because the
 * email carried something it must not (a flag that sends the quote to a person).
 */
function Flagged({ layout }: { layout: FlowLayout<Block, Wire> }) {
  const rim = (r: Rect | undefined) =>
    r && <rect className={`${flowStyles.degradedRim} ${flowStyles.phaseBLive}`} x={r.x} y={r.y} width={r.w} height={r.h} rx="11" />;
  return (
    <g>
      {rim(layout.rects.policy)}
      {rim(layout.rects.approval)}
    </g>
  );
}

interface AgentFlowProps {
  labels: AgentFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The AI workflow agent as a live architecture diagram, drawn only from the repository's README: an email is
 * understood by a model, enriched from the CRM over MCP, priced by code from carrier rates, routed by YAML policy to
 * an automatic quote or a human approval (an approver signed in through Keycloak), answered, and recorded through a
 * tool gateway that demands an approval token and an idempotency key. Email text can never change a price.
 */
export function AgentFlow({ labels: t, mode, className }: AgentFlowProps) {
  const shared = { hops: HOPS, flashes: FLASHES, log: [t.logAuto, t.logInjection] as [string, string] };
  if (mode === "card") {
    return (
      <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} extras={() => <Flagged layout={MINI} />} />
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={WIDE} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} extras={() => <Flagged layout={WIDE} />} />
      <FlowDiagram layout={TALL} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} extras={() => <Flagged layout={TALL} />} />
    </div>
  );
}
