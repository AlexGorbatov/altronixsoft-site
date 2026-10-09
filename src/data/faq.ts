export interface FaqItem {
  question: string;
  answer: string;
}

/** Answers use only what the site already states elsewhere (services, process, engagement models, company). */
export const faqs: FaqItem[] = [
  {
    question: "How do we get started?",
    answer:
      "Tell us about the workflow, system or product challenge. We usually begin with a free 30-minute architecture check-up, then a platform review, so you see the risks and the plan before committing to a larger scope.",
  },
  {
    question: "How do you work with clients?",
    answer:
      "Start with a free architecture check-up and a fixed-scope platform review. After the review, a fixed-scope project or ongoing support is agreed on the findings.",
  },
  {
    question: "How much does it cost and how long does it take?",
    answer: "A platform review is a fixed-scope starting point. Larger projects are scoped and priced after it.",
  },
  {
    question: "Do you only do AI?",
    answer:
      "No. Custom software, modernization and integrations are the core of our work. AI is one capability we apply where it solves a real business problem: agents, knowledge systems, document and workflow automation.",
  },
  {
    question: "Do we need to rewrite our existing system?",
    answer:
      "Usually not. We focus on improving existing systems without unnecessary rewrites: modernizing Java / Spring applications, migrating to the cloud, and integrating with enterprise APIs.",
  },
  {
    question: "Who will work on our project?",
    answer:
      "The founder owns architecture, technical decisions and delivery. When a project needs extra expertise, such as backend, frontend, AI / ML, QA or design, we bring in trusted specialists. You work directly with the person responsible for the result.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Java and Spring, SAP Commerce Cloud, Next.js, PostgreSQL, Docker and Kubernetes on Azure and AWS, enterprise APIs, and modern AI tooling such as RAG and agents. We choose the simplest technology that solves the problem.",
  },
  {
    question: "Where are you based?",
    answer: "Altronixsoft OÜ is a company registered in Estonia (EU).",
  },
];
