import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  tone?: "alt" | "deep";
  labelledBy?: string;
  children: ReactNode;
}

/** Standard page section: vertical rhythm, container, and localized ambient light. */
export function Section({ id, tone, labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section", tone === "alt" && "section-alt", tone === "deep" && "section-deep")}
    >
      <Container>{children}</Container>
    </section>
  );
}
