export interface EngagementModel {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  cta: { label: string; subject: string };
}

export const engagementModels: EngagementModel[] = [
  {
    id: "review",
    number: "01",
    title: "Technical Review",
    description: "A short, focused look at your architecture, codebase or idea.",
    outcome: "Clear findings and recommendations.",
    cta: { label: "Request a review", subject: "Technical review" },
  },
  {
    id: "proof",
    number: "02",
    title: "Proof of Value",
    description: "A small working prototype on your real data, before a larger investment.",
    outcome: "Evidence the approach works.",
    cta: { label: "Discuss a proof of value", subject: "Proof of value" },
  },
  {
    id: "fixed",
    number: "03",
    title: "Fixed-scope project",
    description: "A defined scope, timeline and result, delivered end to end.",
    outcome: "A production-ready deliverable.",
    cta: { label: "Discuss a project", subject: "Fixed-scope project" },
  },
  {
    id: "team",
    number: "04",
    title: "Dedicated team",
    description: "Senior engineers embedded in your product team, long-term or for a defined period.",
    outcome: "Ongoing engineering capacity.",
    cta: { label: "Discuss a team", subject: "Dedicated team" },
  },
];
