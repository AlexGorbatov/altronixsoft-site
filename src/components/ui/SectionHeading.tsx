import type { ReactNode } from "react";
import { AnimatedReveal } from "./AnimatedReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional supporting paragraph, set directly under the title. */
  description?: string;
  id?: string;
}

/**
 * The one section header: eyebrow, H2 (32px phone / 44px desktop everywhere) and an optional paragraph
 * directly beneath it, so title and explanation always read as a pair.
 */
export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <AnimatedReveal className="relative z-[1] mb-10 sm:mb-12">
      <div className="eyebrow">{eyebrow}</div>
      <h2
        id={id}
        className="mt-[14px] max-w-[760px] text-[32px] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[44px]"
      >
        {title}
      </h2>
      {description && <p className="mt-4 max-w-[58ch] text-base leading-[1.7] text-muted">{description}</p>}
    </AnimatedReveal>
  );
}
