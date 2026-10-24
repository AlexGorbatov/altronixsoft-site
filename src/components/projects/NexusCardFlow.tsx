import { cn } from "@/lib/utils";
import { FlowDiagram, flowStyles, type FlowBlock, type FlowLayout, type Hop } from "./FlowDiagram";
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

/**
 * Phones and the small picture of the list layout: clients, the API with its cache, two upstreams
 * and the chains as one block. Names are product names or one short word, so they stay large.
 */
const MINI: FlowLayout<Block, Wire> = {
  viewBox: [390, 224],
  font: { title: 13, sub: 9.5 },
  panels: [],
  log: { x: 12, y: 180, w: 366 },
  rects: {
    wallets: { x: 12, y: 24, w: 76, h: 44 },
    agents: { x: 12, y: 112, w: 76, h: 44 },
    gateway: { x: 110, y: 24, w: 84, h: 44 },
    cache: { x: 110, y: 112, w: 84, h: 44 },
    koios: { x: 216, y: 24, w: 72, h: 44 },
    yaci: { x: 216, y: 112, w: 72, h: 44 },
    chains: { x: 310, y: 24, w: 68, h: 132 },
  },
  edges: {
    walletsIn: { from: "wallets", to: "gateway", axis: "h" },
    agentsIn: { from: "agents", to: "gateway", axis: "h", mid: 99, offB: 8 },
    toCache: { from: "gateway", to: "cache", axis: "v" },
    toKoios: { from: "gateway", to: "koios", axis: "h" },
    toYaci: { from: "gateway", to: "yaci", axis: "h", mid: 205, offA: 8 },
    koiosChain: { from: "koios", to: "chains", axis: "h", offB: -44 },
    yaciChain: { from: "yaci", to: "chains", axis: "h", offB: 44 },
  },
};

/** The same loop as the case page: a wallet's request routed to Koios, then an AI agent's cache hit. */
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

/** Upstream health on top of the blocks: a green dot and a slow ping per upstream. */
function Health({ layout }: { layout: FlowLayout<Block, Wire> }) {
  const s = flowStyles;
  return (
    <g>
      {UPSTREAMS.map((id) => {
        const r = layout.rects[id];
        if (!r) return null;
        const x = r.x + r.w - 8;
        const y = r.y + 8;
        return (
          <g key={id}>
            <circle className={s.ping} cx={x} cy={y} r="2.6" />
            <circle className={s.dot} cx={x} cy={y} r="2.6" />
          </g>
        );
      })}
    </g>
  );
}

/** Nexus on its project card: the compact, live diagram of the request flow (the full one is `NexusFlow`, on the case page). */
export function NexusCardFlow({ labels: t, className }: { labels: NexusFlowLabels; className?: string }) {
  const shared = { hops: HOPS, flashes: FLASHES, streams: [{ edge: "liveOut" as Wire, count: 3, back: true }], log: [t.logMiss, t.logHit] as [string, string] };
  return (
    <FlowDiagram
      layout={MINI}
      blocks={miniBlocks(t)}
      {...shared}
      className={cn(flowStyles.cardMini, className)}
      extras={() => <Health layout={MINI} />}
    />
  );
}
