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
  intro: `This policy explains what personal data ${siteConfig.legalName} ("we") collects through this website, why and what your rights are.`,
  updated: "27 October 2026",
  /** Shown under the intro: the policy exists in more than one language. */
  languageNote: "This policy is published in English and Ukrainian. If the versions differ, the English version applies.",
  updatedLabel: "Last updated",
  backHome: "Back to home",
  metaDescription: `How ${siteConfig.legalName} handles personal data sent through the contact form.`,
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
      id: "technical",
      title: "Technical data",
      body: [
        "When you visit this website, our hosting provider processes technical data such as your IP address and request details in server logs, so that the site can be delivered and kept secure. The legal basis is our legitimate interest in running and protecting the website (GDPR Art. 6(1)(f)).",
        "When you send the form, we also use your IP address briefly, in memory only, to limit repeated submissions. It is not stored with your message and is not sent to our mailbox.",
      ],
    },
    {
      id: "purpose",
      title: "Why we use it and on what basis",
      body: [
        "We use these details only to read and answer your inquiry and, if you ask for it, to prepare a proposal. The legal basis is taking steps at your request before a possible contract and our legitimate interest in answering business inquiries (GDPR Art. 6(1)(b) and (f)). The checkbox on the form only confirms that you have read and understood this policy; it is not a request for your consent.",
        "We do not use your details for newsletters or marketing, and we do not sell them.",
        "Giving us your name, email address and message is voluntary, but without them we cannot reply. We do not use automated decision-making or profiling.",
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
        "TODO(owner): name the provider of the info@ mailbox and the hosting provider, and where each processes data.",
        "TODO(owner): name the email provider and where it processes data, e.g. the provider configured in .env (Resend or your SMTP host).",
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside the EEA",
      body: [
        "We transfer personal data outside the European Economic Area only where an appropriate safeguard is in place, such as an adequacy decision by the European Commission or the EU Standard Contractual Clauses.",
        "TODO(owner): name the providers that process data outside the EEA (hosting, email delivery) and the safeguard used for each (EU Standard Contractual Clauses or the EU-US Data Privacy Framework).",
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
      id: "links",
      title: "Links to other websites",
      body: [
        "This website links to other sites, for example LinkedIn, GitHub and the websites of partner projects. They have their own privacy policies, and we are not responsible for how they handle data.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [
        "You can ask us at any time to access, correct or delete your data, to restrict or object to its use, and to receive a copy of it. Write to us and we will respond within the legal deadlines.",
        "Where we rely on your consent for anything, you can withdraw it at any time. Withdrawing it does not affect processing that took place before.",
        "You can also complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, www.aki.ee) or to the authority in your own country.",
      ],
    },
  ] satisfies PolicySection[],
};
