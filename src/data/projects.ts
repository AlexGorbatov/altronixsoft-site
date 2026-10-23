/** The isometric scene drawn for a project (see `ProjectScene`). */
export type ProjectVisual = "shop" | "pim" | "logistics" | "scorecard" | "rag" | "agent" | "documents" | "gateway";

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
  whatWeDid: string;
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
    summary: "OCC web services, Solr search, promotions and integrations for a furniture and home decor retailer.",
    context: "Furniture and home decor retailer in Germany.",
    challenge:
      "Connect the SAP Hybris platform to external third-party systems, move large volumes of data into it, and keep a high-load production system stable.",
    whatWeDid:
      "We built the integrations with third-party systems over REST and SOAP web services and loaded large data volumes into the platform through Data Hub. We configured the OCC web services that provide user, account, cart and order data to the frontend, extended Solr search with new product listing filters, category extraction and facets, and customized promotion rule templates and the email notification process. We set up and improved the CI/CD pipeline and nightly builds, customized the checkout flow and cart management, kept test coverage adequate, and handled production issues and bug fixes. The team worked in Scrum, with regular code reviews and mentoring.",
    result: "Features were delivered on time through the CI/CD process, and the platform stayed stable under high load.",
    stack: ["SAP Hybris 2011", "Java 11", "Spring", "OCC", "Spartacus", "Solr", "Data Hub", "CI/CD"],
    duration: "5 months",
    team: "5 people",
    role: "",
    focus: "OCC web services, Solr search and promotion rules",
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
}

const [hybris, pim, logistics] = caseStudies;

/**
 * The portfolio, in display order. The three client projects take their text from the case studies above, so
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
    slug: "compass-ai",
    title: "Compass AI",
    category: "Own product · Management",
    summary: "Management platform for IT service companies: a weekly ScoreCard across six business modules.",
    kind: "product",
    status: "in-development",
    visual: "scorecard",
    href: "TODO(owner): Compass AI product URL",
    isExternal: true,
    stack: ["Java", "Spring Modulith", "Next.js"],
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
    href: "https://github.com/AlexGorbatov/secure-rag-java",
    isExternal: true,
    stack: ["Java", "RAG", "GitHub"],
    featured: true,
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
