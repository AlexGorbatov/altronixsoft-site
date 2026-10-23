"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, splitLocale, type Locale } from "@/i18n/config";

/** A desktop nav link. One without a hash (e.g. /work) is marked current on its page and the pages below it. */
export function NavLink({ lang, href, children }: { lang: Locale; href: string; children: string }) {
  const { path } = splitLocale(usePathname());
  const current = !href.includes("#") && (path === href || path.startsWith(`${href}/`));
  return (
    <Link
      href={localizedPath(lang, href)}
      aria-current={path === href ? "page" : undefined}
      className={
        current
          ? "inline-flex min-h-11 items-center text-white shadow-[inset_0_-2px_0_var(--cyan)]"
          : "inline-flex min-h-11 items-center transition-colors hover:text-white"
      }
    >
      {children}
    </Link>
  );
}
