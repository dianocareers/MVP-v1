'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface HeatmapData {
  domain: string;
  avg_score: number;
  n: number;
}

interface CompetencyGapHeatmapProps {
  data: HeatmapData[];
}

/**
 * Visualizes aggregate competency levels across an organization.
 * Admins see team strengths/weaknesses without individual names.
 */
export function CompetencyGapHeatmap({ data }: CompetencyGapHeatmapProps) {
  // Sorting data by score to show gaps clearly
  const sortedData = [...data].sort((a, b) => a.avg_score - b.avg_score);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Organization Competency Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={sortedData} margin={{ left: 40, right: 20 }}>
              <XAxis type="number" domain={[0, 5]} hide />
              <YAxis 
                type="category" 
                dataKey="domain" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="avg_score" radius={[0, 4, 4, 0]} barSize={24}>
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.avg_score < 3 ? '#fbbf24' : entry.avg_score < 4 ? '#3b82f6' : '#10b981'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
           <div className="text-center">
              <div className="text-xs text-slate-400 uppercase font-black mb-1">Gap Area</div>
              <div className="w-3 h-3 bg-amber-400 rounded-sm mx-auto shadow-sm shadow-amber-200" />
           </div>
           <div className="text-center">
              <div className="text-xs text-slate-400 uppercase font-black mb-1">Developing</div>
              <div className="w-3 h-3 bg-blue-500 rounded-sm mx-auto shadow-sm shadow-blue-200" />
           </div>
           <div className="text-center">
              <div className="text-xs text-slate-400 uppercase font-black mb-1">Strength</div>
              <div className="w-3 h-3 bg-emerald-500 rounded-sm mx-auto shadow-sm shadow-emerald-200" />
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
