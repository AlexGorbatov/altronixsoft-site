import { Company } from "@/components/home/Company";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
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
      <SelectedWork />
      <ProcessJourney />
      <Company />
      <FinalCTA />
      <JsonLd />
    </main>
  );
}
