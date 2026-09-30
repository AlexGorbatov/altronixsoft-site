export interface Industry {
  id: string;
  number: string;
  title: string;
  description: string;
  focus: string[];
}

/** Only industries with real delivery experience behind them (see `commercialProjects`). */
export const industries: Industry[] = [
  {
    id: "ecommerce",
    number: "01",
    title: "E-commerce",
    description: "Large-scale commerce backends, production support and complex integrations.",
    focus: ["Commerce backends", "Integrations", "Production support"],
  },
  {
    id: "pim",
    number: "02",
    title: "Product information (PIM)",
    description: "Centralized product information, integrations and enterprise workflows.",
    focus: ["Product data", "Integrations", "Enterprise workflows"],
  },
  {
    id: "logistics",
    number: "03",
    title: "Logistics",
    description: "Backend systems for logistics workflows, APIs and day-to-day operations.",
    focus: ["Operational workflows", "API design", "Cloud"],
  },
];
