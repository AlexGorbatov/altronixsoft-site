export interface Industry {
  id: string;
  title: string;
  /** One line only. */
  line: string;
}

/** The industries shown in the band under the services. */
export const industries: Industry[] = [
  {
    id: "retail",
    title: "Retail & E-commerce",
    line: "Commerce platforms, product catalogs, SAP Commerce Cloud, and enterprise integrations.",
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    line: "Operational platforms, backend systems, workflow automation, and API integrations.",
  },
  {
    id: "technology",
    title: "Technology & SaaS",
    line: "Custom software products, cloud-based platforms, and AI-enabled business applications.",
  },
  {
    id: "web3",
    title: "Blockchain & Web3",
    line: "Blockchain infrastructure, multi-chain APIs, data aggregation, and decentralized application integrations.",
  },
  {
    id: "gaming",
    title: "Gaming & Digital Entertainment",
    line: "Gaming platform integrations, player activity tracking, campaign systems, and backend services.",
  },
];
