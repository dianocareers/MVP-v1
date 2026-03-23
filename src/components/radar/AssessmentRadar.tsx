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
import { TrendingUp, Award, Target } from 'lucide-react';

interface AssessmentRadarProps {
  title: string;
  description: string;
  data: Record<string, number>;
  targetData?: Record<string, number>; // Optional second dataset for "Target" path
  maxValue?: number;
  color?: string; // Theme color (e.g., #C89B3C)
}

export function AssessmentRadar({ 
  title, 
  description, 
  data, 
  targetData,
  maxValue = 5,
  color = "#C89B3C" 
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
    <Card className="w-full border-[#1A1A1A]/5 shadow-none overflow-hidden bg-transparent">
      <CardHeader className="pb-8 px-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-black text-[#1A1A1A] tracking-tight">{title}</CardTitle>
            <CardDescription className="text-[#1A1A1A]/40 font-medium mt-2">{description}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-[#1A1A1A] text-white px-4 py-2 rounded-xl flex items-center gap-2 shrink-0 border-none shadow-xl">
              <Award className="h-4 w-4 text-[#C89B3C]" />
              <span className="font-black text-xl leading-none">L{level}</span>
              <span className="text-[10px] uppercase font-bold text-white/40 ml-1 tracking-widest">Mastery</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full relative">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#1A1A1A" strokeOpacity={0.05} strokeDasharray="4 4" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 900, textAnchor: 'middle' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, maxValue]} 
                  tick={false} 
                  axisLine={false} 
                />
                
                {/* Target Overlay (Benchmark) */}
                {targetData && (
                  <Radar
                    name="Benchmark"
                    dataKey="target"
                    stroke="#1A1A1A"
                    fill="#1A1A1A"
                    fillOpacity={0.03}
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                  />
                )}

                {/* Primary Capability */}
                <Radar
                  name="Current Capability"
                  dataKey="score"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.2}
                  strokeWidth={3}
                  dot={{ r: 5, fill: color, strokeWidth: 3, stroke: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F2E9]/50 rounded-3xl border border-dashed border-[#1A1A1A]/10">
               <span className="text-[#1A1A1A]/30 text-xs font-black uppercase tracking-[0.2em]">Synthesizing Data...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 rounded-3xl bg-white border border-[#1A1A1A]/5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C89B3C] flex items-center justify-center shadow-lg shadow-[#C89B3C]/20">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[.2em] text-[#1A1A1A]/40">Primary Strength</span>
            </div>
            <p className="text-xl font-black text-[#1A1A1A] mb-1">{strongest?.subject}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-bold text-[#C89B3C]">{(strongest?.score as number).toFixed(1)} / {maxValue}</span>
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (strongest?.score as number) ? 'bg-[#C89B3C]' : 'bg-[#1A1A1A]/5'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-[#C89B3C]" />
              </div>
              <span className="text-xs font-black uppercase tracking-[.2em] text-white/40">Growth Priority</span>
            </div>
            <p className="text-xl font-black text-white mb-1">{development?.subject}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-bold text-[#C89B3C]">{(development?.score as number).toFixed(1)} / {maxValue}</span>
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (development?.score as number) ? 'bg-[#C89B3C]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
