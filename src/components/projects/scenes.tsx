import type { ProjectVisual } from "@/data/projects";
import type { Content } from "@/i18n/content";
import { type Accent, GLASS, type Glass, makeScene } from "./sceneKit";

/** The names on the pictures, in the language of the page. */
export type SceneLabels = Content["copy"]["portfolio"]["scene"];

/*
 * The eight scenes show how each application is built: a block is a component, a name is the component's name
 * from the project's own description or stack, a beam is the direction the data takes. Nothing is drawn that the
 * project data does not name. The geometry and timings follow the approved generators (docs/design-ref/v3), the
 * drawing style follows docs/design-ref/ai-style-architecture-demo.html.
 */

/** 01 SAP Hybris: third-party systems → Data Hub → Hybris (with Solr) → OCC → Spartacus, and CI/CD underneath. */
function hybris(t: SceneLabels["hybris"], accent: Accent) {
  const s = makeScene("hybris", 21, 150, 44, accent);
  const A = s.accent;
  s.floor(-1, -1, 11, 8);
  const ys = [0.4, 2.2, 4.0];
  ys.forEach((y, i) => s.beam([[1.4, y + 0.5], [2.5, y + 0.5], [2.5, 2.9], [3.3, 2.9]], { dur: 3, delay: i * 0.9, orbs: 1 }));
  s.beam([[4.6, 2.9], [5.5, 2.9]], { dur: 1.6, orbs: 1 });
  s.beam([[7.7, 2.9], [8.4, 2.9]], { tone: "ice", dur: 1.4, orbs: 1 });
  s.beam([[8.6, 2.9], [9.3, 2.9]], { tone: "ice", dur: 1.4, orbs: 1, delay: 0.6 });
  s.beam([[0.5, 6.4], [10.5, 6.4]], { dur: 5, orbs: 1, r: 4 });
  ys.forEach((y, i) => s.box(0, y, 0, 1.4, 1, 0.6, GLASS.ice, { depth: y, dur: 3.2 + i * 0.4, delay: i * 0.4 }));
  s.box(3.3, 2.2, 0, 1.3, 1.3, 0.7, GLASS.blue, { depth: 6, dur: 3.6, core: true });
  s.box(6.1, 0, 0, 1.1, 0.9, 0.5, GLASS.ice, { depth: 6.5, dur: 3.4, delay: 0.4 });
  s.box(5.5, 1.8, 0, 2.2, 2.2, 1.1, A.glass, { depth: 8, dur: 4, core: true });
  s.box(5.7, 2, 1.1, 1.8, 1.8, 0.22, GLASS.blue, { depth: 8.1, dur: 4 });
  s.box(5.7, 2, 1.32, 1.8, 1.8, 0.22, GLASS.blue, { depth: 8.2, dur: 4 });
  s.plane(8.5, 1.7, 4.1, 0, 1.5, { depth: 9 });
  s.box(9.3, 1.7, 0, 1.7, 2.4, 0.45, GLASS.blue, { depth: 11, dur: 3.5, delay: 0.3 });
  s.box(10.6, 1.7, 0.45, 0.2, 2.4, 1.1, GLASS.ice, { depth: 11.2, dur: 3.5, delay: 0.3 });
  for (let i = 0; i < 5; i++) s.tick(0.8 + i * 2.35, 6.4, i, i === 4 ? "#dccbff" : "#9bf6ff");
  s.label(0.7, 1.4, 0.6, t.thirdParty, -8, -34);
  s.label(3.95, 2.85, 0.7, t.dataHub, -30, 30);
  s.label(6.6, 0.45, 0.5, t.solr, 40, -34);
  s.label(6.6, 2.9, 1.54, t.hybris, -8, -44);
  s.label(8.5, 2.9, 1.5, t.occ, -30, 34);
  s.label(10.7, 2.9, 1.5, t.spartacus, 36, -20, true);
  s.label(0.5, 6.4, 0, t.cicd, -6, 24);
  s.motes(12, 5);
  return s.render();
}

/**
 * 04 Nexus: three chains → the upstream providers → the Nexus API (failover, cache) → REST, WebSocket and MCP.
 * Every block stands on whole grid cells and every beam runs along the grid; the names sit on free sides.
 */
function chain(t: SceneLabels["chain"], accent: Accent) {
  const s = makeScene("chain", 20, 156, 50, accent);
  const A = s.accent;
  // Centred under the blocks: halfway between the chains and the clients.
  s.floor(-1, -8, 12, 5);
  // Cardano, Midnight and Bitcoin flow into the providers along the grid, then one line runs to the clients.
  s.beam([[0.5, 0.5], [4, 0.5], [4, 1]], { dur: 2.6, orbs: 1, r: 4 });
  s.beam([[2.5, 2.5], [4, 2.5], [4, 1]], { dur: 2.6, orbs: 1, delay: 0.6, r: 4 });
  s.beam([[4.5, 4.5], [4.5, 1]], { dur: 2.6, orbs: 1, delay: 1.2, r: 4 });
  s.beam([[4, 1], [7, 1], [7, -2]], { tone: "ice", dur: 2, orbs: 1, r: 4.5 });
  s.beam([[7, -2], [9.5, -2], [9.5, -4.5]], { dur: 2, orbs: 2, delay: 0.6, r: 4.5 });
  const chains: [number, Glass][] = [[0, GLASS.blue], [2, A.glass], [4, GLASS.ice]];
  chains.forEach(([c, face], i) => s.box(c, c, 0, 1, 1, 0.8, face, { depth: c, anim: "grow", dur: 3.4 + i * 0.4, delay: i * 0.5, core: true }));
  // The upstream providers: two slabs, the amber one in reserve.
  s.box(3, 0, 0, 2, 2, 0.3, GLASS.ice, { depth: 3, dur: 3.6, alpha: 0.9 });
  s.box(3, 0, 0.5, 2, 2, 0.3, GLASS.amber, { depth: 3.1, dur: 3.6, delay: 0.3, alpha: 0.9 });
  s.box(6, -3, 0, 2, 2, 1.4, GLASS.blue, { depth: 5, dur: 3.8, core: true });
  s.ellipse(7, -2, 0, 52, "#5aa6ff");
  s.box(9, -5, 0, 1, 1, 1, A.glass, { depth: 7, dur: 3.2, core: true });
  chains.forEach(([c], i) => s.label(c, c + 1, 0.4, [t.cardano, t.midnight, t.bitcoin][i], -52, 0));
  s.label(5, 2, 0, t.providers, 40, 42);
  s.label(7, -2, 1.4, t.api, 0, -36, true);
  s.label(10, -4, 0, t.clients, 30, 42);
  s.motes(12, 2);
  return s.render();
}

/** The scene of one project, with its names in the given language. */
export function buildScene(variant: Exclude<ProjectVisual, "lobby" | "agent" | "pim" | "documents" | "payments" | "logistics">, labels: SceneLabels, accent: Accent) {
  switch (variant) {
    case "shop":
      return hybris(labels.hybris, accent);
    case "chain":
      return chain(labels.chain, accent);
  }
}

/**
 * The same architecture as a line of text, in the order the data flows: for phones, where the names on the
 * picture are hidden, and for assistive technology, which does not see the picture.
 */
export function sceneChain(variant: ProjectVisual, labels: SceneLabels): string[] {
  switch (variant) {
    case "shop": {
      const t = labels.hybris;
      return [t.thirdParty, t.dataHub, t.hybris, t.occ, t.spartacus];
    }
    case "pim": {
      const t = labels.pimFlow;
      return [t.filesShort, t.parsersShort, t.mappingShort, "Kafka", "MySQL", t.storefront];
    }
    case "logistics": {
      const t = labels.crmFlow;
      return [t.webShort, t.apiShort, t.crmShort, "Quartz", t.emailsShort];
    }
    case "chain": {
      const t = labels.chain;
      return [`${t.cardano} · ${t.midnight} · ${t.bitcoin}`, t.providers, t.api, t.clients];
    }
    case "lobby": {
      const t = labels.lobbyFlow;
      return ["PlayStation · Steam", t.link, t.profile, t.feed];
    }
    case "agent": {
      const t = labels.agentFlow;
      return [t.emailShort, t.understand, t.enrich, t.price, t.policy, t.approvalShort];
    }
    case "documents": {
      const t = labels.ragFlow;
      return [t.userShort, t.tokenShort, t.aclShort, "pgvector", "LLM", t.answer];
    }
    case "payments": {
      const t = labels.payFlow;
      return [t.webShort, t.orderShort, "Kafka", t.paymentShort, "Stripe"];
    }
  }
}
