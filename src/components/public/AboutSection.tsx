import { Shield, Sparkles, Zap } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      title: "Career Direction",
      description: "Identity and focus are the bedrock of success. We help you find your 'North Star' with objective data.",
      icon: Sparkles
    },
    {
      title: "Readiness Assessment",
      description: "Our triple-radar system (Foundation, Leadership, Technical) gives you a mirror for your professional self.",
      icon: Zap
    },
    {
      title: "Growth in Action",
      description: "Theory is useless without execution. We provide micro-exercises and feedback loops to bridge the gap.",
      icon: Shield
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#F5F2E9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#C89B3C] uppercase tracking-widest mb-6 px-12 py-3 rounded-full border border-[#C89B3C]/20 inline-block">Our Mission</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            We believe career clarity should be available to everyone.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-4">
                <pillar.icon className="w-6 h-6 text-[#C89B3C]" />
                <h4 className="text-xl font-bold text-[#1A1A1A]">{pillar.title}</h4>
              </div>
              <p className="text-[#1A1A1A]/60 leading-relaxed text-sm md:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 p-12 bg-[#1A1A1A] rounded-2xl text-[#F5F2E9] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg text-center md:text-left">
            <h4 className="text-2xl font-bold mb-4 italic">"Growth is not accidental. It's an engineered outcome of focus and reflection."</h4>
            <p className="text-[#F5F2E9]/60 text-sm">— The Diano Philosophy</p>
          </div>
          <div className="flex gap-4">
             <div className="w-12 h-1 bg-[#C89B3C] rounded-full"></div>
             <div className="w-4 h-1 bg-[#C89B3C]/20 rounded-full"></div>
             <div className="w-4 h-1 bg-[#C89B3C]/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
