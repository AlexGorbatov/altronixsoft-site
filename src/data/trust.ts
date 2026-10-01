export interface TrustItem {
  title: string;
  /** `TODO(owner)` until the owner writes the real condition. Items with an open TODO are hidden in production. */
  text: string;
}

export interface TrustBlock {
  id: string;
  title: string;
  intro: string;
  items: TrustItem[];
}

/**
 * "Support" and "Security": answers to the questions an e-commerce CTO asks right after "who are you".
 * Write only what is really true and contractually backed. The whole section stays hidden in production
 * until at least one item is filled in.
 */
export const trust: { eyebrow: string; title: string; blocks: TrustBlock[] } = {
  eyebrow: "Support and security",
  title: "What happens after launch, and how we handle your data.",
  blocks: [
    {
      id: "support",
      title: "Support",
      intro: "Who responds, how fast and through which channel.",
      items: [
        { title: "Response time", text: "TODO(owner): e.g. first response within N business hours; critical incidents within N hours" },
        { title: "Coverage", text: "TODO(owner): working hours and time zone; on-call or incident coverage, if any" },
        { title: "Channels", text: "TODO(owner): e.g. shared chat channel, ticket tracker, email, scheduled status call" },
        { title: "Continuity", text: "TODO(owner): what happens if an engineer is unavailable: replacement, knowledge transfer, documentation" },
      ],
    },
    {
      id: "security",
      title: "Security",
      intro: "How we treat your code, systems and data.",
      items: [
        { title: "Confidentiality", text: "TODO(owner): NDA before project start; who signs and who has access" },
        { title: "Access", text: "TODO(owner): e.g. least-privilege access, your accounts and VPN, no shared credentials" },
        { title: "Code and data", text: "TODO(owner): where code and project data are stored; what stays in your environment" },
        { title: "Compliance", text: "TODO(owner): GDPR role (processor), certifications or policies you can show on request" },
      ],
    },
  ],
};
