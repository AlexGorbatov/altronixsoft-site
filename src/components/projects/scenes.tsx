import type { ProjectVisual } from "@/data/projects";
import type { Content } from "@/i18n/content";

/** The names on the pictures, in the language of the page. */
export type SceneLabels = Content["copy"]["portfolio"]["scene"];

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
