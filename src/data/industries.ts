export interface Industry {
  id: string;
  title: string;
  /** One line only. */
  line: string;
}

/**
 * The sectors of the projects shown under "Work", one line each. A sector is where a project was used, not a
 * technology (SAP Commerce, AI) or a type of system (PIM): those appear in the line, never as the title.
 */
export const industries: Industry[] = [
  {
    id: "retail",
    title: "Retail and e-commerce",
    line: "Commerce platforms, product catalogs and enterprise integrations, including SAP Commerce.",
  },
  {
    id: "technology",
    title: "Technology and SaaS",
    line: "Custom software products, cloud platforms and AI features inside existing applications.",
  },
  {
    id: "logistics",
    title: "Logistics and supply chain",
    line: "Operational platforms, backend services, workflow automation and API integrations.",
  },
  {
    id: "blockchain",
    title: "Blockchain and Web3",
    line: "Multi-chain data and transaction APIs for wallets, dApps and AI agents.",
  },
  {
    id: "gaming",
    title: "Gaming",
    line: "Community platforms that bring a player's PlayStation and Steam activity into one profile.",
  },
];
