"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

/**
 * Very slight pointer-driven tilt for the hero visual (desktop only).
 * Writes an inline transform while the pointer is over the card and clears it
 * on leave so the CSS resting transform takes over again.
 */
export function TiltCard({ children, className, label }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function tiltAllowed() {
    return (
      window.innerWidth >= 900 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType === "touch" || !tiltAllowed()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 3 - 2}deg) rotateX(${-y * 2}deg) translateY(-2px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}
