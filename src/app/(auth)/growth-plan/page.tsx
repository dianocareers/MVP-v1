'use client';

import React, { useState } from 'react';
import { MicroExerciseCard } from '@/components/learning/MicroExerciseCard';
import { ExerciseFeedbackView } from '@/components/learning/ExerciseFeedbackView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Target, Zap, ChevronRight, AlertCircle, Inbox } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function GrowthPlanPage() {
  const [view, setView] = useState<'roadmap' | 'exercise' | 'feedback'>('roadmap');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate data fetching
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      analytics.track(analytics.events.BRANDING_LOADED, { page: 'growth_plan' });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for demonstration
  const roadmap = {
    foundation: [
      { title: "Active Listening", type: "reflection", durationMinutes: 10, objective: "Bridge communication gaps using strategic paraphrasing.", status: "completed" as const },
      { title: "Boundary Setting", type: "action", durationMinutes: 15, objective: "Practice saying 'no' to non-strategic requests.", status: "unlocked" as const },
      { title: "Conflict Resolution", type: "scenario", durationMinutes: 10, objective: "Handle high-stakes peer disagreements.", status: "locked" as const },
    ],
    leadership: [
      { title: "Technical Delegation", type: "action", durationMinutes: 15, objective: "Scale your impact by trusting others with execution.", status: "unlocked" as const },
      { title: "Strategic Roadmap building", type: "reflection", durationMinutes: 15, objective: "Align technical debt with product goals.", status: "locked" as const },
    ],
    technical: [
      { title: "Dependency Injection", type: "practice", durationMinutes: 10, objective: "Refactor a hardcoded component for testability.", status: "unlocked" as const },
      { title: "System Observability", type: "practice", durationMinutes: 15, objective: "Implement structured logging for a critical path.", status: "locked" as const },
    ]
  };

  const mockFeedback = {
    summary: "Your application of the 'Summary' technique was textbook. You allowed the speaker to fully exhaust their point before pivoting, which is a major growth signal compared to your previous assessment where you noted early interruptions.",
    strengths: ["Patience in silence", "Accurate technical paraphrasing"],
    improvements: ["Smoothness of internal transition"],
    coachingTip: "In your next session, try to identify the speaker's 'hidden intent'—the one thing they aren't saying explicitly.",
    masteryScore: 0.85
  };

  if (view === 'feedback') {
    return (
      <ExerciseFeedbackView 
        feedback={mockFeedback}
        onContinue={() => setView('roadmap')}
        onRetry={() => setView('roadmap')}
      />
    );
  }

  if (view === 'exercise') {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Active Session: Technical Delegation</h2>
          <p className="text-slate-500 italic">"Focus on the 'Why' not just the 'How'."</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">Task Instructions:</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-2"><span>1.</span> Identify a task you usually do because it's 'faster'.</li>
              <li className="flex gap-2"><span>2.</span> Assign it to a peer or junior with a clear definition of 'done'.</li>
              <li className="flex gap-2"><span>3.</span> Set a check-in time instead of jumping in early.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Your Reflection:</label>
            <textarea 
              className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none text-slate-700 font-sans"
              placeholder="How did it feel to let go? What was the outcome?"
            />
          </div>
          
          <Button 
            onClick={() => setView('feedback')}
            className="w-full h-12 bg-slate-900 text-white font-bold rounded-xl"
          >
            Submit to Coach
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12 animate-pulse">
        <div className="h-20 bg-slate-100 rounded-2xl w-1/3" />
        <div className="h-12 bg-slate-100 rounded-xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold">Failed to load roadmap</h3>
        <p className="text-slate-500">Please try refreshing the page.</p>
        <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
      </div>
    );
  }

  const isEmpty = roadmap.foundation.length === 0 && roadmap.leadership.length === 0 && roadmap.technical.length === 0;

  if (isEmpty) {
    return (
      <div className="py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
          <Inbox className="w-10 h-10 text-slate-300" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-slate-900">Your roadmap is waiting...</h3>
          <p className="text-slate-500 mt-2">Complete your initial assessment to unlock personalized micro-exercises tailored to your career goals.</p>
        </div>
        <Button className="bg-slate-900 text-white rounded-xl h-12 px-8 font-bold">
          Take Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Growth Roadmap</h1>
          <p className="text-slate-500">Tiered micro-sessions to bridge your career gaps.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase">
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
          Streak: 7 Days
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl h-11 mb-6 border border-slate-200/50">
          <TabsTrigger value="all" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-xs font-bold uppercase tracking-wider">All Tracks</TabsTrigger>
          <TabsTrigger value="foundation" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-xs font-bold uppercase tracking-wider">Foundation</TabsTrigger>
          <TabsTrigger value="leadership" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-xs font-bold uppercase tracking-wider">Leadership</TabsTrigger>
          <TabsTrigger value="technical" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all text-xs font-bold uppercase tracking-wider">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Layer 1: Execution Reliability (Foundation)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.foundation.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" />
                Layer 2: Influence & Impact (Leadership)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.leadership.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Layer 3: Domain Mastery (Technical)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.technical.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
              </div>
            </section>
          </div>
        </TabsContent>
        {/* Foundation Specific tab */}
        <TabsContent value="foundation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.foundation.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
            </div>
        </TabsContent>
        {/* Leadership Specific tab */}
        <TabsContent value="leadership" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.leadership.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
            </div>
        </TabsContent>
        {/* Technical Specific tab */}
        <TabsContent value="technical" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.technical.map((ex, i) => (
                  <MicroExerciseCard key={i} {...ex} onStart={() => setView('exercise')} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
