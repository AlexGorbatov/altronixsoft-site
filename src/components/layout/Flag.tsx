import { useId } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Small flags drawn as SVG, so they look the same on every system (emoji flags show up as the letters "GB" or
 * "DE" on Windows). Decorative: the language name is always written next to them or in the button's label.
 * English uses the Union Jack, German the German flag, Ukrainian the Ukrainian flag.
 */
export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const id = useId();
  const frame = cn("shrink-0 rounded-[3px] ring-1 ring-white/25", className);

  if (locale === "de") {
    return (
      <svg viewBox="0 0 5 3" aria-hidden="true" focusable="false" className={frame}>
        <rect width="5" height="1" y="0" fill="#000" />
        <rect width="5" height="1" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  if (locale === "uk") {
    return (
      <svg viewBox="0 0 3 2" aria-hidden="true" focusable="false" className={frame}>
        <rect width="3" height="1" y="0" fill="#0057B7" />
        <rect width="3" height="1" y="1" fill="#FFD700" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" aria-hidden="true" focusable="false" className={frame}>
      <clipPath id={`${id}-s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}-t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}-s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
