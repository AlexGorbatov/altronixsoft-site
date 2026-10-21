import { CONTACT_HREF } from "@/data/site";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaLabel } from "@/components/ui/CtaLabel";
import { HeroGlows } from "./HeroGlows";
import { WorkflowFlow } from "./WorkflowFlow";
import styles from "./Hero.module.css";

export async function Hero() {
  const { lang, hero, copy } = await getContent();
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
            <Button href={localizedPath(lang, CONTACT_HREF)}>
              <CtaLabel label={copy.ui.cta} />
            </Button>
            <Button href="#work" variant="secondary">
              {copy.ui.seeOurWork}
            </Button>
          </div>
          <ul className={styles.meta} aria-label={copy.ui.heroAria}>
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
