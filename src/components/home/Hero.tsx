import { CONTACT_HREF, CTA_LABEL } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroGlows } from "./HeroGlows";
import { SystemCard } from "./SystemCard";
import styles from "./Hero.module.css";

// Facts that are already true elsewhere on the site; the services themselves are listed right below.
const facts = ["Founder-led studio", "EU company · Estonia", "Direct access to the engineers"];

export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <HeroGlows />
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <div className="eyebrow">Software engineering & applied AI</div>
          <h1 id="hero-title" className={styles.title}>
            Practical AI.
            <br />
            <span>Serious software engineering.</span>
          </h1>
          <p className={styles.lead}>
            We help companies automate real workflows, build reliable software and modernize existing
            systems — with senior engineers accountable from architecture to production.
          </p>
          <div className={styles.actions}>
            <Button href={CONTACT_HREF}>{CTA_LABEL}</Button>
            <Button href="#work" variant="secondary">
              View our work
            </Button>
          </div>
          <ul className={styles.meta} aria-label="About the studio">
            {facts.map((fact) => (
              <li key={fact}>
                <i aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <SystemCard />
      </Container>
    </section>
  );
}
