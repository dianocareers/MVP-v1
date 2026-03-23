'use client';

import { Button } from '@/components/ui/button';
import { Compass, Target } from 'lucide-react';

interface AssessmentEntryProps {
  onSelectPath: (path: 'interest' | 'skills') => void;
}

export default function AssessmentEntry({ onSelectPath }: AssessmentEntryProps) {
  return (
    <div className="max-w-3xl mx-auto pt-16 pb-12 px-6">
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Welcome to Diano Careers
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          To build your personalized growth plan, we first need to understand where you are and where you want to go.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Do you already know your career direction?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Path 1: Not Sure -> Interest Assessment */}
          <button 
            onClick={() => onSelectPath('interest')}
            className="group relative flex flex-col items-center p-8 border-2 border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-all text-left"
          >
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Compass className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">I'm not sure</h3>
            <p className="text-slate-600 text-center text-sm leading-relaxed">
              Take our quick Motivator Assessment to discover career clusters that align with what truly drives you.
            </p>
          </button>

          {/* Path 2: Yes -> Skill Radar */}
          <button 
            onClick={() => onSelectPath('skills')}
            className="group relative flex flex-col items-center p-8 border-2 border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-all text-left"
          >
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Yes, I know my path</h3>
            <p className="text-slate-600 text-center text-sm leading-relaxed">
              Skip directly to the full diagnostic to map your technical and foundational skills.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
