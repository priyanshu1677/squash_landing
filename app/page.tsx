import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Integrations } from "@/components/Integrations";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

// Landing page composition.
// Section order is deliberate:
//   Hero → Logo cloud → Problem → Solution → Features
//   → How it works → Use cases → Integrations → Testimonials
//   → FAQ → Final CTA → Footer
//
// This pattern (problem BEFORE solution, features AFTER solution) is a
// tested conversion structure: it ensures visitors feel understood
// before we sell to them.
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
