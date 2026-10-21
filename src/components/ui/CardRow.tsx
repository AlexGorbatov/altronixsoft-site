"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { useOverflows } from "@/lib/useOverflows";
import { cn } from "@/lib/utils";

interface CardRowProps {
  label: string;
  /** Desktop column count (3 by default). */
  columns?: 3 | 4;
  className?: string;
  children: ReactNode;
}

/**
 * Three- (or four-) column grid on desktop; on tablet / phone it becomes a horizontal
 * scroll-snap row that bleeds to the screen edge, so the page doesn't turn
 * into a very long stack of cards. Dots under the row show the position (hidden on desktop).
 * Children should carry `CARD_ITEM`.
 */
export function CardRow({ label, columns = 3, className, children }: CardRowProps) {
  const count = Children.count(children);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  // Keyboard users can only scroll a region they can focus, so it is a tab stop only while it overflows.
  const scrollable = useOverflows(scroller);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (count - 1)) : 0);
  }

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
          className,
        )}
      >
        {children}
      </div>
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
    </>
  );
}
