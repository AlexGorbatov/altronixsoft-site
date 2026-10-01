import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Frame for sub-pages (case studies, services, privacy): same container and rhythm as the home sections. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main id="top" className="relative pt-12 pb-24 sm:pt-16 sm:pb-28">
      <Container>{children}</Container>
    </main>
  );
}
