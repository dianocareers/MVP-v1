import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass, Target, GraduationCap } from "lucide-react";

export function CareersSection() {
  const cards = [
    {
      title: "Explore Career Paths",
      description: "Discover roles that align with your natural strengths and long-term ambitions.",
      icon: Compass,
    },
    {
      title: "Discover Opportunities",
      description: "Connect with roles where your current skill set is in high demand.",
      icon: Target,
    },
    {
      title: "Align Skills to Roles",
      description: "Map your technical and leadership readiness directly to market expectations.",
      icon: GraduationCap,
    }
  ];

  return (
    <section id="careers" className="py-24 bg-white/40 border-y border-[#1A1A1A] [data-border=5]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center sm:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <h2 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-4">Precision Direction</h2>
            <h3 className="text-4xl font-bold text-[#1A1A1A] mb-4">Navigate your future with total clarity</h3>
            <p className="text-[#1A1A1A]/60">
              Stop guessing where your career should go. Use our data-driven engine to find the path that fits you.
            </p>
          </div>
          <Link 
            href="/jobs" 
            className={cn(buttonVariants({ variant: "ghost" }), "text-[#C89B3C] hover:text-[#B68A34] hover:bg-[#C89B3C]/10 sm:text-left center mx-auto md:mx-0 flex items-center gap-2")}
          >
            Explore Careers &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <Card key={idx} className="bg-white border-[#1A1A1A]/5 shadow-sm hover:shadow-md transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-[#C89B3C]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#C89B3C] group-hover:text-white transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-[#C89B3C] group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-[#1A1A1A]">{card.title}</CardTitle>
                <CardDescription className="text-[#1A1A1A]/60 leading-relaxed pt-2">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-1 w-0 bg-[#C89B3C] group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
