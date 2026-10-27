export interface Industry {
  id: string;
  title: string;
  /** One line only. */
  line: string;
}

/** The industries shown in the band under the services: the ones closest to AI integration in existing products. */
export const industries: Industry[] = [
  {
    id: "technology",
    title: "Technology and SaaS",
    line: "Custom software products, cloud-based platforms, and AI-enabled business applications.",
  },
  {
    id: "logistics",
    title: "Logistics and supply chain",
    line: "Operational platforms, backend systems, workflow automation, and API integrations.",
  },
  {
    id: "retail",
    title: "Retail and e-commerce",
    line: "Commerce platforms, product catalogs, SAP Commerce Cloud, and enterprise integrations.",
  },
];
