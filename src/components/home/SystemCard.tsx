import type { CSSProperties } from "react";
import styles from "./SystemCard.module.css";

const sources = [
  { name: "Commerce", detail: "storefront and backend" },
  { name: "ERP / CRM", detail: "systems" },
  { name: "Product data", detail: "PIM" },
  { name: "Partners", detail: "APIs and integrations" },
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

/** Hero architecture visual: business systems → platform & integration layer (AI is one capability of it) → controlled actions. */
export function SystemCard() {
  return (
    <div className={styles.intro}>
      <div className={styles.card} role="group" aria-label="Enterprise integration workflow example">
        <div className={styles.head}>
          <span>Business systems</span>
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
          <div className={styles.mark} aria-hidden="true">⇄</div>
          <div>
            <b>Platform and integration layer</b>
            <small>APIs · events · permissions · observability · AI assist</small>
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
      </div>
    </div>
  );
}
