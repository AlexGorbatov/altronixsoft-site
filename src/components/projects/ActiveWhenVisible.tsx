"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** One shared observer for every animated block on the page. */
const callbacks = new Map<Element, (visible: boolean) => void>();
let sharedObserver: IntersectionObserver | null = null;

function observe(el: Element, onChange: (visible: boolean) => void) {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) callbacks.get(entry.target)?.(entry.isIntersecting);
    },
    { rootMargin: "80px 0px" },
  );
  callbacks.set(el, onChange);
  sharedObserver.observe(el);
}

function unobserve(el: Element) {
  callbacks.delete(el);
  sharedObserver?.unobserve(el);
}

interface ActiveWhenVisibleProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Marks its block `data-active="true"` while it is on screen (plus a small margin). The scene animations read
 * that mark (globals.css sets `--ps: running`), so scenes that are scrolled out of view stand still and cost
 * nothing. State lives in a data attribute, so scrolling never re-renders React. Before hydration, or without
 * IntersectionObserver support, nothing is marked and the scene is simply a still picture.
 */
export function ActiveWhenVisible({ className, style, children }: ActiveWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    observe(el, (visible) => {
      if (visible) el.dataset.active = "true";
      else delete el.dataset.active;
    });
    return () => {
      unobserve(el);
      delete el.dataset.active;
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
