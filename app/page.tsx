import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { ShowcaseDetect } from "@/components/ShowcaseDetect";
import { ShowcaseInvestigate } from "@/components/ShowcaseInvestigate";
import { ShowcaseAct } from "@/components/ShowcaseAct";
import { Scenarios } from "@/components/Scenarios";
import { AskSquash } from "@/components/AskSquash";
import { WhySquash } from "@/components/WhySquash";
import { Integrations } from "@/components/Integrations";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

// Landing page composition.
//
// Narrative order:
//   Hero (autonomous AI teammate, 24/7)
//   → Problem (insight scattered, nobody stitches)
//   → Solution flywheel (monitors → investigates → suggests)
//   → 3 product showcases: Detect · Investigate · Act
//   → Scenarios (what Squash actually catches)
//   → Ask Squash (the secondary, on-demand copilot)
//   → Why Squash works (the structural moat)
//   → Integrations · FAQ · Final CTA · Footer
//
// The 3 showcases are the spine of the page — they prove the
// autonomous claim with the artifact a visitor would actually receive.
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ShowcaseDetect />
        <ShowcaseInvestigate />
        <ShowcaseAct />
        <Scenarios />
        <AskSquash />
        <WhySquash />
        <Integrations />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
