export interface AboutPerson {
  name: string;
  role: string;
  /** Path under /public (e.g. "/team/name.jpg"). While it is a placeholder, a monogram portrait is shown. */
  photo: string;
  /** Rendered as `${intro}${clientType ? " for " + clientType : ""}. ${outro}`; `clientType` is optional until filled. */
  bio: { intro: string; clientType?: string; outro: string };
  linkedinUrl: string;
  highlights: string[];
}

/**
 * Everything in the "Who we are" section (#about). The component only renders this object.
 * The section is about the company, not about one person: no founder card, photo or personal bio.
 * `TODO(owner)` values are hidden in production and shown as dashed notes in development (see `filled()`).
 */
export const about = {
  eyebrow: "About",
  title: "Senior engineers for enterprise systems.",
  lead: "Altronix Software is an engineering company led by enterprise architects. We build, modernize and support commerce platforms, product data systems, logistics software and enterprise integrations. AI is part of some systems, not the starting point.",

  /** Key numbers. Only filled values are rendered. */
  stats: [
    // TODO(owner): verify that 2019 matches the registration date of the OÜ in the e-Business Register;
    // if it does not, reword the label to "working with clients since …" with the correct year.
    { value: "Since 2019", label: "working with clients" },
  ],

  operateTitle: "How we operate",
  operate: [
    {
      title: "A senior engineer leads each engagement.",
      text: "You work directly with the person responsible for delivery.",
    },
    {
      title: "Review first.",
      text: "A fixed-scope review or proof of value comes before any larger commitment.",
    },
    {
      title: "You get the code and documentation.",
      text: "Handed over under the contract terms.",
    },
    {
      title: "Written communication.",
      text: "Regular status updates and documented decisions.",
    },
  ],
};
