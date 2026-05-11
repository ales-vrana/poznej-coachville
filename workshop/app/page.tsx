import { Hero } from "@/components/Hero";
import { CoachQuote } from "@/components/CoachQuote";
import { Pochybnosti } from "@/components/Pochybnosti";
import { Presvedceni } from "@/components/Presvedceni";
import { CoZazijete } from "@/components/CoZazijete";
import { OLektorovi } from "@/components/OLektorovi";
import { Zkusenosti } from "@/components/Zkusenosti";
import { PoWorkshopu } from "@/components/PoWorkshopu";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/ClosingCTA";
import { StickyCTA } from "@/components/StickyCTA";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <main>
      {/* Hero — bez Reveal, je nad foldem */}
      <Hero />

      {/* Ostatní sekce dostávají scroll-triggered fade-in */}
      <Reveal>
        <CoachQuote />
      </Reveal>
      <Reveal>
        <Pochybnosti />
      </Reveal>
      <Reveal>
        <Presvedceni />
      </Reveal>
      <Reveal>
        <CoZazijete />
      </Reveal>
      <Reveal>
        <OLektorovi />
      </Reveal>
      <Reveal>
        <Zkusenosti />
      </Reveal>
      <Reveal>
        <PoWorkshopu />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <ClosingCTA />
      </Reveal>
      <Footer />
      <StickyCTA />
    </main>
  );
}
