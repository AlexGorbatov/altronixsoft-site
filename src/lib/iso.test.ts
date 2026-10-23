import { describe, expect, it } from "vitest";
import { polygonPoints, project, routePath } from "./iso";

describe("isometric projection", () => {
  it("maps the origin to the offset", () => {
    expect(project(20, 100, 30, 0, 0)).toEqual([100, 30]);
  });

  it("moves right and down along x, left and down along y, up along z", () => {
    const [x1, y1] = project(20, 0, 0, 1, 0);
    const [x2, y2] = project(20, 0, 0, 0, 1);
    const [, y3] = project(20, 0, 0, 0, 0, 1);
    expect(x1).toBeGreaterThan(0);
    expect(y1).toBeGreaterThan(0);
    expect(x2).toBeLessThan(0);
    expect(y2).toBeGreaterThan(0);
    expect(y3).toBe(-20);
  });

  it("formats polygon points and routes", () => {
    expect(polygonPoints([[1, 2], [3.14159, 4]])).toBe("1.0,2.0 3.1,4.0");
    expect(routePath(10, 0, 0, [[0, 0], [1, 0]], 0)).toBe("M0.0 0.0 L8.7 5.0");
  });
});
