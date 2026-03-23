'use client';

import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity } from 'lucide-react';

interface MasteryTrendProps {
  subskill: string;
  data: { score: number; date: string }[];
  status: 'not_started' | 'in_progress' | 'mastered' | 'stagnated';
}

/**
 * A compact sparkline component showing the mastery trajectory of a sub-skill.
 */
export function MasteryTrend({ subskill, data, status }: MasteryTrendProps) {
  const statusColors = {
    not_started: 'bg-slate-100 text-slate-500',
    in_progress: 'bg-blue-50 text-blue-700',
    mastered: 'bg-emerald-50 text-emerald-700',
    stagnated: 'bg-amber-50 text-amber-700'
  };

  return (
    <Card className="border-slate-100 shadow-none hover:shadow-sm transition-all duration-200">
      <CardContent className="p-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold text-slate-800">{subskill}</h4>
            <Badge variant="secondary" className={`${statusColors[status]} border-none text-[10px] uppercase font-bold px-1.5 py-0`}>
              {status.replace('_', ' ')}
            </Badge>
          </div>
          <Activity className="w-4 h-4 text-slate-300" />
        </div>

        <div className="h-16 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={[0, 1]} hide />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-slate-200 p-2 rounded-lg shadow-xl text-[10px] font-bold">
                        {Math.round(payload[0].value as number * 100)}%
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke={status === 'mastered' ? '#10b981' : '#3b82f6'} 
                strokeWidth={2.5} 
                dot={false}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span>Last 5 sessions</span>
        </div>
      </CardContent>
    </Card>
  );
}
