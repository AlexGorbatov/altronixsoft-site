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
  problems: string[];
  deliverables: { title: string; text: string }[];
  start: string;
  /** Optional concrete steps for agreeing a bounded first engagement. */
  startSteps?: { title: string; text: string }[];
  /** Existing case slugs, kept identical across translations. */
  caseSlugs: string[];
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
      "Custom software built around your business processes, from MVP to production: web apps, internal platforms, APIs and integrations. Direct engineering ownership.",
    problems: [
      "A product or internal workflow needs a purpose-built application, backend or API.",
      "Business data is split between tools that need to work together.",
      "An MVP needs a practical route to a maintainable production release."
    ],
    deliverables: [
      {
        title: "Applications and platforms",
        text: "SaaS products, internal platforms and web applications built around the workflow and its users."
      },
      {
        title: "Backend and APIs",
        text: "Java/Spring services, API contracts, access controls and the business logic behind the application."
      },
      {
        title: "Integration and delivery",
        text: "Connections to existing systems, automated tests, deployment workflows and documentation for handover."
      }
    ],
    start: "Start with the business workflow, current systems and success criteria. A check-up or scoped technical review identifies the smallest useful release, integration boundaries and the next delivery step.",
    caseSlugs: [
      "lobby9",
      "nexus",
      "logistics-operations-platform",
      "order-payment-platform"
    ],
    capabilities: [
      "SaaS products",
      "Web applications",
      "Internal platforms",
      "APIs",
      "Integrations",
      "MVP to production",
    ],
    cta: { label: "Discuss software development", type: "exploring" },
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
      "Modernize existing systems without full rewrites: Java/Spring, SAP Commerce Cloud support, cloud migration, integrations. Direct engineering ownership.",
    problems: [
      "Changes are slow because dependencies, application boundaries or integrations are difficult to maintain.",
      "A Java/Spring or SAP Commerce system needs to evolve without replacing everything at once.",
      "Commerce, product data and operational systems need more dependable data exchange."
    ],
    deliverables: [
      {
        title: "Incremental modernization",
        text: "Review the current architecture and dependencies, then plan changes around explicit boundaries and regression checks."
      },
      {
        title: "System integrations",
        text: "REST and SOAP APIs, product-data imports and synchronization between commerce, PIM and operational systems."
      },
      {
        title: "Production maintenance",
        text: "Targeted fixes, search and checkout improvements, CI/CD changes and support for planned cloud migrations."
      }
    ],
    start: "Begin with the current architecture, the change that is blocked and the operational constraints. A technical review establishes which parts should change, which should stay, and how to verify the transition.",
    caseSlugs: [
      "enterprise-ecommerce-platform",
      "product-information-platform"
    ],
    capabilities: [
      "Java / Spring modernization",
      "SAP Commerce Cloud development and support",
      "Cloud migration",
      "Enterprise integrations",
      "API architecture",
      "AI enablement",
    ],
    cta: { label: "Discuss modernization", type: "exploring" },
  },
  {
    id: "ai",
    number: "03",
    title: "AI integration and automation",
    metaTitle: "AI agents, RAG and workflow automation",
    shortTitle: "AI integration",
    description: "AI agents, search and document automation inside your systems.",
    intro:
      "AI integration for existing SaaS products and business systems: agents, knowledge search and document automation connected to your APIs, permissions and approval workflows.",
    metaDescription:
      "AI agents, retrieval over internal knowledge, document and workflow automation, connected to your systems with controls. Direct engineering ownership.",
    problems: [
      "Employees need answers from internal documents without widening their access to information.",
      "A repeated email or document workflow needs extraction, validation and a controlled next action.",
      "An AI prototype needs to connect to real systems with approval rules and predictable failure handling."
    ],
    deliverables: [
      {
        title: "Knowledge and retrieval",
        text: "RAG over internal documents with access-filtered retrieval and answers linked to their sources."
      },
      {
        title: "Workflow integration",
        text: "Agents and LLM integrations connected to existing APIs and tools, with business rules and human approval where needed."
      },
      {
        title: "Evaluation and controls",
        text: "Representative evaluation cases, audit trails, deterministic business calculations and checks around untrusted input."
      }
    ],
    start: "Start with a conversation about one workflow in your existing product. Scope, fee, timeline and deliverables are agreed before any paid work begins. Where the system runs and which model provider it uses follow your data and compliance requirements.",
    startSteps: [
      { title: "Initial conversation", text: "We discuss your system, the intended outcome, our relevant project experience and who would handle delivery." },
      { title: "Scoped review or proof of value", text: "Define the APIs, representative data, access controls and acceptance checks. The agreed output is a written review or a working prototype with findings." },
      { title: "Delivery decision", text: "Review the findings together and decide whether to proceed, adjust the scope or stop before a larger implementation." },
    ],
    caseSlugs: [
      "ai-business-workflow-agent",
      "ai-document-processing"
    ],
    capabilities: [
      "AI agents",
      "RAG and knowledge systems",
      "Document automation",
      "Workflow automation",
      "LLM integrations",
    ],
    cta: { label: "Discuss AI integration", type: "exploring" },
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
