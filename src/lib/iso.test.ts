import { describe, expect, it } from "vitest";
import { boxFaces, planeQuad, polygonPoints, project, projector, roadQuads, roofFaces, routePath } from "./iso";

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

describe("isometric shapes", () => {
  const P = projector(20, 100, 30);

  it("fixes the scale and origin of a scene", () => {
    expect(P(1, 2, 3)).toEqual(project(20, 100, 30, 1, 2, 3));
  });

  it("builds a box from its top, left and right faces", () => {
    const { top, left, right } = boxFaces(P, 0, 0, 0, 1, 1, 2);
    expect(top).toHaveLength(4);
    // The front corner is shared by all three faces.
    expect(top[2]).toEqual(left[1]);
    expect(top[2]).toEqual(right[1]);
    // The box is two cells high.
    expect(top[0][1]).toBe(P(0, 0, 0)[1] - 40);
  });

  it("puts the ridge of a roof half way along the depth, above the walls", () => {
    const { front, back, gable } = roofFaces(P, 0, 0, 0, 2, 2, 1, 0.5);
    expect(front[2]).toEqual(back[2]);
    expect(front[2]).toEqual(gable[2]);
    expect(front[2][1]).toBe(P(2, 1, 1.5)[1]);
  });

  it("widens a road segment by half its width on each side", () => {
    const [quad] = roadQuads(P, [[0, 0], [4, 0]], 1);
    expect(quad[0]).toEqual(P(-0.5, -0.5, 0.02));
    expect(quad[2]).toEqual(P(4.5, 0.5, 0.02));
  });

  it("draws a sheet on a fixed x", () => {
    const quad = planeQuad(P, 3, 1, 2, 0, 1);
    expect(quad[0]).toEqual(P(3, 1, 0));
    expect(quad[2]).toEqual(P(3, 2, 1));
  });
});
