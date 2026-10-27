import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";

interface BreadcrumbProps {
  lang: Locale;
  /** Accessible name of the navigation. */
  label: string;
  home: string;
  /** The section the page belongs to, e.g. Services or Work. */
  parent: { label: string; href: string };
  /** The current page, last and not a link. */
  current: string;
}

/** Home / <section> / <this page>: the same trail on every page that belongs to a section. */
export function Breadcrumb({ lang, label, home, parent, current }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className="text-small text-subtle">
      <Link href={localizedPath(lang, "/")} className="hover:text-white">
        {home}
      </Link>{" "}
      /{" "}
      <Link href={localizedPath(lang, parent.href)} className="hover:text-white">
        {parent.label}
      </Link>{" "}
      / <span aria-current="page">{current}</span>
    </nav>
  );
}
