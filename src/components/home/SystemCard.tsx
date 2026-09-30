import type { CSSProperties } from "react";
import { TiltCard } from "./TiltCard";
import styles from "./SystemCard.module.css";

const sources = [
  { name: "ERP / CRM", detail: "systems" },
  { name: "Documents", detail: "knowledge" },
  { name: "Databases", detail: "business data" },
  { name: "APIs", detail: "integrations" },
];

/**
 * The control chain a request passes through. Each step lights up in turn and the
 * trace line below names what just happened — generic events only, no invented data.
 */
const controls = [
  { name: "Business rules", trace: "rule check passed" },
  { name: "Human approval", trace: "awaiting approval" },
  { name: "Actions", trace: "action executed" },
  { name: "Audit / monitoring", trace: "event written to audit log" },
];

const index = (i: number) => ({ "--i": i }) as CSSProperties;

/** Hero architecture visual: business systems → AI / automation layer → controlled actions. */
export function SystemCard() {
  return (
    <div className={styles.intro}>
      <TiltCard className={styles.card} label="Controlled AI workflow example">
        <div className={styles.head}>
          <span>Business systems</span>
          <span className={styles.live}>
            <i />
            controlled workflow
          </span>
        </div>

        <div className={styles.sources}>
          {sources.map((source, i) => (
            <div key={source.name} className={styles.source} style={index(i)}>
              <b>{source.name}</b>
              <span className={styles.detail}>{source.detail}</span>
            </div>
          ))}
        </div>

        <svg className={styles.connector} viewBox="0 0 400 62" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.fan} d="M50 0 C50 34 200 28 200 62" />
          <path className={styles.fan} d="M150 0 C150 30 200 30 200 62" />
          <path className={styles.fan} d="M250 0 C250 30 200 30 200 62" />
          <path className={styles.fan} d="M350 0 C350 34 200 28 200 62" />
          <path className={styles.center} d="M200 0 V62" />
        </svg>

        <div className={styles.core}>
          <div className={styles.mark}>AI</div>
          <div>
            <b>AI / automation layer</b>
            <small>Retrieval · rules · permissions · integrations · observability</small>
          </div>
        </div>

        <svg className={`${styles.connector} ${styles.stub}`} viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true">
          <path d="M200 0 V22" />
        </svg>

        <div className={styles.actions}>
          {controls.map((control, i) => (
            <div key={control.name} className={styles.action} style={index(i)}>
              <i />
              {control.name}
            </div>
          ))}
        </div>

        {/* Decorative: the same steps are already listed above. */}
        <div className={styles.log} aria-hidden="true">
          <span className={styles.prompt}>›</span>
          {controls.map((control, i) => (
            <span key={control.name} className={styles.logLine} style={index(i)}>
              {control.trace}
            </span>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}
