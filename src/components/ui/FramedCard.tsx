import type { ReactNode } from "react";
import { ActiveWhenVisible } from "@/components/projects/ActiveWhenVisible";
import { cn } from "@/lib/utils";
import styles from "./FramedCard.module.css";

export type FrameAccent = "cyan" | "blue" | "indigo" | "violet" | "green";

interface FramedCardProps {
  /** The colour of the frame. */
  accent: FrameAccent;
  /** For the outer element, e.g. a width or `h-full`. */
  className?: string;
  /** For the card itself: its layout and padding. */
  innerClassName?: string;
  /** An anchor target on the card (the card keeps the frame outside it). */
  innerId?: string;
  /** A tight frame around a single control, e.g. a button: smaller corners, and no lift of its own. */
  compact?: boolean;
  children: ReactNode;
}

/** A card with the same frame of light as the project cards: it makes a block stand out from the page. */
export function FramedCard({ accent, className, innerClassName, innerId, compact, children }: FramedCardProps) {
  return (
    <ActiveWhenVisible className={cn(styles.frame, styles[accent], compact && styles.compact, className)}>
      <div id={innerId} className={cn(styles.inner, innerClassName)}>
        {children}
      </div>
    </ActiveWhenVisible>
  );
}
