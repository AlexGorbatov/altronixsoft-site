export interface NavItem {
  label: string;
  href: string;
}

// Every href must match an id on the home page.
export const navigation: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "How we work", href: "#approach" },
  { label: "Company", href: "#company" },
];
