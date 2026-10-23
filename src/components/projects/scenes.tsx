import type { Point } from "@/lib/iso";
import type { ProjectVisual } from "@/data/projects";
import {
  BLUE,
  C_AMBER_LIGHT,
  C_BLUE,
  C_CYAN,
  C_CYAN_LIGHT,
  C_SKY,
  C_VIOLET,
  C_VIOLET_LIGHT,
  CYAN,
  DARK,
  DOOR,
  HALL_WALL,
  PAPER,
  PAPER_LIGHT,
  SHOP_WALL,
  STEEL,
  VIOLET,
  VIOLET_DEEP,
  makeScene,
} from "./sceneKit";

/*
 * The eight scenes, ported number for number from docs/design-ref/v3/generators (scenes2.py, gen_pf2.py).
 * Same scale, origin, block coordinates, routes, paint order and timings. Each one is drawn on a 400×240 canvas.
 */

/** Client e-commerce: parcels leave a depot along a road, pass a shop and reach the order stack. */
function Shop() {
  const s = makeScene(23, 146, 58);
  s.floor(-1, -1, 11, 7);
  const road: Point[] = [[0.8, 2.4], [10, 2.4]];
  s.road(road, 0.9);
  s.route(road, C_CYAN, 0.35);
  for (let k = 0; k < 3; k++) {
    s.box(0, 0.2 + k * 0.9, 0, 0.9, 0.8, 0.6 + k * 0.15, DARK, { dur: 3.2 + k * 0.3, delay: k * 0.3, depth: 0.1 + k });
  }
  s.box(4.6, 0.5, 0, 2.6, 2.2, 1.3, SHOP_WALL, { dur: 4, depth: 5.5 });
  s.roof(4.6, 0.5, 0, 2.6, 2.2, 1.3, 0.8, CYAN, { anim: "bob", dur: 4, depth: 5.6 });
  for (let k = 0; k < 4; k++) {
    s.box(4.6 + k * 0.65, 2.7, 0.65, 0.32, 0.38, 0.08, k % 2 === 0 ? CYAN : VIOLET, { dur: 4, depth: 6 + k * 0.01 });
  }
  s.box(8.9, 3.6, 0, 1.8, 1.6, 0.55, VIOLET, { dur: 3.5, delay: 0.4, depth: 9.5 });
  s.box(9.2, 3.9, 0.55, 1.2, 1.0, 0.45, VIOLET_DEEP, { dur: 3.5, delay: 0.7, depth: 10 });
  s.flush();
  for (let k = 0; k < 3; k++) s.vehicle([[0.9, 2.4], [4.4, 2.4]], "parcel", 3.2, k * 1.05);
  for (let k = 0; k < 3; k++) s.vehicle([[7.1, 2.4], [9.4, 2.4], [9.4, 3.7]], "parcel", 3.2, k * 1.05 + 0.5);
  return s.render();
}

/** Client PIM: product sheets enter a stacked hub and fan out to channels. */
function Pim() {
  const s = makeScene(21, 150, 50);
  s.floor(-1, -1, 11, 7);
  const ys = [0.3, 2.3, 4.3];
  const feeds = ys.map((y): Point[] => [[1.8, y + 0.5], [3.2, y + 0.5], [3.2, 3.1], [4.4, 3.1]]);
  feeds.forEach((f) => s.route(f, C_CYAN, 0.5));
  ys.forEach((y, i) =>
    s.box(0, y, 0, 1.7, 1.0, 0.35, STEEL, { dur: 3.2 + i * 0.3, delay: i * 0.3, glow: true, glowDelay: i * 0.7, depth: y }),
  );
  for (let k = 0; k < 4; k++) {
    const face = k === 3 ? CYAN : k === 2 ? BLUE : k === 1 ? VIOLET_DEEP : DARK;
    s.box(4.4, 2.4, k * 0.55, 1.9, 1.5, 0.42, face, { dur: 3.8, delay: k * 0.2, glow: k === 3, depth: 7 + k * 0.01 });
  }
  let n = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      s.box(8.2 + i * 1.5, 1.4 + j * 1.7, 0, 1.2, 1.3, 0.3, (i + j) % 2 === 0 ? CYAN : VIOLET, {
        dur: 3.4,
        delay: n * 0.4,
        glow: true,
        glowDelay: n * 0.6,
        depth: 10 + i + j,
      });
      n++;
    }
  }
  const outA: Point[] = [[6.4, 3.1], [7.4, 3.1], [7.4, 2.0], [8.2, 2.0]];
  const outB: Point[] = [[6.4, 3.1], [7.4, 3.1], [7.4, 4.6], [8.2, 4.6]];
  s.route([[6.4, 3.1], [7.4, 3.1], [7.4, 2.0], [8.2, 2.0]], C_VIOLET, 0.6);
  s.route([[7.4, 3.1], [7.4, 4.6], [8.2, 4.6]], C_VIOLET, 0.6);
  s.flush();
  feeds.forEach((f, i) => s.packet(f, C_CYAN_LIGHT, 2.8, i * 0.8));
  s.packet(outA, C_VIOLET_LIGHT, 2.2, 0.4);
  s.packet(outB, C_VIOLET_LIGHT, 2.2, 1.3);
  return s.render();
}

/** Client logistics: a depot sends trucks round a delivery route to its stops. */
function Logistics() {
  const s = makeScene(22, 150, 50);
  s.floor(-1, -1, 11, 7);
  const route: Point[] = [[1.8, 1.2], [6.2, 1.2], [6.2, 4.8], [9.6, 4.8]];
  s.road(route, 0.9);
  s.route(route, C_AMBER_LIGHT, 0.45);
  s.box(0, 0, 0, 3, 2.2, 1.2, HALL_WALL, { anim: "none", depth: 2 });
  s.roof(0, 0, 0, 3, 2.2, 1.2, 0.6, VIOLET, { depth: 2.1 });
  for (let k = 0; k < 3; k++) s.box(0.4 + k * 0.9, 2.19, 0, 0.6, 0.02, 0.7, DOOR, { anim: "none", depth: 4 + k * 0.01 });
  for (let k = 0; k < 2; k++) s.box(3.6 + k * 0.7, 2.8, 0, 0.6, 0.6, 0.35 + k * 0.2, DARK, { dur: 3 + k * 0.4, depth: 6 + k });
  s.box(9.2, 4.2, 0, 1.2, 1.2, 0.9, VIOLET, { dur: 3.4, delay: 0.3, glow: true, glowDelay: 0.5, depth: 12 });
  s.box(5.7, 5.4, 0, 1.0, 1.0, 0.7, CYAN, { dur: 3.6, delay: 0.6, glow: true, glowDelay: 1.1, depth: 8 });
  s.box(6.9, 0.2, 0, 1.1, 1.0, 0.5, CYAN, { dur: 3.2, glow: true, glowDelay: 0.2, depth: 7 });
  s.flush();
  s.ring(9.8, 4.8, 18, C_VIOLET_LIGHT, 0);
  s.vehicle(route, "truck", 7, 0);
  s.vehicle(route, "truck", 7, 3.5);
  return s.render();
}

/** Compass AI: a platform of six module towers, scanned by two orbiting signals. */
function Scorecard() {
  const s = makeScene(20, 156, 40);
  s.floor(-1, -1, 11, 7);
  s.box(0.4, 0.2, 0, 9.4, 5.6, 0.3, DARK, { anim: "none", depth: 0 });
  const towers: [number, number, number, typeof CYAN][] = [
    [1.4, 0.9, 1.3, CYAN],
    [4.2, 0.9, 2.4, BLUE],
    [7, 0.9, 1.7, VIOLET],
    [1.4, 3.6, 2.7, BLUE],
    [4.2, 3.6, 1.9, CYAN],
    [7, 3.6, 1.4, VIOLET_DEEP],
  ];
  towers.forEach(([x, y, h, face], i) =>
    s.box(x, y, 0.3, 1.6, 1.6, h, face, { anim: "grow", dur: 3.4 + i * 0.35, delay: i * 0.45, glow: h > 2, depth: x + y + 1 }),
  );
  s.ellipse(5.1, 3.1, 0.31, 92, C_CYAN);
  s.ellipse(5.1, 3.1, 0.31, 64, C_VIOLET, false);
  s.flush();
  const loop: Point[] = [[0.8, 0.4], [9.4, 0.4], [9.4, 5.6], [0.8, 5.6], [0.8, 0.4]];
  s.packet(loop, C_CYAN_LIGHT, 9, 0, 2.8);
  s.packet(loop, C_VIOLET_LIGHT, 9, 4.5, 2.8);
  return s.render();
}

/** Secure RAG: documents pass an access-control gate before they reach the model. */
function Rag() {
  const s = makeScene(21, 140, 46);
  s.floor(-1, -1, 11, 7);
  const route: Point[] = [[1.4, 3], [9.2, 3]];
  s.route(route);
  for (let k = 0; k < 3; k++) s.box(0, 2.2, k * 0.32, 1.8, 1.6, 0.26, PAPER, { dur: 3.4, delay: k * 0.3, depth: 2.2 + k * 0.01 });
  for (let k = 0; k < 3; k++) s.box(2.9, 2.1, k * 0.5, 1.7, 1.7, 0.34, k === 1 ? BLUE : DARK, { dur: 3.8, delay: k * 0.25, depth: 5 + k * 0.01 });
  s.box(5.7, 0.9, 0, 0.45, 0.45, 2.3, DARK, { anim: "none", depth: 8 });
  s.box(5.7, 4.2, 0, 0.45, 0.45, 2.3, DARK, { anim: "none", depth: 9 });
  s.box(7.3, 2.2, 0, 1.6, 1.6, 1.3, CYAN, { dur: 4, glow: true, depth: 12 });
  s.box(9.6, 2.4, 0, 1.2, 1.2, 0.5, VIOLET, { dur: 3.2, delay: 0.4, depth: 14 });
  s.flush();
  s.plane(5.92, 1.2, 4.6, 0, 2.3);
  s.ring(8.1, 3, 22, C_CYAN, 0);
  for (let k = 0; k < 3; k++) s.packet(route, C_CYAN_LIGHT, 4, k * 1.4);
  return s.render();
}

/** AI Business Workflow Agent: a core that talks to three systems, with a violet approval step. */
function Agent() {
  const s = makeScene(21, 152, 54);
  s.floor(-1, -1, 11, 7);
  const spokes: Point[][] = [[[3.4, 3.2], [1.8, 3.2]], [[4.3, 2.2], [4.3, -0.4]], [[4.3, 4.4], [4.3, 6.3]]];
  const approval: Point[] = [[5.2, 3.2], [9.0, 3.2]];
  s.route(approval, C_VIOLET, 0.7);
  s.route([[3.4, 3.2], [1.8, 3.2]]);
  s.route([[4.3, 4.4], [4.3, 6.3]]);
  s.route([[4.3, 2.2], [4.3, -0.4]]);
  s.box(3.3, 2.2, 0, 2, 2, 1.5, CYAN, { dur: 4, glow: true, depth: 8 });
  s.box(0, 2.6, 0, 1.6, 1.2, 0.6, DARK, { dur: 3.2, depth: 2 });
  s.box(3.6, -1.8, 0, 1.4, 1.2, 0.6, DARK, { dur: 3.5, delay: 0.4, depth: 0 });
  s.box(3.6, 5.7, 0, 1.4, 1.2, 0.6, DARK, { dur: 3.7, delay: 0.8, depth: 12 });
  s.box(9, 2.6, 0, 1.6, 1.2, 0.9, VIOLET, { dur: 3.3, delay: 0.2, glow: true, depth: 14 });
  s.ring(4.3, 3.2, 26, C_CYAN, 0);
  s.ring(4.3, 3.2, 26, C_CYAN, 1.5);
  s.flush();
  spokes.forEach((r, i) => {
    s.packet(r, C_CYAN_LIGHT, 2.4, i * 0.7);
    s.packet([...r].reverse(), C_SKY, 2.4, i * 0.7 + 1.2);
  });
  s.packet(approval, C_VIOLET_LIGHT, 2.6, 0.5);
  s.packet([...approval].reverse(), C_VIOLET_LIGHT, 2.6, 1.9);
  return s.render();
}

/** AI Document Processing: a stack of pages is scanned and becomes a city of checked data. */
function Documents() {
  const s = makeScene(21, 126, 48);
  s.floor(-1, -1, 11, 7);
  const route: Point[] = [[1.6, 3.1], [10, 3.1]];
  s.route(route);
  for (let k = 0; k < 4; k++) s.box(0, 2.3, k * 0.3, 1.6, 1.6, 0.24, PAPER_LIGHT, { dur: 3.4, delay: k * 0.25, depth: 2.3 + k * 0.01 });
  s.box(4.2, 1.3, 0, 0.45, 0.45, 2, DARK, { anim: "none", depth: 7 });
  s.box(4.2, 4.6, 0, 0.45, 0.45, 2, DARK, { anim: "none", depth: 9 });
  let n = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const h = 0.5 + ((i * 3 + j) % 4) * 0.35;
      const face = (i + j) % 2 === 0 ? CYAN : (i + j) % 3 === 0 ? VIOLET : BLUE;
      s.box(7 + i * 1.2, 1.5 + j * 1.2, 0, 0.95, 0.95, h, face, {
        anim: "grow",
        dur: 3.2 + n * 0.2,
        delay: n * 0.3,
        depth: 7.8 + i * 1.3 + j * 1.2 + 3,
      });
      n++;
    }
  }
  s.flush();
  s.plane(4.42, 1.6, 4.9, 0, 2);
  for (let k = 0; k < 3; k++) s.sheet([[1.8, 3.1], [7, 3.1]], 4, k * 1.3);
  return s.render();
}

/** LLM Gateway: requests meet one gateway and fan out to three model towers. */
function Gateway() {
  const s = makeScene(21, 140, 46);
  s.floor(-1, -1, 11, 7);
  const intake: Point[] = [[1.7, 3.1], [3.5, 3.1]];
  const fan = [0.3, 2.5, 4.7].map((y): Point[] => [[5.6, 3.1], [6.8, 3.1], [6.8, y + 0.6], [7.6, y + 0.6]]);
  s.route([[1.7, 3.1], [3.5, 3.1]]);
  fan.forEach((f) => s.route(f, C_VIOLET, 0.65));
  s.box(0, 1.2, 0, 1.8, 3.8, 0.5, DARK, { dur: 3.4, depth: 2 });
  s.box(3.5, 2.1, 0, 2.1, 2.1, 1.3, BLUE, { dur: 3.8, glow: true, depth: 8 });
  const models: [number, number, typeof CYAN][] = [
    [0.3, 2.4, CYAN],
    [2.5, 1.5, VIOLET],
    [4.7, 2, BLUE],
  ];
  models.forEach(([y, h, face], i) =>
    s.box(7.6, y, 0, 1.8, 1.4, h, face, { anim: "grow", dur: 3.4 + i * 0.4, delay: i * 0.5, glow: true, depth: 9 + y }),
  );
  s.ring(4.6, 3.1, 24, C_BLUE, 0);
  s.flush();
  for (let k = 0; k < 3; k++) s.packet(intake, C_CYAN_LIGHT, 1.6, k * 0.5, 2.4);
  fan.forEach((f, i) => s.packet(f, i === 1 ? C_VIOLET_LIGHT : C_CYAN_LIGHT, 2.6, i * 0.7 + 0.4));
  return s.render();
}

/**
 * The canvas of each scene: everything it draws, floor grid included, plus a margin of 16 units on every side.
 * A scene therefore always sits inside its panel, centred, even while a card is hovered and the scene grows by
 * a few percent. Measured from the rendered scenes; update it when a scene's geometry changes.
 */
export const VIEWBOX: Record<ProjectVisual, string> = {
  shop: "-29 19 430 262",
  pim: "-12 13 396 242",
  logistics: "-18 6 413 258",
  scorecard: "1 4 378 232",
  rag: "-22 9 396 242",
  agent: "-10 17 396 242",
  documents: "-36 11 396 242",
  gateway: "-22 9 396 242",
};

/** The scene of one project. */
export function Scene({ variant }: { variant: ProjectVisual }) {
  switch (variant) {
    case "shop":
      return <Shop />;
    case "pim":
      return <Pim />;
    case "logistics":
      return <Logistics />;
    case "scorecard":
      return <Scorecard />;
    case "rag":
      return <Rag />;
    case "agent":
      return <Agent />;
    case "documents":
      return <Documents />;
    case "gateway":
      return <Gateway />;
  }
}
