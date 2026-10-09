import Link from "next/link";
import { aiScene } from "@/data/flow";
import { hero } from "@/data/hero";
import { contactHref, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroGlows } from "./HeroGlows";
import { WorkflowFlow } from "./WorkflowFlow";
import styles from "./Hero.module.css";

export function Hero() {
  const [firstPart, secondPart] = hero.title;

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroGlows />
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 id="hero-title" className={styles.title}>
            <span>{firstPart}</span> {secondPart}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <Button href={contactHref(hero.primaryCta.type)}>{hero.primaryCta.label}</Button>
            <Button href="#work" variant="secondary">
              See our work
            </Button>
          </div>
          <ul className={styles.meta} aria-label={`About ${siteConfig.name}`}>
            {hero.facts.map((fact) => (
              <li key={fact.text}>
                <i aria-hidden="true" />
                {fact.type ? (
                  <Link href={contactHref(fact.type)} className={styles.factLink}>
                    {fact.text}
                  </Link>
                ) : (
                  fact.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <WorkflowFlow scene={aiScene} animated />
    </section>
  );
}
