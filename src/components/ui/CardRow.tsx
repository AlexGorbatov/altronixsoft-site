import type { ReactNode } from "react";
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
 * into a very long stack of cards. Children should carry `CARD_ITEM`.
 */
export function CardRow({ label, columns = 3, className, children }: CardRowProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "relative z-[1] -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-[14px] sm:scroll-px-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:gap-[18px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Sizing for direct children of `CardRow`. */
export const CARD_ITEM = "max-lg:w-[min(84%,380px)] max-lg:shrink-0 max-lg:snap-start";
