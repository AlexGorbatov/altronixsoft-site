"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card whose ambient glow follows the pointer. Only writes two CSS variables,
 * so it never re-renders. Lift / border / glow styles live in `.spotlight`.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <article className={cn("spotlight", className)} onPointerMove={handlePointerMove}>
      {children}
    </article>
  );
}
