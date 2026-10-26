import { CONTACT_HREF } from "@/data/site";
import Link from "next/link";
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
          <div className={styles.leadGroup}>
            <p className={styles.lead}>{hero.lead}</p>
            <p className={styles.lead}>{hero.leadMore}</p>
          </div>
          <Link href={localizedPath(lang, "/services/ai")} className="mb-6 inline-flex min-h-11 max-w-[52ch] items-center gap-2 text-small leading-relaxed text-label underline decoration-white/20 underline-offset-4 hover:text-white">
            {hero.aiLink} <span aria-hidden="true">→</span>
          </Link>
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
      <WorkflowFlow />
    </section>
  );
}
