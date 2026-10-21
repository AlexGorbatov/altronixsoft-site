"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import styles from "./ProcessJourney.module.css";

/**
 * Wire paths in the map's 1100×390 coordinate space, grouped by the phase that
 * lights them up: A → understand, B → design, C → build & prove, D → launch.
 */
const wires = [
  { id: "a", className: styles.wireA, paths: ["M286 142 C345 142 365 178 410 196", "M286 184 C345 184 365 192 410 205", "M286 226 C345 226 365 212 410 214", "M286 268 C345 268 365 228 410 222"] },
  { id: "b", className: styles.wireB, paths: ["M555 206 C602 206 618 206 660 206"] },
  { id: "c", className: styles.wireC, paths: ["M707 190 C770 190 790 116 842 116", "M707 222 C770 222 790 226 842 226"] },
  { id: "d", className: styles.wireD, paths: ["M958 126 C1002 126 1005 306 970 322", "M958 236 C997 236 1008 300 970 322"] },
];

/** Time each step stays lit while the intro plays. */
const AUTOPLAY_STEP_MS = 1700;

/**
 * "How we work": a plain stepper. All four steps are visible at once (columns on desktop, a vertical
 * list on phones); clicking a step highlights it and lights the matching part of the diagram.
 * When the section first scrolls into view the steps light up one by one (01 → 04) and stop on the
 * finished diagram; any click ends the intro. Reduced motion skips it. It never captures page scrolling.
 */
interface ProcessJourneyProps {
  copy: Content["copy"]["process"];
  phases: Content["processPhases"];
}

export function ProcessJourney({ copy, phases }: ProcessJourneyProps) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const userChose = useRef(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let step = 0;
        timer = window.setInterval(() => {
          if (userChose.current || step >= phases.length - 1) {
            window.clearInterval(timer);
            return;
          }
          step += 1;
          setActive(step);
        }, AUTOPLAY_STEP_MS);
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [phases.length]);

  function choose(index: number) {
    userChose.current = true;
    setInteracted(true);
    setActive(index);
  }

  const current = phases[active];
  const progress = active / (phases.length - 1);

  return (
    <section ref={sectionRef} id="approach" aria-labelledby="process-title" className="section section-alt">
      <div className={styles.scroll} data-active={active} style={{ "--process-progress": progress } as CSSProperties}>
        <Container className="relative z-[2]">
          <div className={styles.shell}>
            <div className={styles.head}>
              <div className="eyebrow">{copy.eyebrow}</div>
              <h2 id="process-title">{copy.title}</h2>
              <p>{copy.description}</p>
            </div>

            <div className={styles.track}>
              <div className={styles.line} aria-hidden="true">
                <div className={styles.progress} />
              </div>
              <ol className={styles.phases}>
                {phases.map((phase, index) => (
                  <li
                    key={phase.title}
                    className={cn(styles.phase, index === active && styles.active, index < active && styles.completed)}
                  >
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.kicker}>{copy.stepLabel} {phase.number}</span>
                    <h3>
                      <button
                        type="button"
                        className={styles.stepButton}
                        aria-pressed={index === active}
                        onClick={() => choose(index)}
                      >
                        {phase.title}
                      </button>
                    </h3>
                    <p>{phase.description}</p>
                  </li>
                ))}
              </ol>
              <p className={styles.hint}>{copy.hint}</p>
            </div>

            <div className={styles.mapArea}>
              {/* Decorative workflow diagram — the same information is in the list above. */}
              <div className={styles.map} aria-hidden="true">
                <svg className={styles.wires} viewBox="0 0 1100 390" preserveAspectRatio="none">
                  {wires.map((group) =>
                    group.paths.map((d) => <path key={d} className={group.className} d={d} />),
                  )}
                </svg>

                <div className={cn(styles.zone, styles.sourceZone)}>
                  <div className={styles.zoneLabel}>{copy.diagram.sourceZone}</div>
                  <div className={styles.sourceList}>
                    {copy.diagram.sourceItems.map((item) => (
                      <div key={item} className={styles.chip}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cn(styles.zone, styles.coreZone)}>
                  <div className={styles.coreNode}>{copy.diagram.coreNodes[0]}</div>
                  <div className={styles.coreArrow}>→</div>
                  <div className={styles.coreNode}>{copy.diagram.coreNodes[1]}</div>
                </div>

                <div className={cn(styles.zone, styles.outputZone)}>
                  <div className={styles.zoneLabel}>{copy.diagram.outputZone}</div>
                  {copy.diagram.outputs.map((output) => (
                    <div key={output.title} className={styles.outputCard}>
                      <b>{output.title}</b>
                      <span>{output.text}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.badge}>
                  <b>{copy.diagram.badge.title}</b>
                  <span>{copy.diagram.badge.text}</span>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.status} aria-live={interacted ? "polite" : "off"}>
                <span className={styles.current}>
                  {copy.stepLabel} <strong>{current.number}</strong> / {String(phases.length).padStart(2, "0")}
                </span>
                &nbsp;·&nbsp;
                <strong>{current.title}</strong>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
