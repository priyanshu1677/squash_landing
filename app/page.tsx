import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

// Landing page composition.
// Section order is deliberate:
//   Hero → Problem → Solution → Use cases
//   → How it works → Features (capabilities) → Integrations
//   → FAQ → Final CTA → Footer
//
// Problem BEFORE solution; Use cases demo the value first, then
// How it works explains the mechanism for visitors who are sold
// on the outcome and now want to know how it's delivered.
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <UseCases />
        <HowItWorks />
        <Features />
        <Integrations />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
