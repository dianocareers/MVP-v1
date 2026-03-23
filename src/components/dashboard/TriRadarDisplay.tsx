'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssessmentRadar } from '../radar/AssessmentRadar';
import { UnifiedAssessmentOutput } from '@/services/assessment/scoringEngine';
import { Shield, Users, Code, Target, Zap, ArrowRight, AlertCircle, BarChart3 } from 'lucide-react';
import { getPathwayMatches } from '@/services/assessment/pathwayEngine';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TriRadarDisplayProps {
  scores: UnifiedAssessmentOutput;
}

export function TriRadarDisplay({ scores }: TriRadarDisplayProps) {
  const matches = getPathwayMatches(scores);
  const topMatch = matches[0];
  
  const foundationData = scores.foundationScores || {
    'Communication': 4.2, 'Problem Solving': 3.8, 'Execution & Delivery': 4.5, 'Collaboration': 3.2, 'Adaptability': 4.7
  };
  const leadershipData = scores.leadershipScores || {
    'Strategic Thinking': 3.0, 'Mentorship': 4.1, 'Executive Presence': 2.8, 'Influence': 3.5, 'Business Acumen': 3.2
  };
  const technicalData = scores.technicalScores || {
    'Architecture': 3.5, 'Code Quality': 4.8, 'Testing': 4.2, 'Operational Excellence': 3.9, 'Domain Expertise': 4.5
  };

  const foundationTarget = { 'Communication': 5.0, 'Problem Solving': 4.5, 'Execution & Delivery': 4.8, 'Collaboration': 4.5, 'Adaptability': 4.5 };
  const leadershipTarget = { 'Strategic Thinking': 4.0, 'Mentorship': 4.5, 'Executive Presence': 4.0, 'Influence': 4.5, 'Business Acumen': 4.0 };
  const technicalTarget = { 'Architecture': 4.5, 'Code Quality': 5.0, 'Testing': 4.5, 'Operational Excellence': 4.5, 'Domain Expertise': 5.0 };

  return (
    <div className="w-full space-y-12">
      {/* 1. PATHWAY READINESS SUMMARY (Premium) */}
      <div className="bg-[#1A1A1A] rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/10 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:bg-[#C89B3C]/20 transition-all duration-1000" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#C89B3C]">
              <Target className="h-3 w-3" />
              Strategic Trajectory
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              {topMatch.roleName}
            </h2>
            <p className="text-white/40 font-medium text-lg max-w-md leading-relaxed">
              Your multidimensional diagnostic indicates an <span className="text-white font-bold">{topMatch.overallReadiness}% match</span> for this high-impact pathway.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center relative">
             <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_20px_rgba(200,155,60,0.3)]">
                  <circle
                    cx="96" cy="96" r="88"
                    stroke="currentColor" strokeWidth="12"
                    fill="transparent" className="text-white/5"
                  />
                  <circle
                    cx="96" cy="96" r="88"
                    stroke="currentColor" strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={552.9}
                    strokeDashoffset={552.9 - (552.9 * topMatch.overallReadiness) / 100}
                    strokeLinecap="round"
                    className="text-[#C89B3C] transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center animate-pulse">
                  <span className="text-5xl font-black tracking-tighter">{topMatch.overallReadiness}%</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#C89B3C]">Ready</span>
                </div>
             </div>
          </div>

          <div className="flex-1 w-full space-y-6">
             <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">
               <BarChart3 className="w-3 h-3" /> Integrity Analysis
             </div>
             <div className="space-y-4">
                {[
                  { label: 'Technical', val: topMatch.technical, color: 'bg-[#C89B3C]' },
                  { label: 'Leadership', val: topMatch.leadership, color: 'bg-white/40' },
                  { label: 'Foundation', val: topMatch.foundation, color: 'bg-white/20' }
                ].map(dim => (
                  <div key={dim.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{dim.label}</span>
                      <span className="text-xs font-bold text-white">Level {dim.val.level.toFixed(1)} <span className="text-white/20">/ {dim.val.required.toFixed(1)}</span></span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000 delay-300", dim.color)}
                        style={{ width: `${(dim.val.level / 5) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Gap Analysis Warning (Premium) */}
        {topMatch.gaps.length > 0 && (
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-[#C89B3C]/10 border border-[#C89B3C]/20 rounded-3xl text-[#C89B3C] gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C] flex items-center justify-center shadow-lg shadow-[#C89B3C]/20">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C]/60">Optimization Required</p>
                <p className="text-sm font-bold text-white">Critical Gaps: {topMatch.gaps.join(" • ")}</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#C89B3C] text-[#1A1A1A] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-xl shadow-[#C89B3C]/20">
              Address Gaps
            </button>
          </div>
        )}
      </div>

      {/* 2. RADAR TABS (Premium) */}
      <Tabs defaultValue="foundation" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="flex bg-[#F5F2E9] p-2 rounded-[2rem] border border-[#1A1A1A]/5 shadow-inner w-full max-w-2xl">
            <TabsTrigger 
              value="foundation" 
              className="flex-1 rounded-[1.5rem] data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:shadow-2xl flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all"
            >
              <Shield className="h-4 w-4" />
              Foundation
            </TabsTrigger>
            <TabsTrigger 
              value="leadership" 
              className="flex-1 rounded-[1.5rem] data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:shadow-2xl flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all"
            >
              <Users className="h-4 w-4" />
              Leadership
            </TabsTrigger>
            <TabsTrigger 
              value="technical" 
              className="flex-1 rounded-[1.5rem] data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white data-[state=active]:shadow-2xl flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all"
            >
              <Code className="h-4 w-4" />
              Technical
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents with Premium Layout */}
        {[
          { id: 'foundation', title: 'Foundation Mastery', desc: 'Core interpersonal and behavioral behaviors.', data: foundationData, target: foundationTarget },
          { id: 'leadership', title: 'Leadership Readiness', desc: 'Strategic alignment and mentorship capabilities.', data: leadershipData, target: leadershipTarget },
          { id: 'technical', title: 'Technical Excellence', desc: 'Precision execution and domain architecture.', data: technicalData, target: technicalTarget }
        ].map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 bg-white p-10 rounded-[4rem] border border-[#1A1A1A]/5 shadow-sm transition-all hover:shadow-xl">
                <AssessmentRadar 
                  title={tab.title}
                  description={tab.desc}
                  data={tab.data}
                  targetData={tab.target}
                  color="#C89B3C"
                />
              </div>
              
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#1A1A1A] p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[#C89B3C] mb-4">
                       <Zap className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Dimension Logic</span>
                    </div>
                    <h4 className="text-2xl font-black mb-4 tracking-tight">Focus Protocol</h4>
                    <p className="text-white/60 font-medium leading-relaxed italic">
                      "To advance to Level {(Math.ceil(Object.values(tab.data).reduce((a,b)=>a+(b as number),0)/5) + 0.5).toFixed(1)}, prioritize consistency in <span className="text-white font-bold">{Object.keys(tab.data)[0]}</span> exercises."
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B3C]/5 rounded-full blur-3xl" />
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center px-4">
                     <span className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Sub-Domain Precision</span>
                     <BarChart3 className="w-3 h-3 text-[#1A1A1A]/20" />
                   </div>
                   <div className="grid grid-cols-1 gap-3">
                     {Object.entries(tab.data).map(([domain, score]) => (
                       <div key={domain} className="bg-white border border-[#1A1A1A]/5 px-6 py-4 rounded-2xl flex justify-between items-center group hover:bg-[#F5F2E9] hover:border-[#C89B3C]/20 transition-all cursor-default">
                          <span className="text-sm font-black text-[#1A1A1A] tracking-tight">{domain}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-[#C89B3C] italic">{Number(score).toFixed(1)}</span>
                            <div className="h-1.5 w-20 bg-[#1A1A1A]/5 rounded-full overflow-hidden p-0.5 border border-[#1A1A1A]/5">
                               <div className="h-full bg-[#C89B3C] rounded-full shadow-[0_0_8px_rgba(200,155,60,0.5)]" style={{ width: `${(Number(score) / 5) * 100}%` }} />
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
