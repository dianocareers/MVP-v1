'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, AlertTriangle, CheckCircle2, Search } from 'lucide-react';

interface ReflectionInsight {
  themes: string[];
  strengths: string[];
  risks: string[];
  summary: string;
}

interface ReflectionInsightsSummaryProps {
  insights: ReflectionInsight;
}

/**
 * Displays an AI-generated summary of user reflections and behavioral patterns.
 */
export function ReflectionInsightsSummary({ insights }: ReflectionInsightsSummaryProps) {
  return (
    <Card className="border-[#1A1A1A]/5 shadow-none bg-white rounded-[3rem] overflow-hidden">
      <CardHeader className="border-b border-[#1A1A1A]/5 py-8 px-10">
        <CardTitle className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.3em] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#C89B3C]" />
          Pattern Recognition
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 space-y-10">
        <div className="flex items-start gap-4 bg-[#F5F2E9] p-8 rounded-[2rem] border border-[#1A1A1A]/5 relative overflow-hidden group">
          <Brain className="w-6 h-6 text-[#1A1A1A] mt-1 shrink-0 relative z-10" />
          <p className="text-lg text-[#1A1A1A] leading-relaxed font-black transition-all group-hover:translate-x-1 relative z-10">
            "{insights.summary}"
          </p>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C89B3C]/10 rounded-full blur-3xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
             <h4 className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-[0.3em] flex items-center gap-3">
               <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
               Strategic Strengths
             </h4>
             <ul className="space-y-4">
               {insights.strengths.map((s, i) => (
                 <li key={i} className="text-sm font-bold text-[#1A1A1A] flex items-start gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-1.5 shrink-0" />
                   {s}
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-[0.3em] flex items-center gap-3">
               <AlertTriangle className="w-4 h-4 text-[#C89B3C]/40" />
               Critical Risks
             </h4>
             <ul className="space-y-4">
               {insights.risks.map((r, i) => (
                 <li key={i} className="text-sm font-bold text-[#1A1A1A]/50 flex items-start gap-3 italic">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/10 mt-1.5 shrink-0" />
                   {r}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1A1A1A]/5">
          <div className="flex gap-3 flex-wrap">
            {insights.themes.map((theme, i) => (
              <Badge key={i} className="bg-[#1A1A1A] text-white hover:bg-[#C89B3C] transition-all text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
                # {theme}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
