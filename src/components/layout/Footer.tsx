import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
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
          </nav>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[.06] pt-4 text-[13px] text-muted">
          <span>Contact:</span>
          <CopyEmail email={siteConfig.email} />
        </div>
        <div className="mt-2 flex flex-col justify-between gap-2 pt-3 text-xs text-subtle sm:flex-row sm:gap-5">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.legalName}
          </span>
          <span>{siteConfig.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
