'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';

interface FeedbackSummaryProps {
  subskill: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  coachingTip: string;
  masterySignal: number;
}

/**
 * Renders the latest AI-generated feedback for a micro-exercise.
 * Optimized for the premium Onyx Dashboard container.
 */
export function FeedbackSummary({
  subskill,
  summary,
  strengths,
  improvements,
  coachingTip,
  masterySignal
}: FeedbackSummaryProps) {
  return (
    <div className="bg-transparent text-white overflow-hidden p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#C89B3C]">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Surgical Coaching Insight</span>
          </div>
          <h3 className="text-3xl font-black tracking-tight text-white italic">
            Focus: {subskill}
          </h3>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-end gap-2 shadow-inner">
           <div className="flex items-center gap-2">
             <TrendingUp className="w-4 h-4 text-[#C89B3C]" />
             <span className="text-2xl font-black text-white">{Math.round(masterySignal * 100)}%</span>
           </div>
           <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Mastery Momentum</span>
        </div>
      </div>

      <div className="space-y-12">
        <div className="relative">
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium pl-8 border-l-4 border-[#C89B3C]">
            "{summary}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
              Dominant Signals
            </h4>
            <ul className="space-y-4">
              {strengths.map((s, i) => (
                <li key={i} className="text-sm font-bold text-white/90 flex items-start gap-3 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-1.5 group-hover:scale-150 transition-transform" /> 
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-white/20" />
              Growth Calibrations
            </h4>
            <ul className="space-y-4">
              {improvements.map((imp, i) => (
                <li key={i} className="text-sm font-bold text-white/60 flex items-start gap-3 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5 group-hover:bg-white/30 transition-all" /> 
                  {imp}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="bg-[#C89B3C]/10 p-8 rounded-[2.5rem] border border-[#C89B3C]/20 relative overflow-hidden group hover:bg-[#C89B3C]/20 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#C89B3C] mb-4">
              <Lightbulb className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Protocol</span>
            </div>
            <p className="text-lg font-black text-white leading-relaxed tracking-tight underline decoration-[#C89B3C] decoration-2 underline-offset-4">
              {coachingTip}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B3C]/5 rounded-full blur-3xl group-hover:bg-[#C89B3C]/20 transition-all" />
        </div>
      </div>
    </div>
  );
}
