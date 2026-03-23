import { AboutSection } from "@/components/public/AboutSection";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="bg-[#1A1A1A] py-24 text-[#F5F2E9] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Diano Careers</h1>
        <p className="text-xl text-[#F5F2E9]/70 max-w-2xl mx-auto px-6">
          Building the foundation for career intelligence and lifelong growth.
        </p>
      </div>
      
      <AboutSection />
      
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">Our Vision</h2>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed">
            We envision a world where every professional has access to the same level of career mentorship and strategic planning as top-tier executives. By combining behavioral science with practical readiness assessments, we help you prepare for the roles that haven't even been invented yet.
          </p>
          <Link 
            href="/#beta" 
            className={cn(buttonVariants(), "bg-[#C89B3C] hover:bg-[#B68A34] text-white rounded-full px-12 h-14 text-lg inline-flex items-center justify-center")}
          >
            Join the Mission
          </Link>
        </div>
      </section>
    </div>
  );
}
