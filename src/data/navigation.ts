export interface NavItem {
  label: string;
  href: string;
}

// Every href must match an id on the home page.
export const navigation: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Company", href: "#company" },
];
