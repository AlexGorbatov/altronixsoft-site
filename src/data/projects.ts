export type ProjectVisual = "commerce" | "data" | "logistics";

export interface CommercialProject {
  title: string;
  /** Which abstract diagram is drawn on the card (no real screenshots or client data). */
  visual: ProjectVisual;
  /** Shown as the mono label above the title. */
  category: string;
  description: string;
  role: string;
  environment: string;
  focus: string;
}

/**
 * Commercial delivery experience. Presented anonymously — no client names,
 * no invented metrics. Confirm role / environment wording before launch.
 */
export const commercialProjects: CommercialProject[] = [
  {
    title: "Enterprise E-commerce Platform",
    visual: "commerce",
    category: "Client work · E-commerce",
    description: "Large-scale commerce backend, production support and complex integrations.",
    role: "Backend & integration engineering",
    environment: "Java, Spring, enterprise APIs",
    focus: "Reliability and integrations in production",
  },
  {
    title: "Product Information Platform",
    visual: "data",
    category: "Client work · Product data",
    description: "Centralized product information, integrations and enterprise workflows.",
    role: "Backend & integration engineering",
    environment: "Java, Spring, enterprise APIs",
    focus: "Data flows and workflow integrity",
  },
  {
    title: "Logistics Operations Platform",
    visual: "logistics",
    category: "Client work · Logistics",
    description: "Backend systems for logistics workflows, APIs and day-to-day operations.",
    role: "Backend engineering",
    environment: "Java, Spring, cloud",
    focus: "Operational workflows and API design",
  },
];

export interface LabsProject {
  title: string;
  tag: string;
}

export const labs = {
  name: "Altronix Labs",
  description:
    "Altronix Labs is used to validate architecture, integration patterns and emerging AI capabilities hands-on.",
  note: "Internal reference implementations — not customer case studies.",
  projects: [
    { title: "Enterprise Knowledge Assistant", tag: "RAG" },
    { title: "AI Project Analysis Platform", tag: "Analysis" },
    { title: "AI Workflow Automation", tag: "Agents" },
  ] satisfies LabsProject[],
};
