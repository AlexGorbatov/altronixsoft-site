"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/**
 * Pause / resume for the animations that never stop (hero canvas, technology marquee, process connectors).
 * WCAG 2.2.2. It sets `data-motion="paused"` on <html>; globals.css then pauses every animation.
 * Hidden when the visitor already asks for reduced motion, because nothing moves then.
 */
export function MotionToggle() {
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    setPaused(next);
    if (next) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
  }

  const Icon = paused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={toggle}
      className="motion-toggle inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-white/[.42] px-3 text-small font-semibold text-strong transition-colors hover:text-white"
    >
      <Icon size={16} aria-hidden />
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
