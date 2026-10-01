import { siteConfig } from "@/data/site";

export interface PolicySection {
  id: string;
  title: string;
  /** Paragraphs. Entries containing `TODO(owner)` are hidden on the site until filled. */
  body: string[];
  bullets?: string[];
}

/**
 * Privacy Policy template for the contact form. It restates how the site actually works today
 * (no analytics, no cookies, one form). Anything the owner must decide is a `TODO(owner)` and stays
 * hidden until filled. This is a starting point, not legal advice: have it reviewed before launch.
 */
export const privacy = {
  title: "Privacy Policy",
  intro: `This policy explains what personal data ${siteConfig.legalName} ("we") collects through this website, why, and what your rights are.`,
  // TODO(owner): set the date of the last review, e.g. "1 October 2026".
  updated: "TODO(owner): last updated date",
  sections: [
    {
      id: "controller",
      title: "Who is responsible",
      body: [
        `${siteConfig.legalName}, a company registered in ${siteConfig.legal.country}, is the controller of the personal data described here.`,
        `Registry code: ${siteConfig.legal.registryCode}`,
        `Address: ${siteConfig.legal.address}, ${siteConfig.legal.country}`,
        `You can reach us at ${siteConfig.email}.`,
      ],
    },
    {
      id: "data",
      title: "What data we collect",
      body: ["Only what you send us through the contact form or by email:"],
      bullets: ["Your name and email address", "Your company (optional)", "The type of request and your message"],
    },
    {
      id: "purpose",
      title: "Why we use it and on what basis",
      body: [
        "We use these details only to read and answer your inquiry and, if you ask for it, to prepare a proposal. The legal basis is taking steps at your request before a possible contract and our legitimate interest in answering business inquiries (GDPR Art. 6(1)(b) and (f)). Where you agree to the form's consent checkbox, we also rely on that consent.",
        "We do not use your details for newsletters or marketing, and we do not sell them.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        "We keep inquiry messages only as long as needed to handle the inquiry and any resulting business relationship, and delete them afterwards.",
        "TODO(owner): retention period, e.g. \"Inquiries that do not lead to a project are deleted after 12 months.\"",
      ],
    },
    {
      id: "recipients",
      title: "Who receives it",
      body: [
        "Your message is delivered to our mailbox by an email delivery provider acting on our behalf. We do not share it with anyone else unless the law requires it.",
        "TODO(owner): name the email provider and where it processes data, e.g. the provider configured in .env (Resend or your SMTP host).",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        "This website does not set cookies and does not use analytics or advertising trackers. If that changes, we will update this policy and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [
        "You can ask us at any time to access, correct or delete your data, to restrict or object to its use, and to receive a copy of it. Write to us and we will respond within the legal deadlines.",
        "You can also complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, www.aki.ee) or to the authority in your own country.",
      ],
    },
  ] satisfies PolicySection[],
};
