import { describe, expect, it } from "vitest";
import { flowLinks } from "./flow";

/** Compare curve geometry independently of the unequal gaps between the existing nodes. */
function normalizedPoints(path: string) {
  const values = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  const start = values[0], width = values[6] - start;
  return Array.from({ length: 4 }, (_, i) => [(values[i * 2] - start) / width, values[i * 2 + 1]]);
}

describe("hero branch geometry", () => {
  for (const row of [0, 1, 2]) {
    it(`mirrors the output curve into input row ${row + 1} without moving endpoints`, () => {
      const input = normalizedPoints(flowLinks[row].d);
      const output = normalizedPoints(flowLinks[6 + row].d);
      const mirrored = output.toReversed().map(([x, y]) => [1 - x, y]);
      input.forEach(([x, y], index) => {
        expect(x).toBeCloseTo(mirrored[index][0], 6);
        expect(y).toBe(mirrored[index][1]);
      });
      // Both curves leave and enter their nodes horizontally; no reversed handles or overshoot.
      for (const points of [input, output]) {
        expect(points[0][1]).toBe(points[1][1]);
        expect(points[2][1]).toBe(points[3][1]);
        expect(points.map(([x]) => x)).toEqual([...points.map(([x]) => x)].sort((a, b) => a - b));
      }
    });
  }
});
