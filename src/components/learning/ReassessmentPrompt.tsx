'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface ReassessmentPromptProps {
  onStart: () => void;
}

export function ReassessmentPrompt({ onStart }: ReassessmentPromptProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none shadow-2xl shadow-blue-200/50 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700" />
      <CardContent className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Growth Milestone Detected</span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Time to Benchmark Your Growth?</h2>
            <p className="text-blue-100 max-w-xl text-lg leading-relaxed">
              You've completed 15+ exercises this month. A quick reassessment will recalibrate your Career Radar and measure your real-world progress.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
             <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-white text-xs font-bold backdrop-blur-sm">
                +0.4 Foundation Prediction
             </div>
             <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-white text-xs font-bold backdrop-blur-sm">
                Recalibrate Pathways
             </div>
          </div>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="bg-white text-blue-600 hover:bg-blue-50 h-16 px-10 rounded-2xl font-black shadow-xl shadow-blue-900/20 group/btn"
        >
          Start Reassessment
          <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
