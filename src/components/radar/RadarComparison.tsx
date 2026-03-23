'use client';

import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RadarComparisonProps {
  previousScores: Record<string, number>;
  currentScores: Record<string, number>;
  title: string;
}

export function RadarComparison({ previousScores, currentScores, title }: RadarComparisonProps) {
  const domains = Object.keys(currentScores);
  const data = domains.map(domain => ({
    subject: domain,
    previous: previousScores[domain] || 0,
    current: currentScores[domain] || 0,
    fullMark: 5,
  }));

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <CardTitle className="text-sm font-black text-slate-700 uppercase tracking-widest text-center">
          {title}: Before vs. After
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 flex justify-center">
        <div className="h-80 w-full max-w-lg">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 5]} hide />
              
              {/* PREVIOUS (BASELINE) */}
              <Radar
                name="Baseline"
                dataKey="previous"
                stroke="#cbd5e1"
                fill="#f1f5f9"
                fillOpacity={0.6}
              />
              
              {/* CURRENT (GROWTH) */}
              <Radar
                name="Current"
                dataKey="current"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
              />
              
              <Legend verticalAlign="bottom" height={36}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
