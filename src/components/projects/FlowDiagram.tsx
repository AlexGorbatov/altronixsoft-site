import { useId, type CSSProperties, type ReactNode } from "react";
import styles from "./FlowDiagram.module.css";

/**
 * The kit of the flat, animated architecture diagrams: blocks, wires between them, and a 12 s loop of requests
 * and replies that travel hop by hop. A project describes its diagram as data (blocks, wires, hops, the moments
 * blocks light up, two log lines) for one or two layouts; `FlowDiagram` draws it. See HybrisFlow for an example.
 */

export type Rect = { x: number; y: number; w: number; h: number };

/** A wire from one block to another: along x ("h") or y ("v"), turning once at `mid` when the two are offset. */
export type Edge<N extends string = string> = {
  from: N;
  to: N;
  axis: "h" | "v";
  mid?: number;
  /** Shifts the ends across the flow, e.g. so several wires enter one block side by side. */
  offA?: number;
  offB?: number;
};

/** An orthogonal route with rounded corners between the facing sides of two boxes. */
export function route(a: Rect, b: Rect, e: Pick<Edge, "axis" | "mid" | "offA" | "offB">): string {
  const ca = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const cb = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const flip = (p: [number, number]) => (e.axis === "h" ? p : ([p[1], p[0]] as [number, number]));
  // Work in (along, across) coordinates: along the flow, and across it.
  const [a1, a2, b1, b2] = e.axis === "h" ? [a.x, a.x + a.w, b.x, b.x + b.w] : [a.y, a.y + a.h, b.y, b.y + b.h];
  const forward = e.axis === "h" ? cb.x > ca.x : cb.y > ca.y;
  const s = forward ? a2 : a1;
  const t = forward ? b1 : b2;
  const u = (e.axis === "h" ? ca.y : ca.x) + (e.offA ?? 0);
  const v = (e.axis === "h" ? cb.y : cb.x) + (e.offB ?? 0);
  const P = (along: number, across: number) =>
    flip([along, across])
      .map((n) => n.toFixed(1))
      .join(" ");
  if (Math.abs(u - v) < 0.5) return `M${P(s, u)} L${P(t, v)}`;
  const m = e.mid ?? (s + t) / 2;
  const da = Math.sign(t - s);
  const dc = Math.sign(v - u);
  const r = Math.min(10, Math.abs(v - u) / 2, Math.abs(m - s), Math.abs(t - m));
  return [
    `M${P(s, u)}`,
    `L${P(m - da * r, u)}`,
    `Q${P(m, u)} ${P(m, u + dc * r)}`,
    `L${P(m, v - dc * r)}`,
    `Q${P(m, v)} ${P(m + da * r, v)}`,
    `L${P(t, v)}`,
  ].join(" ");
}

/**
 * One size for every full-width lane of every diagram (the log line, a CI/CD lane), on every project and layout,
 * so the bars match wherever they appear. A layout only says where a lane starts and how wide it is. The sizes are
 * for a canvas 700 wide (cards, case pages) or 360 wide (phones); a wider canvas scales them up by its width / 700
 * (`LogLane`'s `scale`), so the bar is the same size on screen.
 */
export const LANE = { h: 34, rx: 11, font: 10.5 } as const;

/** Where a lane sits: its height and corners come from `LANE`. */
export type LanePos = { x: number; y: number; w: number };

/** The log line: what the loop is doing right now, one line per half of the loop. */
export function LogLane({ x, y, w, lines, scale = 1 }: LanePos & { lines: [string, string]; scale?: number }) {
  const h = LANE.h * scale;
  const cy = y + h / 2;
  return (
    <g>
      <rect className={styles.log} x={x} y={y} width={w} height={h} rx={LANE.rx * scale} />
      <circle className={styles.logDot} cx={x + 14 * scale} cy={cy} r={3 * scale} />
      {lines.map((line, i) => (
        <text
          key={line}
          className={`${styles.logText} ${i === 0 ? styles.phaseA : styles.phaseB}`}
          x={x + 26 * scale}
          y={cy + 3.5 * scale}
          fontSize={LANE.font * scale}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export interface FlowBlock {
  title: string;
  /** Explicit lines for compact nodes; SVG text does not wrap inside its rectangle. */
  titleLines?: string[];
  sub?: string;
  /** A central block: brighter glass and rim. */
  accent?: boolean;
  /** Text in the middle of the block instead of on its left. */
  centred?: boolean;
  /** Not there yet (e.g. on the roadmap): a dashed, dimmed block. */
  muted?: boolean;
}

export interface FlowLayout<N extends string, E extends string> {
  viewBox: [number, number];
  /**
   * Empty canvas added above and below the drawing. A card picture has a fixed height, so every wide diagram on a
   * card must share one canvas size (700 × 324) to be drawn at the same scale: a shorter drawing gets `bleed` on
   * both sides, which keeps its bars the same size as everyone else's.
   */
  bleed?: number;
  /** A compact layout may leave blocks and wires out; hops and flashes on them are then skipped. */
  rects: Partial<Record<N, Rect>>;
  edges: Partial<Record<E, Edge<N>>>;
  /** Frames that group blocks, each with its name. */
  panels: { rect: Rect; title: string; at: [number, number] }[];
  /** The log line: what the loop is doing right now. */
  log: LanePos;
  font: { title: number; sub: number };
}

/** A hop of the loop: a packet runs along a wire, starting `at` seconds into the 12 s cycle (about 0.84 s). */
export interface Hop<E extends string> {
  edge: E;
  at: number;
  /** Against the direction of the wire. */
  back?: boolean;
  /** A reply (violet) rather than a request (cyan). */
  reply?: boolean;
}

interface FlowDiagramProps<N extends string, E extends string> {
  layout: FlowLayout<N, E>;
  blocks: Record<N, FlowBlock>;
  hops: Hop<E>[];
  /** When a block lights up: as a hop reaches it. */
  flashes: { block: N; at: number }[];
  /** Steady flows outside the loop: `count` packets every 2.4 s along a wire. */
  streams?: { edge: E; count: number; back?: boolean; delay?: number }[];
  /** The log line in the first and in the second half of the loop. */
  log: [string, string];
  /** For a picture inside a card that already names the project: hidden from assistive technology. */
  label?: string;
  className?: string;
  /** Extra drawing over the blocks (e.g. the stages of a pipeline lane), given the wire paths. */
  extras?: (paths: Record<E, string>) => ReactNode;
}

const at = (seconds: number) => ({ animationDelay: `${seconds}s` }) as CSSProperties;

export function FlowDiagram<N extends string, E extends string>({
  layout,
  blocks,
  hops,
  flashes,
  streams = [],
  log,
  label,
  className,
  extras,
}: FlowDiagramProps<N, E>) {
  const { rects, edges, font } = layout;
  const ids = Object.keys(edges) as E[];
  const d = Object.fromEntries(
    ids.map((id) => {
      const e = edges[id]!;
      return [id, route(rects[e.from]!, rects[e.to]!, e)];
    }),
  ) as Record<E, string>;
  const drawn = (edge: E) => edge in d;
  const [vw, vh] = layout.viewBox;
  const bleed = layout.bleed ?? 0;
  // Unique per diagram: the gradients are referenced by id, and a page holds many diagrams.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      className={className}
      viewBox={`0 ${-bleed} ${vw} ${vh + 2 * bleed}`}
      preserveAspectRatio="xMidYMid meet"
      data-flow=""
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false })}
    >
      <defs>
        <pattern id={`dots-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#9bb7ff" fillOpacity=".14" />
        </pattern>
        <linearGradient id={`panelEdge-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d6f4" stopOpacity=".7" />
          <stop offset=".55" stopColor="#6a7bf5" stopOpacity=".45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id={`panelFill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14254a" stopOpacity=".55" />
          <stop offset="1" stopColor="#1b1640" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id={`pkReq-${uid}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".4" stopColor="#9bf6ff" />
          <stop offset="1" stopColor="#22d6f4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`pkRes-${uid}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".4" stopColor="#dccbff" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect y={-bleed} width={vw} height={vh + 2 * bleed} fill={`url(#dots-${uid})`} />

      {layout.panels.map((panel) => (
        <g key={panel.title}>
          <rect
            x={panel.rect.x}
            y={panel.rect.y}
            width={panel.rect.w}
            height={panel.rect.h}
            rx="16"
            fill={`url(#panelFill-${uid})`}
            stroke={`url(#panelEdge-${uid})`}
            strokeWidth="1.2"
          />
          <rect
            className={styles.sweep}
            x={panel.rect.x + 1}
            y={panel.rect.y + 1}
            width={panel.rect.w - 2}
            height="3"
            rx="1.5"
            style={{ "--sweep": `${panel.rect.h - 6}px` } as CSSProperties}
          />
          <text className={styles.panelTitle} x={panel.at[0]} y={panel.at[1]} fontSize={font.title + 1.5}>
            {panel.title}
          </text>
        </g>
      ))}

      {/* Wires: a quiet base line, and dashes that flow in the direction of the data. */}
      {ids.map((id) => (
        <path key={id} className={styles.wire} d={d[id]} />
      ))}
      {ids.map((id) => (
        <path key={`${id}-flow`} className={styles.flow} d={d[id]} />
      ))}

      {(Object.keys(rects) as N[]).map((id) => {
        const r = rects[id]!;
        const b = blocks[id];
        const tx = b.centred ? r.x + r.w / 2 : r.x + 12;
        const anchor = b.centred ? "middle" : "start";
        const ty = b.sub ? r.y + r.h / 2 - 2 : r.y + r.h / 2 + 4.5;
        const lines = b.titleLines ?? [b.title];
        const lineHeight = font.title * 1.15;
        const halfLines = ((lines.length - 1) * lineHeight) / 2;
        return (
          <g key={id} className={b.muted ? styles.muted : undefined}>
            <rect className={b.accent ? styles.nodeAccent : styles.node} x={r.x} y={r.y} width={r.w} height={r.h} rx="11" />
            {flashes
              .filter((f) => f.block === id)
              .map((f) => (
                <rect key={f.at} className={styles.flash} style={at(f.at)} x={r.x} y={r.y} width={r.w} height={r.h} rx="11" />
              ))}
            <text className={styles.title} x={tx} y={ty} textAnchor={anchor} fontSize={font.title}>
              {b.titleLines ? lines.map((line, index) => (
                <tspan key={index} x={tx} y={ty - halfLines + index * lineHeight}>
                  {index > 0 ? " " : ""}{line}
                </tspan>
              )) : b.title}
            </text>
            {b.sub && (
              <text className={styles.sub} x={tx} y={ty + halfLines + font.sub + 5} textAnchor={anchor} fontSize={font.sub}>
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {extras?.(d)}

      <LogLane {...layout.log} lines={log} />

      {/* Requests (cyan) and replies (violet) travelling hop by hop. */}
      {hops.filter((hop) => drawn(hop.edge)).map((hop) => (
        <g
          key={`${hop.edge}-${hop.at}`}
          className={hop.back ? styles.hopBack : styles.hop}
          style={{ offsetPath: `path('${d[hop.edge]}')`, ...at(hop.at) }}
        >
          <circle r="9" fill={`url(#${hop.reply ? "pkRes" : "pkReq"}-${uid})`} />
          <circle r="2.6" fill="#fff" />
        </g>
      ))}
      {streams.filter((stream) => drawn(stream.edge)).flatMap((stream) =>
        Array.from({ length: stream.count }, (_, i) => (
          <g
            key={`${stream.edge}-${i}`}
            className={stream.back ? styles.stream : styles.streamFwd}
            style={{ offsetPath: `path('${d[stream.edge]}')`, ...at((2.4 / stream.count) * i + (stream.delay ?? 0)) }}
          >
            <circle r="7" fill={`url(#pkReq-${uid})`} />
            <circle r="2" fill="#fff" />
          </g>
        )),
      )}
    </svg>
  );
}

/** The three stages of a pipeline lane, lighting up in turn every 3 s. */
export function PipelineStages({ x, y, gap = 16 }: { x: number; y: number; gap?: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle className={styles.stage} cx={x + i * gap} cy={y} r="4.5" />
          <circle className={styles.stageLit} style={at(i)} cx={x + i * gap} cy={y} r="2.6" />
        </g>
      ))}
    </g>
  );
}

export { styles as flowStyles };
