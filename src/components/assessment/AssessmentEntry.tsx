'use client';

import { Compass, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentEntryProps {
  onSelectPath: (path: 'interest' | 'skills') => void;
}

export default function AssessmentEntry({ onSelectPath }: AssessmentEntryProps) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-8">
      <div className="text-center space-y-6 mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-tight">
          Establish Your <span className="text-[#C89B3C]">Baseline</span>
        </h1>
        <p className="text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto font-medium leading-relaxed">
          To build your personalized growth roadmap, we first need to map your current coordinates and intrinsic drivers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Path 1: Not Sure -> Interest Assessment */}
        <button 
          onClick={() => onSelectPath('interest')}
          className="group relative bg-white border border-[#1A1A1A]/5 p-10 rounded-[2.5rem] text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#1A1A1A]/5 hover:-translate-y-2 hover:border-[#C89B3C]/30"
        >
          <div className="h-16 w-16 bg-[#F5F2E9] text-[#C89B3C] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#C89B3C] group-hover:text-white transition-all duration-500 shadow-inner">
            <Compass className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-[#1A1A1A] mb-4 tracking-tight">I'm exploring direction</h3>
          <p className="text-[#1A1A1A]/60 font-medium leading-relaxed mb-8">
            Start with the <span className="text-[#1A1A1A] font-bold">Motivator Assessment</span> to discover career clusters aligned with your intrinsic values.
          </p>
          <div className="flex items-center text-[#C89B3C] font-black uppercase tracking-widest text-xs gap-2 group-hover:gap-4 transition-all">
            Begin Discovery <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        {/* Path 2: Yes -> Skill Radar */}
        <button 
          onClick={() => onSelectPath('skills')}
          className="group relative bg-[#1A1A1A] text-white p-10 rounded-[2.5rem] text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#1A1A1A]/20 hover:-translate-y-2 border border-white/5"
        >
          <div className="h-16 w-16 bg-white/10 text-[#C89B3C] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#C89B3C] group-hover:text-white transition-all duration-500">
            <Target className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4 tracking-tight">I know my target</h3>
          <p className="text-white/60 font-medium leading-relaxed mb-8">
            Skip to the <span className="text-white font-bold">Tri-Radar Diagnostic</span> to map your technical, leadership, and foundational performance.
          </p>
          <div className="flex items-center text-[#C89B3C] font-black uppercase tracking-widest text-xs gap-2 group-hover:gap-4 transition-all">
            Start Diagnostic <ArrowRight className="h-4 w-4" />
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      
      <div className="mt-16 text-center animate-in fade-in duration-1000 delay-500">
        <p className="text-[#1A1A1A]/30 text-xs font-black uppercase tracking-[0.3em]">
          Diano Careers Intelligence Engine v2.0
        </p>
      </div>
    </div>
  );
}
