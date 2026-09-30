import type { ReactNode } from "react";
import { AnimatedReveal } from "./AnimatedReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional supporting paragraph, aligned to the right on desktop. */
  description?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <AnimatedReveal className="relative z-[1] mb-11 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2
          id={id}
          className="mt-[14px] max-w-[720px] text-[36px] leading-[1.06] font-bold tracking-[-0.045em] sm:text-[46px]"
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-[430px] text-base leading-[1.7] text-muted">{description}</p>
      )}
    </AnimatedReveal>
  );
}
