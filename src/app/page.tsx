import { Company } from "@/components/home/Company";
import { EngagementModels } from "@/components/home/EngagementModels";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { ProcessJourney } from "@/components/home/ProcessJourney";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { TrustStrip } from "@/components/home/TrustStrip";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <TrustStrip />
      <Services />
      <Industries />
      <SelectedWork />
      <ProcessJourney />
      <EngagementModels />
      <Company />
      <FinalCTA />
      <JsonLd />
    </main>
  );
}
