import { Hero } from "@/components/public/Hero";
import { CareersSection } from "@/components/public/CareersSection";
import { AboutSection } from "@/components/public/AboutSection";
import { BetaSignupForm } from "@/components/public/BetaSignupForm";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CareersSection />
      <AboutSection />
      <BetaSignupForm />
    </div>
  );
}
