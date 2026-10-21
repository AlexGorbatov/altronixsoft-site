import { siteConfig } from "@/data/site";

/**
 * Section headings, labels and UI messages that used to live inside components.
 * Body content (services, cases, formats, company) stays in its own `src/data/*` file.
 * Style: sentence case, "and" instead of "&" in prose, no slogans.
 */
export const copy = {
  /** One wording for how engagements start; reused by the contact block, service pages and the SAP page. */
  shared: {
    typicalStart: "Typical start: a 30-minute architecture check-up, then a technical review.",
    startParagraph: "Most engagements begin with a 30-minute architecture check-up and a short technical review, before a larger scope.",
    allFormsLink: "See all engagement formats",
  },
  services: {
    eyebrow: "Services",
    title: "Custom software, modernization, AI.",
    description: "We start with the problem and pick the simplest technology that solves it.",
    rowLabel: "Services",
    capabilitiesLabel: "Capabilities",
    detailsLink: "Service details",
    sapCta: "Request a free check-up",
    sapLink: "SAP services",
    aiCases: {
      eyebrow: "AI use cases",
      title: "Where AI pays off first",
      link: "All AI services",
    },
  },
  work: {
    eyebrow: "Selected work",
    title: "Client projects.",
    description: "Client names are confidential.",
    rowLabel: "Case studies",
    stackLabel: "Stack",
    stackAria: "Technology stack",
    readCase: "Read the case study",
    roleLabel: "Role",
    focusLabel: "Focus",
    durationLabel: "Duration",
    resultLabel: "Result",
  },
  engagement: {
    eyebrow: "Engagement",
    title: "Engagement formats.",
    description: "Four formats, from a short technical review to a dedicated engineering team.",
    rowLabel: "Engagement formats",
    includedLabel: "What is included",
    priceLabel: "Price",
    durationLabel: "Duration",
    deliverableLabel: "Deliverable",
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
    similarText: "Tell us about the system and what has to change. We start with a short technical review.",
    more: "More work",
  },
  form: {
    ariaLabel: "Contact form",
    name: "Name",
    email: "Work email",
    company: "Company",
    optional: "(optional)",
    topic: "What do you want to discuss?",
    message: "Describe the system and the problem",
    placeholder: "e.g. Our SAP Commerce storefront slows down at peak load. We need to find out why and fix it.",
    honeypot: "Leave this field empty",
    consentBefore: `I agree that ${siteConfig.legalName} processes my details to reply to this inquiry. See the`,
    consentLink: "Privacy Policy",
    submit: "Send message",
    sending: "Sending…",
    successTitle: "Message received.",
    /** `{name}` is replaced with the sender's first name. */
    successText: "Thanks, {name}. We will reply to the email you gave.",
    rateLimited: "You have sent several messages in a short time. Please try again in a few minutes, or email us at",
    unavailable: "We could not send your message. Your text is still here, so you can try again, or",
    emailUs: "email us instead",
    emailUsAt: "at",
    prefilled: "(we have prefilled your message).",
  },
};
