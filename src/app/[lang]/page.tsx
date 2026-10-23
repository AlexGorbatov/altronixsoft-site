import type { Metadata } from "next";
import { Company } from "@/components/home/Company";
import { EngagementModels } from "@/components/home/EngagementModels";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { ProcessJourney } from "@/components/home/ProcessJourney";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { Services } from "@/components/home/Services";
import { TrustBlocks } from "@/components/home/TrustBlocks";
import { TrustStrip } from "@/components/home/TrustStrip";
import { JsonLd } from "@/components/JsonLd";
import { hasLocale } from "@/i18n/config";
import { contentFor } from "@/i18n/content";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = contentFor(lang);
  return pageMetadata({ lang, title: site.title, description: site.description, path: "/", absoluteTitle: true });
}

export default async function HomePage() {
  const { copy, processPhases } = await getContent();
  return (
    <main id="top">
      <Hero />
      <TrustStrip />
      <Services />
      <Industries />
      <SelectedProjects />
      <ProcessJourney copy={copy.process} phases={processPhases} />
      <EngagementModels />
      <Company />
      <TrustBlocks />
      <FinalCTA />
      <JsonLd />
    </main>
  );
}
