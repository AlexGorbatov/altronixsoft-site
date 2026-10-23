import type { RequestType } from "@/data/site";

export interface Service {
  /** Also the URL slug of /services/[slug]. */
  id: string;
  number: string;
  title: string;
  /** One-line title for cards, so the three cards align. */
  shortTitle: string;
  description: string;
  /** Title for search results and sharing, when it should carry more keywords than `title`. Falls back to `title`. */
  metaTitle?: string;
  /** Opening paragraph of the service page. */
  intro: string;
  /** Meta description, 150–160 characters at most. */
  metaDescription: string;
  capabilities: string[];
  cta: { label: string; type: RequestType };
}

export const services: Service[] = [
  {
    id: "software",
    number: "01",
    title: "Custom software development",
    shortTitle: "Custom software",
    description: "Software built around your business processes.",
    intro:
      "We design and build custom software around your business processes, from the first MVP to production: web applications, internal platforms, APIs and integrations.",
    metaDescription:
      "Custom software built around your business processes, from MVP to production: web apps, internal platforms, APIs and integrations. Start with a no-obligation conversation.",
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
  {
    id: "modernization",
    number: "02",
    title: "Modernization and integrations",
    metaTitle: "Java/Spring modernization and integration",
    shortTitle: "Modernization and integrations",
    description: "Modernize existing systems without full rewrites.",
    intro:
      "We improve the systems that already run your business, without unnecessary rewrites: Java / Spring modernization, SAP Commerce Cloud development and support, cloud migration and enterprise integrations.",
    metaDescription:
      "Modernize existing systems without full rewrites: Java/Spring, SAP Commerce Cloud support, cloud migration, integrations. Start with a no-obligation conversation.",
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
    number: "03",
    title: "AI solutions and automation",
    metaTitle: "AI agents, RAG and workflow automation",
    shortTitle: "AI and automation",
    description: "AI agents, search and document automation inside your systems.",
    intro:
      "We add AI where it solves a real business problem and connect it to your existing systems with proper controls: agents, retrieval over internal knowledge, and document and workflow automation.",
    metaDescription:
      "AI agents, retrieval over internal knowledge, document and workflow automation, connected to your systems with controls. Start with a no-obligation conversation.",
    capabilities: [
      "AI agents",
      "RAG and knowledge systems",
      "Document automation",
      "Workflow automation",
      "LLM integrations",
    ],
    cta: { label: "Discuss AI solutions", type: "project" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.id === slug);
}

export interface UseCase {
  title: string;
  description: string;
  /** Which icon the card draws (mapped to a lucide icon in AiUseCases). */
  icon: "chat" | "search" | "document" | "workflow";
}

export const aiUseCases: UseCase[] = [
  { title: "Customer service", description: "Order status, returns, policy lookup, agent assist.", icon: "chat" },
  { title: "Knowledge assistant", description: "Secure search across internal knowledge and policies.", icon: "search" },
  { title: "Document automation", description: "Extract, validate and process business documents.", icon: "document" },
  { title: "Workflow agents", description: "Connect systems and people into controlled workflows.", icon: "workflow" },
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
