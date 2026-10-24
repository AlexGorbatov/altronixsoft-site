import type { CSSProperties } from "react";
import type { Content } from "@/i18n/content";
import { LogLane, route, type Edge as FlowEdge, type LanePos, type Rect } from "./FlowDiagram";
import styles from "./FlowDiagram.module.css";

export type NexusFlowLabels = Content["copy"]["portfolio"]["scene"]["nexusFlow"];

type NodeId =
  | "wallets" | "agents" | "live"
  | "gateway" | "router" | "cache" | "builder"
  | "yaci" | "koios" | "blockfrost" | "indexers"
  | "cardano" | "bitcoin" | "midnight";
type EdgeId =
  | "walletsIn" | "agentsIn" | "liveOut" | "toRouter" | "toCache" | "toBuilder"
  | "toYaci" | "toKoios" | "toBlockfrost" | "toIndexers"
  | "yaciChain" | "koiosChain" | "blockfrostChain" | "indexersChain" | "indexersBitcoin" | "indexersMidnight";
type Edge = FlowEdge<NodeId>;

interface Layout {
  viewBox: [number, number];
  nodes: Record<NodeId, Rect>;
  edges: Record<EdgeId, Edge>;
  panel: Rect;
  log: LanePos;
  /** Group headings: [x, y, text-anchor]. */
  titles: Record<"clients" | "nexus" | "upstreams" | "chains", [number, number, "start" | "middle"]>;
  /** Upstream nodes are narrow here: their status is shown by the dot alone. */
  narrowUpstreams: boolean;
}

/** Desktop and tablet: the request flows from left to right. */
const WIDE: Layout = {
  viewBox: [1000, 470],
  panel: { x: 250, y: 70, w: 340, h: 318 },
  // A full-width row under the diagram, as on the cards; on this wider canvas the lane is scaled to match them.
  log: { x: 24, y: 410, w: 952 },
  nodes: {
    wallets: { x: 24, y: 104, w: 176, h: 60 },
    agents: { x: 24, y: 214, w: 176, h: 60 },
    live: { x: 24, y: 324, w: 176, h: 60 },
    gateway: { x: 280, y: 118, w: 280, h: 58 },
    router: { x: 280, y: 214, w: 280, h: 58 },
    cache: { x: 280, y: 310, w: 132, h: 58 },
    builder: { x: 428, y: 310, w: 132, h: 58 },
    yaci: { x: 650, y: 104, w: 150, h: 54 },
    koios: { x: 650, y: 180, w: 150, h: 54 },
    blockfrost: { x: 650, y: 256, w: 150, h: 54 },
    indexers: { x: 650, y: 332, w: 150, h: 54 },
    cardano: { x: 864, y: 104, w: 112, h: 60 },
    bitcoin: { x: 864, y: 214, w: 112, h: 60 },
    midnight: { x: 864, y: 324, w: 112, h: 60 },
  },
  edges: {
    walletsIn: { from: "wallets", to: "gateway", axis: "h", mid: 238, offB: -12 },
    agentsIn: { from: "agents", to: "gateway", axis: "h", mid: 238 },
    liveOut: { from: "live", to: "gateway", axis: "h", mid: 238, offB: 12 },
    toRouter: { from: "gateway", to: "router", axis: "v" },
    toCache: { from: "router", to: "cache", axis: "v" },
    toBuilder: { from: "router", to: "builder", axis: "v" },
    toYaci: { from: "router", to: "yaci", axis: "h", mid: 612, offA: -12 },
    toKoios: { from: "router", to: "koios", axis: "h", mid: 612, offA: -4 },
    toBlockfrost: { from: "router", to: "blockfrost", axis: "h", mid: 612, offA: 4 },
    toIndexers: { from: "router", to: "indexers", axis: "h", mid: 612, offA: 12 },
    yaciChain: { from: "yaci", to: "cardano", axis: "h", mid: 832 },
    koiosChain: { from: "koios", to: "cardano", axis: "h", mid: 832 },
    blockfrostChain: { from: "blockfrost", to: "cardano", axis: "h", mid: 832 },
    indexersChain: { from: "indexers", to: "cardano", axis: "h", mid: 832 },
    indexersBitcoin: { from: "indexers", to: "bitcoin", axis: "h", mid: 832 },
    indexersMidnight: { from: "indexers", to: "midnight", axis: "h", mid: 832 },
  },
  titles: {
    clients: [112, 70, "middle"],
    nexus: [280, 100, "start"],
    upstreams: [725, 70, "middle"],
    chains: [920, 70, "middle"],
  },
  narrowUpstreams: false,
};

/** Phones: the same flow from top to bottom. */
const TALL: Layout = {
  viewBox: [360, 628],
  panel: { x: 12, y: 136, w: 336, h: 250 },
  // Under the chains: inside the panel the wires to the upstreams would cross it.
  log: { x: 12, y: 584, w: 336 },
  nodes: {
    wallets: { x: 12, y: 30, w: 104, h: 56 },
    agents: { x: 128, y: 30, w: 104, h: 56 },
    live: { x: 244, y: 30, w: 104, h: 56 },
    gateway: { x: 28, y: 160, w: 304, h: 50 },
    cache: { x: 28, y: 236, w: 146, h: 50 },
    builder: { x: 186, y: 236, w: 146, h: 50 },
    router: { x: 28, y: 312, w: 304, h: 50 },
    yaci: { x: 12, y: 426, w: 78, h: 44 },
    koios: { x: 98, y: 426, w: 78, h: 44 },
    blockfrost: { x: 184, y: 426, w: 78, h: 44 },
    indexers: { x: 270, y: 426, w: 78, h: 44 },
    cardano: { x: 12, y: 518, w: 104, h: 50 },
    bitcoin: { x: 128, y: 518, w: 104, h: 50 },
    midnight: { x: 244, y: 518, w: 104, h: 50 },
  },
  edges: {
    walletsIn: { from: "wallets", to: "gateway", axis: "v", mid: 112, offB: -24 },
    agentsIn: { from: "agents", to: "gateway", axis: "v", mid: 112 },
    liveOut: { from: "live", to: "gateway", axis: "v", mid: 112, offB: 24 },
    toRouter: { from: "gateway", to: "router", axis: "v" },
    toCache: { from: "router", to: "cache", axis: "v" },
    toBuilder: { from: "router", to: "builder", axis: "v" },
    toYaci: { from: "router", to: "yaci", axis: "v", mid: 414, offA: -24 },
    toKoios: { from: "router", to: "koios", axis: "v", mid: 414, offA: -8 },
    toBlockfrost: { from: "router", to: "blockfrost", axis: "v", mid: 414, offA: 8 },
    toIndexers: { from: "router", to: "indexers", axis: "v", mid: 414, offA: 24 },
    yaciChain: { from: "yaci", to: "cardano", axis: "v", mid: 506 },
    koiosChain: { from: "koios", to: "cardano", axis: "v", mid: 506 },
    blockfrostChain: { from: "blockfrost", to: "cardano", axis: "v", mid: 506 },
    indexersChain: { from: "indexers", to: "cardano", axis: "v", mid: 506 },
    indexersBitcoin: { from: "indexers", to: "bitcoin", axis: "v", mid: 506 },
    indexersMidnight: { from: "indexers", to: "midnight", axis: "v", mid: 506 },
  },
  titles: {
    clients: [12, 18, "start"],
    nexus: [12, 126, "start"],
    upstreams: [12, 402, "start"],
    chains: [12, 494, "start"],
  },
  narrowUpstreams: true,
};

/**
 * The loop, in seconds of a 12 s cycle. A wallet's request is routed to Koios; then an
 * AI agent's tool call is answered from the cache. Each hop takes about 0.84 s (7 % of the cycle).
 */
const HOPS: { edge: EdgeId; at: number; back?: boolean; reply?: boolean }[] = [
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

/** When a block lights up: as a hop reaches it. */
const FLASHES: { node: NodeId; at: number }[] = [
  { node: "gateway", at: 0.8 },
  { node: "router", at: 1.7 },
  { node: "koios", at: 2.6 },
  { node: "cardano", at: 3.5 },
  { node: "koios", at: 4.4 },
  { node: "router", at: 5.3 },
  { node: "gateway", at: 6.2 },
  { node: "wallets", at: 7.1 },
  { node: "gateway", at: 6.8 },
  { node: "router", at: 7.7 },
  { node: "cache", at: 8.6 },
  { node: "router", at: 9.5 },
  { node: "gateway", at: 10.4 },
  { node: "agents", at: 11.3 },
];

const at = (seconds: number) => ({ animationDelay: `${seconds}s` }) as CSSProperties;

function Diagram({ layout, t, className }: { layout: Layout; t: NexusFlowLabels; className: string }) {
  const { nodes, edges } = layout;
  const d = Object.fromEntries(
    (Object.keys(edges) as EdgeId[]).map((id) => [id, route(nodes[edges[id].from], nodes[edges[id].to], edges[id])]),
  ) as Record<EdgeId, string>;
  const [vw, vh] = layout.viewBox;

  const node = (id: NodeId, title: string, sub?: string, opts: { accent?: boolean; chain?: boolean } = {}) => {
    const r = nodes[id];
    const narrow = layout.narrowUpstreams && ["yaci", "koios", "blockfrost", "indexers"].includes(id);
    const centred = narrow || opts.chain || (layout === TALL && ["wallets", "agents", "live"].includes(id));
    const tx = centred ? r.x + r.w / 2 : r.x + 14;
    const anchor = centred ? "middle" : "start";
    const ty = sub && !narrow ? r.y + r.h / 2 - 3 : r.y + r.h / 2 + 4.5;
    const size = narrow ? 10.5 : layout === TALL && (centred || opts.chain) ? 12 : 13.5;
    return (
      <g key={id}>
        <rect className={opts.accent ? styles.nodeAccent : styles.node} x={r.x} y={r.y} width={r.w} height={r.h} rx="12" />
        {FLASHES.filter((f) => f.node === id).map((f) => (
          <rect key={f.at} className={styles.flash} style={at(f.at)} x={r.x} y={r.y} width={r.w} height={r.h} rx="12" />
        ))}
        <text className={styles.title} x={tx} y={ty} textAnchor={anchor} fontSize={size}>
          {title}
        </text>
        {sub && !narrow && (
          <text className={styles.sub} x={tx} y={ty + 16} textAnchor={anchor} fontSize="10.5">
            {sub}
          </text>
        )}
      </g>
    );
  };

  const upstream = (id: "yaci" | "koios" | "blockfrost" | "indexers", title: string) => {
    const r = nodes[id];
    const dot = layout.narrowUpstreams ? { x: r.x + r.w - 9, y: r.y + 9 } : { x: r.x + r.w - 16, y: r.y + r.h / 2 };
    return (
      <g key={id}>
        {node(id, title, t.healthy)}
        <circle className={styles.ping} cx={dot.x} cy={dot.y} r="3" />
        <circle className={styles.dot} cx={dot.x} cy={dot.y} r="3" />
      </g>
    );
  };

  return (
    <svg className={className} viewBox={`0 0 ${vw} ${vh}`} role="img" aria-label={t.aria}>
      <defs>
        <pattern id={`dots-${vw}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#9bb7ff" fillOpacity=".14" />
        </pattern>
        <linearGradient id={`panelEdge-${vw}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d6f4" stopOpacity=".7" />
          <stop offset=".55" stopColor="#6a7bf5" stopOpacity=".45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id={`panelFill-${vw}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14254a" stopOpacity=".55" />
          <stop offset="1" stopColor="#1b1640" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id={`pkReq-${vw}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".4" stopColor="#9bf6ff" />
          <stop offset="1" stopColor="#22d6f4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`pkRes-${vw}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".4" stopColor="#dccbff" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={vw} height={vh} fill={`url(#dots-${vw})`} />

      {/* The Nexus panel, with a light that sweeps across it. */}
      <rect
        x={layout.panel.x}
        y={layout.panel.y}
        width={layout.panel.w}
        height={layout.panel.h}
        rx="18"
        fill={`url(#panelFill-${vw})`}
        stroke={`url(#panelEdge-${vw})`}
        strokeWidth="1.2"
      />
      <rect
        className={styles.sweep}
        x={layout.panel.x + 1}
        y={layout.panel.y + 1}
        width={layout.panel.w - 2}
        height="3"
        rx="1.5"
        style={{ "--sweep": `${layout.panel.h - 6}px` } as CSSProperties}
      />

      {(Object.keys(layout.titles) as (keyof Layout["titles"])[]).map((key) => {
        const [x, y, anchor] = layout.titles[key];
        const text = key === "nexus" ? "Nexus API" : t[key];
        return (
          <text key={key} className={key === "nexus" ? styles.panelTitle : styles.heading} x={x} y={y} textAnchor={anchor}>
            {text}
          </text>
        );
      })}
      <g>
        {(() => {
          const w = 82;
          const x = layout.panel.x + layout.panel.w - w - (layout === TALL ? 0 : 30);
          const y = layout === TALL ? layout.titles.nexus[1] - 13 : layout.titles.nexus[1] - 14;
          return (
            <>
              <rect x={x} y={y} width={w} height="19" rx="9.5" className={styles.pill} />
              <text x={x + w / 2} y={y + 13} textAnchor="middle" className={styles.pillText} fontSize="10">
                OpenAPI 3.1
              </text>
            </>
          );
        })()}
      </g>

      {/* Wires: a quiet base line, and dashes that flow in the direction of the data. */}
      {(Object.keys(d) as EdgeId[]).map((id) => (
        <path key={id} className={styles.wire} d={d[id]} />
      ))}
      {(Object.keys(d) as EdgeId[]).map((id) => (
        <path key={`${id}-flow`} className={id === "liveOut" ? styles.flowBack : styles.flow} d={d[id]} />
      ))}

      {node("wallets", t.wallets, "REST · SDK")}
      {node("agents", t.agents, "MCP")}
      {node("live", t.live, "WebSocket")}
      {node("gateway", t.gateway, t.gatewaySub, { accent: true })}
      {node("router", t.router, t.routerSub, { accent: true })}
      {node("cache", t.cache, t.cacheSub)}
      {node("builder", t.builder, t.builderSub)}
      {upstream("yaci", "Yaci")}
      {upstream("koios", "Koios")}
      {upstream("blockfrost", "Blockfrost")}
      {upstream("indexers", t.indexers)}
      {node("cardano", "Cardano", undefined, { chain: true })}
      {node("bitcoin", "Bitcoin", undefined, { chain: true })}
      {node("midnight", "Midnight", undefined, { chain: true })}

      {/* The log line of the panel: what the loop is doing right now. */}
      <LogLane {...layout.log} lines={[t.logMiss, t.logHit]} scale={vw > 700 ? vw / 700 : 1} />

      {/* Requests (cyan) and replies (violet) travelling hop by hop. */}
      {HOPS.map((hop) => (
        <g
          key={`${hop.edge}-${hop.at}`}
          className={hop.back ? styles.hopBack : styles.hop}
          style={{ offsetPath: `path('${d[hop.edge]}')`, ...at(hop.at) }}
        >
          <circle r="9" fill={`url(#${hop.reply ? "pkRes" : "pkReq"}-${vw})`} />
          <circle r="2.6" fill="#fff" />
        </g>
      ))}
      {/* The WebSocket stream: a steady flow of updates out to the live apps. */}
      {[0, 0.8, 1.6].map((delay) => (
        <g key={delay} className={styles.stream} style={{ offsetPath: `path('${d.liveOut}')`, ...at(delay) }}>
          <circle r="7" fill={`url(#pkReq-${vw})`} />
          <circle r="2" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Nexus as a live architecture diagram: clients → one endpoint → a health-checked router → cache or upstream
 * providers → chains, and the reply back. Flat and animated; it reads as a plain diagram without motion.
 * The animations run only inside an `ActiveWhenVisible` parent (it sets --ps), like the other project diagrams.
 */
export function NexusFlow({ labels }: { labels: NexusFlowLabels }) {
  return (
    <div className={styles.root}>
      <Diagram layout={WIDE} t={labels} className={styles.wide} />
      <Diagram layout={TALL} t={labels} className={styles.tall} />
    </div>
  );
}
