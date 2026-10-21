"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Pause / resume for the animations that never stop (hero canvas, technology marquee, process connectors).
 * WCAG 2.2.2. It sets `data-motion="paused"` on <html>; globals.css then pauses every animation.
 * Hidden when the visitor already asks for reduced motion, because nothing moves then.
 */
export function MotionToggle({ labels }: { labels: { pause: string; play: string } }) {
  const [paused, setPaused] = useState(false);

  // <html> survives client-side navigation but this button does not. Resume when it unmounts, so the page is
  // never left paused without a control and the button always matches the page when it comes back.
  useEffect(
    () => () => {
      delete document.documentElement.dataset.motion;
    },
    [],
  );

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
      {paused ? labels.play : labels.pause}
    </button>
  );
}
