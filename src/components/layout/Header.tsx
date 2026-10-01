"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { CONTACT_HREF, CTA_LABEL } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const DRAWER_ID = "mobile-navigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const onHome = usePathname() === "/";
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
      <Container className="flex h-full items-center justify-between gap-[26px]">
        <Link href="/" className="rounded-md py-2">
          <Logo />
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-[30px] text-sm font-semibold text-strong lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href={CONTACT_HREF} data-quiet={onHome && heroInView} className="hidden lg:inline-flex">
          {CTA_LABEL}
        </Button>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={DRAWER_ID}
          onClick={() => (open ? close() : setOpen(true))}
          className="grid size-11 place-items-center rounded-[10px] border border-line text-white lg:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      {/* Mobile / tablet drawer */}
      <div
        id={DRAWER_ID}
        ref={drawerRef}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] z-[49] h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-[#081225] lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto flex w-[min(calc(100%-32px),var(--container-max))] flex-col py-3 sm:w-[min(calc(100%-48px),var(--container-max))]">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => close(false)}
              className="flex min-h-14 items-center border-b border-line text-lg font-semibold text-[#d5deea]"
            >
              {item.label}
            </Link>
          ))}
          <Button href={CONTACT_HREF} onClick={() => close(false)} className="mt-6 min-h-[52px] w-full">
            {CTA_LABEL}
          </Button>
        </nav>
      </div>
    </header>
  );
}
