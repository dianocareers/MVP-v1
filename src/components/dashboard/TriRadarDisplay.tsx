'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssessmentRadar } from '../radar/AssessmentRadar';
import { UnifiedAssessmentOutput } from '@/services/assessment/scoringEngine';
import { Shield, Users, Code, Target, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getPathwayMatches, RoleReadiness } from '@/services/assessment/pathwayEngine';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TriRadarDisplayProps {
  scores: UnifiedAssessmentOutput;
}

export function TriRadarDisplay({ scores }: TriRadarDisplayProps) {
  const matches = getPathwayMatches(scores);
  const topMatch = matches[0];
  // Default data if scores are missing (MVP safety)
  const foundationData = scores.foundationScores || {
    'Communication': 4.2,
    'Problem Solving': 3.8,
    'Execution & Delivery': 4.5,
    'Collaboration': 3.2,
    'Adaptability': 4.7
  };

  const leadershipData = scores.leadershipScores || {
    'Strategic Thinking': 3.0,
    'Mentorship': 4.1,
    'Executive Presence': 2.8,
    'Influence': 3.5,
    'Business Acumen': 3.2
  };

  const technicalData = scores.technicalScores || {
    'Architecture': 3.5,
    'Code Quality': 4.8,
    'Testing': 4.2,
    'Operational Excellence': 3.9,
    'Domain Expertise': 4.5
  };

  // Mock Target Data for "Target Role" overlay
  const foundationTarget = { 'Communication': 5.0, 'Problem Solving': 4.5, 'Execution & Delivery': 4.8, 'Collaboration': 4.5, 'Adaptability': 4.5 };
  const leadershipTarget = { 'Strategic Thinking': 4.0, 'Mentorship': 4.5, 'Executive Presence': 4.0, 'Influence': 4.5, 'Business Acumen': 4.0 };
  const technicalTarget = { 'Architecture': 4.5, 'Code Quality': 5.0, 'Testing': 4.5, 'Operational Excellence': 4.5, 'Domain Expertise': 5.0 };

  return (
    <div className="w-full space-y-8">
      {/* 1. PATHWAY READINESS SUMMARY (NEW) */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest mb-4">
              <Target className="h-3 w-3 text-blue-400" />
              Primary Pathway Match
            </div>
            <h2 className="text-3xl font-bold mb-2">{topMatch.roleName}</h2>
            <p className="text-slate-400 text-sm max-w-sm">
              Based on your triple-radar diagnostic, you are currently best positioned for a {topMatch.roleName} trajectory.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 px-8 border-x border-white/10">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64" cy="64" r="58"
                    stroke="currentColor" strokeWidth="8"
                    fill="transparent" className="text-white/5"
                  />
                  <circle
                    cx="64" cy="64" r="58"
                    stroke="currentColor" strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * topMatch.overallReadiness) / 100}
                    className="text-blue-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black">{topMatch.overallReadiness}%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Readiness</span>
                </div>
             </div>
          </div>

          <div className="flex-1 space-y-4">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dimension Integrity</div>
             <div className="space-y-3">
                {[
                  { label: 'Technical', val: topMatch.technical, color: 'text-emerald-400' },
                  { label: 'Leadership', val: topMatch.leadership, color: 'text-purple-400' },
                  { label: 'Foundation', val: topMatch.foundation, color: 'text-blue-400' }
                ].map(dim => (
                  <div key={dim.label} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold uppercase transition-all">
                      <span className="text-slate-400">{dim.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500">L1-L5</span>
                        <span className={dim.val.isMet ? "text-emerald-400" : "text-amber-400"}>
                          Level {dim.val.level.toFixed(1)} / {dim.val.required.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <Progress value={(dim.val.level / 5) * 100} className="h-1 bg-white/5" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Gap Analysis Warning */}
        {topMatch.gaps.length > 0 && (
          <div className="mt-8 flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 text-xs">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span><strong>Gap Detected:</strong> {topMatch.gaps.join(" | ")}</span>
            </div>
            <div className="flex gap-2">
               <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]">Critical</Badge>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="foundation" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-lg grid-cols-3 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger 
              value="foundation" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 flex items-center gap-2 py-2.5"
            >
              <Shield className="h-4 w-4" />
              <span className="font-semibold">Foundation</span>
            </TabsTrigger>
            <TabsTrigger 
              value="leadership" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 flex items-center gap-2 py-2.5"
            >
              <Users className="h-4 w-4" />
              <span className="font-semibold">Leadership</span>
            </TabsTrigger>
            <TabsTrigger 
              value="technical" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 flex items-center gap-2 py-2.5"
            >
              <Code className="h-4 w-4" />
              <span className="font-semibold">Technical</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="foundation" className="animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-7">
              <AssessmentRadar 
                title="Foundation Workplace Skills"
                description="Core interpersonal and behavioral competencies."
                data={foundationData}
                targetData={foundationTarget}
                color="#3b82f6"
              />
            </div>
            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-xl">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-tight mb-3">Foundation Insight</h3>
                <p className="text-blue-800 text-sm leading-relaxed italic">
                  "Your foundational skills are the bedrock of your career."
                </p>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="text-xs font-bold text-slate-400 uppercase ml-1">Focus Areas</div>
                 {Object.entries(foundationData).map(([domain, score]) => (
                   <div key={domain} className="bg-white border border-slate-200 px-4 py-3 rounded-lg flex justify-between items-center group hover:border-blue-400">
                      <span className="text-sm font-medium text-slate-700">{domain}</span>
                      <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500" style={{ width: `${((score as number) / 5) * 100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leadership" className="animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-7">
              <AssessmentRadar 
                title="Leadership Readiness"
                description="Capabilities related to strategic alignment and mentorship."
                data={leadershipData}
                targetData={leadershipTarget}
                color="#8b5cf6"
              />
            </div>
            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              <div className="p-6 bg-purple-50/50 border border-purple-100 rounded-xl">
                <h3 className="text-sm font-bold text-purple-900 uppercase tracking-tight mb-3">Leadership Insight</h3>
                <p className="text-purple-800 text-sm leading-relaxed italic">
                  "Leading requires a balance of empathy and strategy."
                </p>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="text-xs font-bold text-slate-400 uppercase ml-1">Focus Areas</div>
                 {Object.entries(leadershipData).map(([domain, score]) => (
                   <div key={domain} className="bg-white border border-slate-200 px-4 py-3 rounded-lg flex justify-between items-center group hover:border-purple-400">
                      <span className="text-sm font-medium text-slate-700">{domain}</span>
                      <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-500" style={{ width: `${((score as number) / 5) * 100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-7">
              <AssessmentRadar 
                title="Technical Excellence"
                description="Evaluation of execution quality and domain expertise."
                data={technicalData}
                targetData={technicalTarget}
                color="#10b981"
              />
            </div>
            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-tight mb-3">Technical Insight</h3>
                <p className="text-emerald-800 text-sm leading-relaxed italic">
                  "Your technical mastery defines your output quality."
                </p>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="text-xs font-bold text-slate-400 uppercase ml-1">Focus Areas</div>
                 {Object.entries(technicalData).map(([domain, score]) => (
                   <div key={domain} className="bg-white border border-slate-200 px-4 py-3 rounded-lg flex justify-between items-center group hover:border-emerald-400">
                      <span className="text-sm font-medium text-slate-700">{domain}</span>
                      <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500" style={{ width: `${((score as number) / 5) * 100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
