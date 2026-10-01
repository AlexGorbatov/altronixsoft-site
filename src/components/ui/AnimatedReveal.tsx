"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step, 1–4 (30ms each). */
  delay?: 1 | 2 | 3 | 4;
}

/** One shared observer for every reveal block on the page (instead of one observer per block). */
const releases = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function observe(el: Element, release: () => void) {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        releases.get(entry.target)?.();
        releases.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px 25% 0px", threshold: 0 },
  );
  releases.set(el, release);
  sharedObserver.observe(el);
}

function unobserve(el: Element) {
  releases.delete(el);
  sharedObserver?.unobserve(el);
}

/**
 * Fades + lifts content in once, just before it scrolls into view.
 *
 * Content is visible in the server HTML and without JS. After hydration, only blocks that are still
 * below the fold are marked `data-reveal="pending"` (hidden), and they are released while they are
 * still 25% of a screen away, so quick scrolling never reveals an empty page. Blocks that are already
 * on screen (or above it, e.g. after jumping to an anchor) are never hidden. With reduced motion
 * nothing is ever hidden. State lives in a data attribute, so revealing never re-renders React.
 * The styles are in globals.css (`.reveal`).
 */
export function AnimatedReveal({ children, className, delay }: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already visible or already scrolled past: leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    observe(el, () => {
      delete el.dataset.reveal;
    });

    return () => {
      unobserve(el);
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)} data-delay={delay}>
      {children}
    </div>
  );
}
