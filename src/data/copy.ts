import { siteConfig } from "@/data/site";

/**
 * Section headings, labels and UI messages that used to live inside components.
 * Body content (services, cases, formats, company) stays in its own `src/data/*` file.
 * Style: sentence case, "and" instead of "&" in prose, no slogans.
 */
export const copy = {
  /** One wording for how engagements start; reused by the contact block, service pages and the SAP page. */
  shared: {
    typicalStart: "Typical start: an architecture check-up, then a technical review.",
    startParagraph: "Most engagements begin with an architecture check-up and a short technical review, before a larger scope.",
    allFormsLink: "See all engagement formats",
  },
  /** Next to the contact form: what makes a first message easy to answer. */
  contact: {
    hintTitle: "Helpful to include",
    hints: [
      "The system or platform you work with",
      "The problem or the change you need",
      "What a good result looks like",
      "Any deadline or constraint",
    ],
  },
  /** Chrome of the site: header, footer, accessibility labels. */
  ui: {
    skipToContent: "Skip to content",
    /** The one label for the primary action, used by every primary CTA (the arrow is added in markup). */
    cta: "Discuss a project",
    homeSr: "home",
    backToTopSr: "back to top",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navPrimary: "Primary",
    navMobile: "Mobile",
    navFooter: "Footer",
    navServices: "Services",
    footerServices: "Services:",
    footerContact: "Contact:",
    privacy: "Privacy Policy",
    linkedinAria: "Altronix Software on LinkedIn (opens in a new tab)",
    copyEmail: "Copy email address",
    emailCopied: "Email address copied",
    copied: "Copied",
    motionPause: "Pause motion",
    motionPlay: "Play motion",
    language: "Language",
    technologies: "Technologies",
    experienceAria: "Experience and technologies",
    heroAria: "About Altronix Software",
    seeOurWork: "See our work",
    registryCode: "Registry code",
    vat: "VAT",
    /** The registered country as shown in the footer and in /llms.txt. */
    country: "Estonia",
    labsAria: "Reference implementations",
    liveDemo: "Live demo",
    repository: "Repository",
    /** `{title}` is replaced with the project name. */
    screenshotAlt: "{title} screenshot",
  },
  industries: {
    eyebrow: "Industries",
    title: "Industries we work in.",
  },
  contactSection: {
    eyebrow: "Contact",
    title: "Describe the system and the problem.",
    text: "Name the workflow, platform or product. We reply with the shortest path to production.",
    orEmail: "Or email",
    booking: "Book a call",
  },
  /** Service, SAP and case study pages. */
  pages: {
    home: "Home",
    backHome: "Back to home",
    breadcrumbAria: "Breadcrumb",
    allServices: "All services",
    serviceEyebrow: "Service",
    /** `{number}` is replaced with the service number, e.g. 01. */
    serviceNumber: "Service {number}",
    whatWeDo: "What we do",
    howToStart: "How to start",
    otherServices: "Other services",
    relatedServices: "Related services",
    requestReview: "Request a technical review",
    discussProject: "Discuss your project",
    sapWhatWeDo: "What we do on SAP Commerce Cloud",
    sapStackTitle: "Engineering stack",
    sapStackBefore:
      "Backend and integration work in Java and Spring, applied to e-commerce and product information platforms. See",
    sapStackLink: "client projects",
    technologiesAria: "Technologies",
  },
  /** Headings and labels of the plain-text /llms.txt summary. */
  llms: {
    whatWeDo: "What we do",
    industries: "Industries",
    start: "How engagements start",
    company: "Company",
    registeredAddress: "Registered address",
    basedIn: "Based in",
    clientsConfidential: "Client names are confidential.",
    contact: "Contact",
    email: "Email",
    contactForm: "Contact form",
    keyPages: "Key pages",
    projects: "Projects",
    privacy: "Privacy policy",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    home: "Back to the home page",
  },
  services: {
    eyebrow: "Services",
    title: "Custom software, modernization, AI.",
    description: "We start with the problem and pick the simplest technology that solves it.",
    rowLabel: "Services",
    capabilitiesLabel: "Capabilities",
    detailsLink: "Service details",
    sapCta: "Request a check-up",
    sapLink: "SAP services",
    aiCases: {
      eyebrow: "AI use cases",
      title: "Where AI pays off first",
      link: "All AI services",
    },
  },
  work: {
    stackLabel: "Stack",
    stackAria: "Technology stack",
    industryLabel: "Industry",
    contextLabel: "Context",
    roleLabel: "Role",
    teamLabel: "Team",
    durationLabel: "Duration",
    diagramNote: "Diagrams are simplified and animated. For client projects, systems and names are generalized to protect confidentiality.",
  },
  /** The portfolio: the "Selected projects" section on the home page and the /work page. */
  portfolio: {
    home: {
      eyebrow: "Selected work",
      title: "Selected projects.",
      description: "A selection of client systems under NDA, our own products and AI projects.",
      viewAll: "View all projects",
      listLabel: "Selected projects",
    },
    page: {
      eyebrow: "Work",
      title: "Our projects.",
      description: "Every project shows its status: under NDA, open source or in development.",
      metaTitle: "Our projects",
      metaDescription:
        "Client systems under NDA, our own products and open-source AI work, each with its status. Client names are confidential.",
      view: { label: "Layout", tiles: "Tiles", list: "List" },
      listLabel: "All projects",
    },
    status: { nda: "Client · NDA", "open-source": "Open source", "in-development": "In development" },
    /** aria-label of a project link; {title} is replaced by the project's name. */
    openProject: "Open project: {title}",
    /** Same, for a link that opens another site in a new tab. */
    openProjectExternal: "Open project: {title} (opens in a new tab)",
    /** Names on the architecture pictures: each one is a component named in the project's own description or stack. */
    scene: {
      hybris: {
        thirdParty: "Third-party · REST/SOAP",
        dataHub: "Data Hub",
        solr: "Solr",
        hybris: "SAP Hybris",
        occ: "OCC API",
        spartacus: "Spartacus",
        cicd: "CI/CD",
      },
      pim: { sources: "Data sources", hub: "PIM · Workflows", apis: "Enterprise APIs", integrations: "Integrations" },
      logistics: { backend: "Backend systems", api: "API", workflows: "Workflows", operations: "Operations", cloud: "Cloud" },
      scorecard: { modulith: "Spring Modulith", nextjs: "Next.js", weekly: "Weekly ScoreCard" },
      rag: { documents: "Documents", retrieval: "Retrieval", access: "Access control", model: "Model", response: "Response" },
      agent: { agent: "Agent", system: "System", approval: "Human approval" },
      documents: {
        incoming: "Incoming documents",
        extraction: "Extraction",
        validation: "Validation",
        downstream: "Downstream systems",
      },
      gateway: { clients: "Clients", gateway: "Gateway · Routing · Limits", models: "Language models", audit: "Audit trail" },
    },
    /** Shown on a project whose link is not published yet. */
    noLink: "No public link yet",
    next: {
      label: "Your turn",
      title: "Have a project in mind?",
      text: "Describe the system and the problem. We take it from there.",
    },
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
    back: "All projects",
    focus: "Focus",
    challenge: "Challenge",
    whatWeDid: "What we did",
    result: "Result",
    similarTitle: "Working on something similar?",
    similarText: "Tell us about the system and what has to change. We start with a short technical review.",
    more: "More work",
    /** Appended to the case title in the page title: "<title>: case study". */
    metaSuffix: "case study",
  },
  form: {
    ariaLabel: "Contact form",
    name: "Name",
    email: "Work email",
    company: "Company",
    optional: "(optional)",
    topic: "What do you want to discuss?",
    message: "Describe the system and the problem",
    placeholder: "e.g. Our platform has become slow and hard to change. We want to understand why and plan the next steps.",
    honeypot: "Leave this field empty",
    consentBefore: `I understand that ${siteConfig.legalName} will use my details to reply to this inquiry, as described in the`,
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
    /** Subject line of the prefilled email: "<topic> — <this text>". */
    fallbackSubject: "website inquiry",
    /** Messages for the validation codes the server returns (see src/lib/contact-schema.ts). */
    errors: {
      name_required: "Please enter your name.",
      name_too_long: "That name is too long.",
      email_invalid: "Please enter a valid email address.",
      email_too_long: "That email is too long.",
      company_too_long: "That company name is too long.",
      type_invalid: "Please choose what you want to discuss.",
      message_too_short: "Please tell us a little more (at least 10 characters).",
      message_too_long: "The message is too long (4000 characters maximum).",
      consent_required: "Please confirm that you have read the Privacy Policy to send your message.",
    },
  },
};
