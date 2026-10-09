import type { RequestType } from "@/data/site";

export interface Service {
  /** Also the URL slug of /services/[slug]. */
  id: string;
  number: string;
  title: string;
  /** Title on the home page card. */
  shortTitle: string;
  description: string;
  /** Opening paragraph of the service page. */
  intro: string;
  /** Meta description, 150–160 characters at most. */
  metaDescription: string;
  capabilities: string[];
  cta: { label: string; type: RequestType };
}

export const services: Service[] = [
  {
    id: "modernization",
    number: "01",
    title: "Modernization and integrations",
    shortTitle: "Modernization and integrations",
    description:
      "Connect ERP, PIM, commerce, payments and logistics systems — and modernize what already runs your business, without unnecessary rewrites.",
    intro:
      "We improve the systems that already run your business, without unnecessary rewrites: Java / Spring modernization, SAP Commerce Cloud development and support, cloud migration and enterprise integrations.",
    metaDescription:
      "Modernize existing systems without full rewrites: Java/Spring, SAP Commerce Cloud development and support, cloud migration and integrations.",
    capabilities: [
      "Java / Spring modernization",
      "SAP Commerce Cloud development and support",
      "Cloud migration",
      "Enterprise integrations",
      "API architecture",
      "AI enablement",
    ],
    cta: { label: "Discuss modernization", type: "project" },
  },
  {
    id: "ai",
    number: "02",
    title: "AI solutions and automation",
    shortTitle: "AI solutions and automation",
    description:
      "AI for product data, documents, order exceptions and customer service — with access control, audit trails and human approval.",
    intro:
      "We add AI where it measurably helps and connect it to your existing systems with proper controls: agents, retrieval over internal knowledge, and document and workflow automation.",
    metaDescription:
      "AI agents, retrieval over internal knowledge, and document and workflow automation, connected to your existing systems with proper controls.",
    capabilities: [
      "AI agents",
      "RAG and knowledge systems",
      "Document automation",
      "Workflow automation",
      "LLM integrations",
    ],
    cta: { label: "Discuss AI solutions", type: "project" },
  },
  {
    id: "software",
    number: "03",
    title: "Custom software development",
    shortTitle: "Custom software development",
    description:
      "Web applications, internal platforms and APIs around your business processes — from first version to production.",
    intro:
      "We design and build custom software around your business processes, from the first MVP to production: web applications, internal platforms, APIs and integrations.",
    metaDescription:
      "Custom software built around your business processes, from MVP to production: web applications, internal platforms, APIs and integrations.",
    capabilities: [
      "SaaS products",
      "Web applications",
      "Internal platforms",
      "APIs",
      "Integrations",
      "MVP to production",
    ],
    cta: { label: "Discuss software development", type: "project" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.id === slug);
}

/** A service as listed on the home page, in the footer and in "Other services": same order everywhere. */
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  href: string;
}

/**
 * The four services in display order. SAP Commerce Cloud has its own static route
 * (`/services/sap-commerce`), so it is listed here but is not part of `services` / `[slug]`.
 */
export const serviceCards: ServiceCard[] = [
  ...services.map(({ id, title, description }) => ({ id, title, description, href: `/services/${id}` })),
  {
    id: "sap-commerce",
    title: "SAP Commerce Cloud",
    description: "Development, upgrades and support for existing SAP Commerce Cloud (Hybris) platforms.",
    href: "/services/sap-commerce",
  },
];

export interface UseCase {
  title: string;
  description: string;
}

export const aiUseCases: UseCase[] = [
  { title: "Customer service", description: "Order status, returns, policy lookup, agent assist." },
  { title: "Knowledge assistant", description: "Secure search across internal knowledge and policies." },
  { title: "Document automation", description: "Extract, validate and process business documents." },
  { title: "Workflow agents", description: "Connect systems and people into controlled workflows." },
];

/** Technologies shown in the trust-strip marquee. */
export const technologies = [
  "Java",
  "Spring",
  "SAP Commerce Cloud (Hybris)",
  "Azure",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Enterprise APIs",
];
