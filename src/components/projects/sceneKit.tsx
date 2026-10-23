import { Fragment, type CSSProperties, type ReactNode } from "react";
import {
  type Point,
  type Polygon,
  boxFaces,
  cuboid,
  planeQuad,
  polygonPoints,
  projector,
  roadQuads,
  roofFaces,
  routePath,
} from "@/lib/iso";
import styles from "./ProjectScene.module.css";

/** Top, left and right face colours of a block. */
export type Face = readonly [string, string, string];

/*
 * The palette of the approved scene generator (docs/design-ref/v3/generators). These hex values belong to the
 * drawings only; text colours never come from here.
 */
export const DARK: Face = ["#2f4572", "#1a2a4b", "#121d36"];
export const CYAN: Face = ["#5fe6f8", "#0f90b2", "#096683"];
export const BLUE: Face = ["#5aa6ff", "#1b66e0", "#12449b"];
export const VIOLET: Face = ["#c4aafd", "#7249dc", "#4e30a6"];
export const VIOLET_DEEP: Face = ["#8f78e8", "#4e35a8", "#38257c"];
export const STEEL: Face = ["#3a5688", "#1f3359", "#16253f"];
export const PAPER: Face = ["#c9d6f5", "#7f94c4", "#5d729f"];
export const PAPER_LIGHT: Face = ["#dbe7ff", "#8197c7", "#5f759f"];
export const SHOP_WALL: Face = ["#c9d8ff", "#4d68a8", "#344c7e"];
export const HALL_WALL: Face = ["#cfdcff", "#4d68a8", "#344c7e"];
export const DOOR: Face = ["#0b1424", "#0b1424", "#0b1424"];
export const AMBER: Face = ["#ffd9a0", "#c98a3a", "#8f5f22"];

export const C_CYAN = "#22d6f4";
export const C_CYAN_LIGHT = "#5fe6f8";
export const C_VIOLET = "#8b5cf6";
export const C_VIOLET_LIGHT = "#c4aafd";
export const C_BLUE = "#5aa6ff";
export const C_SKY = "#9ad0ff";
export const C_AMBER_LIGHT = "#ffd9a0";
const C_ROAD = "#22345a";
/** The thin dark line between two faces of a block, so the faces read as separate planes. */
const SEAM = "rgba(4,10,24,.4)";

/** `--d` is the duration of an animation, `--l` its delay (see ProjectScene.module.css). */
const timing = (d?: number, l?: number): CSSProperties =>
  ({ ...(d !== undefined && { "--d": `${d}s` }), ...(l !== undefined && { "--l": `${l}s` }) }) as CSSProperties;

type Item = { depth: number; node: ReactNode };

export type BoxOptions = {
  /** Duration of the float / grow cycle. */
  dur?: number;
  /** Delay of the float / grow cycle. */
  delay?: number;
  glow?: boolean;
  /** Delay of the glow pulse on the top face. */
  glowDelay?: number;
  /** `bob` floats, `grow` breathes upwards from the floor, `none` stands still. */
  anim?: "bob" | "grow" | "none";
  /** Paint order, back to front. Scenes set it by hand, as the generator does. */
  depth?: number;
};

const ANIM_CLASS = { bob: styles.bob, grow: styles.grow, none: undefined } as const;

/**
 * One isometric scene. Units are grid cells; `sc` is pixels per cell and (`ox`, `oy`) the pixel origin.
 * Calls paint in the order they are made, except boxes and roofs: those wait until `flush()` and are then
 * painted back to front by `depth`, like the generator's `srt()`.
 */
export function makeScene(sc: number, ox: number, oy: number) {
  const P = projector(sc, ox, oy);
  const out: ReactNode[] = [];
  let pending: Item[] = [];
  const add = (node: ReactNode) => out.push(<Fragment key={out.length}>{node}</Fragment>);
  const path = (route: readonly Point[], z?: number) => routePath(sc, ox, oy, route, z);
  const poly = (p: Polygon) => polygonPoints(p);

  const scene = {
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
      add(
        <g stroke="rgba(120,160,230,.24)" strokeWidth=".8">
          {lines}
        </g>,
      );
    },

    /** A dashed, flowing route on the floor. */
    route(points: readonly Point[], color = C_CYAN, opacity = 0.55) {
      add(
        <path
          className={styles.dash}
          d={path(points)}
          fill="none"
          stroke={color}
          strokeOpacity={Math.min(1, opacity + 0.2)}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />,
      );
    },

    /** Tarmac for a route of straight segments. */
    road(route: readonly Point[], width = 0.8) {
      add(
        <>
          {roadQuads(P, route, width).map((quad, i) => (
            <polygon key={i} points={poly(quad)} fill={C_ROAD} stroke="rgba(120,160,230,.32)" strokeWidth=".8" />
          ))}
        </>,
      );
    },

    /** A pulse that spreads from a spot on the floor. */
    ring(x: number, y: number, rx: number, color: string, delay = 0) {
      const [cx, cy] = P(x, y);
      add(
        <ellipse
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

    /** A fixed ellipse around a spot, optionally dashed and flowing. */
    ellipse(cx: number, cy: number, z: number, rx: number, color: string, dashed = true) {
      const [x, y] = P(cx, cy, z);
      add(
        <ellipse
          className={dashed ? styles.dash : undefined}
          cx={x}
          cy={y}
          rx={rx}
          ry={rx / 2}
          fill="none"
          stroke={color}
          strokeOpacity=".6"
          strokeWidth="1.2"
        />,
      );
    },

    box(x: number, y: number, z: number, w: number, d: number, h: number, face: Face, o: BoxOptions = {}) {
      const { top, left, right } = boxFaces(P, x, y, z, w, d, h);
      pending.push({
        depth: o.depth ?? x + y,
        node: (
          <g className={ANIM_CLASS[o.anim ?? "bob"]} style={timing(o.dur, o.delay)}>
            <polygon points={poly(left)} fill={face[1]} stroke={SEAM} strokeWidth=".7" strokeLinejoin="round" />
            <polygon points={poly(right)} fill={face[2]} stroke={SEAM} strokeWidth=".7" strokeLinejoin="round" />
            <polygon points={poly(top)} fill={face[0]} />
            {o.glow && (
              <polygon className={styles.glow} style={timing(undefined, o.glowDelay ?? 0)} points={poly(top)} fill="#fff" />
            )}
            <polygon points={poly(top)} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth=".9" strokeLinejoin="round" />
          </g>
        ),
      });
    },

    /** A gabled roof on a box of height `h`; `rh` is the ridge height. */
    roof(
      x: number,
      y: number,
      z: number,
      w: number,
      d: number,
      h: number,
      rh: number,
      face: Face,
      o: Pick<BoxOptions, "dur" | "delay" | "anim" | "depth"> = {},
    ) {
      const { back, front, gable } = roofFaces(P, x, y, z, w, d, h, rh);
      pending.push({
        depth: o.depth ?? x + y,
        node: (
          <g className={ANIM_CLASS[o.anim ?? "none"]} style={timing(o.dur, o.delay)}>
            <polygon points={poly(back)} fill={face[2]} />
            <polygon points={poly(gable)} fill={face[2]} />
            <polygon points={poly(front)} fill={face[0]} />
            <polyline points={poly([...front, front[0]])} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth=".9" strokeLinejoin="round" />
          </g>
        ),
      });
    },

    /** Paint the waiting boxes and roofs, back to front. */
    flush() {
      [...pending].sort((a, b) => a.depth - b.depth).forEach((item) => add(item.node));
      pending = [];
    },

    /** A scanner plane: a translucent sheet that pulses. */
    plane(x: number, y0: number, y1: number, z0: number, z1: number, color = C_CYAN, delay = 0) {
      add(
        <polygon
          className={styles.scan}
          style={timing(undefined, delay)}
          points={poly(planeQuad(P, x, y0, y1, z0, z1))}
          fill={color}
          stroke={color}
          strokeOpacity=".7"
          strokeWidth=".8"
        />,
      );
    },

    /** A glowing dot that travels along a route. */
    packet(route: readonly Point[], color: string, duration = 3.2, delay = 0, r = 3) {
      add(
        <g className={styles.pk} style={{ offsetPath: `path('${path(route, 0.3)}')`, ...timing(duration, delay) }}>
          <circle r={r * 2.4} fill={color} opacity=".22" />
          <circle r={r} fill={color} />
        </g>,
      );
    },

    /** A sheet of paper that travels along a route. */
    sheet(route: readonly Point[], duration = 3.4, delay = 0) {
      add(
        <g className={styles.pk} style={{ offsetPath: `path('${path(route, 0.35)}')`, ...timing(duration, delay) }}>
          <polygon points="-7,0 0,-3.8 7,0 0,3.8" fill="#dbe7ff" />
          <polygon points="-7,0 0,3.8 7,0 7,1.6 0,5.4 -7,1.6" fill="#7f94c4" />
        </g>,
      );
    },

    /** A truck or a parcel that drives along a route. */
    vehicle(route: readonly Point[], kind: "truck" | "parcel", duration = 5, delay = 0) {
      const blocks =
        kind === "truck"
          ? [
              { box: cuboid(1.0, 0.55, 0.42, 17, -9, 6), face: BLUE },
              { box: cuboid(0.38, 0.55, 0.34, 17, 9, 7), face: CYAN },
            ]
          : [{ box: cuboid(0.55, 0.55, 0.5, 16, -4, 4), face: AMBER }];
      add(
        <g className={styles.pk} style={{ offsetPath: `path('${path(route, 0.05)}')`, ...timing(duration, delay) }}>
          {blocks.map(({ box, face }, i) => (
            <Fragment key={i}>
              <polygon points={poly(box.left)} fill={face[1]} />
              <polygon points={poly(box.right)} fill={face[2]} />
              <polygon points={poly(box.top)} fill={face[0]} />
            </Fragment>
          ))}
        </g>,
      );
    },

    /** A pipeline node: a dark disc with a lit centre that ticks in turn. */
    tick(x: number, y: number, color: string, delay: number) {
      const [cx, cy] = P(x, y);
      add(
        <>
          <ellipse cx={cx} cy={cy} rx="7" ry="3.5" fill="#07101f" stroke={color} strokeWidth="1.5" />
          <ellipse className={styles.tick} style={timing(undefined, delay)} cx={cx} cy={cy} rx="3" ry="1.5" fill={color} />
        </>,
      );
    },

    render() {
      scene.flush();
      return <>{out}</>;
    },
  };
  return scene;
}
