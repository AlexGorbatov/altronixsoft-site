import type { CSSProperties, ReactNode } from "react";
import { CYCLE_S, FRAME_H, PULSE_S, SEGMENT_W, STATIC_STAGES, STATIC_STEP_S, flowLinks, flowNodes, pulseDelay, type FlowNode } from "@/data/flow";
import styles from "./WorkflowFlow.module.css";

/** 24×24 line icons (drawn inside the SVG, scaled). Decorative. */
const icons: Record<FlowNode["icon"], ReactNode> = {
  request: <path d="M13 3 5 14h6l-1 7 8-11h-6z" />,
  ai: <path d="m12 3 1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />,
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 0 0 0-5.6M21 20c0-2.6-1.5-4.8-3.7-5.7" />
    </>
  ),
  docs: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />,
  rules: <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6zM9 12l2.2 2.2L15.5 10" />,
  action: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.3 2.8 2.8L16.2 9.5" />
    </>
  ),
};

const glowDelay = (nodeId: string) => {
  const link = flowLinks.find((l) => l.to === nodeId);
  return link ? (pulseDelay(link.srcX) + PULSE_S * 0.8) % CYCLE_S : 0;
};

/** Shared gradients. userSpaceOnUse so straight (zero-height) wires get a gradient too. */
function Defs() {
  return (
    <defs>
      <linearGradient id="wf-wire" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={SEGMENT_W} y2="0">
        <stop offset="0" stopColor="#22d6f4" stopOpacity="0.55" />
        <stop offset="0.55" stopColor="#4d8dff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="wf-comet" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={SEGMENT_W} y2="0">
        <stop offset="0" stopColor="#7df3ff" />
        <stop offset="0.55" stopColor="#8fb8ff" />
        <stop offset="1" stopColor="#c3a6ff" />
      </linearGradient>
      <linearGradient id="wf-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
      </linearGradient>
      <linearGradient id="wf-edge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#22d6f4" stopOpacity="0.8" />
        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="wf-active" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#22d6f4" stopOpacity="0.55" />
        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  );
}

/** One repeating segment of the canvas. Rendered twice (side by side) so the pan loops seamlessly. */
function Segment({ copy }: { copy: number }) {
  return (
    <g transform={`translate(${copy * SEGMENT_W} 0)`}>
      {flowLinks.map((link, i) => (
        <g key={`l${i}`}>
          <path d={link.d} className={styles.halo} />
          <path d={link.d} className={styles.wire} />
          <path
            d={link.d}
            className={styles.pulse}
            pathLength={100}
            style={{ "--delay": `${pulseDelay(link.srcX)}s`, "--sdelay": `${(STATIC_STAGES[link.srcX] ?? 0) * STATIC_STEP_S}s` } as CSSProperties}
          />
        </g>
      ))}
      {flowNodes.map((node) => {
        const w = node.kind === "card" ? 132 : 64;
        const top = node.cy - 32;
        const cx = node.x + w / 2;
        return (
          <g key={node.id} className={styles.node} style={{ "--glow": `${glowDelay(node.id)}s` } as CSSProperties}>
            <rect x={node.x} y={top} width={w} height={64} rx={18} className={styles.shadow} />
            <rect x={node.x} y={top} width={w} height={64} rx={18} className={styles.tile} />
            <rect x={node.x} y={top} width={w} height={64} rx={18} className={styles.glass} />
            <rect x={node.x} y={top} width={w} height={64} rx={18} className={styles.active} />
            <circle cx={cx} cy={node.cy} r={30} className={styles.ripple} />
            <g
              transform={`translate(${node.kind === "card" ? node.x + 14 : node.x + 20} ${node.cy - 12})`}
              className={styles.icon}
            >
              {icons[node.icon]}
            </g>
            {node.kind === "card" && (
              <text x={node.x + 46} y={node.cy + 5} className={styles.cardTitle}>
                {node.label}
              </text>
            )}
            {node.kind === "square" && (
              <>
                <text x={cx} y={top + 88} textAnchor="middle" className={styles.label}>
                  {node.label}
                </text>
                <text x={cx} y={top + 106} textAnchor="middle" className={styles.sub}>
                  {node.sub}
                </text>
              </>
            )}
            {node.kind === "card" && (
              <text x={cx} y={top + 84} textAnchor="middle" className={styles.sub}>
                {node.sub}
              </text>
            )}
            {/* Position and animation live on separate groups: a CSS transform would replace the SVG one. */}
            <g transform={`translate(${node.x + w - 4} ${top + 4})`}>
              <g className={styles.badge}>
                <circle r={9} />
                <path d="m-4 0.5 2.8 2.8L4.5-2.8" />
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/**
 * Decorative hero visual: an automation canvas that pans sideways forever. Nodes enter from beyond the
 * right edge, light pulses run along the curved wires, and everything leaves beyond the left edge.
 * Pure SVG + CSS; reduced motion shows one static frame.
 */
const particles = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i % 8) * -1.7,
  dur: 7 + (i % 5) * 2,
}));

/** The whole scene in one picture: trigger on the left, action on the right, nothing cropped. */
const STATIC_VIEW = { x: 14, y: 50, w: 1022, h: 470 };

export function WorkflowFlow({ animated = false }: { animated?: boolean }) {
  const vars = { "--cycle": `${CYCLE_S}s`, "--seg": `${SEGMENT_W}px`, "--pulse": `${PULSE_S}s` } as CSSProperties;

  if (!animated) {
    const { x, y, w, h } = STATIC_VIEW;
    return (
      <div className={styles.flow} data-static="" style={vars} aria-hidden="true">
        <div className={styles.aura} />
        <div className={styles.stage}>
          <svg className={styles.canvas} viewBox={`${x} ${y} ${w} ${h}`} width="100%" role="presentation">
            <Defs />
            <Segment copy={0} />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.flow} style={vars} aria-hidden="true">
      <div className={styles.aura} />
      {particles.map((p, i) => (
        <i
          key={i}
          className={styles.particle}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
        />
      ))}
      <div className={styles.stage}>
        <svg className={styles.canvas} viewBox={`0 0 ${SEGMENT_W * 2} ${FRAME_H}`} width={SEGMENT_W * 2} height={FRAME_H}>
          <Defs />
          <Segment copy={0} />
          <Segment copy={1} />
        </svg>
      </div>
    </div>
  );
}
