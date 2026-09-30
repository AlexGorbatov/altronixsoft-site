"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step, 1–4 (80ms each). */
  delay?: 1 | 2 | 3 | 4;
}

/**
 * Fades + lifts content in once it scrolls into view. State lives in a class
 * toggle rather than React state so revealing never triggers a re-render.
 * The hidden/visible styles are in globals.css (`.reveal`).
 */
export function AnimatedReveal({ children, className, delay }: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.13, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)} data-delay={delay}>
      {children}
    </div>
  );
}
