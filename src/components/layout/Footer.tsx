import { navigation } from "@/data/navigation";
import { CONTACT_HREF, siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#060c17] pt-11 pb-[26px]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-[30px]">
          <a href="#top" aria-label="Altronix Software — back to top" className="rounded-md py-2">
            <Logo />
          </a>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-[#8996aa]">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
            <a href={CONTACT_HREF} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-[26px] flex flex-col justify-between gap-2 border-t border-white/[.06] pt-5 text-xs text-[#6c798d] sm:flex-row sm:gap-5">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.legalName}
          </span>
          <span>{siteConfig.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
