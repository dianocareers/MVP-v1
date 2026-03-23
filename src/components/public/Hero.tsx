"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] tracking-tight leading-[1.1]">
              Understand your career. <br />
              <span className="text-[#C89B3C]">Grow with clarity.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed"
          >
            Assess your readiness across Foundation, Leadership, and Technical domains. 
            Build your personalized growth plan with mentor-like precision.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/#beta" 
              className={cn(buttonVariants({ size: "lg" }), "bg-[#C89B3C] hover:bg-[#B68A34] text-white rounded-full px-12 py-7 text-lg shadow-lg hover:shadow-xl transition-all")}
            >
              Join the Beta
            </Link>
            <Link 
              href="/login" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded-full px-12 py-7 text-lg transition-all")}
            >
              Log In
            </Link>
          </div>

          {/* Product Preview Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="aspect-[16/9] w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl border border-[#1A1A1A]/5 shadow-2xl overflow-hidden flex items-center justify-center p-8 group">
              <div className="w-full h-full bg-[#1A1A1A]/5 rounded-xl border border-dashed border-[#1A1A1A]/10 flex flex-col items-center justify-center space-y-4 group-hover:bg-[#1A1A1A]/10 transition-colors">
                <div className="w-16 h-1 w-24 bg-[#C89B3C]/20 rounded-full mb-2"></div>
                <p className="text-[#1A1A1A]/40 font-medium text-sm">Product Preview - Intelligence Dashboard</p>
                <div className="grid grid-cols-3 gap-4 w-1/2">
                   {[1,2,3].map(i => <div key={i} className="h-2 bg-[#1A1A1A]/10 rounded-full"></div>)}
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#C89B3C]/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#1A1A1A]/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
