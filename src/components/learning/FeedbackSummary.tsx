'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';

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
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Coach Insight: {subskill}
          </CardTitle>
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-mono">
            {Math.round(masterySignal * 100)}% Momentum
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <p className="text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-4">
          "{summary}"
        </p>

        <div className="grid grid-cols-1 gap-4">
          <section className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Strengths
            </h4>
            <ul className="space-y-1">
              {strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span> {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              Growth Areas
            </h4>
            <ul className="space-y-1">
              {improvements.map((imp, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span> {imp}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-amber-50/50 p-4 rounded-lg border border-amber-100/50">
            <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Lightbulb className="w-3 h-3" />
              Mentor Tip
            </h4>
            <p className="text-sm text-amber-800 leading-snug">
              {coachingTip}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
