'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Reflection Insights Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <Brain className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
          <p className="text-sm text-blue-900 leading-relaxed italic">
            "{insights.summary}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <CheckCircle2 className="w-3 h-3 text-emerald-500" />
               Patterns of Growth
             </h4>
             <ul className="space-y-2">
               {insights.strengths.map((s, i) => (
                 <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                   {s}
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-3">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <AlertTriangle className="w-3 h-3 text-amber-500" />
               Key Risks
             </h4>
             <ul className="space-y-2">
               {insights.risks.map((r, i) => (
                 <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                   <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                   {r}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex gap-2 flex-wrap">
            {insights.themes.map((theme, i) => (
              <Badge key={i} variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[10px] font-semibold px-2 py-0.5">
                # {theme}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
