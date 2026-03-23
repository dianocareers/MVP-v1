import { CareersSection } from "@/components/public/CareersSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="flex flex-col">
      <div className="bg-[#1A1A1A] py-24 text-[#F5F2E9] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Career Explorer</h1>
        <p className="text-xl text-[#F5F2E9]/70 max-w-2xl mx-auto px-6">
          Discover where your skills meet the market.
        </p>
      </div>

      <CareersSection />

      <section className="py-24 px-6 md:px-12 bg-[#F5F2E9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Beta Pilot Opportunities</h2>
            <p className="text-[#1A1A1A]/60 mt-4">We are currently partnering with these organizations for our first pilot cohorts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { title: "Strategic Operations Pilot", org: "Global Logistics Group" },
               { title: "Product Leadership Cohort", org: "InnovateTech Labs" },
               { title: "Foundation Readiness Program", org: "University Partnerships" },
               { title: "Technical Excellence Track", org: "Engineering Alliance" }
             ].map((job, i) => (
                <div key={i} className="p-8 bg-white rounded-xl shadow-sm border border-[#1A1A1A]/5 flex justify-between items-center group">
                  <div>
                    <h4 className="font-bold text-lg text-[#1A1A1A]">{job.title}</h4>
                    <p className="text-[#1A1A1A]/60 text-sm">{job.org}</p>
                  </div>
                  <Button variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-[#C89B3C] text-[#C89B3C]">
                    Sign Up
                  </Button>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
