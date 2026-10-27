/**
 * Landing page /services/sap-commerce. Only statements already made elsewhere on the site
 * (SAP Commerce Cloud, Java/Spring, integrations, PIM, production support). Specifics the owner can add
 * (versions, storefronts, certifications) are `TODO(owner)` and stay hidden until filled.
 */
export const sapCommerce = {
  path: "/services/sap-commerce",
  /** Fourth of the services, after the three in `services.ts`. */
  number: "04",
  title: "SAP Commerce Cloud services",
  /** Search and sharing title: "development" and "Hybris" are the terms people search for. `title` stays for the breadcrumb. */
  metaTitle: "SAP Commerce Cloud (Hybris) development",
  metaDescription:
    "SAP Commerce Cloud (Hybris) development, support, integrations and upgrades by senior Java/Spring engineers. Clear ownership. Transparent delivery.",
  h1: "SAP Commerce Cloud development and support",
  intro:
    "We build, extend and support SAP Commerce Cloud (Hybris) platforms for e-commerce and product-data teams. The work is backend and integration engineering in Java and Spring, led by senior engineers.",
  /**
   * The SAP Commerce Cloud card in the home page's Services section. The figures are provided by the owner;
   * keep them to what can be backed up (no support-hours promise unless it is contractually offered).
   */
  specialization: {
    badge: "Specialization",
    title: "SAP Commerce Cloud",
    text: "Development, production support, integrations and upgrades for SAP Commerce Cloud (Hybris) platforms.",
    stats: [
      { value: "10+", label: "SAP Commerce projects" },
      { value: "ERP · PIM", label: "integrations" },
    ],
  },
  problems: [
      "Search, checkout or promotions need changes on an existing SAP Commerce platform.",
      "ERP, PIM and third-party systems need reliable APIs or product-data imports.",
      "A running commerce system needs maintenance, an upgrade or a planned cloud migration."
    ],
  caseSlugs: [
      "enterprise-ecommerce-platform",
      "product-information-platform"
    ],
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
  relevant: ["Java", "Spring", "SAP Commerce Cloud (Hybris)", "Backoffice", "ImpEx", "Data Hub", "Solr Search", "Enterprise APIs", "PIM", "Cloud"],
  start: [
    { title: "Scoping call", text: "A call to understand your platform and agree the next step." },
    { title: "Technical review", text: "A paid review of your code, architecture and integrations, with a written report." },
    { title: "Delivery", text: "A defined scope with a project lead and an engineering team chosen for the required skills." },
  ],
};
