import { Fragment, type CSSProperties, type ReactNode } from "react";
import {
  type Point,
  type Polygon,
  boxFaces,
  planeQuad,
  polygonPoints,
  projector,
  roadQuads,
  roofFaces,
  routePath,
} from "@/lib/iso";
import styles from "./ProjectScene.module.css";

/** Top, left and right tint of a glass block. */
export type Glass = readonly [string, string, string];

/*
 * The palette of the scene drawings. These hex values belong to the pictures only; text colours never come
 * from here.
 */
export const GLASS = {
  ice: ["#cfe0ff", "#7ea2ff", "#4a63d6"],
  cyan: ["#9bf6ff", "#22d6f4", "#1a7cfb"],
  blue: ["#8cbcff", "#2f86ff", "#3b3fd0"],
  violet: ["#dccbff", "#9b6cff", "#6a3fe0"],
  plate: ["#a9bde8", "#5a78c2", "#3a4f94"],
  amber: ["#ffe3b0", "#e6a24a", "#a8691f"],
} as const satisfies Record<string, Glass>;

type Tone = "cyan" | "violet" | "amber";
const TONE: Record<Tone, { line: string; lite: string; orb: string }> = {
  cyan: { line: "#22d6f4", lite: "#9bf6ff", orb: "orb" },
  violet: { line: "#8b5cf6", lite: "#dccbff", orb: "orbV" },
  amber: { line: "#ffb347", lite: "#ffe3b0", orb: "orbA" },
};

/** `--d` is the duration of an animation, `--l` its delay (see ProjectScene.module.css). */
const timing = (d?: number, l?: number): CSSProperties =>
  ({ ...(d !== undefined && { "--d": `${d}s` }), ...(l !== undefined && { "--l": `${l}s` }) }) as CSSProperties;

const ANIM = { bob: styles.bob, grow: styles.grow, none: undefined } as const;

export type BoxOptions = {
  /** Duration and delay of the float / grow cycle. */
  dur?: number;
  delay?: number;
  /** Light in the core of the block. */
  core?: boolean;
  /** `bob` floats, `grow` breathes upwards from the floor, `none` stands still. */
  anim?: "bob" | "grow" | "none";
  /** Paint order, back to front. */
  depth?: number;
  alpha?: number;
};

type Solid = { depth: number; draw: (animate: boolean) => ReactNode };
type Label = { wx: number; wy: number; wz: number; text: string; dx: number; dy: number; tone?: "violet" };

/**
 * One isometric scene in the glass style. Units are grid cells; `sc` is pixels per cell and (`ox`, `oy`) the
 * pixel origin. Floor, beams and rings paint in the order they are called, then the solids (blocks, roofs and
 * gates, back to front by `depth`), then orbs, nodes and the names. The canvas (`viewBox`) is worked out from
 * everything the scene draws, so a scene always sits inside its panel, with room for its names.
 */
export function makeScene(id: string, sc: number, ox: number, oy: number) {
  const P = projector(sc, ox, oy);
  const under: ReactNode[] = [];
  const solids: Solid[] = [];
  const over: ReactNode[] = [];
  const labels: Label[] = [];
  let mote: { count: number; seed: number } | null = null;
  let grid = { cx: 0, cy: 0, r: 100 };

  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const grow = (points: readonly Point[]) => {
    for (const [x, y] of points) {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  };
  const poly = (p: Polygon) => polygonPoints(p);
  const url = (name: string) => `url(#${name}-${id})`;

  const scene = {
    P,

    floor(ax: number, ay: number, bx: number, by: number) {
      const lines: ReactNode[] = [];
      for (let i = ax; i <= bx; i++) {
        const [a, b] = P(i, ay);
        const [c, d] = P(i, by);
        lines.push(<line key={`x${i}`} x1={a} y1={b} x2={c} y2={d} />);
      }
      for (let j = ay; j <= by; j++) {
        const [a, b] = P(ax, j);
        const [c, d] = P(bx, j);
        lines.push(<line key={`y${j}`} x1={a} y1={b} x2={c} y2={d} />);
      }
      const [cx, cy] = P((ax + bx) / 2, (ay + by) / 2);
      const r = (bx - ax) * 17;
      grid = { cx, cy, r };
      under.push(
        <>
          <ellipse cx={cx} cy={cy + 6} rx={r} ry={r / 2} fill={url("floorGlow")} />
          <g mask={url("gridMask")} stroke={url("beam")} strokeOpacity=".34" strokeWidth=".75">
            {lines}
          </g>
        </>,
      );
    },

    /** Tarmac for a route of straight segments. */
    road(route: readonly Point[], width = 0.9) {
      under.push(
        <>
          {roadQuads(P, route, width).map((quad, i) => (
            <polygon key={i} points={poly(quad)} fill="#7cefff" fillOpacity=".07" stroke={url("beam")} strokeOpacity=".35" strokeWidth=".8" />
          ))}
        </>,
      );
    },

    /** A block of glass: translucent faces, a lit top, bright edges. */
    box(x: number, y: number, z: number, w: number, d: number, h: number, pal: Glass, o: BoxOptions = {}) {
      const { top, left, right } = boxFaces(P, x, y, z, w, d, h);
      grow([...top, ...left, ...right]);
      const a = o.alpha ?? 1;
      const cx = (top[0][0] + top[2][0]) / 2;
      const cy = (top[0][1] + top[2][1]) / 2;
      solids.push({
        depth: o.depth ?? x + y + z * 0.01,
        draw: (animate) => (
          <g className={animate ? ANIM[o.anim ?? "bob"] : undefined} style={timing(o.dur, o.delay)}>
            <polygon points={poly(left)} fill={pal[1]} fillOpacity={0.34 * a} />
            <polygon points={poly(right)} fill={pal[2]} fillOpacity={0.3 * a} />
            <polygon points={poly(left)} fill={url("sheen")} fillOpacity=".12" />
            <polygon points={poly(top)} fill={pal[0]} fillOpacity={0.62 * a} />
            <polygon points={poly(top)} fill={url("sheen")} fillOpacity=".35" />
            <polyline points={poly([top[0], top[1], top[2], top[3], top[0]])} fill="none" stroke={url("edge")} strokeWidth="1.15" strokeLinejoin="round" />
            <polyline points={poly([left[3], left[0]])} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth=".9" />
            <polyline points={poly([left[2], left[1], right[0]])} fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth=".8" strokeLinejoin="round" />
            <polyline points={poly([left[2], left[3]])} fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth=".7" />
            {o.core && animate && (
              <ellipse
                className={styles.pulse}
                style={timing(undefined, o.delay ?? 0)}
                cx={cx}
                cy={cy}
                rx={Math.max(w, d) * sc * 0.5}
                ry={Math.max(w, d) * sc * 0.24}
                fill="#fff"
                opacity=".5"
                filter={url("blur2")}
              />
            )}
          </g>
        ),
      });
    },

    /** A gabled roof on a box of height `h`; `rh` is the ridge height. */
    roof(x: number, y: number, z: number, w: number, d: number, h: number, rh: number, pal: Glass, o: { depth: number; dur?: number }) {
      const { back, front, gable } = roofFaces(P, x, y, z, w, d, h, rh);
      grow([...back, ...front]);
      solids.push({
        depth: o.depth,
        draw: () => (
          <g>
            <polygon points={poly(back)} fill={pal[2]} fillOpacity=".34" />
            <polygon points={poly(gable)} fill={pal[1]} fillOpacity=".32" />
            <polygon points={poly(front)} fill={pal[0]} fillOpacity=".6" />
            <polygon points={poly(front)} fill={url("sheen")} fillOpacity=".35" />
            <polyline points={poly([...front, front[0]])} fill="none" stroke={url("edge")} strokeWidth="1.15" strokeLinejoin="round" />
          </g>
        ),
      });
    },

    /** A translucent gate standing across the flow: access control, a scanner, an API. */
    plane(x: number, ya: number, yb: number, za: number, zb: number, o: { color?: string; delay?: number; depth: number }) {
      const quad = planeQuad(P, x, ya, yb, za, zb);
      grow(quad);
      const color = o.color ?? "#22d6f4";
      solids.push({
        depth: o.depth,
        draw: (animate) => (
          <g>
            <polygon className={animate ? styles.scan : undefined} style={timing(undefined, o.delay)} points={poly(quad)} fill={color} fillOpacity=".32" />
            <polygon points={poly(quad)} fill="none" stroke={color} strokeOpacity=".95" strokeWidth="1.1" strokeLinejoin="round" />
          </g>
        ),
      });
    },

    /** A route as a glowing beam: soft halo, flowing dashes, and orbs that travel in its direction. */
    beam(route: readonly Point[], o: { tone?: Tone; dur?: number; delay?: number; orbs?: number; r?: number } = {}) {
      const tone = TONE[o.tone ?? "cyan"];
      const d = routePath(sc, ox, oy, route, 0.05);
      grow(route.map(([x, y]) => P(x, y, 0.05)));
      under.push(
        <>
          <path d={d} fill="none" stroke={tone.line} strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter={url("blur2")} />
          <path className={styles.flow} d={d} fill="none" stroke={tone.lite} strokeOpacity=".9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>,
      );
      const count = o.orbs ?? 2;
      const dur = o.dur ?? 3.2;
      const r = o.r ?? 5.5;
      const dp = routePath(sc, ox, oy, route, 0.3);
      for (let k = 0; k < count; k++) {
        over.push(
          <g className={styles.pk} style={{ offsetPath: `path('${dp}')`, ...timing(dur, (o.delay ?? 0) + (k * dur) / count) }}>
            <circle r={r * 2.6} fill={url(tone.orb)} opacity=".7" />
            <circle r={r * 0.38} fill="#fff" />
          </g>,
        );
      }
    },

    /** A sheet of paper that travels along a route. */
    sheet(route: readonly Point[], dur = 3.4, delay = 0) {
      const dp = routePath(sc, ox, oy, route, 0.35);
      over.push(
        <g className={styles.pk} style={{ offsetPath: `path('${dp}')`, ...timing(dur, delay) }}>
          <polygon points="-7,0 0,-3.8 7,0 0,3.8" fill="#eaf2ff" fillOpacity=".9" />
          <polygon points="-7,0 0,3.8 7,0 7,1.6 0,5.4 -7,1.6" fill="#8fa6d6" fillOpacity=".8" />
        </g>,
      );
    },

    /** A fixed ellipse around a spot, dashed and flowing or solid. */
    ellipse(x: number, y: number, z: number, rx: number, color: string, dashed = true) {
      const [cx, cy] = P(x, y, z);
      grow([[cx - rx, cy - rx / 2], [cx + rx, cy + rx / 2]]);
      under.push(
        <ellipse className={dashed ? styles.flow : undefined} cx={cx} cy={cy} rx={rx} ry={rx / 2} fill="none" stroke={color} strokeOpacity=".55" strokeWidth="1.2" />,
      );
    },

    /** A pipeline node: a dark disc with a lit centre that ticks in turn. */
    tick(x: number, y: number, index: number, color = "#9bf6ff") {
      const [cx, cy] = P(x, y);
      grow([[cx - 7, cy - 3.5], [cx + 7, cy + 3.5]]);
      over.push(
        <>
          <ellipse cx={cx} cy={cy} rx="7" ry="3.5" fill="#0a1430" stroke={color} strokeWidth="1.4" />
          <ellipse className={styles.tick} style={timing(undefined, index)} cx={cx} cy={cy} rx="3" ry="1.5" fill={color} />
        </>,
      );
    },

    /** Anything else drawn on top (a figure, a sheet of paper); `points` keep it inside the canvas. */
    add(node: ReactNode, points: readonly Point[] = []) {
      grow(points);
      over.push(node);
    },

    /** The name of a component: a glass pill tied to a point of the scene by a thin line. */
    label(wx: number, wy: number, wz: number, text: string, dx: number, dy: number, tone?: "violet") {
      labels.push({ wx, wy, wz, text, dx, dy, tone });
    },

    /** Specks of light, scattered over the finished scene. */
    motes(count: number, seed: number) {
      mote = { count, seed };
    },

    render(): { viewBox: string; node: ReactNode } {
      // Names are measured now, so a longer translation widens the canvas instead of leaving it.
      const chips = labels.map((l) => {
        const [x, y] = P(l.wx, l.wy, l.wz);
        const tx = x + l.dx;
        const ty = y + l.dy;
        const w = l.text.length * 6.3 + 18;
        grow([[tx - w / 2, ty - 9], [tx + w / 2, ty + 9], [x, y]]);
        return { ...l, x, y, tx, ty, w };
      });

      const margin = 14;
      const vx = x0 - margin;
      const vy = y0 - margin;
      const vw = x1 - x0 + 2 * margin;
      const vh = y1 - y0 + 2 * margin;

      const specks: ReactNode[] = [];
      if (mote) {
        let s = mote.seed;
        const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
        for (let i = 0; i < mote.count; i++) {
          const cx = vx + rnd() * vw;
          const cy = vy + rnd() * vh;
          const r = 0.8 + rnd() * 1.4;
          const violet = rnd() > 0.5;
          specks.push(
            <circle key={i} className={styles.mote} cx={cx} cy={cy} r={r} fill={violet ? "#dccbff" : "#9bf6ff"} style={timing(4 + rnd() * 5, rnd() * 5)} />,
          );
        }
      }

      const ordered = [...solids].sort((a, b) => a.depth - b.depth);
      const node = (
        <>
          <defs>
            <linearGradient id={`edge-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".95" />
              <stop offset=".5" stopColor="#7cefff" stopOpacity=".8" />
              <stop offset="1" stopColor="#b79bfd" stopOpacity=".9" />
            </linearGradient>
            <linearGradient id={`beam-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22d6f4" />
              <stop offset="1" stopColor="#b79bfd" />
            </linearGradient>
            <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`orb-${id}`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#9bf6ff" />
              <stop offset="1" stopColor="#22d6f4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`orbV-${id}`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#dccbff" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`orbA-${id}`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#ffe3b0" />
              <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`floorGlow-${id}`}>
              <stop offset="0" stopColor="#22d6f4" stopOpacity=".28" />
              <stop offset=".6" stopColor="#8b5cf6" stopOpacity=".1" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`fade-${id}`} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".62" stopColor="#fff" stopOpacity=".75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`gridMask-${id}`} maskUnits="userSpaceOnUse" x="-300" y="-200" width="1100" height="800">
              <rect x={grid.cx - grid.r * 1.15} y={grid.cy - grid.r * 0.62} width={grid.r * 2.3} height={grid.r * 1.24} fill={url("fade")} />
            </mask>
            <filter id={`blur6-${id}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id={`blur2-${id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>
          {under.map((n, i) => (
            <Fragment key={`u${i}`}>{n}</Fragment>
          ))}
          <g>
            {ordered.map((s, i) => (
              <Fragment key={`s${i}`}>{s.draw(true)}</Fragment>
            ))}
          </g>
          {/* The halo is a second, still copy of the blocks, blurred: it never has to be redrawn while they move. */}
          <g filter={url("blur6")} opacity=".5" style={{ mixBlendMode: "screen" }}>
            {ordered.map((s, i) => (
              <Fragment key={`g${i}`}>{s.draw(false)}</Fragment>
            ))}
          </g>
          {over.map((n, i) => (
            <Fragment key={`o${i}`}>{n}</Fragment>
          ))}
          {chips.map(({ text, x, y, tx, ty, w, tone }, i) => {
            const color = tone === "violet" ? "#dccbff" : "#9bf6ff";
            return (
              <g key={`l${i}`} className={styles.label}>
                <line x1={x} y1={y} x2={tx} y2={ty + (ty < y ? 8.5 : -8.5)} stroke={color} strokeOpacity=".55" strokeWidth=".8" strokeDasharray="2 3" />
                <circle cx={x} cy={y} r="2.2" fill={color} />
                <circle className={styles.pulse} cx={x} cy={y} r="5" fill={color} opacity=".3" />
                <rect x={tx - w / 2} y={ty - 8.5} width={w} height="17" rx="8.5" fill="#0a1430" fillOpacity=".7" stroke={color} strokeOpacity=".6" strokeWidth=".8" />
                <text className={styles.chipText} x={tx} y={ty + 3.1} textAnchor="middle" fontSize="8.4" letterSpacing=".8" fill="#e6f8ff">
                  {text}
                </text>
              </g>
            );
          })}
          {specks}
        </>
      );
      return { viewBox: `${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`, node };
    },
  };
  return scene;
}
