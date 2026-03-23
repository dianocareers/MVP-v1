'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AssessmentEntry from '@/components/assessment/AssessmentEntry';
import InterestAssessmentFlow from '@/components/assessment/InterestAssessmentFlow';
import RadarAssessmentFlow from '@/components/assessment/RadarAssessmentFlow';
import { foundationDomains, leadershipDomains, technicalDomains } from '@/services/assessment/radarQuestionBank';
import { analytics } from '@/lib/analytics';
import { ShieldCheck, Info, Sparkles, ChevronRight, Loader2 } from 'lucide-react';

type AssessmentStage = 'entry' | 'interest' | 'foundation' | 'technical' | 'leadership' | 'complete';

export default function AssessmentPage() {
  const [stage, setStage] = useState<AssessmentStage>('entry');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleEntrySelection = (path: 'interest' | 'skills') => {
    analytics.track(analytics.events.ASSESSMENT_STARTED, { path });
    setStage(path === 'interest' ? 'interest' : 'foundation');
  };

  const [results, setResults] = useState<any>({});

  const handleInterestComplete = () => {
    setStage('foundation');
  };

  const handleRadarComplete = async (
    radarType: 'foundation' | 'technical' | 'leadership', 
    scores: Record<string, number>, 
    reflections: Record<string, string>
  ) => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Save partial results
    setResults((prev: any) => ({
      ...prev,
      [radarType]: { scores, reflections }
    }));

    analytics.track(`${radarType}_radar_completed`);

    // UPDATED ORCHESTRATION FLOW: Foundation -> Technical -> Leadership
    if (radarType === 'foundation') setStage('technical');
    else if (radarType === 'technical') setStage('leadership');
    else if (radarType === 'leadership') {
      analytics.track(analytics.events.ASSESSMENT_COMPLETED);
      setStage('complete');
    }
    
    setIsSaving(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col relative bg-white/40 backdrop-blur-sm rounded-3xl border border-[#1A1A1A]/5 shadow-sm overflow-hidden">
      {isSaving && (
        <div className="absolute inset-0 bg-[#F5F2E9]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
           <div className="relative">
              <Loader2 className="w-16 h-16 text-[#C89B3C] animate-spin" />
              <Sparkles className="w-6 h-6 text-[#C89B3C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
           </div>
           <p className="font-bold text-[#1A1A1A] text-lg tracking-tight">Syncing your career intelligence...</p>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        {stage === 'entry' && (
          <AssessmentEntry onSelectPath={handleEntrySelection} />
        )}

        {stage === 'interest' && (
          <InterestAssessmentFlow 
            onComplete={handleInterestComplete} 
            onSkip={() => setStage('foundation')} 
          />
        )}

        {stage === 'foundation' && (
          <RadarAssessmentFlow 
            assessmentType="foundation"
            title="Foundation Radar"
            subtitle="Phase 1 of 3"
            description="Assess your baseline workplace habits. Remember, score based on the LAST 3 MONTHS."
            domains={foundationDomains}
            onComplete={(scores, reflections) => handleRadarComplete('foundation', scores, reflections)}
          />
        )}

        {stage === 'technical' && (
          <RadarAssessmentFlow 
            assessmentType="technical"
            title="Technical Radar"
            subtitle="Phase 2 of 3"
            description="Measure your specific domain execution. Remember, score based on the LAST 3 MONTHS."
            domains={technicalDomains}
            onComplete={(scores, reflections) => handleRadarComplete('technical', scores, reflections)}
          />
        )}

        {stage === 'leadership' && (
          <RadarAssessmentFlow 
            assessmentType="leadership"
            title="Leadership Radar"
            subtitle="Phase 3 of 3"
            description="Evaluate your strategic and interpersonal impact. Remember, score based on the LAST 3 MONTHS."
            domains={leadershipDomains}
            onComplete={(scores, reflections) => handleRadarComplete('leadership', scores, reflections)}
          />
        )}

        {stage === 'complete' && (
          <div className="max-w-4xl mx-auto py-32 px-10 text-center animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative inline-block mb-12">
               <div className="w-32 h-32 bg-[#1A1A1A] rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-3 group hover:rotate-0 transition-transform duration-500">
                  <ShieldCheck className="h-16 w-16 text-[#C89B3C]" />
               </div>
               <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#C89B3C] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-white" />
               </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-6 tracking-tighter leading-tight">
              Diagnostic Integrity <br/><span className="text-[#C89B3C]">100% Verified.</span>
            </h1>
            
            <p className="text-[#1A1A1A]/50 mb-12 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Your Foundation, Technical, and Leadership vectors have been successfully synthesized. Your career intelligence is now ready for deployment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
               {[
                 { label: 'Foundation', status: 'Synthesized' },
                 { label: 'Technical', status: 'Baselined' },
                 { label: 'Leadership', status: 'Calibrated' }
               ].map(phase => (
                 <div key={phase.label} className="p-6 bg-white border border-[#1A1A1A]/5 rounded-3xl shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-2">{phase.label}</p>
                    <p className="text-sm font-black text-[#1A1A1A]">{phase.status}</p>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => router.push('/dashboard')}
              className="group relative px-12 py-6 bg-[#1A1A1A] text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#C89B3C] hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-[#1A1A1A]/20 active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-4">
                Enter Command Dashboard
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
