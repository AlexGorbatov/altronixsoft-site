export interface AboutPerson {
  name: string;
  role: string;
  /** Path under /public (e.g. "/team/name.jpg"). While it is a placeholder, a monogram portrait is shown. */
  photo: string;
  /** Rendered as `${intro}${clientType ? " for " + clientType : ""}. ${outro}`; `clientType` is optional until filled. */
  bio?: { intro: string; clientType?: string; outro: string };
  linkedinUrl: string;
  highlights?: string[];
}

/** The founder card in the "Who we are" section. */
export const founder: AboutPerson = {
  // TODO(owner): confirm the Latin spelling matches LinkedIn
  name: "Oleksandr Gorbatov",
  role: "Founder & Principal Architect",
  // TODO(owner): photo — path under /public; until then the "OG" monogram is shown
  photo: "",
  // TODO(owner): LinkedIn profile URL
  linkedinUrl: "[linkedin-profile-url]",
};

/**
 * Everything in the "Who we are" section (#about). The component only renders this object.
 * Company first, then one founder card (name, role, LinkedIn); no personal bio until the owner writes one.
 * `TODO(owner)` values are hidden in production and shown as dashed notes in development (see `filled()`).
 */
export const about = {
  eyebrow: "About",
  title: "Principal-led engineering for business-critical systems.",
  lead: "Altronixsoft is an independent engineering company registered in Estonia, founded and led by Oleksandr Gorbatov — an enterprise architect with 16+ years in enterprise software, commerce platforms and large-scale integrations. We build, modernize and support commerce platforms, product data systems, logistics software and enterprise integrations. AI is part of some systems, not the starting point.",

  /** Key numbers. Only filled values are rendered. */
  stats: [
    // TODO(owner): verify registration year — 2019 must match the OÜ's date in the e-Business Register;
    // if it does not, reword the label to "working with clients since …" with the correct year.
    { value: "Since 2019", label: "working with clients" },
  ],

  operateTitle: "How we operate",
  operate: [
    {
      title: "The founder leads each engagement.",
      text: "You work directly with the founder, who is responsible for delivery.",
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
