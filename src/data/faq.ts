import { entryPackage } from "@/data/engagement";
import { siteConfig } from "@/data/site";
import { filled } from "@/lib/todo";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * The cost answer follows the Technical Review package: price and duration are inserted only once the
 * owner has filled them in `engagement.ts`; until then the sentence reads without the numbers.
 */
function costAnswer(): string {
  const facts = [entryPackage.priceFrom, entryPackage.duration].filter(filled).join(", ");
  const entry = facts
    ? `A Technical Review is a fixed-price starting point (${facts}).`
    : "A Technical Review is a fixed-price starting point.";
  return `${entry} Larger projects are scoped and priced after it.`;
}

/** Answers use only what the site already states elsewhere (services, process, engagement models, company). */
export const faqs: FaqItem[] = [
  {
    question: "How do we get started?",
    answer:
      "Tell us about the workflow, system or product challenge. We usually begin with a short Technical Review, then a focused Proof of Value, so you see working software before committing to a larger scope.",
  },
  {
    question: "How do you work with clients?",
    answer:
      "Four formats: a Technical Review, a Proof of Value, a fixed-scope project, or a dedicated team embedded in your product team. You pick the one that fits where you are, and you can start small.",
  },
  {
    question: "How much does it cost and how long does it take?",
    answer: costAnswer(),
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
      "A senior core team owns architecture, technical decisions and delivery. When a project needs extra expertise, such as backend, frontend, AI / ML, QA or design, we bring in trusted specialists. You work directly with the people responsible for the result.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Java and Spring, SAP Commerce Cloud, Next.js, PostgreSQL, Docker and Kubernetes on Azure and AWS, enterprise APIs, and modern AI tooling such as RAG and agents. We choose the simplest technology that solves the problem.",
  },
  {
    question: "Where are you based?",
    answer: `${siteConfig.name} is operated by ${siteConfig.legalName}, a company registered in Estonia (EU).`,
  },
];
