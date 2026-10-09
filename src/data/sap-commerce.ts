/**
 * Landing page /services/sap-commerce. Only statements already made elsewhere on the site
 * (SAP Commerce Cloud, Java/Spring, integrations, PIM, production support). Specifics the owner can add
 * (versions, storefronts, certifications) are `TODO(owner)` and stay hidden until filled.
 */
export const sapCommerce = {
  path: "/services/sap-commerce",
  title: "SAP Commerce Cloud services",
  /** Page title for search and sharing; the layout appends " | Altronixsoft". */
  metaTitle: "SAP Commerce Cloud Development, Upgrades & Support",
  metaDescription:
    "SAP Commerce Cloud (Hybris) development, support, integrations and upgrades in Java and Spring, led by a principal architect. Start with a free 30-minute check-up.",
  h1: "SAP Commerce Cloud development and support",
  intro:
    "We build, extend and support SAP Commerce Cloud (Hybris) platforms for e-commerce and product-data teams. The work is backend and integration engineering in Java and Spring, led by a principal architect.",
  offerings: [
    {
      title: "Development",
      text: "New features, custom extensions and backend logic on SAP Commerce Cloud, built to your platform standards.",
    },
    {
      title: "Support and maintenance",
      text: "Production support, incident analysis and regular maintenance for running commerce platforms.",
    },
    {
      title: "Integrations",
      text: "Connections to ERP, PIM, payment, logistics and other enterprise systems through enterprise APIs.",
    },
    {
      title: "Upgrades and cloud migration",
      text: "Planned upgrades and moves to cloud infrastructure without unnecessary rewrites.",
    },
  ],
  /** Specifics. Each row is shown only once its value is real. */
  details: [
    { label: "Versions and storefronts", value: "TODO(owner): e.g. SAP Commerce Cloud versions and storefront stacks you work with" },
    { label: "Certifications", value: "TODO(owner): SAP certifications held by the team, if any" },
    { label: "Typical engagement", value: "TODO(owner): e.g. team size and duration of a typical SAP Commerce project" },
  ],
  relevant: ["Java", "Spring", "SAP Commerce Cloud (Hybris)", "Enterprise APIs", "PIM", "Cloud"],
  start: [
    { title: "Architecture check-up", text: "A 30-minute call to look at your platform and decide what makes sense next." },
    // TODO(owner): price
    {
      title: "Platform review",
      text: "A fixed-scope review of your code, architecture and integrations: risk register, upgrade plan and effort estimate. From €[price].",
    },
    { title: "Delivery", text: "A fixed-scope project or ongoing support, led by the founder." },
  ],
};
