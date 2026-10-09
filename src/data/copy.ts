/**
 * Section headings, labels and UI messages that used to live inside components.
 * Body content (services, cases, formats, company) stays in its own `src/data/*` file.
 * Style: sentence case, "and" instead of "&" in prose, no slogans.
 */
export const copy = {
  /** One wording for how engagements start; reused by the contact block, service pages and the SAP page. */
  shared: {
    typicalStart: "Typical start: a free 30-minute architecture check-up, then a platform review.",
    startParagraph: "Most engagements begin with a 30-minute architecture check-up and a short platform review, before a larger scope.",
    allFormsLink: "See all engagement formats",
  },
  services: {
    eyebrow: "Services",
    title: "Integrations, modernization, practical AI.",
    description: "We start with the problem and pick the simplest technology that solves it.",
    rowLabel: "Services",
    detailsLink: "Service details",
  },
  aiBlock: {
    title: "Where AI fits in your operations",
  },
  work: {
    eyebrow: "Selected work",
    title: "Engagement experience.",
    description: "Enterprise projects our founder led as architect or lead engineer. Client names are withheld under NDA.",
    ndaBadge: "NDA",
    rowLabel: "Case studies",
    stackLabel: "Stack",
    stackAria: "Technology stack",
    readCase: "Read the case study",
    roleLabel: "Role",
    scopeLabel: "Scope",
    durationLabel: "Duration",
    resultLabel: "Result",
  },
  engagement: {
    eyebrow: "Engagement",
    title: "How to start.",
    rowLabel: "Ways to start",
  },
  process: {
    eyebrow: "Process",
    title: "From review to production.",
    description: "Four phases. Each one reduces risk before the next investment.",
    hint: "Select a step to see it on the diagram.",
    stepLabel: "Step",
    diagram: {
      sourceZone: "Your context",
      sourceItems: ["Business goal", "Current stack", "Workflow", "Constraints"],
      coreNodes: ["Problem", "Architecture"],
      outputZone: "What we deliver",
      outputs: [
        { title: "Proof of value", text: "Focused scope, working software, real feedback." },
        { title: "Production system", text: "Reliable implementation, monitoring and support." },
      ],
      badge: { title: "Measure → improve", text: "Keep what works. Iterate where value is proven." },
    },
  },
  casePage: {
    back: "All work",
    focus: "Focus",
    challenge: "Challenge",
    whatWeDid: "What we did",
    result: "Result",
    similarTitle: "Working on something similar?",
    similarText: "Tell us about the system and what has to change. We start with a short platform review.",
    more: "More work",
  },
  form: {
    ariaLabel: "Contact form",
    name: "Name",
    email: "Work email",
    company: "Company",
    optional: "(optional)",
    topic: "Topic",
    message: "Message",
    placeholder: "System, problem, expected result.",
    honeypot: "Leave this field empty",
    consentBefore: "I agree that Altronixsoft OÜ processes my details to reply to this inquiry. See the",
    consentLink: "Privacy Policy",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Thank you.",
    successText: "Message sent. We will reply by email.",
    rateLimited: "Too many attempts from this connection. Please try again in a few minutes, or write to",
    unavailable: "Message not sent. The form is unavailable.",
    emailUs: "Email us",
    emailUsAt: "at",
    prefilled: "(your text is prefilled).",
  },
};
