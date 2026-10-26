import styles from "./Hero.module.css";

/** Restrained, still ambient colour; the workflow carries the meaningful motion. */
export function HeroGlows() {
  return (
    <div className={styles.glowLayer} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbA}`} />
      <div className={`${styles.orb} ${styles.orbB}`} />
    </div>
  );
}
