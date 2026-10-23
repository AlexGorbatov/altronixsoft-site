import type { CSSProperties, ReactNode } from "react";
import type { ProjectVisual as Variant } from "@/data/projects";
import { type Point, polygonPoints, project, routePath } from "@/lib/iso";
import { cn } from "@/lib/utils";
import styles from "./ProjectVisual.module.css";

/** Top, left and right face colours of a block. */
type Face = readonly [string, string, string];

const DARK: Face = ["#2f4572", "#1a2a4b", "#121d36"];
const CYAN: Face = ["#5fe6f8", "#0f90b2", "#096683"];
const BLUE: Face = ["#5aa6ff", "#1b66e0", "#12449b"];
const VIOLET: Face = ["#c4aafd", "#7249dc", "#4e30a6"];
const VIOLET_DEEP: Face = ["#8f78e8", "#4e35a8", "#38257c"];

const C_CYAN = "#22d6f4";
const C_CYAN_LIGHT = "#5fe6f8";
const C_VIOLET = "#8b5cf6";
const C_VIOLET_LIGHT = "#c4aafd";
const C_BLUE = "#5aa6ff";
const C_BLUE_ROUTE = "#1a7cfb";
const LABEL = { fontFamily: "var(--font-mono), monospace", fontSize: 7.5, letterSpacing: 1.1, fill: "var(--text-muted)" };

const timing = (d?: number, l?: number): CSSProperties =>
  ({ ...(d !== undefined && { "--d": `${d}s` }), ...(l !== undefined && { "--l": `${l}s` }) }) as CSSProperties;

type Item = { depth: number; node: ReactNode };

type BoxOptions = {
  dur?: number;
  delay?: number;
  glow?: boolean;
  /** Glow pulse delay when it differs from the float delay. */
  glowDelay?: number;
  /** No floating (a fixed base plate). */
  still?: boolean;
  /** Paint order, back to front. Defaults to x + y; scenes with stacked blocks set it by hand. */
  depth?: number;
};

/** One isometric scene: a grid floor, routes, blocks, travelling packets. Units are grid cells. */
function makeScene(sc: number, ox: number, oy: number) {
  const P = (x: number, y: number, z = 0) => project(sc, ox, oy, x, y, z);
  const items: Item[] = [];
  const floor: ReactNode[] = [];
  const overlay: ReactNode[] = [];

  return {
    P,
    floor(x0: number, y0: number, x1: number, y1: number) {
      const lines: ReactNode[] = [];
      for (let i = x0; i <= x1; i++) {
        const [a, b] = P(i, y0);
        const [c, d] = P(i, y1);
        lines.push(<line key={`x${i}`} x1={a} y1={b} x2={c} y2={d} />);
      }
      for (let j = y0; j <= y1; j++) {
        const [a, b] = P(x0, j);
        const [c, d] = P(x1, j);
        lines.push(<line key={`y${j}`} x1={a} y1={b} x2={c} y2={d} />);
      }
      floor.push(
        <g key={`floor${floor.length}`} stroke="rgba(120,160,230,.13)" strokeWidth=".7">
          {lines}
        </g>,
      );
    },
    route(points: readonly Point[], color = C_CYAN, opacity = 0.55) {
      floor.push(
        <path
          key={`route${floor.length}`}
          className={styles.dash}
          d={routePath(sc, ox, oy, points)}
          fill="none"
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />,
      );
    },
    ring(x: number, y: number, rx: number, color: string, delay = 0) {
      const [cx, cy] = P(x, y);
      floor.push(
        <ellipse
          key={`ring${floor.length}`}
          className={styles.ring}
          style={timing(undefined, delay)}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={rx / 2}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />,
      );
    },
    box(x: number, y: number, z: number, w: number, d: number, h: number, face: Face, o: BoxOptions = {}) {
      const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
      const left = [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)];
      const right = [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)];
      const node = (
        <g className={o.still ? undefined : styles.bob} style={timing(o.dur, o.delay)}>
          <polygon points={polygonPoints(left)} fill={face[1]} />
          <polygon points={polygonPoints(right)} fill={face[2]} />
          <polygon points={polygonPoints(top)} fill={face[0]} />
          {o.glow && <polygon className={styles.glow} style={timing(undefined, o.glowDelay ?? o.delay)} points={polygonPoints(top)} fill="#fff" />}
          <polygon points={polygonPoints(top)} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth=".7" />
        </g>
      );
      items.push({ depth: o.depth ?? x + y, node });
    },
    packet(route: readonly Point[], color: string, duration = 3.2, delay = 0, r = 3) {
      overlay.push(
        <g
          key={`pk${overlay.length}`}
          className={styles.pk}
          style={{ offsetPath: `path('${routePath(sc, ox, oy, route, 0.3)}')`, ...timing(duration, delay) }}
        >
          <circle r={r * 2.4} fill={color} opacity=".22" />
          <circle r={r} fill={color} />
        </g>,
      );
    },
    node(content: ReactNode) {
      overlay.push(<g key={`n${overlay.length}`}>{content}</g>);
    },
    render() {
      const sorted = [...items].sort((a, b) => a.depth - b.depth);
      return (
        <>
          {floor}
          {sorted.map((it, i) => (
            <g key={`b${i}`}>{it.node}</g>
          ))}
          {overlay}
        </>
      );
    },
  };
}

function Label({ at, children }: { at: Point; children: string }) {
  return (
    <text x={at[0]} y={at[1]} {...LABEL}>
      {children}
    </text>
  );
}

/**
 * The scenes below use the numbers of the approved diagram generator (docs/design-ref/iso-diagrams-generator.py):
 * scale, origin, block coordinates, routes, paint order and timings.
 */

/** External systems → platform → Data Hub, with a CI/CD track underneath. */
function Integration() {
  const s = makeScene(22, 176, 28);
  s.floor(-1, -1, 11, 8);
  const ys = [0.6, 2.6, 4.6];
  const feeds = ys.map((y): Point[] => [[1.8, y + 0.6], [4, y + 0.6], [4, 3.6], [5, 3.6]]);
  const out: Point[] = [[7, 3.6], [9, 3.6]];
  const track: Point[] = [[0.5, 7.2], [10.5, 7.2]];
  feeds.forEach((f) => s.route(f));
  s.route(out, C_VIOLET, 0.7);
  s.route(track, C_BLUE_ROUTE, 0.5);
  s.ring(6, 3.6, 24, C_CYAN, 0);
  s.ring(6, 3.6, 24, C_CYAN, 1.5);
  ys.forEach((y, i) => s.box(0, y, 0, 1.8, 1.2, 0.7, DARK, { dur: 3.2 + i * 0.4, delay: i * 0.5, depth: y }));
  s.box(5, 2.6, 0, 2, 2, 1.5, CYAN, { dur: 4, glow: true, glowDelay: 0, depth: 7 });
  [DARK, VIOLET, BLUE].forEach((f, k) => s.box(9, 2.8, k * 0.9, 1.8, 1.6, 0.55, f, { dur: 3.6, delay: k * 0.3, depth: 10 + k }));
  feeds.forEach((f, i) => s.packet(f, C_CYAN_LIGHT, 3.2, i * 0.9));
  s.packet(out, C_VIOLET_LIGHT, 1.6, 0.6);
  for (let i = 0; i < 5; i++) {
    const [cx, cy] = s.P(0.8 + i * 2.35, 7.2);
    const color = i === 4 ? C_VIOLET_LIGHT : C_CYAN_LIGHT;
    s.node(
      <>
        <ellipse cx={cx} cy={cy} rx="7" ry="3.5" fill="#07101f" stroke={color} strokeWidth="1.5" />
        <ellipse className={styles.tick} style={timing(undefined, i)} cx={cx} cy={cy} rx="3" ry="1.5" fill={color} />
      </>,
    );
  }
  s.packet(track, C_BLUE, 5, 0, 2.6);
  s.node(<Label at={s.P(0, -0.9)}>REST · SOAP</Label>);
  s.node(<Label at={s.P(8.6, 5.4)}>DATA HUB</Label>);
  s.node(<Label at={s.P(-0.2, 8.4)}>CI/CD</Label>);
  return s.render();
}

/** Sources → central hub → consumers. */
function Data() {
  const s = makeScene(18, 172, 24);
  s.floor(-1, -1, 11, 7);
  const ys = [0.4, 2.4, 4.4];
  const ins = ys.map((y): Point[] => [[1.6, y + 0.6], [3.5, y + 0.6], [3.5, 3.4], [4.6, 3.4]]);
  const outs = ys.map((y): Point[] => [[6.8, 3.4], [8, 3.4], [8, y + 0.6], [9.2, y + 0.6]]);
  ys.forEach((_, i) => {
    s.route(ins[i]);
    s.route(outs[i], C_VIOLET, 0.6);
  });
  ys.forEach((y, i) => {
    s.box(0, y, 0, 1.6, 1.2, 0.6, DARK, { dur: 3.3 + i * 0.3, delay: i * 0.4, depth: y });
    s.box(9.2, y, 0, 1.6, 1.2, 0.6, VIOLET_DEEP, { dur: 3.5 + i * 0.3, delay: i * 0.5 + 0.3, depth: 9.2 + y });
  });
  s.box(4.6, 2.6, 0, 2.2, 1.8, 1.4, CYAN, { dur: 4, glow: true, glowDelay: 0, depth: 6 });
  s.ring(5.7, 3.5, 22, C_CYAN, 0);
  ys.forEach((_, i) => {
    s.packet(ins[i], C_CYAN_LIGHT, 2.8, i * 0.8);
    s.packet(outs[i], C_VIOLET_LIGHT, 2.6, i * 0.8 + 1.2);
  });
  return s.render();
}

/** A route through four stops. */
function Logistics() {
  const s = makeScene(20, 150, 34);
  s.floor(-1, -1, 11, 7);
  const route: Point[] = [[0.5, 0.5], [0.5, 3], [3.5, 3], [3.5, 1], [7, 1], [7, 5], [10, 5]];
  s.route(route);
  const stops: Point[] = [[0.5, 3], [3.5, 1], [7, 5], [10, 5]];
  stops.forEach(([x, y], i) =>
    s.box(x - 0.6, y - 0.6, 0, 1.2, 1.2, 1 + i * 0.25, i === 2 ? VIOLET : CYAN, {
      dur: 3.2 + i * 0.3,
      delay: i * 0.4,
      glow: true,
      glowDelay: i * 0.5,
      depth: x + y,
    }),
  );
  s.box(-0.1, -0.1, 0, 1.2, 1.2, 0.45, DARK, { still: true, depth: 1 });
  s.packet(route, C_CYAN_LIGHT, 6, 0, 3.2);
  s.packet(route, C_CYAN_LIGHT, 6, 3, 3.2);
  s.node(<Label at={s.P(0, -1.2)}>OPERATIONS</Label>);
  return s.render();
}

/** Catalogue tiles → order panel. Not in the approved generator; drawn in the same style. */
function Commerce() {
  const s = makeScene(21, 164, 36);
  s.floor(-1, -1, 11, 7);
  const lane = (y: number): Point[] => [[3.4, y], [5.2, y], [5.2, 3], [6.6, 3]];
  const ys = [1.1, 3, 4.9];
  ys.forEach((y) => s.route(lane(y), C_CYAN, 0.45));
  for (let col = 0; col < 2; col++) {
    ys.forEach((y, i) => s.box(col * 1.7, y - 0.6, 0, 1.3, 1.2, 0.5, col === 0 ? DARK : BLUE, { dur: 3.2 + i * 0.3, delay: (col + i) * 0.3 }));
  }
  s.ring(8, 3, 22, C_CYAN, 0);
  s.box(6.6, 1.8, 0, 2.8, 2.4, 1.1, CYAN, { dur: 4, glow: true, depth: 100 });
  s.box(7.1, 2.2, 1.1, 1.8, 1.6, 0.4, VIOLET, { dur: 4, delay: 0.3, depth: 101 });
  ys.forEach((y, i) => s.packet(lane(y), C_CYAN_LIGHT, 3, i * 0.9));
  return s.render();
}

function Scene({ variant }: { variant: Variant }) {
  if (variant === "commerce") return <Commerce />;
  if (variant === "integration") return <Integration />;
  if (variant === "data") return <Data />;
  return <Logistics />;
}

const VIEW_WIDTH = 400;
/** The integration scene carries a CI/CD track, so its canvas is taller. */
const viewHeight = (variant: Variant) => (variant === "integration" ? 250 : 230);

interface ProjectVisualProps {
  variant: Variant;
  /** `featured`: the wide case card and the case page (10px inset). `compact`: grid cards (6px inset). */
  size?: "featured" | "compact";
  className?: string;
}

/**
 * One animated isometric scene per project theme, inside its panel. The panel takes the width of its
 * container and keeps the scene's aspect ratio, so nothing shifts while it loads.
 * Illustrative only: no real UI, data or client marks.
 */
export function ProjectVisual({ variant, size = "compact", className }: ProjectVisualProps) {
  const height = viewHeight(variant);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-line bg-[radial-gradient(ellipse_at_50%_40%,#10203f,#0a1224)]",
        size === "featured" ? "p-2 lg:p-2.5" : "p-1.5",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        focusable="false"
        className="block h-auto w-full"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${height}` }}
      >
        <Scene variant={variant} />
      </svg>
    </div>
  );
}
