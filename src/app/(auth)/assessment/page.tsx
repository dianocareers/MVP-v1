'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AssessmentEntry from '@/components/assessment/AssessmentEntry';
import InterestAssessmentFlow from '@/components/assessment/InterestAssessmentFlow';
import RadarAssessmentFlow from '@/components/assessment/RadarAssessmentFlow';
import { foundationDomains, leadershipDomains, technicalDomains } from '@/services/assessment/radarQuestionBank';
import { analytics } from '@/lib/analytics';
import { AlertCircle, Loader2 } from 'lucide-react';

type AssessmentStage = 'entry' | 'interest' | 'foundation' | 'leadership' | 'technical' | 'complete';

export default function AssessmentPage() {
  const [stage, setStage] = useState<AssessmentStage>('entry');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleEntrySelection = (path: 'interest' | 'skills') => {
    analytics.track(analytics.events.ASSESSMENT_STARTED, { path });
    setStage(path === 'interest' ? 'interest' : 'foundation');
  };

  // We'll eventually save these to Supabase, holding them in memory for now
  const [results, setResults] = useState<any>({});

  const handleInterestComplete = () => {
    setStage('foundation');
  };

  const handleRadarComplete = async (
    radarType: 'foundation' | 'leadership' | 'technical', 
    scores: Record<string, number>, 
    reflections: Record<string, string>
  ) => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Save partial results
    setResults((prev: any) => ({
      ...prev,
      [radarType]: { scores, reflections }
    }));

    analytics.track(`${radarType}_radar_completed`);

    // Orchestration flow
    if (radarType === 'foundation') setStage('leadership');
    if (radarType === 'leadership') setStage('technical');
    if (radarType === 'technical') {
      analytics.track(analytics.events.ASSESSMENT_COMPLETED);
      setStage('complete');
    }
    
    setIsSaving(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
           <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
           <p className="font-bold text-slate-900">Calculating your trajectory...</p>
        </div>
      )}
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
          description="Assess your baseline workplace habits. Remember, score based on the LAST 3 MONTHS."
          domains={foundationDomains}
          onComplete={(scores, reflections) => handleRadarComplete('foundation', scores, reflections)}
        />
      )}

      {stage === 'leadership' && (
        <RadarAssessmentFlow 
          assessmentType="leadership"
          title="Leadership Radar"
          description="Evaluate your strategic and interpersonal impact. Remember, score based on the LAST 3 MONTHS."
          domains={leadershipDomains}
          onComplete={(scores, reflections) => handleRadarComplete('leadership', scores, reflections)}
        />
      )}

      {stage === 'technical' && (
        <RadarAssessmentFlow 
          assessmentType="technical"
          title="Technical Radar"
          description="Measure your specific domain execution. Remember, score based on the LAST 3 MONTHS."
          domains={technicalDomains}
          onComplete={(scores, reflections) => handleRadarComplete('technical', scores, reflections)}
        />
      )}

      {stage === 'complete' && (
        <div className="max-w-3xl mx-auto pt-16 pb-12 px-6 text-center animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Diagnostics Complete</h1>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Your Foundation, Leadership, and Technical baselines have been recorded.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors"
          >
            Construct My Growth Plan
          </button>
        </div>
      )}
    </div>
  );
}
