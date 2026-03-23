'use client';

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';

interface SnapshotData {
  month: string;
  foundation: number;
  leadership: number;
  technical: number;
}

interface ThreeMonthSnapshotProps {
  data: SnapshotData[];
  totalExercises: number;
  pointsGained: number;
}

/**
 * Visualizes career progress over the last 3 months.
 */
export function ThreeMonthSnapshot({ data, totalExercises, pointsGained }: ThreeMonthSnapshotProps) {
  return (
    <Card className="border-[#1A1A1A]/5 shadow-sm overflow-hidden bg-white/50 backdrop-blur-md rounded-[3rem]">
      <CardHeader className="border-b border-[#1A1A1A]/5 py-6 px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <CardTitle className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.3em] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#C89B3C]" />
            Velocity & Momentum
          </CardTitle>
          <div className="flex gap-3">
            <Badge className="bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
              {totalExercises} Cycles
            </Badge>
            <Badge className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg shadow-[#C89B3C]/20">
              +{pointsGained} Mastery
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-10">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#1A1A1A" strokeOpacity={0.05} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#1A1A1A', opacity: 0.4 }} 
              />
              <YAxis domain={[0, 5]} hide />
              <Tooltip 
                cursor={{ fill: '#F5F2E9' }}
                contentStyle={{ 
                  borderRadius: '24px', 
                  border: '1px solid rgba(26,26,26,0.05)', 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                  padding: '20px',
                  backgroundColor: '#fff'
                }}
              />
              <Bar dataKey="foundation" fill="#C89B3C" radius={[8, 8, 0, 0]} barSize={24} />
              <Bar dataKey="leadership" fill="#1A1A1A" radius={[8, 8, 0, 0]} barSize={24} />
              <Bar dataKey="technical" fill="#1A1A1A" fillOpacity={0.2} radius={[8, 8, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]/40">
           <div className="flex items-center gap-2 decoration-[#C89B3C] decoration-2 underline underline-offset-4"><div className="w-2 h-2 rounded-full bg-[#C89B3C]" /> Foundation</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1A1A1A]" /> Leadership</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" /> Technical</div>
        </div>
      </CardContent>
    </Card>
  );
}
