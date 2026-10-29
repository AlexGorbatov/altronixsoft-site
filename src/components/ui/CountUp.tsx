"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  /** The finished text, e.g. "10+". Only a leading number below 1000 is animated (never a year); anything else is shown as is. */
  value: string;
  className?: string;
}

const DURATION_MS = 1300;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a figure up from zero the first time it scrolls into view.
 *
 * The server HTML and no-JS / reduced-motion visitors get the finished text. Only after hydration, for figures
 * still below the fold, is the text reset to zero and played once. It writes the text node directly, so React never
 * re-renders, and digits are tabular so the width does not jitter while counting.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = /^(\D*)(\d+)([\s\S]*)$/.exec(value);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    // A year ("Since 2023") must never count up from zero.
    if (target >= 1000) return;
    const write = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };

    let frame = 0;
    const play = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        write(Math.round(target * easeOutExpo(t)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Already on screen: leave the finished figure alone (the entrance reveal covers it).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    write(0);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}
