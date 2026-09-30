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
    title: "Build & prove",
    description: "Working software with real data, real users and measurable feedback.",
  },
  {
    number: "04",
    title: "Launch & improve",
    description: "Production launch, monitoring, support and the next improvement cycle.",
  },
];
