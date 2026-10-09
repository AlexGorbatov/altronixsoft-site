import Link from "next/link";
import { navigation } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { filled } from "@/lib/todo";
import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Logo } from "./Logo";

/** Legal line: the company name always, every other detail only once it is filled in. */
function legalLine(): string {
  const { registryCode, vatNumber, address, country } = siteConfig.legal;
  const parts: string[] = [siteConfig.legalName];
  if (filled(registryCode)) parts.push(`Registry code ${registryCode}`);
  if (filled(vatNumber)) parts.push(`VAT ${vatNumber}`);
  parts.push(filled(address) ? `${address}, ${country}` : country);
  return parts.join(" · ");
}

const linkClass = "inline-flex min-h-11 items-center transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#060c17] pt-11 pb-[26px]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-[30px]">
          <Link href="/" className="rounded-md py-2" aria-label={`${siteConfig.name} — back to top`}>
            <Logo />
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1 text-small text-muted">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav aria-label="Services" className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/[.06] pt-4 text-[13px] text-subtle">
          <span className="text-subtle">Services:</span>
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className={linkClass}>
              {service.title}
            </Link>
          ))}
          <Link href="/services/sap-commerce" className={linkClass}>
            SAP Commerce Cloud
          </Link>
        </nav>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[.06] pt-4 text-small text-muted">
          <span>Contact:</span>
          <CopyEmail email={siteConfig.email} />
        </div>
        <div className="mt-2 flex flex-col justify-between gap-2 pt-3 text-xs text-subtle lg:flex-row lg:gap-5">
          <span>
            © {new Date().getFullYear()} {legalLine()}
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`${siteConfig.name} on LinkedIn (opens in a new tab)`}
            >
              LinkedIn
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
