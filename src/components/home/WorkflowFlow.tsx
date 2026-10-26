import type { CSSProperties, ReactNode } from "react";
import { FLOW_CARD_WIDTH, STATIC_STAGES, STATIC_STEP_S, flowLinks, type FlowNode } from "@/data/flow";
import { getContent } from "@/i18n/server";
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

/** Each responsive SVG owns its gradients, including when its sibling is display:none. */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-wire`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1060" y2="0">
        <stop offset="0" stopColor="#4ea4cc" stopOpacity="0.6" />
        <stop offset="0.55" stopColor="#4d8dff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#9274c4" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id={`${id}-comet`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1060" y2="0">
        <stop offset="0" stopColor="#83c5df" />
        <stop offset="1" stopColor="#aa98d1" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7195b6" stopOpacity="0.65" />
        <stop offset="1" stopColor="#8875ba" stopOpacity="0.55" />
      </linearGradient>
    </defs>
  );
}

const MOBILE_POSITIONS: Record<string, [number, number]> = {
  trigger: [20, 48],
  agent0: [36, 190], agent1: [36, 310], agent2: [36, 430],
  erp: [330, 190], crm: [330, 310], docs: [330, 430],
  rules: [68, 610], action: [286, 610],
};

// The same split, three parallel integrations, merge and final action, arranged vertically on phones.
const MOBILE_PATHS = [
  ...[190, 310, 430].map(cy => `M52 80 V94 Q52 112,34 112 Q18 112,18 130 V${cy - 18} Q18 ${cy},36 ${cy}`),
  ...[190, 310, 430].map(cy => `M286 ${cy} H330`),
  ...[190, 310, 430].map(cy => `M394 ${cy} H424 Q442 ${cy},442 ${cy + 18} V512 Q442 530,424 530 H52 C20 530,20 610,68 610`),
  "M132 610 H286",
];

const splitCaption = (text: string) => {
  const words = text.split(" ");
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(" "), words.slice(middle).join(" ")];
};

function Scene({ nodes, mobile = false }: { nodes: FlowNode[]; mobile?: boolean }) {
  const id = mobile ? "wf-tall" : "wf-wide";
  const links = flowLinks;
  return (
    <svg
      className={`${styles.canvas} ${mobile ? styles.tall : styles.wide}`}
      viewBox={mobile ? "0 0 450 710" : "0 45 1060 500"}
      role="presentation"
      style={{ "--wire": `url(#${id}-wire)`, "--comet": `url(#${id}-comet)`, "--glass": `url(#${id}-glass)`, "--edge": `url(#${id}-edge)` } as CSSProperties}
    >
      <Defs id={id} />
      {links.map((link, i) => {
        const d = mobile ? MOBILE_PATHS[i] : link.d;
        return (
          <g key={i}>
            <path d={d} className={styles.wire} />
            <path d={d} className={styles.pulse} pathLength={100}
              style={{ "--sdelay": `${(STATIC_STAGES[link.srcX] ?? 0) * STATIC_STEP_S}s` } as CSSProperties} />
          </g>
        );
      })}
      {nodes.map(original => {
        const [x, cy] = mobile ? MOBILE_POSITIONS[original.id] : [original.x, original.cy];
        const node = { ...original, x, cy };
        const w = node.kind === "card" ? FLOW_CARD_WIDTH : 64;
        const top = cy - 32, cx = x + w / 2;
        const inlineCaption = mobile && node.id === "trigger";
        const wrapCaption = !mobile && (node.id === "rules" || node.id === "action");
        const labelLines = wrapCaption ? splitCaption(node.label) : [node.label];
        const subLines = wrapCaption ? splitCaption(node.sub) : [node.sub];
        const textX = inlineCaption ? 110 : cx;
        const labelY = inlineCaption ? 45 : top + 88;
        const subY = inlineCaption ? 67 : top + (node.kind === "card" ? 84 : mobile ? 112 : wrapCaption ? 144 : 116);
        return (
          <g key={node.id}>
            <rect x={x} y={top} width={w} height={64} rx={18} className={styles.tile} />
            <rect x={x} y={top} width={w} height={64} rx={18} className={styles.glass} />
            {node.kind === "card" ? (
              <foreignObject x={x} y={top} width={w} height={64}>
                <div className={styles.cardContent}>
                  <svg viewBox="0 0 24 24" className={`${styles.icon} ${styles.cardIcon}`} aria-hidden="true">{icons[node.icon]}</svg>
                  <span className={styles.cardTitle}>
                    {node.label.split(" ").map((line, index) => <span key={index} className={styles.cardLine}>{index > 0 ? " " : ""}{line}</span>)}
                  </span>
                </div>
              </foreignObject>
            ) : (
              <>
                <g transform={`translate(${x + 20} ${cy - 12})`} className={styles.icon}>{icons[node.icon]}</g>
                <text x={textX} y={labelY} textAnchor={inlineCaption ? "start" : "middle"} className={styles.label}>
                  {labelLines.map((line, index) => <tspan key={index} x={textX} y={labelY + index * 24}>{index > 0 ? " " : ""}{line}</tspan>)}
                </text>
              </>
            )}
            <text x={textX} y={subY} textAnchor={inlineCaption ? "start" : "middle"} className={styles.sub}>
              {subLines.map((line, index) => <tspan key={index} x={textX} y={subY + index * 22}>{index > 0 ? " " : ""}{line}</tspan>)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Keep every node in view. Only the connection pulses move, so labels stay readable throughout the cycle. */
export async function WorkflowFlow() {
  const { flowNodes } = await getContent();
  return (
    <div className={styles.flow} aria-hidden="true">
      <div className={styles.aura} />
      <div className={styles.stage}>
        <Scene nodes={flowNodes} />
        <Scene nodes={flowNodes} mobile />
      </div>
    </div>
  );
}
