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
