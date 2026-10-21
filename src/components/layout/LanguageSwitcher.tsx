"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { localeMeta, localizedPath, locales, splitLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Flag } from "./Flag";

/**
 * Language picker: a button that opens a short list of links, one per language, each written in its own
 * language. The links are real addresses, so they work without JavaScript and can be crawled. Choosing a
 * language keeps the page the visitor is on and opens it at the top. Nothing is stored in a cookie.
 */
export function LanguageSwitcher({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const router = useRouter();
  const path = splitLocale(usePathname()).path;

  // Close on Escape (returning focus to the button) and on a click anywhere outside.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function choose(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    // Keep the page and the query, but not the #section: the new language opens at the top of the page.
    event.preventDefault();
    router.push(`${localizedPath(target, path)}${window.location.search}`);
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${localeMeta[lang].name}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border border-line px-3 text-sm font-semibold text-strong transition-colors hover:text-white"
      >
        <Globe size={16} aria-hidden />
        <Flag locale={lang} className="h-[15px] w-[22px]" />
        <ChevronDown size={14} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-[168px] overflow-hidden rounded-xl border border-line bg-[#0a1428] p-1 shadow-[0_18px_40px_rgba(0,0,0,.45)]"
      >
        {locales.map((code) => (
          <li key={code}>
            <a
              href={localizedPath(code, path)}
              hrefLang={code}
              lang={code}
              aria-current={code === lang ? "true" : undefined}
              onClick={(event) => choose(event, code)}
              className="flex min-h-11 items-center justify-between gap-4 rounded-lg px-3 text-sm font-semibold text-strong transition-colors hover:bg-white/[.06] hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Flag locale={code} className="h-[15px] w-[22px]" />
                {localeMeta[code].name}
              </span>
              {code === lang && <Check size={16} aria-hidden className="text-label" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
