'use client';

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp } from 'lucide-react';

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
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            Last 3 Months Snapshot
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px] font-bold">
              {totalExercises} Exercises
            </Badge>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px] font-bold">
              +{pointsGained} Mastery Points
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} 
              />
              <YAxis domain={[0, 5]} hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="foundation" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="leadership" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="technical" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Foundation</div>
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Leadership</div>
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Technical</div>
        </div>
      </CardContent>
    </Card>
  );
}
