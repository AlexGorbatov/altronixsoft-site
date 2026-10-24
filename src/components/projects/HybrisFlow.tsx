import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { FlowDiagram, PipelineStages, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";

export type HybrisFlowLabels = Content["copy"]["portfolio"]["scene"]["hybrisFlow"];

type Block = "third" | "hub" | "core" | "solr" | "promo" | "checkout" | "occ" | "store" | "ci";
type Wire = "integrate" | "bulk" | "load" | "search" | "promote" | "order" | "api" | "serve" | "deploy";

/** Cards and wide screens: third parties on the left, the platform in the middle, the storefront on the right. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 324],
  font: { title: 12.5, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 282, w: 676, h: 34 },
  rects: {
    third: { x: 12, y: 66, w: 140, h: 46 },
    hub: { x: 12, y: 150, w: 140, h: 46 },
    core: { x: 188, y: 66, w: 276, h: 46 },
    solr: { x: 188, y: 150, w: 86, h: 46 },
    promo: { x: 283, y: 150, w: 86, h: 46 },
    checkout: { x: 378, y: 150, w: 86, h: 46 },
    occ: { x: 500, y: 66, w: 188, h: 46 },
    store: { x: 500, y: 150, w: 188, h: 46 },
    ci: { x: 12, y: 236, w: 676, h: 34 },
  },
  edges: {
    integrate: { from: "third", to: "core", axis: "h", mid: 164, offB: -8 },
    bulk: { from: "third", to: "hub", axis: "v" },
    load: { from: "hub", to: "core", axis: "h", mid: 164, offB: 8 },
    search: { from: "core", to: "solr", axis: "v", offA: -95 },
    promote: { from: "core", to: "promo", axis: "v" },
    order: { from: "core", to: "checkout", axis: "v", offA: 95 },
    api: { from: "core", to: "occ", axis: "h" },
    serve: { from: "occ", to: "store", axis: "v" },
    // Up through the gap between Solr and Promotions.
    deploy: { from: "ci", to: "core", axis: "v", offA: -71.5, offB: -47.5 },
  },
};

/** Phones (case page): the same flow from top to bottom. */
const TALL: FlowLayout<Block, Wire> = {
  viewBox: [360, 484],
  font: { title: 12, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 442, w: 336, h: 34 },
  rects: {
    third: { x: 12, y: 30, w: 160, h: 46 },
    hub: { x: 188, y: 30, w: 160, h: 46 },
    core: { x: 24, y: 134, w: 312, h: 46 },
    solr: { x: 24, y: 212, w: 96, h: 46 },
    promo: { x: 132, y: 212, w: 96, h: 46 },
    checkout: { x: 240, y: 212, w: 96, h: 46 },
    occ: { x: 12, y: 324, w: 160, h: 46 },
    store: { x: 188, y: 324, w: 160, h: 46 },
    ci: { x: 12, y: 394, w: 336, h: 34 },
  },
  edges: {
    integrate: { from: "third", to: "core", axis: "v", mid: 117, offB: -60 },
    bulk: { from: "third", to: "hub", axis: "h" },
    load: { from: "hub", to: "core", axis: "v", mid: 117, offB: 60 },
    search: { from: "core", to: "solr", axis: "v", offA: -108 },
    promote: { from: "core", to: "promo", axis: "v" },
    order: { from: "core", to: "checkout", axis: "v", offA: 108 },
    // Down through the gap between Solr and Promotions, then across to the OCC block.
    api: { from: "core", to: "occ", axis: "v", mid: 312, offA: -54 },
    serve: { from: "occ", to: "store", axis: "h" },
    deploy: { from: "ci", to: "core", axis: "v", mid: 312, offB: 54 },
  },
};

/**
 * Phones (card): six blocks named by their products, which read the same in every language, and the log line.
 * Promotions, checkout and CI/CD are left out; the second half of the loop then only lights the core.
 */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 13, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336, h: 28 },
  rects: {
    third: { x: 12, y: 34, w: 108, h: 44 },
    core: { x: 130, y: 34, w: 108, h: 44 },
    occ: { x: 248, y: 34, w: 108, h: 44 },
    hub: { x: 12, y: 104, w: 108, h: 44 },
    solr: { x: 130, y: 104, w: 108, h: 44 },
    store: { x: 248, y: 104, w: 108, h: 44 },
  },
  edges: {
    integrate: { from: "third", to: "core", axis: "h", mid: 125, offB: -8 },
    bulk: { from: "third", to: "hub", axis: "v" },
    load: { from: "hub", to: "core", axis: "h", mid: 125, offB: 8 },
    search: { from: "core", to: "solr", axis: "v" },
    api: { from: "core", to: "occ", axis: "h" },
    serve: { from: "occ", to: "store", axis: "v" },
  },
};

const MINI_BLOCKS: Record<Block, FlowBlock> = {
  third: { title: "REST · SOAP", centred: true },
  hub: { title: "Data Hub", centred: true },
  core: { title: "SAP Hybris", accent: true, centred: true },
  solr: { title: "Solr", centred: true },
  promo: { title: "" },
  checkout: { title: "" },
  occ: { title: "OCC API", accent: true, centred: true },
  store: { title: "Spartacus", centred: true },
  ci: { title: "" },
};

/** The platform frame, around the core and its modules; its name sits where no wire crosses it. */
const PANELS = {
  wide: { rect: { x: 176, y: 32, w: 300, h: 180 }, at: [190, 52] as [number, number] },
  tall: { rect: { x: 12, y: 100, w: 336, h: 200 }, at: [24, 288] as [number, number] },
};

/**
 * The loop: a shopper's search goes from Spartacus through OCC to Solr and back; then a checkout goes through OCC
 * to the promotion rules and the order. Meanwhile third-party data keeps flowing in (REST/SOAP and Data Hub bulk
 * loads) and the CI/CD lane keeps deploying.
 */
const HOPS: Hop<Wire>[] = [
  { edge: "serve", at: 0, back: true },
  { edge: "api", at: 0.9, back: true },
  { edge: "search", at: 1.8 },
  { edge: "search", at: 2.7, back: true, reply: true },
  { edge: "api", at: 3.6, reply: true },
  { edge: "serve", at: 4.5, reply: true },
  { edge: "serve", at: 5.8, back: true },
  { edge: "api", at: 6.6, back: true },
  { edge: "promote", at: 7.4 },
  { edge: "promote", at: 8.2, back: true, reply: true },
  { edge: "order", at: 9.0 },
  { edge: "api", at: 9.9, reply: true },
  { edge: "serve", at: 10.8, reply: true },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "occ", at: 0.84 },
  { block: "core", at: 1.74 },
  { block: "solr", at: 2.64 },
  { block: "core", at: 3.54 },
  { block: "occ", at: 4.44 },
  { block: "store", at: 5.34 },
  { block: "occ", at: 6.64 },
  { block: "core", at: 7.44 },
  { block: "promo", at: 8.24 },
  { block: "core", at: 9.04 },
  { block: "checkout", at: 9.84 },
  { block: "occ", at: 10.74 },
  { block: "store", at: 11.64 },
];

const STREAMS: { edge: Wire; count: number }[] = [
  { edge: "integrate", count: 2 },
  { edge: "bulk", count: 3 },
  { edge: "load", count: 3 },
  { edge: "deploy", count: 1 },
];

function blocks(t: HybrisFlowLabels): Record<Block, FlowBlock> {
  return {
    third: { title: t.thirdParty, sub: "REST · SOAP" },
    hub: { title: "Data Hub", sub: t.dataHubSub },
    core: { title: t.core, sub: "Java 11 · Spring", accent: true },
    solr: { title: "Solr", sub: t.solrSub, centred: true },
    promo: { title: t.promotions, sub: t.promotionsSub, centred: true },
    checkout: { title: t.checkout, sub: t.checkoutSub, centred: true },
    occ: { title: "OCC API", sub: t.occSub, accent: true },
    store: { title: "Spartacus", sub: t.storefrontSub },
    ci: { title: t.cicd },
  };
}

interface HybrisFlowProps {
  labels: HybrisFlowLabels;
  /** `card`: the picture of a project card. `panel`: the case page. Each has its own phone layout. */
  mode: "card" | "panel";
  className?: string;
}

/**
 * The SAP Hybris e-commerce platform as a live architecture diagram, drawn only from the facts of the case study:
 * REST/SOAP integrations and Data Hub loads in, the commerce core with Solr, promotion rules and checkout, the OCC
 * web services out to the Spartacus storefront, and CI/CD builds.
 */
export function HybrisFlow({ labels: t, mode, className }: HybrisFlowProps) {
  const shared = { blocks: blocks(t), hops: HOPS, flashes: FLASHES, streams: STREAMS, log: [t.logSearch, t.logOrder] as [string, string] };
  const wide = { ...WIDE, panels: [{ ...PANELS.wide, title: "SAP Commerce (Hybris) 2011" }] };
  const tall = { ...TALL, panels: [{ ...PANELS.tall, title: "SAP Commerce (Hybris) 2011" }] };
  const wideStages = () => <PipelineStages x={636} y={253} />;

  if (mode === "card") {
    return (
      <>
        <FlowDiagram layout={wide} {...shared} className={cn(flowStyles.cardWide, className)} extras={wideStages} />
        <FlowDiagram layout={MINI} {...shared} blocks={MINI_BLOCKS} className={cn(flowStyles.cardMini, className)} />
      </>
    );
  }
  return (
    <div className={flowStyles.root}>
      <FlowDiagram layout={wide} {...shared} label={t.aria} className={flowStyles.wide} extras={wideStages} />
      <FlowDiagram layout={tall} {...shared} label={t.aria} className={flowStyles.tall} extras={() => <PipelineStages x={300} y={411} />} />
    </div>
  );
}
