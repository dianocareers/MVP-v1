'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompetencyGapHeatmap } from '@/components/admin/CompetencyGapHeatmap';
import { Users, UserCheck, Timer, TrendingUp, Download, AlertCircle, Inbox, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      analytics.track(analytics.events.BRANDING_LOADED, { page: 'admin_dashboard' });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Mock institutional aggregate data
  const metrics = {
    total_users: 1250,
    active_users: 840,
    completion_rate: 68,
    avg_readiness: 3.4,
  };

  const heatmapData = [
    { domain: 'Strategic Thinking', avg_score: 2.8, n: 840 },
    { domain: 'Communication', avg_score: 4.2, n: 840 },
    { domain: 'Technical Architecture', avg_score: 3.1, n: 840 },
    { domain: 'Mentorship', avg_score: 3.5, n: 840 },
    { domain: 'Conflict Resolution', avg_score: 2.4, n: 840 },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-end">
           <div className="h-12 bg-slate-100 rounded-xl w-64" />
           <div className="h-10 bg-slate-100 rounded-lg w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-50 rounded-xl border border-slate-100" />)}
        </div>
        <div className="grid grid-cols-3 gap-8">
           <div className="col-span-2 h-96 bg-slate-50 rounded-3xl" />
           <div className="h-96 bg-slate-50 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold">Failed to load institutional data</h3>
        <p className="text-slate-500">You may not have sufficient permissions or the service is temporarily down.</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl">Retry Dashboard</Button>
      </div>
    );
  }

  const hasNoData = metrics.total_users === 0;

  if (hasNoData) {
    return (
      <div className="py-20 text-center space-y-6 bg-white rounded-3xl border border-slate-100">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
          <BarChart3 className="w-10 h-10 text-slate-300" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-slate-900">No organizational data yet</h3>
          <p className="text-slate-500 mt-2">Invite your team members to start their assessments to see aggregate competency gaps and readiness metrics.</p>
        </div>
        <Button className="bg-slate-900 text-white rounded-xl h-12 px-8 font-bold">
          Invite Team Members
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Dashboard</h1>
          <p className="text-slate-500 text-sm font-medium italic">Aggregate analytics for Diano Careers B2B Partner</p>
        </div>
        <Button className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 rounded-lg font-bold">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* AGGREGATE METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrolled', val: metrics.total_users, icon: Users, color: 'text-blue-500' },
          { label: 'Active Learners', val: metrics.active_users, icon: UserCheck, color: 'text-emerald-500' },
          { label: 'Completion Rate', val: `${metrics.completion_rate}%`, icon: Timer, color: 'text-purple-500' },
          { label: 'Avg Readiness', val: `L${metrics.avg_readiness}`, icon: TrendingUp, color: 'text-amber-500' },
        ].map(m => (
          <Card key={m.label} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                  <div className="text-2xl font-black text-slate-900">{m.val}</div>
                </div>
                <div className={`p-2 rounded-lg bg-slate-50 ${m.color}`}>
                  <m.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* HEATMAP (2/3) */}
        <div className="lg:col-span-8">
          <CompetencyGapHeatmap data={heatmapData} />
        </div>

        {/* ACTIVATION TREND (1/3) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <Card className="border-slate-200 flex-1">
             <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Engagement Digest</CardTitle>
             </CardHeader>
             <CardContent className="pt-6 space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Communication</strong> remains your team's highest-performing domain. 
                </p>
                <p>
                  Significant growth observed in <strong>Mentorship</strong> scores (+12%) over the last 30 days.
                </p>
                <div className="pt-4 border-t border-slate-100">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority Focus Area</div>
                   <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-900 font-bold">
                     Conflict Resolution (L2.4 Avg)
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
