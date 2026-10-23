import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Frame for sub-pages (case studies, services, privacy): same container and rhythm as the home sections.
 * `backdrop` adds the faint grid behind the top of the page (the portfolio).
 */
export function PageShell({ children, backdrop }: { children: ReactNode; backdrop?: boolean }) {
  return (
    <main id="top" className="relative pt-12 pb-24 sm:pt-16 sm:pb-28">
      {backdrop && <div aria-hidden="true" className="grid-backdrop" />}
      <Container className="relative">{children}</Container>
    </main>
  );
}
