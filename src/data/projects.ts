/** The isometric scene drawn for a project (see `ProjectScene`). */
export type ProjectVisual = "shop" | "pim" | "logistics" | "chain" | "rag" | "agent" | "documents" | "gateway";

export interface CaseStudy {
  /** URL slug of /work/[slug]. */
  slug: string;
  title: string;
  /** Which abstract diagram is drawn on the card (no real screenshots or client data). */
  visual: ProjectVisual;
  /** Short industry label, also used as the card's mono eyebrow. */
  industry: string;
  /** One-line summary for the card and the top of the case page. */
  summary: string;
  /** Industry and scale: users / orders / SKUs / countries. */
  context: string;
  challenge: string;
  /** What the team did: one paragraph, or the sentence above `workItems` when the work is split into areas. */
  whatWeDid: string;
  /** The work split into areas, each shown as its own block under "What we did". */
  workItems?: { title: string; text: string }[];
  /** Measurable outcome. Cases without a filled `result` still render; dev mode warns about them. */
  result: string;
  stack: string[];
  duration: string;
  /** Team size, e.g. "5 people". Optional; hidden when empty. */
  team?: string;
  /** Our part in the engagement. Leave empty to hide the Role line. */
  role: string;
  /** What the engagement concentrated on. Known today, shown as highlights on the case page. */
  focus: string;
  /** The layers of the system, from the user down to the data, as listed on the case page. */
  architecture?: { title: string; text: string }[];
  /** The public product, when there is one: linked from the case page. */
  liveUrl?: string;
}

/**
 * Commercial delivery experience, presented anonymously: no client names, no invented numbers.
 * Every `TODO(owner)` value is hidden on the site until it is replaced with a real fact
 * (see `filled()` in `src/lib/todo.ts`).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-ecommerce-platform",
    title: "SAP Hybris e-commerce platform",
    visual: "shop",
    industry: "E-commerce",
    summary: "Integrations, Solr search, promotions and checkout on a high-load SAP Hybris store for a German furniture retailer.",
    context: "Furniture and home decor retailer in Germany.",
    challenge:
      "The retailer's SAP Hybris store had to exchange data with external third-party systems, take in large volumes of data, and stay stable under high production load while new features kept shipping.",
    whatWeDid:
      "A team of five worked on the store for five months, in Scrum, with regular code reviews and mentoring. The work covered six areas.",
    workItems: [
      {
        title: "Integrations and data",
        text: "REST and SOAP integrations with third-party systems, and large data volumes loaded into the platform through Data Hub.",
      },
      {
        title: "Storefront APIs",
        text: "OCC web services that serve user, account, cart and order data to the Spartacus frontend.",
      },
      {
        title: "Search",
        text: "Solr search extended with new product listing filters, category extraction and facets.",
      },
      {
        title: "Promotions and notifications",
        text: "Custom promotion rule templates and a reworked email notification process.",
      },
      {
        title: "Checkout",
        text: "A customized checkout flow and cart management.",
      },
      {
        title: "Delivery",
        text: "The CI/CD pipeline and nightly builds set up and improved, test coverage kept adequate, and production issues and bugs fixed.",
      },
    ],
    result: "Every feature shipped on schedule through the CI/CD pipeline, and the store stayed stable under high production load.",
    stack: ["SAP Commerce (Hybris) 2011", "Java 11", "Spring", "OCC", "Spartacus", "Solr", "Data Hub", "CI/CD"],
    duration: "5 months",
    team: "5 people",
    role: "",
    focus: "Integrations, storefront APIs and search on a high-load store",
    architecture: [
      {
        title: "Storefront",
        text: "The Spartacus frontend: product listings with search filters, the cart and the checkout.",
      },
      {
        title: "Storefront APIs",
        text: "OCC web services that serve users, accounts, carts and orders to the storefront.",
      },
      {
        title: "Commerce core",
        text: "SAP Commerce (Hybris) 2011 on Java 11 and Spring: cart and checkout, orders, promotion rules and email notifications.",
      },
      {
        title: "Search",
        text: "Solr, with product listing filters, category extraction and facets.",
      },
      {
        title: "Integrations and data",
        text: "REST and SOAP web services to third-party systems, and Data Hub for large data loads.",
      },
      {
        title: "Delivery",
        text: "A CI/CD pipeline with nightly builds and test coverage.",
      },
    ],
  },
  {
    slug: "product-information-platform",
    title: "Product information platform",
    visual: "pim",
    industry: "Product information (PIM)",
    summary: "Centralized product information, integrations and enterprise workflows.",
    context: "TODO(owner): industry and scale, e.g. SKUs / channels / countries",
    challenge: "TODO(owner): the business or technical problem the client had",
    whatWeDid: "TODO(owner): what the team built, changed or stabilised",
    result: "TODO(owner): measurable result",
    stack: ["Java", "Spring", "Enterprise APIs"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "Backend and integration engineering",
    focus: "Data flows and workflow integrity",
  },
  {
    slug: "logistics-operations-platform",
    title: "Logistics operations platform",
    visual: "logistics",
    industry: "Logistics",
    summary: "Backend systems for logistics workflows, APIs and day-to-day operations.",
    context: "TODO(owner): industry and scale, e.g. shipments / users / countries",
    challenge: "TODO(owner): the business or technical problem the client had",
    whatWeDid: "TODO(owner): what the team built, changed or stabilised",
    result: "TODO(owner): measurable result",
    stack: ["Java", "Spring", "Cloud"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "Backend engineering",
    focus: "Operational workflows and API design",
  },
  {
    slug: "nexus",
    title: "Nexus",
    visual: "chain",
    industry: "Blockchain · Data API",
    summary: "Managed multi-chain data and transaction API for Cardano, Midnight and Bitcoin, with provider failover and OpenAPI 3.1.",
    context: "Blockchain infrastructure for wallets, dApps, exchanges and AI agents on Cardano, Bitcoin and Midnight.",
    challenge:
      "Give wallets, dApps and AI agents one dependable way into three different blockchains: chain data, market data and transactions behind one base URL and one API key, without depending on a single upstream provider and without ever holding a user's private keys.",
    whatWeDid:
      "We built one API surface over Cardano, Bitcoin and Midnight. Every request is served behind several upstreams, Yaci, Koios, Blockfrost and our own indexers: per-provider health checks pick a healthy one for each call, and hot data is served from cache. On top sit chain data in ten endpoint groups, market data across 11 Cardano DEXes, wallet analytics, best-price swap routing and server-side transaction building that returns unsigned CBOR, so keys never leave the client. The same data is pushed over WebSocket streaming and offered to AI agents through a hosted MCP server, and the whole surface is described by an OpenAPI 3.1 spec, with a typed TypeScript SDK generated from it.",
    result:
      "The client's own non-custodial wallet runs on the platform in production: its swap routing, market data and transaction building go through the same API that external developers use.",
    stack: ["Cardano", "Bitcoin", "Midnight", "REST", "WebSocket", "MCP", "OpenAPI 3.1", "TypeScript SDK", "Kubernetes", "PostgreSQL"],
    duration: "TODO(owner): duration, e.g. N months",
    role: "",
    focus: "Multi-provider failover, one API surface across three chains, and non-custodial transaction building",
    architecture: [
      {
        title: "Clients",
        text: "Wallets, dApps, exchanges and AI agents connect over REST, WebSocket streaming or the hosted MCP server, with the typed TypeScript SDK or any HTTP client.",
      },
      {
        title: "One API surface",
        text: "One base URL and one X-Api-Key header for every chain. Each key is scoped to one chain and one network, and an OpenAPI 3.1 spec with a live playground describes every endpoint.",
      },
      {
        title: "Products",
        text: "Chain data, market data across 11 Cardano DEXes, wallet analytics, best-price swap routing and server-side transaction building.",
      },
      {
        title: "Routing and cache",
        text: "Health checks per provider pick a healthy upstream for every call and route around a degraded one. Hot data is served from cache, and usage is counted per key.",
      },
      {
        title: "Upstreams and chains",
        text: "Yaci, Koios, Blockfrost and our own indexers, over Cardano, Bitcoin and Midnight.",
      },
      {
        title: "Non-custodial by design",
        text: "Transactions are built unsigned and signed on the client, so private keys never reach the platform.",
      },
    ],
    liveUrl: "https://nexus.gerowallet.io/",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** What kind of work a project is: delivered for a client, our own product, or AI work. */
export type ProjectKind = "client" | "product" | "ai";
/** Drives the frame colour and the badge: violet / green / cyan. */
export type ProjectStatus = "nda" | "open-source" | "in-development";

/** One tile of the portfolio (home: the `featured` ones; /work: all of them, in this order). */
export interface Project {
  slug: string;
  title: string;
  /** Eyebrow under the title, e.g. "AI · Agents". */
  category: string;
  /** One or two lines, up to about 110 characters. */
  summary: string;
  kind: ProjectKind;
  status: ProjectStatus;
  visual: ProjectVisual;
  /** Internal path ("/work/<case>"), an absolute URL, or `TODO(owner)` until the link is known. */
  href: string;
  isExternal: boolean;
  stack: string[];
  /** Shown on the home page. The order of the list is the order on the page. */
  featured?: boolean;
  /** The text is a draft the owner has not confirmed yet. It is shown, and dev mode lists it (see `warnIfDraft`). */
  draft?: boolean;
}

const [hybris, pim, logistics, nexus] = caseStudies;

/**
 * The portfolio, in display order. The four client projects take their text from the case studies above, so
 * a case and its tile never say different things. Everything marked `TODO(owner)` is a draft or a missing
 * link: a tile without a real link is shown without a way through, only with its status.
 */
export const projects: Project[] = [
  {
    slug: hybris.slug,
    title: hybris.title,
    category: hybris.industry,
    summary: hybris.summary,
    kind: "client",
    status: "nda",
    visual: "shop",
    href: `/work/${hybris.slug}`,
    isExternal: false,
    stack: hybris.stack,
    featured: true,
  },
  {
    slug: pim.slug,
    title: pim.title,
    category: pim.industry,
    summary: pim.summary,
    kind: "client",
    status: "nda",
    visual: "pim",
    href: `/work/${pim.slug}`,
    isExternal: false,
    stack: pim.stack,
  },
  {
    slug: logistics.slug,
    title: logistics.title,
    category: logistics.industry,
    summary: logistics.summary,
    kind: "client",
    status: "nda",
    visual: "logistics",
    href: `/work/${logistics.slug}`,
    isExternal: false,
    stack: logistics.stack,
  },
  {
    slug: nexus.slug,
    title: nexus.title,
    category: nexus.industry,
    summary: nexus.summary,
    kind: "client",
    status: "nda",
    visual: "chain",
    href: `/work/${nexus.slug}`,
    isExternal: false,
    stack: nexus.stack,
    featured: true,
  },
  {
    slug: "secure-rag",
    title: "Secure RAG",
    category: "AI · Retrieval",
    summary: "Enterprise retrieval-augmented generation in Java, with access control in front of the model.",
    kind: "ai",
    status: "open-source",
    visual: "rag",
    // Owner to check: the repository did not answer when this link was last tried (not found or private), and
    // "open source" needs a licence in it.
    href: "https://github.com/AlexGorbatov/secure-rag-java",
    isExternal: true,
    stack: ["Java", "RAG", "GitHub"],
    featured: true,
    draft: true,
  },
  {
    slug: "ai-business-workflow-agent",
    title: "AI Business Workflow Agent",
    category: "AI · Agents",
    summary: "An agent that runs a business workflow across systems, with a human approval step.",
    kind: "ai",
    status: "in-development",
    visual: "agent",
    href: "TODO(owner): AI Business Workflow Agent repository URL",
    isExternal: true,
    stack: ["Java", "Agents", "Workflows"],
    featured: true,
    draft: true,
  },
  {
    slug: "ai-document-processing",
    title: "AI Document Processing",
    category: "AI · Documents",
    summary: "Turns incoming documents into structured, checked data that downstream systems can use.",
    kind: "ai",
    status: "in-development",
    visual: "documents",
    href: "TODO(owner): AI Document Processing repository URL",
    isExternal: true,
    stack: ["Java", "Extraction", "Validation"],
    draft: true,
  },
  {
    slug: "llm-gateway",
    title: "LLM Gateway",
    category: "AI · Infrastructure",
    summary: "One entry point to several language models, with routing, limits and an audit trail.",
    kind: "ai",
    status: "in-development",
    visual: "gateway",
    href: "TODO(owner): LLM Gateway repository URL",
    isExternal: true,
    stack: ["Java", "Routing", "Audit"],
    draft: true,
  },
];

export interface LabsProject {
  title: string;
  tag: string;
  demoUrl: string;
  repoUrl: string;
  screenshot: string;
}

export const labs = {
  /** Master switch. The block also stays hidden until at least one project has a demo or a repository. */
  showLabs: true,
  name: "Altronix Labs",
  eyebrow: "Reference implementations",
  description:
    "Where we validate architecture, integration patterns and emerging technologies, AI included, hands-on.",
  projects: [
    {
      title: "Enterprise Knowledge Assistant",
      tag: "RAG",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public, e.g. /labs/knowledge-assistant.png",
    },
    {
      title: "AI Project Analysis Platform",
      tag: "Analysis",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public",
    },
    {
      title: "AI Workflow Automation",
      tag: "Agents",
      demoUrl: "TODO(owner): public demo URL",
      repoUrl: "TODO(owner): repository URL",
      screenshot: "TODO(owner): screenshot path under /public",
    },
  ] satisfies LabsProject[],
};
