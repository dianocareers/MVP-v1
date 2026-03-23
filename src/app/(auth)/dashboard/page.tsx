'use client';

import React from 'react';
import { FeedbackSummary } from '@/components/learning/FeedbackSummary';
import { MasteryTrend } from '@/components/dashboard/MasteryTrend';
import { TriRadarDisplay } from '@/components/dashboard/TriRadarDisplay';
import { ThreeMonthSnapshot } from '@/components/dashboard/ThreeMonthSnapshot';
import { ReflectionInsightsSummary } from '@/components/dashboard/ReflectionInsightsSummary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Sparkles, TrendingUp, Calendar, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  // Mock data for demonstration
  const latestFeedback = {
    subskill: "Active Listening",
    summary: "You demonstrated a strong ability to hold space and summarize before responding. Your recognition of the speaker's emotional cues has improved significantly.",
    strengths: ["Strategic paraphrasing", "Non-verbal cue detection"],
    improvements: ["Smoothness of transition into summaries"],
    coachingTip: "Try the 'Soft-In' technique: use a bridge like 'What I'm hearing is...' to make it feel more conversational.",
    masterySignal: 0.82
  };

  const snapshotData = [
    { month: 'Jan', foundation: 3.2, leadership: 2.1, technical: 3.8 },
    { month: 'Feb', foundation: 3.8, leadership: 2.5, technical: 4.2 },
    { month: 'Mar', foundation: 4.2, leadership: 3.0, technical: 4.5 },
  ];

  const reflectionInsights = {
    themes: ["Resilient Problem Solver", "Aspiring Technical Lead", "Collaborative Communicator"],
    strengths: ["High technical excellence", "Empathetic communication"],
    risks: ["Perfectionism slowing delivery", "Reluctance to delegate"],
    summary: "You rate yourself highly in technical execution, but your reflections suggest you are still manually fixing team members' errors rather than coaching them."
  };

  const mockScores = {
    userId: '1',
    sessionId: 's1',
    completedAt: '2024-03-17',
    foundationScores: { 'Communication': 4.2, 'Problem Solving': 4.5, 'Execution': 4.8, 'Collaboration': 3.5, 'Adaptability': 4.2 },
    leadershipScores: { 'Strategy': 3.0, 'Mentorship': 4.1, 'Presence': 2.8, 'Influence': 3.5, 'Acumen': 3.2 },
    technicalScores: { 'Architecture': 3.8, 'Code Quality': 4.8, 'Testing': 4.2, 'Ops': 3.9, 'Domain': 4.5 }
  } as any;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Career Momentum</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Career Dashboard</h1>
          <p className="text-slate-500 font-medium">Welcome back, John. Your readiness for <span className="text-blue-600">Senior Staff Engineer</span> is at 82%.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 text-slate-600 font-bold" aria-label="Schedule a coaching session">
            <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
            Schedule Coaching
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800 h-12 rounded-xl px-8 font-bold shadow-lg shadow-slate-200" aria-label="Resume your assessment">
            Resume Assessment
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* LEFT COLUMN: VISUALIZATIONS & PRIMARY FEEDBACK */}
        <div className="xl:col-span-8 space-y-10">
          {/* TRIPLE RADAR SECTION */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-3 h-3 text-blue-500" />
                 Triple Dimensional Radar (L1-L5)
               </h3>
               <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-[10px]">Active Trajectory: Technical Lead</Badge>
            </div>
            <TriRadarDisplay scores={mockScores} />
          </section>

          {/* LATEST AI FEEDBACK */}
          <section className="space-y-4">
            <div className="flex items-center px-2">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Sparkles className="w-3 h-3 text-amber-500" />
                 Surgical Coaching Insight
               </h3>
            </div>
            <FeedbackSummary 
              subskill={latestFeedback.subskill}
              summary={latestFeedback.summary}
              strengths={latestFeedback.strengths}
              improvements={latestFeedback.improvements}
              coachingTip={latestFeedback.coachingTip}
              masterySignal={latestFeedback.masterySignal}
            />
          </section>
        </div>

        {/* RIGHT COLUMN: TRENDS & INSIGHTS */}
        <div className="xl:col-span-4 space-y-10">
          {/* 3-MONTH SNAPSHOT */}
          <section className="space-y-4">
            <ThreeMonthSnapshot 
              data={snapshotData}
              totalExercises={42}
              pointsGained={850}
            />
          </section>

          {/* AI REFLECTION SUMMARY */}
          <section className="space-y-4">
            <ReflectionInsightsSummary insights={reflectionInsights} />
          </section>

          {/* QUICK FOCUS CARD */}
          <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/40 transition-all duration-700" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Today's Micro-Exercise</h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Practice <span className="text-white font-medium">Technical Delegation</span>. 
                Identify one non-critical task and assign it to a team member today.
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 h-12 rounded-xl font-bold">
                Start 5-Min Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
