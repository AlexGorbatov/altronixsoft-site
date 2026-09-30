"use client";

import { useEffect, useRef, useState } from "react";
import { processPhases } from "@/data/process";
import { CONTACT_HREF } from "@/data/site";
import { clamp, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import styles from "./ProcessJourney.module.css";

const sourceItems = ["Business goal", "Current stack", "Workflow", "Constraints"];

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

export function ProcessJourney() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /*
   * Scroll progress: the tall track scrolls while the sticky shell stays pinned.
   * progress = distance scrolled inside the pinned range / total pinned range.
   * The bar is driven straight through a CSS variable (no re-render per frame);
   * React state only changes when the active phase changes.
   */
  useEffect(() => {
    const track = scrollRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    let frame = 0;
    let lastActive = -1;

    const update = () => {
      frame = 0;
      const pinnedTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = clamp((pinnedTop - track.getBoundingClientRect().top) / travel, 0, 1);

      track.style.setProperty("--process-progress", progress.toFixed(4));

      // Four equal scroll zones; the last phase stays active through the end.
      const index = Math.floor(Math.min(0.9999, progress) * processPhases.length);
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const current = processPhases[active];
  const ctaVisible = active === processPhases.length - 1;

  return (
    <section id="approach" aria-labelledby="process-title" className="section section-alt overflow-visible p-0">
      <div ref={scrollRef} className={styles.scroll} data-active={active}>
        <div ref={stickyRef} className={styles.sticky}>
          <Container className="relative z-[2]">
            <div className={styles.shell}>
              <div className={styles.head}>
                <div className="eyebrow max-sm:justify-start sm:justify-center">How we work</div>
                <h2 id="process-title">Start small. Prove the value. Then scale.</h2>
                <p>
                  A clear path from one real business problem to production — with each phase reducing
                  risk before the next investment.
                </p>
              </div>

              <div className={styles.track}>
                <div className={styles.line} aria-hidden="true">
                  <div className={styles.progress} />
                </div>
                <ol className={styles.phases}>
                  {processPhases.map((phase, index) => (
                    <li
                      key={phase.title}
                      aria-current={index === active ? "step" : undefined}
                      className={cn(
                        styles.phase,
                        index === active && styles.active,
                        index < active && styles.completed,
                      )}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.kicker}>Step {phase.number}</span>
                      <h3>{phase.title}</h3>
                      <p>{phase.description}</p>
                    </li>
                  ))}
                </ol>
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
                    <div className={styles.zoneLabel}>Your reality</div>
                    <div className={styles.sourceList}>
                      {sourceItems.map((item) => (
                        <div key={item} className={styles.chip}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cn(styles.zone, styles.coreZone)}>
                    <div className={styles.coreNode}>Problem map</div>
                    <div className={styles.coreArrow}>→</div>
                    <div className={styles.coreNode}>Solution architecture</div>
                  </div>

                  <div className={cn(styles.zone, styles.outputZone)}>
                    <div className={styles.zoneLabel}>What we deliver</div>
                    <div className={styles.outputCard}>
                      <b>Proof of Value</b>
                      <span>Focused scope, working software, real feedback.</span>
                    </div>
                    <div className={styles.outputCard}>
                      <b>Production system</b>
                      <span>Reliable implementation, monitoring and support.</span>
                    </div>
                  </div>

                  <div className={styles.badge}>
                    <b>Measure → improve</b>
                    <span>Keep what works. Iterate where value is proven.</span>
                  </div>
                </div>

                {/* Outside the aria-hidden map so it stays reachable; focusable only once revealed. */}
                <div className={styles.cta} aria-hidden={!ctaVisible || undefined}>
                  <Button href={CONTACT_HREF} tabIndex={ctaVisible ? 0 : -1}>
                    Discuss a project →
                  </Button>
                </div>
              </div>

              <div className={styles.footer}>
                <div className={styles.status}>
                  <span className={styles.current}>
                    Phase <strong>{current.number}</strong> / {String(processPhases.length).padStart(2, "0")}
                  </span>
                  &nbsp;·&nbsp;
                  <strong>{current.title}</strong>
                </div>
                <div className={styles.hint}>
                  <i />
                  <span>Scroll down to move forward · up to move back</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
