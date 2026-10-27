export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Root-relative so the header works on every page. Every hash must match an id on the home page; /work is the portfolio page.
export const navigation: NavItem[] = [
  {
    label: "Services",
    href: "/#services",
    // All four service areas, equal: the same pages as the Services section and the footer.
    children: [
      { label: "Custom software development", href: "/services/software" },
      { label: "Modernization and integrations", href: "/services/modernization" },
      { label: "AI integration and automation", href: "/services/ai" },
      { label: "SAP Commerce Cloud", href: "/services/sap-commerce" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#approach" },
  { label: "About", href: "/#about" },
];
