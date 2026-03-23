'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight, Minus, MoveUp } from 'lucide-react';

interface DeltaSummaryCardProps {
  deltas: Record<string, number>;
}

export function DeltaSummaryCard({ deltas }: DeltaSummaryCardProps) {
  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Total Growth Summary</h3>
            <p className="text-xs text-slate-500 font-medium italic">Net changes across core dimensions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(deltas).map(([dim, val]) => {
            const isPositive = val > 0;
            const isNeutral = val === 0;

            return (
              <div key={dim} className={`p-5 rounded-2xl border transition-all ${
                isPositive ? 'bg-emerald-50/50 border-emerald-100' : 
                isNeutral ? 'bg-slate-50/50 border-slate-100' : 'bg-amber-50/50 border-amber-100'
              }`}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{dim}</div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-black text-slate-900">
                    <span className={isPositive ? 'text-emerald-600' : isNeutral ? 'text-slate-400' : 'text-amber-600'}>
                      {isPositive ? '+' : ''}{val}
                    </span>
                    <span className="text-xs text-slate-400 ml-1 font-bold">pts</span>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    isPositive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 
                    isNeutral ? 'bg-slate-200 text-slate-600' : 'bg-amber-500 text-white'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : isNeutral ? <Minus className="w-4 h-4" /> : <MoveUp className="w-4 h-4 rotate-180" />}
                  </div>
                </div>
                <p className="text-[10px] mt-4 font-bold text-slate-500 uppercase">
                  {isPositive ? 'Accelerated Growth' : isNeutral ? 'Stable Performance' : 'Recalibration Area'}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
