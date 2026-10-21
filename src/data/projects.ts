export type ProjectVisual = "commerce" | "data" | "logistics" | "integration";

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
    visual: "integration",
    industry: "E-commerce",
    summary: "OCC web services, Solr search, promotions and integrations for a furniture and home decor retailer.",
    context: "Furniture and home decor retailer in Germany. Team of 5.",
    challenge:
      "Connect the SAP Hybris platform to external third-party systems, move large volumes of data into it, and keep a high-load production system stable.",
    whatWeDid:
      "We built the integrations with third-party systems over REST and SOAP web services and loaded large data volumes into the platform through Data Hub. We configured the OCC web services that provide user, account, cart and order data to the frontend, extended Solr search with new product listing filters, category extraction and facets, and customized promotion rule templates and the email notification process. We set up and improved the CI/CD pipeline and nightly builds, customized the checkout flow and cart management, kept test coverage adequate, and handled production issues and bug fixes. The team worked in Scrum, with regular code reviews and mentoring.",
    result: "Features were delivered on time through the CI/CD process, and the platform stayed stable under high load.",
    stack: ["SAP Hybris 2011", "Java 11", "Spring", "OCC", "Spartacus", "Solr", "Data Hub", "CI/CD"],
    duration: "5 months",
    role: "Integration and backend engineering, team lead",
    focus: "OCC web services, Solr search and promotion rules",
  },
  {
    slug: "product-information-platform",
    title: "Product information platform",
    visual: "data",
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
