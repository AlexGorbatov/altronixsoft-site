"use client";

import { useRef, type ReactNode } from "react";
import { useOverflows } from "@/lib/useOverflows";

/**
 * A labelled region that can scroll sideways. Keyboard users can only scroll what they can focus, so it
 * is a tab stop only while its content overflows (phones), not on desktop where nothing scrolls.
 */
export function ScrollRegion({
  id,
  label,
  className,
  children,
}: {
  id?: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollable = useOverflows(ref);

  return (
    <div ref={ref} id={id} role="region" aria-label={label} tabIndex={scrollable ? 0 : undefined} className={className}>
      {children}
    </div>
  );
}
