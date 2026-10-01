export interface ProcessPhase {
  number: string;
  title: string;
  description: string;
}

export const processPhases: ProcessPhase[] = [
  {
    number: "01",
    title: "Understand",
    description: "Business goal, current workflow, constraints and success criteria.",
  },
  {
    number: "02",
    title: "Design",
    description: "Architecture, integrations, delivery plan and the smallest useful scope.",
  },
  {
    number: "03",
    title: "Build and prove",
    description: "Working software tested on your data and users.",
  },
  {
    number: "04",
    title: "Launch and improve",
    description: "Launch, monitoring, support and the next iteration.",
  },
];
