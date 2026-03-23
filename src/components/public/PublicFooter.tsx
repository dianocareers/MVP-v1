import { ReactNode } from "react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-[#F5F2E9]/60 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="font-bold text-xl text-[#F5F2E9] tracking-tight flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[#C89B3C] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-black">D</span>
            </div>
            Diano Careers
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Understand your career. Assess your readiness. Grow with clarity. 
            The mentor-led career intelligence platform for the next generation of talent.
          </p>
        </div>
        
        <div>
          <h4 className="text-[#F5F2E9] font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/jobs" className="hover:text-[#C89B3C] transition-colors">Career Pathways</Link></li>
            <li><Link href="/assessment" className="hover:text-[#C89B3C] transition-colors">Readiness Radar</Link></li>
            <li><Link href="/growth-plan" className="hover:text-[#C89B3C] transition-colors">Growth Engine</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F5F2E9] font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#C89B3C] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#C89B3C] transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-[#C89B3C] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-[#F5F2E9]/10 mt-12 pt-8 flex justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} Diano Careers. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
        </div>
      </div>
    </footer>
  );
}
