'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award } from 'lucide-react';

interface AssessmentRadarProps {
  title: string;
  description: string;
  data: Record<string, number>;
  targetData?: Record<string, number>; // Optional second dataset for "Target" path
  maxValue?: number;
  color?: string; // Theme color (e.g., #3b82f6)
}

export function AssessmentRadar({ 
  title, 
  description, 
  data, 
  targetData,
  maxValue = 5,
  color = "#0f172a" 
}: AssessmentRadarProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Transform datasets to Recharts format: [{ subject, score, target, fullMark }]
  const chartData = Object.keys(data).map((domain) => ({
    subject: domain,
    score: data[domain],
    target: targetData ? targetData[domain] : undefined,
    fullMark: maxValue,
  }));

  // Find strongest and weakest from the primary "score" data
  const sorted = [...chartData].sort((a, b) => b.score - (a.score as number));
  const strongest = sorted[0];
  const development = sorted[sorted.length - 1];

  // Calculate overall level (average)
  const average = chartData.reduce((acc, curr) => acc + (curr.score as number), 0) / chartData.length;
  const level = Math.ceil(average);

  return (
    <Card className="w-full border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
            <CardDescription className="text-slate-500 mt-1">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 px-3 py-1 flex items-center gap-1.5 shrink-0">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="font-semibold text-lg leading-none">L{level}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 ml-0.5">Level</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[360px] w-full mt-4">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, maxValue]} 
                  tick={false} 
                  axisLine={false} 
                />
                
                {/* Secondary/Target Overlay */}
                {targetData && (
                  <Radar
                    name="Target Role"
                    dataKey="target"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.05}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                )}

                {/* Primary User Impact */}
                <Radar
                  name="Your Capability"
                  dataKey="score"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.15}
                  dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
               <span className="text-slate-400 text-sm font-medium">Generating visualization...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div 
            className="p-3 rounded-lg border transition-all"
            style={{ 
              backgroundColor: `${color}08`, // 08 = ~3% opacity
              borderColor: `${color}20`  // 20 = ~12% opacity
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4" style={{ color }} />
              <span className="text-xs font-bold uppercase tracking-wider opacity-70" style={{ color }}>Strongest Domain</span>
            </div>
            <p className="text-sm font-bold text-slate-800">{strongest?.subject}</p>
            <p className="text-xs font-bold" style={{ color }}>{(strongest?.score as number).toFixed(1)} / {maxValue}</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-amber-600 rotate-180" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Development Priority</span>
            </div>
            <p className="text-sm font-bold text-slate-800">{development?.subject}</p>
            <p className="text-xs text-amber-600 font-bold">{(development?.score as number).toFixed(1)} / {maxValue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
