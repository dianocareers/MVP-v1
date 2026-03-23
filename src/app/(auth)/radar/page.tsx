'use client';

import React from 'react';
import { TriRadarDisplay } from '@/components/dashboard/TriRadarDisplay';
import { UnifiedAssessmentOutput } from '@/services/assessment/scoringEngine';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Download } from 'lucide-react';

export default function RadarPage() {
  // MOCK DATA for initial rendering/demo
  // In a real scenario, this would be fetched from Supabase based on the user's latest session
  const mockScores: UnifiedAssessmentOutput = {
    foundationScores: {
      'Communication': 4.2,
      'Problem Solving': 3.8,
      'Execution & Delivery': 4.5,
      'Collaboration': 3.2,
      'Adaptability': 4.7
    },
    leadershipScores: {
      'Strategic Thinking': 3.0,
      'Mentorship': 4.1,
      'Executive Presence': 2.8,
      'Influence': 3.5,
      'Business Acumen': 3.2
    },
    technicalScores: {
      'Architecture': 3.5,
      'Code Quality': 4.8,
      'Testing': 4.2,
      'Operational Excellence': 3.9,
      'Domain Expertise': 4.5
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Your Career Signature
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Career Direction & <br /><span className="text-slate-500">Capability Diagnostic</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Your capabilities are visualized across three distinct radar dimensions. Use these insights to identify your competitive advantages and prioritize your growth plan.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 flex items-center gap-2 text-white shadow-lg shadow-slate-200">
            Build Growth Plan
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Visualization Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <TriRadarDisplay scores={mockScores} />
      </div>

      {/* Footer / CTA Section */}
      <div className="mt-16 bg-slate-900 rounded-3xl p-10 flex flex-col items-center text-center text-white relative overflow-hidden group">
         {/* Subtle background glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
         
         <h2 className="text-2xl font-bold mb-4 relative z-10">Ready to level up?</h2>
         <p className="max-w-xl text-slate-400 mb-8 relative z-10">
            Based on your Technical diagnostic, we recommend focusing on <span className="text-white font-medium">Architecture</span> to transition into a Senior role.
         </p>
         <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 rounded-xl font-bold text-lg relative z-10 transition-transform group-hover:scale-105">
            Personalize My Pathways
         </Button>
      </div>
    </div>
  );
}
