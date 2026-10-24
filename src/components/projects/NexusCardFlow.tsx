import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop, type Rect } from "./FlowDiagram";
import type { NexusFlowLabels } from "./NexusFlow";

type Block =
  | "wallets" | "agents" | "live"
  | "gateway" | "router" | "cache" | "builder"
  | "yaci" | "koios" | "blockfrost" | "indexers"
  | "cardano" | "bitcoin" | "midnight" | "chains";
type Wire =
  | "walletsIn" | "agentsIn" | "liveOut" | "toRouter" | "toCache" | "toBuilder"
  | "toYaci" | "toKoios" | "toBlockfrost" | "toIndexers"
  | "yaciChain" | "koiosChain" | "blockfrostChain" | "indexersChain" | "indexersBitcoin" | "indexersMidnight";

/** The Nexus card from 640px up: the same flow as the case page, sized for a card. */
const WIDE: FlowLayout<Block, Wire> = {
  viewBox: [700, 300],
  bleed: 12,
  font: { title: 12.5, sub: 9.5 },
  panels: [{ rect: { x: 176, y: 22, w: 300, h: 210 }, title: "Nexus API", at: [190, 42] }],
  log: { x: 12, y: 252, w: 676 },
  rects: {
    wallets: { x: 12, y: 50, w: 140, h: 46 },
    agents: { x: 12, y: 112, w: 140, h: 46 },
    live: { x: 12, y: 174, w: 140, h: 46 },
    gateway: { x: 188, y: 54, w: 276, h: 46 },
    router: { x: 188, y: 114, w: 276, h: 46 },
    cache: { x: 188, y: 174, w: 133, h: 46 },
    builder: { x: 331, y: 174, w: 133, h: 46 },
    yaci: { x: 500, y: 40, w: 88, h: 40 },
    koios: { x: 500, y: 90, w: 88, h: 40 },
    blockfrost: { x: 500, y: 140, w: 88, h: 40 },
    indexers: { x: 500, y: 190, w: 88, h: 40 },
    cardano: { x: 608, y: 50, w: 80, h: 46 },
    bitcoin: { x: 608, y: 112, w: 80, h: 46 },
    midnight: { x: 608, y: 174, w: 80, h: 46 },
  },
  edges: {
    walletsIn: { from: "wallets", to: "gateway", axis: "h", mid: 164, offB: -8 },
    agentsIn: { from: "agents", to: "gateway", axis: "h", mid: 164 },
    liveOut: { from: "live", to: "gateway", axis: "h", mid: 164, offB: 8 },
    toRouter: { from: "gateway", to: "router", axis: "v" },
    toCache: { from: "router", to: "cache", axis: "v", offA: -71.5 },
    toBuilder: { from: "router", to: "builder", axis: "v", offA: 71.5 },
    toYaci: { from: "router", to: "yaci", axis: "h", mid: 482, offA: -9 },
    toKoios: { from: "router", to: "koios", axis: "h", mid: 482, offA: -3 },
    toBlockfrost: { from: "router", to: "blockfrost", axis: "h", mid: 482, offA: 3 },
    toIndexers: { from: "router", to: "indexers", axis: "h", mid: 482, offA: 9 },
    // Every upstream joins one bus to the chains: which provider serves which chain is not shown.
    yaciChain: { from: "yaci", to: "cardano", axis: "h", mid: 598 },
    koiosChain: { from: "koios", to: "cardano", axis: "h", mid: 598 },
    blockfrostChain: { from: "blockfrost", to: "cardano", axis: "h", mid: 598 },
    indexersChain: { from: "indexers", to: "cardano", axis: "h", mid: 598 },
    indexersBitcoin: { from: "indexers", to: "bitcoin", axis: "h", mid: 598 },
    indexersMidnight: { from: "indexers", to: "midnight", axis: "h", mid: 598 },
  },
};

/**
 * Phones and the small picture of the list layout: clients, the API with its cache, two upstreams (one of them
 * degraded) and the chains as one block. Names are product names or one short word, so they stay large.
 */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [360, 200],
  font: { title: 12, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 160, w: 336 },
  rects: {
    wallets: { x: 12, y: 34, w: 76, h: 44 },
    agents: { x: 12, y: 104, w: 76, h: 44 },
    gateway: { x: 100, y: 34, w: 84, h: 44 },
    cache: { x: 100, y: 104, w: 84, h: 44 },
    koios: { x: 196, y: 34, w: 72, h: 44 },
    yaci: { x: 196, y: 104, w: 72, h: 44 },
    chains: { x: 280, y: 34, w: 68, h: 114 },
  },
  edges: {
    walletsIn: { from: "wallets", to: "gateway", axis: "h" },
    agentsIn: { from: "agents", to: "gateway", axis: "h", mid: 94, offB: 8 },
    toCache: { from: "gateway", to: "cache", axis: "v" },
    toKoios: { from: "gateway", to: "koios", axis: "h" },
    toYaci: { from: "gateway", to: "yaci", axis: "h", mid: 190, offA: 8 },
    koiosChain: { from: "koios", to: "chains", axis: "h", offB: -35 },
    yaciChain: { from: "yaci", to: "chains", axis: "h", offB: 35 },
  },
};

/** The same loop as the case page: a wallet's request routed around a degraded Yaci, then an AI agent's cache hit. */
const HOPS: Hop<Wire>[] = [
  { edge: "walletsIn", at: 0 },
  { edge: "toRouter", at: 0.9 },
  { edge: "toKoios", at: 1.8 },
  { edge: "koiosChain", at: 2.7 },
  { edge: "koiosChain", at: 3.6, back: true, reply: true },
  { edge: "toKoios", at: 4.5, back: true, reply: true },
  { edge: "toRouter", at: 5.4, back: true, reply: true },
  { edge: "walletsIn", at: 6.3, back: true, reply: true },
  { edge: "agentsIn", at: 6.0 },
  { edge: "toRouter", at: 6.9 },
  { edge: "toCache", at: 7.8 },
  { edge: "toCache", at: 8.7, back: true, reply: true },
  { edge: "toRouter", at: 9.6, back: true, reply: true },
  { edge: "agentsIn", at: 10.5, back: true, reply: true },
];

const FLASHES: { block: Block; at: number }[] = [
  { block: "gateway", at: 0.8 },
  { block: "router", at: 1.7 },
  { block: "koios", at: 2.6 },
  { block: "cardano", at: 3.5 },
  { block: "chains", at: 3.5 },
  { block: "koios", at: 4.4 },
  { block: "router", at: 5.3 },
  { block: "gateway", at: 6.2 },
  { block: "wallets", at: 7.1 },
  { block: "gateway", at: 6.8 },
  { block: "router", at: 7.7 },
  { block: "cache", at: 8.6 },
  { block: "router", at: 9.5 },
  { block: "gateway", at: 10.4 },
  { block: "agents", at: 11.3 },
];

const UPSTREAMS = ["yaci", "koios", "blockfrost", "indexers"] as const;

function blocks(t: NexusFlowLabels): Record<Block, FlowBlock> {
  return {
    wallets: { title: t.wallets, sub: "REST · SDK" },
    agents: { title: t.agents, sub: "MCP" },
    live: { title: t.live, sub: "WebSocket" },
    gateway: { title: t.gateway, sub: t.gatewaySub, accent: true },
    router: { title: t.router, sub: t.routerSub, accent: true },
    cache: { title: t.cache, sub: t.cacheSub },
    builder: { title: t.builder, sub: t.builderSub },
    yaci: { title: "Yaci", centred: true },
    koios: { title: "Koios", centred: true },
    blockfrost: { title: "Blockfrost", centred: true },
    indexers: { title: t.indexers, centred: true },
    cardano: { title: "Cardano", centred: true },
    bitcoin: { title: "Bitcoin", centred: true },
    midnight: { title: "Midnight", centred: true },
    chains: { title: t.chains, centred: true },
  };
}

function miniBlocks(t: NexusFlowLabels): Record<Block, FlowBlock> {
  return {
    ...blocks(t),
    wallets: { title: "REST · SDK", centred: true },
    agents: { title: "MCP", centred: true },
    gateway: { title: "Nexus API", accent: true, centred: true },
    cache: { title: t.cache, centred: true },
  };
}

/**
 * Upstream health on top of the blocks: a dot per upstream, and in the first half of the loop Yaci degraded,
 * with its wire marked and crossed out while the request goes to Koios.
 */
function Health({ layout, toYaci, mark }: { layout: FlowLayout<Block, Wire>; toYaci: string; mark: [number, number] }) {
  const s = flowStyles;
  const yaci = layout.rects.yaci as Rect;
  const [mid, cy] = mark;
  return (
    <g>
      <path className={`${s.wireWarn} ${s.phaseA}`} d={toYaci} />
      <rect className={`${s.degradedRim} ${s.phaseA}`} x={yaci.x} y={yaci.y} width={yaci.w} height={yaci.h} rx="11" />
      <g className={s.phaseA}>
        <circle cx={mid} cy={cy} r="5.5" className={s.blockMark} />
        <path d={`M${mid - 2.3} ${cy - 2.3} L${mid + 2.3} ${cy + 2.3} M${mid + 2.3} ${cy - 2.3} L${mid - 2.3} ${cy + 2.3}`} className={s.blockCross} />
      </g>
      {UPSTREAMS.map((id) => {
        const r = layout.rects[id];
        if (!r) return null;
        const x = r.x + r.w - 8;
        const y = r.y + 8;
        return (
          <g key={id}>
            <circle className={s.ping} cx={x} cy={y} r="2.6" />
            <circle className={s.dot} cx={x} cy={y} r="2.6" />
            {id === "yaci" && <circle className={`${s.dotWarn} ${s.phaseA}`} cx={x} cy={y} r="2.8" />}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Nexus on its project card: a flat, live diagram of the request flow, the card-sized sibling of the case page's
 * NexusFlow. The full diagram from 640px up; a compact one on phones and in the list layout (see FlowDiagram.module.css).
 */
export function NexusCardFlow({ labels: t, className }: { labels: NexusFlowLabels; className?: string }) {
  const shared = { hops: HOPS, flashes: FLASHES, streams: [{ edge: "liveOut" as Wire, count: 3, back: true }], log: [t.logMiss, t.logHit] as [string, string] };
  return (
    <>
      <FlowDiagram
        layout={WIDE}
        blocks={blocks(t)}
        {...shared}
        className={cn(flowStyles.cardWide, className)}
        // The cross sits on Yaci's own stretch of wire, past the bus the four upstreams share.
        extras={(paths) => <Health layout={WIDE} toYaci={paths.toYaci} mark={[491, 60]} />}
      />
      <FlowDiagram
        layout={MINI}
        blocks={miniBlocks(t)}
        {...shared}
        className={cn(flowStyles.cardMini, className)}
        extras={(paths) => <Health layout={MINI} toYaci={paths.toYaci} mark={[190, 95]} />}
      />
    </>
  );
}
