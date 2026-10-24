import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type PayFlowLabels = Content["copy"]["portfolio"]["scene"]["payFlow"];

type Block = "web" | "kc" | "stripe" | "order" | "kafka" | "payment" | "db" | "bo" | "ops";
type Wire = "webIn" | "kcIn" | "orderToKafka" | "kafkaToPay" | "stripeIO" | "orderToDb" | "payToDb" | "boToPay" | "opsToPay";

/** Cards and wide screens: the web and Stripe on the left, the two services around Kafka in the middle, data and staff on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    web: { x: 12, y: 54, w: 130, h: 46 },
    kc: { x: 12, y: 114, w: 130, h: 46 },
    stripe: { x: 12, y: 174, w: 130, h: 46 },
    order: { x: 188, y: 54, w: 276, h: 46 },
    kafka: { x: 188, y: 114, w: 276, h: 46 },
    payment: { x: 188, y: 174, w: 276, h: 46 },
    db: { x: 500, y: 54, w: 188, h: 46 },
    bo: { x: 500, y: 114, w: 188, h: 46 },
    ops: { x: 500, y: 174, w: 188, h: 46 },
  },
  edges: {
    webIn: { from: "web", to: "order", axis: "h" },
    kcIn: { from: "kc", to: "order", axis: "h", mid: 166 },
    orderToKafka: { from: "order", to: "kafka", axis: "v" },
    kafkaToPay: { from: "kafka", to: "payment", axis: "v" },
    stripeIO: { from: "stripe", to: "payment", axis: "h" },
    orderToDb: { from: "order", to: "db", axis: "h" },
    payToDb: { from: "payment", to: "db", axis: "h", mid: 482, offA: -8 },
    boToPay: { from: "bo", to: "payment", axis: "h", mid: 482, offB: 8 },
    opsToPay: { from: "ops", to: "payment", axis: "h" },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 440],
  font: { title: 12, sub: 9.5 },
  panels: [{ rect: { x: 12, y: 100, w: 336, h: 206 }, title: "", at: [24, 118] }],
  log: { x: 12, y: 394, w: 336 },
  rects: {
    web: { x: 12, y: 30, w: 104, h: 46 },
    kc: { x: 128, y: 30, w: 104, h: 46 },
    order: { x: 24, y: 128, w: 312, h: 46 },
    kafka: { x: 24, y: 186, w: 312, h: 46 },
    payment: { x: 24, y: 244, w: 312, h: 46 },
    stripe: { x: 12, y: 330, w: 104, h: 46 },
    db: { x: 128, y: 330, w: 104, h: 46 },
    ops: { x: 244, y: 330, w: 104, h: 46 },
  },
  edges: {
    webIn: { from: "web", to: "order", axis: "v", mid: 110, offB: -60 },
    kcIn: { from: "kc", to: "order", axis: "v", mid: 110, offB: 60 },
    orderToKafka: { from: "order", to: "kafka", axis: "v" },
    kafkaToPay: { from: "kafka", to: "payment", axis: "v" },
    // Out of the panel and across the gap under it.
    stripeIO: { from: "stripe", to: "payment", axis: "v", mid: 318, offB: -60 },
    payToDb: { from: "payment", to: "db", axis: "v" },
    opsToPay: { from: "ops", to: "payment", axis: "v", mid: 318, offB: 60 },
  },
};

/** Phones (card) and the small picture of the list layout: six blocks in a snake, and the log line. */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336 },
  rects: {
    web: { x: 12, y: 34, w: 108, h: 44 },
    order: { x: 130, y: 34, w: 108, h: 44 },
    kafka: { x: 248, y: 34, w: 108, h: 44 },
    kc: { x: 12, y: 104, w: 108, h: 44 },
    stripe: { x: 130, y: 104, w: 108, h: 44 },
    payment: { x: 248, y: 104, w: 108, h: 44 },
  },
  edges: {
    webIn: { from: "web", to: "order", axis: "h" },
    kcIn: { from: "kc", to: "web", axis: "v" },
    orderToKafka: { from: "order", to: "kafka", axis: "h" },
    kafkaToPay: { from: "kafka", to: "payment", axis: "v" },
    stripeIO: { from: "stripe", to: "payment", axis: "h" },
  },
};

/**
 * The loop (12 s). First an order is paid: the web places it (the Keycloak token comes along), the order service
 * publishes an event through Kafka, the payment service creates a PaymentIntent at Stripe, the webhook comes back, and
 * PaymentSucceeded travels back to the order. Then an admin refund goes the same way through Stripe, and operations
 * staff look at the payment service.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "webIn", at: 0 },
  { edge: "kcIn", at: 0, reply: true },
  { edge: "orderToKafka", at: 0.85 },
  { edge: "orderToDb", at: 0.85 },
  { edge: "kafkaToPay", at: 1.7 },
  { edge: "stripeIO", at: 2.55, back: true },
  { edge: "stripeIO", at: 3.4, reply: true },
  { edge: "payToDb", at: 4.25 },
  { edge: "kafkaToPay", at: 4.25, back: true, reply: true },
  { edge: "orderToKafka", at: 5.1, back: true, reply: true },
  { edge: "boToPay", at: 6, back: true },
  { edge: "stripeIO", at: 6.85, back: true },
  { edge: "stripeIO", at: 7.7, reply: true },
  { edge: "kafkaToPay", at: 8.55, back: true, reply: true },
  { edge: "orderToKafka", at: 9.4, back: true, reply: true },
  { edge: "opsToPay", at: 10.25 },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "order", at: 0.84 },
  { block: "kafka", at: 1.69 },
  { block: "payment", at: 2.54 },
  { block: "stripe", at: 3.39 },
  { block: "payment", at: 4.24 },
  { block: "kafka", at: 5.09 },
  { block: "order", at: 5.94 },
  { block: "payment", at: 6.84 },
  { block: "stripe", at: 7.69 },
  { block: "payment", at: 8.54 },
  { block: "kafka", at: 9.39 },
  { block: "order", at: 10.24 },
  { block: "payment", at: 11.09 },
];

function blocks(t: PayFlowLabels): Record<Block, FlowBlock> {
  return {
    web: { title: t.webTitle, sub: "Next.js" },
    kc: { title: "Keycloak", sub: "OIDC · JWT · PKCE", accent: true },
    stripe: { title: "Stripe", sub: "webhooks · test" },
    order: { title: t.order, sub: t.orderSub, accent: true },
    kafka: { title: "Apache Kafka", sub: t.kafkaSub },
    payment: { title: t.payment, sub: t.paymentSub, accent: true },
    db: { title: "PostgreSQL", sub: t.dbSub },
    bo: { title: t.backoffice, sub: t.backofficeSub },
    ops: { title: t.ops, sub: t.opsSub },
  };
}

/** In the tall layout the blocks along the top and the bottom are narrow: names in the middle, no second line. */
function tallBlocks(t: PayFlowLabels): Record<Block, FlowBlock> {
  return {
    ...blocks(t),
    web: { title: t.webShort, centred: true },
    kc: { title: "Keycloak", centred: true, accent: true },
    stripe: { title: "Stripe", centred: true },
    db: { title: "PostgreSQL", centred: true },
    ops: { title: t.ops, centred: true },
  };
}

function miniBlocks(t: PayFlowLabels): Record<Block, FlowBlock> {
  const centre = (title: string, accent = false): FlowBlock => ({ title, centred: true, accent });
  return {
    ...blocks(t),
    web: centre(t.webShort),
    order: centre(t.orderShort, true),
    kafka: centre("Kafka"),
    kc: centre("Keycloak", true),
    stripe: centre("Stripe"),
    payment: centre(t.paymentShort, true),
  };
}

interface PayFlowProps {
  labels: PayFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The order and payment platform as a live architecture diagram, drawn only from the repository's README: a web
 * interface and Keycloak in front of two Spring Boot services that never call each other and talk through Kafka (with
 * an outbox and an inbox), Stripe called by background workers, PostgreSQL, and back-office and operations staff.
 */
export function PayFlow({ labels: t, mode, className }: PayFlowProps) {
  const wide = { ...WIDE, panels: [{ ...WIDE.panels[0], title: t.services }] };
  const tall = { ...TALL, panels: [{ ...TALL.panels[0], title: t.services }] };
  const shared = { hops: HOPS, flashes: FLASHES, log: [t.logPaid, t.logRefund] as [string, string] };
  if (mode === "card") {
    return (
      <>
        <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} className={cn(flowStyles.cardWide, className)} />
        <FlowDiagram layout={MINI} blocks={miniBlocks(t)} {...shared} className={cn(flowStyles.cardMini, className)} />
      </>
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={wide} blocks={blocks(t)} {...shared} label={t.aria} className={flowStyles.wide} />
      <FlowDiagram layout={tall} blocks={tallBlocks(t)} {...shared} label={t.aria} className={flowStyles.tall} />
    </div>
  );
}
