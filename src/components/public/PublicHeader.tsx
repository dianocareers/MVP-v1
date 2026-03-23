"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  return (
    <header className="w-full bg-[#F5F2E9]/80 backdrop-blur-md border-b border-[#1A1A1A]/10 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="font-bold text-2xl text-[#1A1A1A] tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 bg-[#C89B3C] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-black">D</span>
        </div>
        Diano Careers
      </Link>
      
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/about" className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors font-medium text-sm">About</Link>
        <Link href="/jobs" className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors font-medium text-sm">Careers</Link>
      </nav>

      <div className="flex gap-4 items-center">
        <Link href="/login" className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors font-medium text-sm">Log In</Link>
        <Link 
          href="/#beta" 
          className={cn(buttonVariants(), "bg-[#C89B3C] hover:bg-[#B68A34] text-white rounded-full px-6 shadow-sm")}
        >
          Join Beta
        </Link>
      </div>
    </header>
  );
}
