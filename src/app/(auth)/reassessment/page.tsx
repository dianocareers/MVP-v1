'use client';

import React, { useState, useEffect } from 'react';
import { RadarComparison } from '@/components/radar/RadarComparison';
import { DeltaSummaryCard } from '@/components/dashboard/DeltaSummaryCard';
import { reassessmentService } from '@/services/assessment/reassessmentService';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, TrendingUp, History, Rocket } from 'lucide-react';

export default function ReassessmentPage() {
  // Mock data for current comparison view
  const oldResult = {
    userId: '1',
    sessionId: 's1',
    scores: { 'Communication': 3.2, 'Problem Solving': 3.5, 'Execution': 3.8, 'Collaboration': 2.5, 'Adaptability': 3.2 },
    reflections: [],
    completedAt: '2024-02-15'
  };

  const newResult = {
    userId: '1',
    sessionId: 's2',
    scores: { 'Communication': 4.2, 'Problem Solving': 4.5, 'Execution': 4.8, 'Collaboration': 3.5, 'Adaptability': 4.2 },
    reflections: [],
    completedAt: '2024-03-17'
  };

  const deltas = reassessmentService.calculateDeltas(oldResult as any, newResult as any);
  const dimensionDeltas = reassessmentService.getDimensionDeltas(deltas);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-4">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-2">
           <Sparkles className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-widest">Growth Verified</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Your Career Evolution</h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
          We compared your session from <span className="text-slate-900 underline font-bold">Feb 15</span> to your latest performance on <span className="text-blue-600 underline font-bold">Mar 17</span>.
        </p>
      </div>

      {/* DELTA SUMMARY */}
      <DeltaSummaryCard deltas={dimensionDeltas} />

      {/* RADAR OVERLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
           <RadarComparison 
             previousScores={oldResult.scores} 
             currentScores={newResult.scores} 
             title="Foundation Dimension" 
           />
        </div>
        
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
              <History className="w-12 h-12 text-blue-500/20 absolute -right-2 -bottom-2" />
              <h4 className="text-xl font-bold mb-4">The Verdict</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your focus on <span className="text-white font-bold">Active Listening</span> exercises has paid off. Your Communication score increased by <span className="text-emerald-400 font-bold">+1.0</span> points, moving you closer to L5.
              </p>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-300">Staff readiness up 8%</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-slate-300">Gap in Presence narrowing</span>
                 </div>
              </div>
           </div>

           <Button className="w-full h-16 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-3">
              Update Growth Plan
              <ArrowRight className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* FOOTER NUDGE */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center">
         <Rocket className="w-10 h-10 text-slate-300 mx-auto mb-4" />
         <h4 className="text-xl font-bold text-slate-900 mb-2">Ready for the next level?</h4>
         <p className="text-slate-500 text-sm mb-8">We've identified 3 new micro-exercises based on your updated profile.</p>
         <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 text-slate-900 font-bold">
            Explore Next Steps
         </Button>
      </div>
    </div>
  );
}
