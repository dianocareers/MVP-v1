'use client';

import React from 'react';
import { FeedbackSummary } from '@/components/learning/FeedbackSummary';
import { TriRadarDisplay } from '@/components/dashboard/TriRadarDisplay';
import { ThreeMonthSnapshot } from '@/components/dashboard/ThreeMonthSnapshot';
import { ReflectionInsightsSummary } from '@/components/dashboard/ReflectionInsightsSummary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Sparkles, TrendingUp, Calendar, Zap, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="max-w-[1400px] mx-auto space-y-12 pb-24 px-4 animate-in fade-in duration-700">
      
      {/* PREMIUM HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 px-4 py-8 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-[#1A1A1A]/5 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#C89B3C]">
            <div className="p-2 bg-[#C89B3C]/10 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#1A1A1A]">Intelligence Active</span>
          </div>
          <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">Your Career <span className="text-[#C89B3C]">Orbit</span></h1>
          <p className="text-[#1A1A1A]/60 font-medium text-lg leading-relaxed">
            Welcome back, John. Your readiness for <span className="text-[#1A1A1A] font-black underline underline-offset-8 decoration-[#C89B3C] decoration-4">Senior Staff Engineer</span> has reached <span className="text-[#1A1A1A] font-black italic text-2xl ml-1">82%</span>.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="h-16 px-8 rounded-2xl bg-white border border-[#1A1A1A]/5 text-[#1A1A1A] font-black uppercase tracking-widest text-xs hover:bg-[#F5F2E9] transition-all flex items-center gap-3 shadow-sm active:scale-95">
            <Calendar className="w-4 h-4 text-[#C89B3C]" />
            Schedule Sync
          </button>
          <button className="h-16 px-10 rounded-2xl bg-[#1A1A1A] text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-[#1A1A1A]/20 active:scale-95">
            Resume Assessment
            <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* LEFT COLUMN: CORE INTELLIGENCE */}
        <div className="xl:col-span-8 space-y-12">
          
          {/* TRIPLE RADAR SECTION */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.2em]">Capability Matrix</h3>
               </div>
               <Badge className="bg-[#F5F2E9] text-[#1A1A1A] border-[#1A1A1A]/5 text-[10px] py-1 px-3 font-black tracking-widest uppercase">Target: Technical Lead</Badge>
            </div>
            <div className="bg-white/60 p-10 rounded-[4rem] border border-[#1A1A1A]/5 shadow-sm transition-all hover:bg-white hover:shadow-xl">
              <TriRadarDisplay scores={mockScores} />
            </div>
          </section>

          {/* LATEST AI COACH INSIGHT */}
          <section className="space-y-8">
            <div className="flex items-center px-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B3C] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.2em]">Coach Insight</h3>
               </div>
            </div>
            <div className="bg-[#1A1A1A] rounded-[4rem] shadow-2xl relative overflow-hidden p-1">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              <FeedbackSummary 
                subskill={latestFeedback.subskill}
                summary={latestFeedback.summary}
                strengths={latestFeedback.strengths}
                improvements={latestFeedback.improvements}
                coachingTip={latestFeedback.coachingTip}
                masterySignal={latestFeedback.masterySignal}
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: MOMENTUM & FOCUS */}
        <div className="xl:col-span-4 space-y-12">
          
          {/* 3-MONTH SNAPSHOT (Momentum) */}
          <section className="space-y-6">
            <div className="bg-white/60 p-10 rounded-[4rem] border border-[#1A1A1A]/5 shadow-sm">
              <ThreeMonthSnapshot 
                data={snapshotData}
                totalExercises={42}
                pointsGained={850}
              />
            </div>
          </section>

          {/* NEXT FOCUS / MICRO-EXERCISE */}
          <section className="sticky top-32 space-y-8">
            <div className="p-12 bg-[#C89B3C] rounded-[4rem] text-white relative overflow-hidden group shadow-2xl shadow-[#C89B3C]/30">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10 space-y-10">
                <div className="w-16 h-16 rounded-[2rem] bg-[#1A1A1A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-[#C89B3C]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1A1A1A] mb-4">Priority Target</h4>
                  <h4 className="text-3xl font-black mb-4 tracking-tight">Focus: Technical Delegation</h4>
                  <p className="text-white/80 font-medium text-lg leading-relaxed italic">
                    Identify one non-critical task and assign it to a team member today. 
                  </p>
                </div>
                <button className="w-full py-6 bg-white text-[#1A1A1A] rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#F5F2E9] transition-all hover:-translate-y-1 active:scale-95">
                  Launch Exercise
                </button>
              </div>
            </div>

            {/* AI REFLECTION SUMMARY */}
            <div className="px-2">
              <ReflectionInsightsSummary insights={reflectionInsights} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
