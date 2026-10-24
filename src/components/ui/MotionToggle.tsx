"use client";

import { Pause, Play } from "lucide-react";
import { useSyncExternalStore } from "react";

/**
 * Pause / resume for the animations that never stop (hero canvas, technology marquee, process connectors, the
 * architecture diagrams). WCAG 2.2.2. It sets `data-motion="paused"` on <html>; globals.css then pauses every
 * animation. The state lives on <html>, so every button on the page (the technology strip and the footer) shows the
 * same state, and the choice stays while the visitor moves between pages. Hidden when the visitor already asks for
 * reduced motion, because nothing moves then.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}
const isPaused = () => document.documentElement.dataset.motion === "paused";

export function MotionToggle({ labels, className }: { labels: { pause: string; play: string }; className?: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  function toggle() {
    if (paused) delete document.documentElement.dataset.motion;
    else document.documentElement.dataset.motion = "paused";
  }

  const Icon = paused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={`motion-toggle inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-white/[.42] px-3 text-small font-semibold text-strong transition-colors hover:text-white ${className ?? ""}`}
    >
      <Icon size={16} aria-hidden />
      {paused ? labels.play : labels.pause}
    </button>
  );
}
