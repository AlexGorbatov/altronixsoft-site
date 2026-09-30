export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  cta: { label: string; subject: string };
}

export const services: Service[] = [
  {
    id: "ai",
    number: "01",
    title: "AI Solutions & Automation",
    description: "Practical AI integrated into real workflows and business systems.",
    capabilities: [
      "AI Agents",
      "RAG & Knowledge Systems",
      "Document Automation",
      "Workflow Automation",
      "LLM Integrations",
    ],
    cta: { label: "Discuss AI solutions", subject: "AI solutions" },
  },
  {
    id: "software",
    number: "02",
    title: "Custom Software Development",
    description: "Reliable software built around real business processes.",
    capabilities: [
      "SaaS products",
      "Web applications",
      "Internal platforms",
      "APIs",
      "Integrations",
      "MVP to production",
    ],
    cta: { label: "Discuss software development", subject: "Custom software" },
  },
  {
    id: "modernization",
    number: "03",
    title: "Modernization & Integrations",
    description: "Improve existing systems without unnecessary rewrites.",
    capabilities: [
      "Java / Spring modernization",
      "Cloud migration",
      "Enterprise integrations",
      "API architecture",
      "AI enablement",
    ],
    cta: { label: "Discuss modernization", subject: "Modernization" },
  },
];

export interface UseCase {
  title: string;
  description: string;
}

export const aiUseCases: UseCase[] = [
  { title: "Customer Service", description: "Order status, returns, policy lookup, agent assist." },
  { title: "Knowledge Assistant", description: "Secure search across internal knowledge and policies." },
  { title: "Document Automation", description: "Extract, validate and process business documents." },
  { title: "Workflow Agents", description: "Connect systems and people into controlled workflows." },
];

/** Technologies shown in the trust-strip marquee. */
export const technologies = [
  "Java",
  "Spring",
  "Next.js",
  "Azure",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Enterprise APIs",
  "RAG",
  "AI Agents",
];
