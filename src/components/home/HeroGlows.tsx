"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

/**
 * Large decorative background glows with a slight scroll parallax.
 * Only these glows move — no content parallax.
 */
export function HeroGlows() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      layer.style.setProperty("--parallax-y", `${Math.min(window.scrollY, 900) * 0.08}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className={styles.glowLayer} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbA}`} />
      <div className={`${styles.orb} ${styles.orbB}`} />
    </div>
  );
}
