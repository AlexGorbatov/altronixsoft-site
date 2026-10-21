import Link from "next/link";
import { siteConfig } from "@/data/site";
import { localizedPath } from "@/i18n/config";
import { getContent } from "@/i18n/server";
import { filled } from "@/lib/todo";
import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Logo } from "./Logo";

const linkClass = "inline-flex min-h-11 items-center transition-colors hover:text-white";

export async function Footer() {
  const { lang, navigation, services, sapCommerce, copy } = await getContent();
  const { ui } = copy;

  /** Legal line: the company name always, every other detail only once it is filled in. */
  const { registryCode, vatNumber, address } = siteConfig.legal;
  const country = ui.country;
  const legalParts: string[] = [siteConfig.legalName];
  if (filled(registryCode)) legalParts.push(`${ui.registryCode} ${registryCode}`);
  if (filled(vatNumber)) legalParts.push(`${ui.vat} ${vatNumber}`);
  legalParts.push(filled(address) ? `${address}, ${country}` : country);

  return (
    <footer className="border-t border-line bg-[#060c17] pt-11 pb-[26px]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-[30px]">
          <Link href={localizedPath(lang, "/")} className="rounded-md py-2">
            <Logo />
            <span className="sr-only"> — {ui.backToTopSr}</span>
          </Link>
          <nav aria-label={ui.navFooter} className="flex flex-wrap gap-x-5 gap-y-1 text-small text-muted">
            {navigation.map((item) => (
              <Link key={item.href} href={localizedPath(lang, item.href)} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav aria-label={ui.navServices} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/[.06] pt-4 text-[13px] text-subtle">
          <span className="text-subtle">{ui.footerServices}</span>
          {services.map((service) => (
            <Link key={service.id} href={localizedPath(lang, `/services/${service.id}`)} className={linkClass}>
              {service.title}
            </Link>
          ))}
          <Link href={localizedPath(lang, sapCommerce.path.replace(/^\/?/, "/"))} className={linkClass}>
            SAP Commerce Cloud
          </Link>
        </nav>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[.06] pt-4 text-small text-muted">
          <span>{ui.footerContact}</span>
          <CopyEmail
            email={siteConfig.email}
            labels={{ copy: ui.copyEmail, copied: ui.emailCopied, status: ui.copied }}
          />
        </div>
        <div className="mt-2 flex flex-col justify-between gap-2 pt-3 text-xs text-subtle lg:flex-row lg:gap-5">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} · {legalParts.join(" · ")}
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href={localizedPath(lang, "/privacy")} className={linkClass}>
              {ui.privacy}
            </Link>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={ui.linkedinAria}
            >
              LinkedIn
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
