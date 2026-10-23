/** Isometric projection for the decorative project visuals. Pure functions, no React. */

export type Point = readonly [number, number];

const COS30 = 0.866;

/** Projects grid coordinates (x right-down, y left-down, z up) to SVG coordinates. */
export function project(sc: number, ox: number, oy: number, x: number, y: number, z = 0): Point {
  return [ox + (x - y) * COS30 * sc, oy + (x + y) * 0.5 * sc - z * sc];
}

export function polygonPoints(points: readonly Point[]): string {
  return points.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
}

/** SVG path through grid points on the floor, lifted by `z`. */
export function routePath(sc: number, ox: number, oy: number, route: readonly Point[], z = 0.05): string {
  return route
    .map(([x, y], i) => {
      const [a, b] = project(sc, ox, oy, x, y, z);
      return `${i === 0 ? "M" : "L"}${a.toFixed(1)} ${b.toFixed(1)}`;
    })
    .join(" ");
}

export type Polygon = readonly Point[];
export type Projector = (x: number, y: number, z?: number) => Point;

/** `project` with the scale and origin of one scene fixed. */
export function projector(sc: number, ox: number, oy: number): Projector {
  return (x, y, z = 0) => project(sc, ox, oy, x, y, z);
}

/** The three visible faces of a box standing on `z`, as polygons. */
export function boxFaces(P: Projector, x: number, y: number, z: number, w: number, d: number, h: number) {
  return {
    top: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)] as Polygon,
    left: [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)] as Polygon,
    right: [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)] as Polygon,
  };
}

/** A gabled roof (ridge along x) on top of a box of height `h`; `rh` is the ridge height. */
export function roofFaces(P: Projector, x: number, y: number, z: number, w: number, d: number, h: number, rh: number) {
  const mid = y + d / 2;
  return {
    back: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, mid, z + h + rh), P(x, mid, z + h + rh)] as Polygon,
    front: [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, mid, z + h + rh), P(x, mid, z + h + rh)] as Polygon,
    gable: [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, mid, z + h + rh)] as Polygon,
  };
}

/** One flat quad per straight segment of an axis-aligned route, `wd` wide, lying just above the floor. */
export function roadQuads(P: Projector, route: readonly Point[], wd = 0.8): Polygon[] {
  const half = wd / 2;
  return route.slice(1).map(([x1, y1], i) => {
    const [x0, y0] = route[i];
    const quad: Point[] =
      x0 === x1
        ? [
            [x0 - half, Math.min(y0, y1) - half],
            [x0 + half, Math.min(y0, y1) - half],
            [x0 + half, Math.max(y0, y1) + half],
            [x0 - half, Math.max(y0, y1) + half],
          ]
        : [
            [Math.min(x0, x1) - half, y0 - half],
            [Math.max(x0, x1) + half, y0 - half],
            [Math.max(x0, x1) + half, y0 + half],
            [Math.min(x0, x1) - half, y0 + half],
          ];
    return quad.map(([a, b]) => P(a, b, 0.02));
  });
}

/** A vertical sheet standing on the plane x = `x`, between y0..y1 and z0..z1. */
export function planeQuad(P: Projector, x: number, y0: number, y1: number, z0: number, z1: number): Polygon {
  return [P(x, y0, z0), P(x, y1, z0), P(x, y1, z1), P(x, y0, z1)];
}
