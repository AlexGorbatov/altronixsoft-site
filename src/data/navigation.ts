export interface NavItem {
  label: string;
  href: string;
}

// Root-relative so the header works on every page. Every hash must match an id on the home page; /work is the portfolio page.
export const navigation: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#approach" },
  { label: "About", href: "/#about" },
];
