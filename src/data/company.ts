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
  title: "A focused studio for complex software.",
  lead: "AltronixSoft is a small, independent software engineering studio. Hands-on Java/Spring and enterprise systems experience supports custom products, integrations and modernization. The team is shaped around the scope, with additional engineering specialists brought in when required.",

  /** Key numbers. Only filled values are rendered. */
  stats: [
    // 2023 is the registration year of AltronixSoftware OÜ in the Estonian register (5 Jan 2023).
    { value: "Since 2023", label: "working with clients" },
  ],

  operateTitle: "How we operate",
  operate: [
    {
      title: "Direct technical ownership.",
      text: "The initial conversation covers who would handle your project and the relevant engineering experience. You work directly with the engineer responsible for scope and delivery decisions.",
    },
    {
      title: "Specialists when the work needs them.",
      text: "Additional engineering specialists join according to the project scope, rather than a fixed team structure.",
    },
    {
      title: "Scope and confidentiality first.",
      text: "The scope, access requirements and confidentiality terms are agreed before implementation.",
    },
    {
      title: "You get the code and documentation.",
      text: "Handed over under the contract terms.",
    },
    {
      title: "Decisions documented.",
      text: "Regular status updates and documented decisions.",
    },
  ],
};
