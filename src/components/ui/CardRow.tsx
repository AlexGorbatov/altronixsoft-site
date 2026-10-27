"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useOverflows } from "@/lib/useOverflows";
import { cn } from "@/lib/utils";

/** Texts for the arrows and the dots; `goTo` holds `{n}`, the number of the card. */
export interface CardRowControls {
  prev: string;
  next: string;
  goTo: string;
}

interface CardRowProps {
  label: string;
  /** Desktop column count (3 by default). */
  columns?: 3 | 4;
  className?: string;
  /** Arrows and dots that can be pressed, for the row on tablet and phone. Without it the dots only show the position. */
  controls?: CardRowControls;
  /** Mark the card in front, so the others step back a little (tablet and phone). */
  emphasis?: boolean;
  /** Nudge the row sideways once when it first comes into view, to show that it moves. */
  hint?: boolean;
  children: ReactNode;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Three- (or four-) column grid on desktop; on tablet / phone it becomes a horizontal
 * scroll-snap row that bleeds to the screen edge, so the page doesn't turn
 * into a very long stack of cards. Dots under the row show the position (hidden on desktop).
 * With `controls` the dots and two arrows move the row; with `emphasis` the card in front is marked
 * (`data-current`, styled in globals.css); with `hint` the row nudges once to show it scrolls.
 * Children should carry `CARD_ITEM`.
 */
export function CardRow({ label, columns = 3, className, controls, emphasis, hint, children }: CardRowProps) {
  const count = Children.count(children);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  // Keyboard users can only scroll a region they can focus, so it is a tab stop only while it overflows.
  const scrollable = useOverflows(scroller);

  /** The card whose left edge is nearest to the left edge of the row; the last one once the row is at its end. */
  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const visible = cards.filter((card) => card.offsetParent !== null);
    if (visible.length === 0) return;
    const start = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 && el.scrollWidth > el.clientWidth + 1;
    let nearest = 0;
    visible.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - start - el.scrollLeft) < Math.abs(visible[nearest].offsetLeft - start - el.scrollLeft)) nearest = i;
    });
    setActive(atEnd ? visible.length - 1 : nearest);
  }, []);

  const frame = useRef(0);
  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  }

  function goTo(index: number) {
    const el = scroller.current;
    const card = el?.children[Math.max(0, Math.min(count - 1, index))] as HTMLElement | undefined;
    if (!el || !card) return;
    const start = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - start, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  // The card in front gets a mark that globals.css styles.
  useEffect(() => {
    if (!emphasis) return;
    [...(scroller.current?.children ?? [])].forEach((card, i) => card.toggleAttribute("data-current", i === active));
  }, [active, emphasis]);

  // A short nudge the first time the row is mostly in view: it shows that the row moves, then it settles back.
  useEffect(() => {
    const el = scroller.current;
    if (!hint || !scrollable || !el || prefersReducedMotion()) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (document.documentElement.dataset.motion === "paused" || el.scrollLeft > 0) return;
        // Snapping would pull the row straight back, so it is off for the nudge.
        el.style.scrollSnapType = "none";
        el.scrollTo({ left: 56, behavior: "smooth" });
        timers.push(window.setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 750));
        timers.push(window.setTimeout(() => (el.style.scrollSnapType = ""), 1500));
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      el.style.scrollSnapType = "";
    };
  }, [hint, scrollable]);

  return (
    <>
      <div
        ref={scroller}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        tabIndex={scrollable ? 0 : undefined}
        className={cn(
          "relative z-[1] -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-[14px] sm:scroll-px-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:gap-[18px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden",
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          emphasis && "card-row-emphasis",
          className,
        )}
      >
        {children}
      </div>

      {controls ? (
        <div className="relative z-[1] mt-4 flex items-center justify-between gap-2 lg:hidden">
          <button
            type="button"
            aria-label={controls.prev}
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/[.28] text-white transition-colors hover:border-white/60 disabled:opacity-40"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <div role="group" aria-label={label} className="flex items-center">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={controls.goTo.replace("{n}", String(i + 1))}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className="grid h-11 min-w-7 place-items-center"
              >
                <i
                  aria-hidden="true"
                  className={cn(
                    "block h-[6px] rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-[var(--cyan)]" : "w-[6px] bg-white/25",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={controls.next}
            disabled={active === count - 1}
            onClick={() => goTo(active + 1)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/[.28] text-white transition-colors hover:border-white/60 disabled:opacity-40"
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>
      ) : (
        <div className="relative z-[1] mt-4 flex justify-center gap-[7px] lg:hidden" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <i
              key={i}
              className={cn(
                "h-[6px] rounded-full transition-all duration-300",
                i === active ? "w-5 bg-label" : "w-[6px] bg-white/20",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
