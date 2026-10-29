import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/data/site";
import { hasLocale, locales } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import "../globals.css";

// Body text: Source Sans 3 (humanist sans). Headings: Source Serif 4. Designed as a pair.
// Latin is preloaded. The Cyrillic faces (Ukrainian) are declared as a fallback in the font stack and are
// downloaded only when a page really uses Cyrillic text, so English and German visitors never pay for them.
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"], display: "swap" });
const sourceSansCyrillic = Source_Sans_3({
  variable: "--font-source-sans-cyrillic",
  subsets: ["cyrillic"],
  display: "swap",
  preload: false,
});

const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], display: "swap" });
const sourceSerifCyrillic = Source_Serif_4({
  variable: "--font-source-serif-cyrillic",
  subsets: ["cyrillic"],
  display: "swap",
  preload: false,
});

// Technical labels only (numbers, status, eyebrows).
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], weight: "500", display: "swap" });
const jetbrainsMonoCyrillic = JetBrains_Mono({
  variable: "--font-jetbrains-mono-cyrillic",
  subsets: ["cyrillic"],
  weight: "500",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = contentFor(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: site.title, template: `%s | ${siteConfig.name}` },
    description: site.description,
    applicationName: siteConfig.name,
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#07101f",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { lang, navigation, copy } = await getContent();
  if (!hasLocale(lang)) notFound();

  const fontVariables = [
    sourceSans.variable,
    sourceSansCyrillic.variable,
    sourceSerif.variable,
    sourceSerifCyrillic.variable,
    jetbrainsMono.variable,
    jetbrainsMonoCyrillic.variable,
  ].join(" ");

  return (
    <html lang={lang} className={fontVariables}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) inject attributes onto <body>
          before hydration; suppress only that element's attribute mismatch, not its children. */}
      <body suppressHydrationWarning>
        <div className="scroll-progress" aria-hidden="true" />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#07101f]"
        >
          {copy.ui.skipToContent}
        </a>
        <Header
          lang={lang}
          navigation={navigation}
          labels={{
            home: copy.ui.homeSr,
            menuOpen: copy.ui.menuOpen,
            menuClose: copy.ui.menuClose,
            navPrimary: copy.ui.navPrimary,
            navMobile: copy.ui.navMobile,
            cta: copy.ui.cta,
            language: copy.ui.language,
            servicesMenu: copy.ui.servicesMenu,
            allServices: copy.pages.allServices,
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
