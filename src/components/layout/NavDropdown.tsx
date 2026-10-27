"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import type { NavItem } from "@/data/navigation";
import { localizedPath, splitLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  lang: Locale;
  item: NavItem;
  /** Accessible name of the chevron button. */
  toggleLabel: string;
  /** Last row of the menu: the overview of every service on the home page. */
  allLabel: string;
}

/**
 * A desktop nav item with a menu. The label is still a link (to the overview), the chevron is a separate button
 * that opens the list, so keyboard and touch users never depend on hover. A mouse also opens it on hover.
 */
export function NavDropdown({ lang, item, toggleLabel, allLabel }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mouseOver = useRef(false);
  const panelId = useId();
  const { path } = splitLocale(usePathname());
  const children = item.children ?? [];
  const current = children.some((child) => path === child.href);

  // A click outside the menu closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }

  // Tabbing out of the whole menu closes it.
  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!root.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  }

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    mouseOver.current = true;
    setOpen(true);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    mouseOver.current = false;
    setOpen(false);
  }

  const linkClass = "flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-strong transition-colors hover:bg-white/[.06] hover:text-white";

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown} onBlur={onBlur} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className={cn("flex items-center", current && "shadow-[inset_0_-2px_0_var(--cyan)]")}>
        <Link
          href={localizedPath(lang, item.href)}
          onClick={() => setOpen(false)}
          className="inline-flex min-h-11 items-center transition-colors hover:text-white"
        >
          {item.label}
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-label={toggleLabel}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          // With a mouse the pointer has already opened the menu by hover; the click must not close it again.
          onClick={() => setOpen((value) => (mouseOver.current ? true : !value))}
          className="grid size-8 place-items-center rounded-md transition-colors hover:text-white"
        >
          <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        // The padding bridges the gap between the item and the panel, so the pointer never leaves the menu on the way.
        <div id={panelId} className="absolute top-full left-0 z-[60] pt-2">
          <ul className="grid min-w-[280px] gap-0.5 rounded-xl border border-line bg-[#0b1527] p-2 shadow-[0_18px_40px_rgba(0,0,0,.45)]">
            {children.map((child) => (
              <li key={child.href}>
                <Link
                  href={localizedPath(lang, child.href)}
                  aria-current={path === child.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(linkClass, path === child.href && "text-white")}
                >
                  {child.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-line pt-1">
              <Link href={localizedPath(lang, item.href)} onClick={() => setOpen(false)} className={cn(linkClass, "text-label")}>
                {allLabel} <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
