import type { ProjectVisual } from "@/data/projects";
import type { Content } from "@/i18n/content";
import type { Point } from "@/lib/iso";
import { GLASS, makeScene } from "./sceneKit";

/** The names on the pictures, in the language of the page. */
export type SceneLabels = Content["copy"]["portfolio"]["scene"];

/*
 * The eight scenes show how each application is built: a block is a component, a name is the component's name
 * from the project's own description or stack, a beam is the direction the data takes. Nothing is drawn that the
 * project data does not name. The geometry and timings follow the approved generators (docs/design-ref/v3), the
 * drawing style follows docs/design-ref/ai-style-architecture-demo.html.
 */

/** 01 SAP Hybris: third-party systems → Data Hub → Hybris (with Solr) → OCC → Spartacus, and CI/CD underneath. */
function hybris(t: SceneLabels["hybris"]) {
  const s = makeScene("hybris", 21, 150, 44);
  s.floor(-1, -1, 11, 8);
  const ys = [0.4, 2.2, 4.0];
  ys.forEach((y, i) => s.beam([[1.4, y + 0.5], [2.5, y + 0.5], [2.5, 2.9], [3.3, 2.9]], { dur: 3, delay: i * 0.9, orbs: 1 }));
  s.beam([[4.6, 2.9], [5.5, 2.9]], { dur: 1.6, orbs: 1 });
  s.beam([[7.7, 2.9], [8.4, 2.9]], { tone: "violet", dur: 1.4, orbs: 1 });
  s.beam([[8.6, 2.9], [9.3, 2.9]], { tone: "violet", dur: 1.4, orbs: 1, delay: 0.6 });
  s.beam([[0.5, 6.4], [10.5, 6.4]], { dur: 5, orbs: 1, r: 4 });
  ys.forEach((y, i) => s.box(0, y, 0, 1.4, 1, 0.6, GLASS.ice, { depth: y, dur: 3.2 + i * 0.4, delay: i * 0.4 }));
  s.box(3.3, 2.2, 0, 1.3, 1.3, 0.7, GLASS.blue, { depth: 6, dur: 3.6, core: true });
  s.box(6.1, 0, 0, 1.1, 0.9, 0.5, GLASS.ice, { depth: 6.5, dur: 3.4, delay: 0.4 });
  s.box(5.5, 1.8, 0, 2.2, 2.2, 1.1, GLASS.cyan, { depth: 8, dur: 4, core: true });
  s.box(5.7, 2, 1.1, 1.8, 1.8, 0.22, GLASS.violet, { depth: 8.1, dur: 4 });
  s.box(5.7, 2, 1.32, 1.8, 1.8, 0.22, GLASS.blue, { depth: 8.2, dur: 4 });
  s.plane(8.5, 1.7, 4.1, 0, 1.5, { depth: 9 });
  s.box(9.3, 1.7, 0, 1.7, 2.4, 0.45, GLASS.violet, { depth: 11, dur: 3.5, delay: 0.3 });
  s.box(10.6, 1.7, 0.45, 0.2, 2.4, 1.1, GLASS.ice, { depth: 11.2, dur: 3.5, delay: 0.3 });
  for (let i = 0; i < 5; i++) s.tick(0.8 + i * 2.35, 6.4, i, i === 4 ? "#dccbff" : "#9bf6ff");
  s.label(0.7, 1.4, 0.6, t.thirdParty, -8, -34);
  s.label(3.95, 2.85, 0.7, t.dataHub, -30, 30);
  s.label(6.6, 0.45, 0.5, t.solr, 40, -34);
  s.label(6.6, 2.9, 1.54, t.hybris, -8, -44);
  s.label(8.5, 2.9, 1.5, t.occ, -30, 34);
  s.label(10.7, 2.9, 1.5, t.spartacus, 36, -20, "violet");
  s.label(0.5, 6.4, 0, t.cicd, -6, 24);
  s.motes(12, 5);
  return s.render();
}

/** 02 PIM: data sources → PIM hub (workflow layers) → enterprise APIs → integrations. */
function pim(t: SceneLabels["pim"]) {
  const s = makeScene("pim", 21, 150, 50);
  s.floor(-1, -1, 11, 7);
  const ys = [0.3, 2.3, 4.3];
  ys.forEach((y, i) => s.beam([[1.8, y + 0.5], [3.2, y + 0.5], [3.2, 3.1], [4.4, 3.1]], { dur: 2.8, delay: i * 0.8, orbs: 1 }));
  s.beam([[6.4, 3.1], [7.4, 3.1], [7.4, 2.0], [8.2, 2.0]], { tone: "violet", dur: 2.2, orbs: 1, delay: 0.4 });
  s.beam([[7.4, 3.1], [7.4, 4.6], [8.2, 4.6]], { tone: "violet", dur: 2.2, orbs: 1, delay: 1.3 });
  ys.forEach((y, i) => s.box(0, y, 0, 1.7, 1, 0.35, GLASS.plate, { depth: y, dur: 3.2 + i * 0.3, delay: i * 0.3, core: i === 1 }));
  const layers = [GLASS.ice, GLASS.violet, GLASS.blue, GLASS.cyan];
  layers.forEach((face, k) => s.box(4.4, 2.4, k * 0.55, 1.9, 1.5, 0.42, face, { depth: 7 + k * 0.01, dur: 3.8, delay: k * 0.2, core: k === 3 }));
  s.plane(6.7, 1.9, 4.3, 0, 1.2, { depth: 8 });
  let n = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      s.box(8.2 + i * 1.5, 1.4 + j * 1.7, 0, 1.2, 1.3, 0.3, (i + j) % 2 ? GLASS.violet : GLASS.cyan, { depth: 10 + i + j, dur: 3.4, delay: n * 0.4 });
      n++;
    }
  }
  s.label(0.85, 1.3, 0.35, t.sources, -44, -26);
  s.label(5.35, 3.1, 1.9, t.hub, 14, -46);
  s.label(6.7, 4.3, 1.2, t.apis, 6, 36);
  s.label(9.4, 2.7, 0.3, t.integrations, 28, -34, "violet");
  s.motes(12, 9);
  return s.render();
}

/** 03 Logistics: an API in front of the backend systems, workflows, trucks to operations; the cloud above. */
function logistics(t: SceneLabels["logistics"]) {
  const s = makeScene("logistics", 22, 150, 56);
  s.floor(-1, -1, 11, 7);
  const route: Point[] = [[1.8, 1.2], [6.2, 1.2], [6.2, 4.8], [9.6, 4.8]];
  s.road(route);
  s.beam(route, { tone: "amber", dur: 7, orbs: 2, r: 4 });
  s.box(0, 0, 0, 3, 2.2, 1.2, GLASS.ice, { depth: 2, anim: "none", core: true });
  s.roof(0, 0, 0, 3, 2.2, 1.2, 0.6, GLASS.violet, { depth: 2.1 });
  for (let k = 0; k < 2; k++) s.box(3.6 + k * 0.7, 2.8, 0, 0.6, 0.6, 0.35 + k * 0.2, GLASS.ice, { depth: 6 + k, dur: 3 + k * 0.4 });
  s.plane(2.2, -0.2, 2.4, 0, 1.4, { depth: 3 });
  s.box(9.2, 4.2, 0, 1.2, 1.2, 0.9, GLASS.violet, { depth: 12, dur: 3.4, delay: 0.3, core: true });
  s.box(5.7, 5.4, 0, 1, 1, 0.7, GLASS.cyan, { depth: 8, dur: 3.6, delay: 0.6, core: true });
  s.box(6.9, 0.2, 0, 1.1, 1, 0.5, GLASS.cyan, { depth: 7, dur: 3.2, core: true });
  // The cloud: a faint glass layer above everything.
  s.box(1.2, 0.6, 3.4, 8.6, 4.4, 0.12, GLASS.plate, { depth: 30, anim: "none", alpha: 0.22 });
  s.label(1.5, 1.1, 1.2, t.backend, -6, -42);
  s.label(2.2, 1.1, 1.4, t.api, 52, -2);
  s.label(4.1, 3.1, 0.55, t.workflows, -20, 30);
  s.label(9.8, 4.8, 0.9, t.operations, 22, -32, "violet");
  s.label(8.6, 1.4, 3.5, t.cloud, 18, -8);
  s.motes(12, 2);
  return s.render();
}

/** 04 Compass AI: a Next.js layer over a Spring Modulith plate of six modules, and a weekly ScoreCard loop. */
function scorecard(t: SceneLabels["scorecard"]) {
  const s = makeScene("scorecard", 20, 156, 50);
  s.floor(-1, -1, 11, 7);
  s.box(0.4, 0.2, 0, 9.4, 5.6, 0.3, GLASS.plate, { depth: 0, anim: "none", alpha: 0.9 });
  const towers: [number, number, number, keyof typeof GLASS][] = [
    [1.4, 0.9, 1.3, "cyan"],
    [4.2, 0.9, 2.0, "blue"],
    [7, 0.9, 1.7, "violet"],
    [1.4, 3.6, 2.2, "blue"],
    [4.2, 3.6, 1.6, "cyan"],
    [7, 3.6, 1.4, "violet"],
  ];
  towers.forEach(([x, y, h, face], i) =>
    s.box(x, y, 0.3, 1.6, 1.6, h, GLASS[face], { depth: x + y + 1, anim: "grow", dur: 3.4 + i * 0.35, delay: i * 0.45, core: i === 1 }),
  );
  s.ellipse(5.1, 3.1, 0.31, 92, "#22d6f4");
  s.beam([[0.8, 0.4], [9.4, 0.4], [9.4, 5.6], [0.8, 5.6], [0.8, 0.4]], { tone: "violet", dur: 9, orbs: 2, r: 5 });
  // The front layer: a glass screen floating above the modules.
  s.box(1.0, 0.5, 3.9, 8.4, 5.0, 0.1, GLASS.ice, { depth: 40, dur: 5, alpha: 0.55 });
  // The modules are only numbered: the data names none of them.
  towers.forEach(([x, y, h], i) => s.label(x + 0.8, y + 0.8, 0.3 + h, `0${i + 1}`, 0, -22 - (i % 2) * 6, i % 3 === 2 ? "violet" : undefined));
  s.label(5.1, 5.7, 0.3, t.modulith, -6, 26);
  s.label(9.4, 0.5, 4.0, t.nextjs, 20, -14);
  s.label(9.4, 3.0, 0.3, t.weekly, 36, 14, "violet");
  s.motes(14, 3);
  return s.render();
}

/** 05 Secure RAG: documents → retrieval → access control → model → response. */
function rag(t: SceneLabels["rag"]) {
  const s = makeScene("rag", 21, 140, 50);
  s.floor(-1, -1, 11, 7);
  s.beam([[1.4, 3], [9.2, 3]], { dur: 4, orbs: 3, r: 5 });
  for (let k = 0; k < 3; k++) s.box(0, 2.2, k * 0.32, 1.8, 1.6, 0.26, GLASS.ice, { depth: 2.2 + k * 0.01, dur: 3.4, delay: k * 0.3 });
  for (let k = 0; k < 3; k++) {
    s.box(2.9, 2.1, k * 0.5, 1.7, 1.7, 0.34, k === 1 ? GLASS.blue : GLASS.plate, { depth: 5 + k * 0.01, dur: 3.8, delay: k * 0.25, core: k === 2 });
  }
  s.box(5.7, 0.9, 0, 0.45, 0.45, 2.3, GLASS.plate, { depth: 8, anim: "none" });
  s.box(5.7, 4.2, 0, 0.45, 0.45, 2.3, GLASS.plate, { depth: 9, anim: "none" });
  s.plane(5.92, 1.2, 4.6, 0, 2.3, { depth: 8.5 });
  s.box(7.3, 2.2, 0, 1.6, 1.6, 1.3, GLASS.cyan, { depth: 12, dur: 4, core: true });
  s.ellipse(8.1, 3, 0, 44, "#22d6f4");
  s.box(9.6, 2.4, 0, 1.2, 1.2, 0.5, GLASS.violet, { depth: 14, dur: 3.2, delay: 0.4 });
  s.label(0.9, 3.0, 0.8, t.documents, -46, -26);
  s.label(3.75, 3.0, 1.5, t.retrieval, -6, -54);
  s.label(5.92, 2.9, 2.3, t.access, 58, -40);
  s.label(8.1, 3.0, 1.3, t.model, 22, -34);
  s.label(10.2, 3.0, 0.5, t.response, 20, 30, "violet");
  s.motes(12, 4);
  return s.render();
}

/** 06 AI Business Workflow Agent: the agent between several systems, with a human approval step. */
function agent(t: SceneLabels["agent"]) {
  const s = makeScene("agent", 21, 152, 56);
  s.floor(-1, -1, 11, 7);
  const spokes: Point[][] = [[[3.4, 3.2], [1.8, 3.2]], [[4.3, 2.2], [4.3, -0.4]], [[4.3, 4.4], [4.3, 6.3]]];
  spokes.forEach((r, i) => {
    s.beam(r, { dur: 2.4, orbs: 1, delay: i * 0.7 });
    s.beam([...r].reverse(), { dur: 2.4, orbs: 1, delay: i * 0.7 + 1.2 });
  });
  const approval: Point[] = [[5.2, 3.2], [9.0, 3.2]];
  s.beam(approval, { tone: "violet", dur: 2.6, orbs: 1, delay: 0.5 });
  s.beam([...approval].reverse(), { tone: "violet", dur: 2.6, orbs: 1, delay: 1.9 });
  s.box(3.3, 2.2, 0, 2, 2, 1.5, GLASS.cyan, { depth: 8, dur: 4, core: true });
  s.ellipse(4.3, 3.2, 0, 52, "#22d6f4");
  s.box(0, 2.6, 0, 1.6, 1.2, 0.6, GLASS.ice, { depth: 2, dur: 3.2 });
  s.box(3.6, -1.8, 0, 1.4, 1.2, 0.6, GLASS.ice, { depth: 0, dur: 3.5, delay: 0.4 });
  s.box(3.6, 5.7, 0, 1.4, 1.2, 0.6, GLASS.ice, { depth: 12, dur: 3.7, delay: 0.8 });
  s.box(9, 2.6, 0, 1.6, 1.2, 0.9, GLASS.violet, { depth: 14, dur: 3.3, delay: 0.2, core: true });
  // The person who approves: a small glass figure on the violet block.
  const [hx, hy] = s.P(9.8, 3.2, 1.55);
  s.add(
    <>
      <circle cx={hx} cy={hy} r="4.2" fill="#fff" fillOpacity=".85" />
      <path d={`M${hx - 6} ${hy + 11} Q${hx} ${hy + 1} ${hx + 6} ${hy + 11} Z`} fill="#fff" fillOpacity=".6" />
    </>,
    [[hx - 6, hy - 5], [hx + 6, hy + 11]],
  );
  s.label(4.3, 3.2, 1.5, t.agent, 0, -46);
  s.label(0.8, 3.2, 0.6, t.system, -8, -34);
  s.label(4.3, -1.2, 0.6, t.system, 34, -10);
  s.label(4.3, 6.3, 0.6, t.system, 40, 22);
  s.label(9.8, 3.2, 1.9, t.approval, 10, -36, "violet");
  s.motes(12, 6);
  return s.render();
}

/** 07 AI Document Processing: pages → extraction → validation → structured data for downstream systems. */
function documents(t: SceneLabels["documents"]) {
  const s = makeScene("documents", 21, 120, 54);
  s.floor(-1, -1, 11, 7);
  s.beam([[1.6, 3.1], [10, 3.1]], { dur: 4, orbs: 0 });
  for (let k = 0; k < 4; k++) s.box(0, 2.3, k * 0.3, 1.6, 1.6, 0.24, GLASS.ice, { depth: 2.3 + k * 0.01, dur: 3.4, delay: k * 0.25 });
  s.box(3.6, 1.3, 0, 0.45, 0.45, 2, GLASS.plate, { depth: 6, anim: "none" });
  s.box(3.6, 4.6, 0, 0.45, 0.45, 2, GLASS.plate, { depth: 8, anim: "none" });
  s.plane(3.82, 1.6, 4.9, 0, 2, { depth: 7 });
  s.box(5.4, 1.3, 0, 0.45, 0.45, 2, GLASS.plate, { depth: 8.5, anim: "none" });
  s.box(5.4, 4.6, 0, 0.45, 0.45, 2, GLASS.plate, { depth: 10, anim: "none" });
  s.plane(5.62, 1.6, 4.9, 0, 2, { color: "#9bf6ff", delay: 1.2, depth: 9 });
  let n = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const h = 0.5 + ((i * 3 + j) % 4) * 0.35;
      const face = (i + j) % 2 === 0 ? GLASS.cyan : (i + j) % 3 === 0 ? GLASS.violet : GLASS.blue;
      s.box(7.2 + i * 1.2, 1.5 + j * 1.2, 0, 0.95, 0.95, h, face, { depth: 11 + i * 1.3 + j * 1.2, anim: "grow", dur: 3.2 + n * 0.2, delay: n * 0.3 });
      n++;
    }
  }
  // Pages travel along the route as little glass sheets.
  for (let k = 0; k < 3; k++) s.sheet([[1.8, 3.1], [7, 3.1]], 4, k * 1.3);
  s.label(0.8, 3.1, 1.1, t.incoming, -6, -44);
  s.label(3.82, 4.9, 0.6, t.extraction, -14, 30);
  s.label(5.62, 3.1, 2, t.validation, 30, -24, "violet");
  s.label(8.6, 3.2, 1.2, t.downstream, 30, -42);
  s.motes(12, 8);
  return s.render();
}

/** 08 LLM Gateway: clients → one gateway (routing, limits) → several models; an audit trail kept alongside. */
function gateway(t: SceneLabels["gateway"]) {
  const s = makeScene("gateway", 21, 140, 50);
  s.floor(-1, -1, 11, 7);
  const fan = [0.3, 2.5, 4.7].map((y): Point[] => [[5.6, 3.1], [6.8, 3.1], [6.8, y + 0.6], [7.6, y + 0.6]]);
  for (let k = 0; k < 3; k++) s.beam([[1.7, 3.1], [3.5, 3.1]], { dur: 1.6, orbs: 1, delay: k * 0.5, r: 4.5 });
  fan.forEach((f, i) => s.beam(f, { tone: i === 1 ? "violet" : "cyan", dur: 2.6, orbs: 1, delay: i * 0.7 + 0.4 }));
  s.beam([[4.55, 4.2], [4.55, 6.0]], { tone: "amber", dur: 2.4, orbs: 1, r: 4 });
  s.box(0, 1.2, 0, 1.8, 3.8, 0.5, GLASS.ice, { depth: 2, dur: 3.4 });
  s.box(3.5, 2.1, 0, 2.1, 2.1, 1.3, GLASS.blue, { depth: 8, dur: 3.8, core: true });
  s.ellipse(4.55, 3.15, 0, 48, "#5aa6ff");
  const models: [number, number, keyof typeof GLASS][] = [[0.3, 2.4, "cyan"], [2.5, 1.5, "violet"], [4.7, 2, "blue"]];
  models.forEach(([y, h, face], i) => s.box(7.6, y, 0, 1.8, 1.4, h, GLASS[face], { depth: 9 + y, anim: "grow", dur: 3.4 + i * 0.4, delay: i * 0.5, core: true }));
  // The audit trail: a stack of thin log slabs.
  for (let k = 0; k < 4; k++) s.box(3.7, 5.9, k * 0.16, 1.7, 1, 0.12, GLASS.amber, { depth: 12 + k * 0.01, dur: 3.6, delay: k * 0.2, alpha: 0.9 });
  s.label(0.9, 3.1, 0.5, t.clients, -42, -28);
  s.label(4.55, 3.15, 1.3, t.gateway, 30, -58);
  s.label(8.5, 0.6, 2.4, t.models, 22, -22);
  s.label(4.55, 6.4, 0.5, t.audit, -64, 22);
  s.motes(12, 1);
  return s.render();
}

/** The scene of one project, with its names in the given language. */
export function buildScene(variant: ProjectVisual, labels: SceneLabels) {
  switch (variant) {
    case "shop":
      return hybris(labels.hybris);
    case "pim":
      return pim(labels.pim);
    case "logistics":
      return logistics(labels.logistics);
    case "scorecard":
      return scorecard(labels.scorecard);
    case "rag":
      return rag(labels.rag);
    case "agent":
      return agent(labels.agent);
    case "documents":
      return documents(labels.documents);
    case "gateway":
      return gateway(labels.gateway);
  }
}
