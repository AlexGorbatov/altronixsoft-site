"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/data/navigation";
import { CONTACT_HREF } from "@/data/site";
import { localizedPath, splitLocale, type Locale } from "@/i18n/config";
import { CtaLabel } from "@/components/ui/CtaLabel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

const DRAWER_ID = "mobile-navigation";

interface HeaderProps {
  lang: Locale;
  navigation: NavItem[];
  labels: {
    home: string;
    menuOpen: string;
    menuClose: string;
    navPrimary: string;
    navMobile: string;
    cta: string;
    language: string;
  };
}

export function Header({ lang, navigation, labels }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const onHome = splitLocale(usePathname()).path === "/";
  const contactHref = localizedPath(lang, CONTACT_HREF);
  const [heroInView, setHeroInView] = useState(true);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Header gets more opaque once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the hero (with its own primary CTA) is on screen, the header CTA steps back.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return; // Pages without a hero (case studies, privacy, ...) keep the header CTA at full strength.
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      rootMargin: "-76px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Drawer: lock page scroll, close on Escape, close when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  // Keep Tab focus inside the open drawer (menu button + drawer links).
  function trapFocus(event: KeyboardEvent<HTMLElement>) {
    if (!open || event.key !== "Tab") return;
    const focusable = [
      menuButtonRef.current,
      ...(drawerRef.current?.querySelectorAll<HTMLElement>("a") ?? []),
    ].filter((el): el is HTMLElement => el !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header
      onKeyDown={trapFocus}
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b border-line backdrop-blur-[18px] transition-colors duration-300",
        scrolled || open ? "bg-[rgba(7,16,31,.92)]" : "bg-[rgba(7,16,31,.76)]",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-3 min-[360px]:gap-[26px]">
        <Link href={localizedPath(lang, "/")} className="rounded-md py-2">
          <Logo />
          <span className="sr-only"> — {labels.home}</span>
        </Link>

        <nav aria-label={labels.navPrimary} className="hidden gap-[30px] text-sm font-semibold text-strong lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.href} lang={lang} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 min-[360px]:gap-3">
          <LanguageSwitcher lang={lang} label={labels.language} />

          <Button href={contactHref} data-quiet={onHome && heroInView} className="hidden lg:inline-flex">
            <CtaLabel label={labels.cta} />
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={open ? labels.menuClose : labels.menuOpen}
            aria-expanded={open}
            aria-controls={DRAWER_ID}
            onClick={() => (open ? close() : setOpen(true))}
            className="grid size-11 place-items-center rounded-[10px] border border-line text-white lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </Container>

      {/* Mobile / tablet drawer */}
      <div
        id={DRAWER_ID}
        ref={drawerRef}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] z-[49] h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-[#081225] lg:hidden"
      >
        <nav aria-label={labels.navMobile} className="mx-auto flex w-[min(calc(100%-32px),var(--container-max))] flex-col py-3 sm:w-[min(calc(100%-48px),var(--container-max))]">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(lang, item.href)}
              onClick={() => close(false)}
              className="flex min-h-14 items-center border-b border-line text-lg font-semibold text-[#d5deea]"
            >
              {item.label}
            </Link>
          ))}
          <Button href={contactHref} onClick={() => close(false)} className="mt-6 min-h-[52px] w-full">
            <CtaLabel label={labels.cta} />
          </Button>
        </nav>
      </div>
    </header>
  );
}
