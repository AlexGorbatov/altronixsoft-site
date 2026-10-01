export interface Industry {
  id: string;
  title: string;
  /** One line only. The detail lives in the matching case study. */
  line: string;
}

/** Only industries with real delivery experience behind them (see `caseStudies`). */
export const industries: Industry[] = [
  {
    id: "ecommerce",
    title: "E-commerce",
    line: "Commerce platforms, SAP Commerce Cloud and the integrations around them.",
  },
  {
    id: "pim",
    title: "Product information (PIM)",
    line: "Product data platforms and the workflows that feed them.",
  },
  {
    id: "logistics",
    title: "Logistics",
    line: "Operational backends, APIs and workflow integration.",
  },
];
