import type { CSSProperties } from "react";
import { workflow } from "@/data/workflow";
import styles from "./WorkflowStrip.module.css";

const slot = (i: number) => ({ "--i": i }) as CSSProperties;

/** Mini illustration for each step. Purely decorative: the step titles carry the meaning. */
function Visual({ id }: { id: (typeof workflow.steps)[number]["id"] }) {
  switch (id) {
    case "ask":
      return (
        <div className={styles.chat}>
          <p className={styles.bubble}>{workflow.customerMessage}</p>
          <span className={styles.typing}>
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "understand":
      return (
        <div className={styles.lines}>
          <b />
          <b />
          <b className={styles.scan} />
        </div>
      );
    case "check":
      return (
        <div className={styles.systems}>
          {workflow.systems.map((name, n) => (
            <span key={name} style={{ "--n": n } as CSSProperties}>
              {name}
            </span>
          ))}
        </div>
      );
    case "draft":
      return (
        <div className={styles.draft}>
          <b />
          <b />
          <b />
        </div>
      );
    case "approve":
      return <span className={styles.approve}>{workflow.approve}</span>;
    case "send":
      return <p className={`${styles.bubble} ${styles.reply}`}>{workflow.reply}</p>;
  }
}

/**
 * Hero visual: a six-step workflow where each step lights up in turn (pure CSS, 12 s loop).
 * Everything is visible without JS and with reduced motion (the animation simply does not run).
 */
export function WorkflowStrip() {
  return (
    <div className={styles.frame} role="group" aria-label={workflow.ariaLabel}>
      <div className={styles.bar}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.barLabel}>
          {workflow.label} · {workflow.status}
        </span>
      </div>
      <ol className={styles.steps}>
        {workflow.steps.map((step, i) => (
          <li key={step.id} className={styles.step} style={slot(i)}>
            <div className={styles.visual} aria-hidden="true">
              <Visual id={step.id} />
            </div>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{step.title}</span>
            {i < workflow.steps.length - 1 && (
              <span className={styles.link} aria-hidden="true">
                <i />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
