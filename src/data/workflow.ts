/**
 * Hero workflow: one customer request passing through an AI-assisted, human-approved flow.
 * Illustrative only (no real client, no real data); every step is generic.
 */
export const workflow = {
  label: "Customer request",
  status: "Live",
  ariaLabel: "Example workflow: a customer request handled with AI assistance and human approval",
  customerMessage: "Can I return this order?",
  systems: ["ERP", "CRM", "Docs", "Access"],
  reply: "Yes. I've started your return.",
  approve: "Approve",
  steps: [
    { id: "ask", title: "Customer asks" },
    { id: "understand", title: "AI understands" },
    { id: "check", title: "Checks your systems" },
    { id: "draft", title: "Drafts the reply" },
    { id: "approve", title: "You approve" },
    { id: "send", title: "Customer gets it" },
  ],
} as const;
