import { hero } from "@/data/hero";
import { CONTACT_HREF, CTA_LABEL } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroGlows } from "./HeroGlows";
import { WorkflowFlow } from "./WorkflowFlow";
import styles from "./Hero.module.css";

export function Hero() {
  const [firstLine, secondLine] = hero.title;

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroGlows />
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 id="hero-title" className={styles.title}>
            <span>{firstLine}</span>
            <br />
            {secondLine}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <Button href={CONTACT_HREF}>{CTA_LABEL}</Button>
            <Button href="#work" variant="secondary">
              See our work
            </Button>
          </div>
          <ul className={styles.meta} aria-label="About Altronix Software">
            {hero.facts.map((fact) => (
              <li key={fact}>
                <i aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <WorkflowFlow animated />
    </section>
  );
}
