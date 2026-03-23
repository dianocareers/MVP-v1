'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AssessmentAnswers, calculateInterestDomainScores, normalizeInterestProfile, getTopMotivators } from '@/services/assessment/scoringEngine';
import { motivatorsQuestions } from '@/services/assessment/questionBank';
import { getCareerClusterRecommendations, CareerClusterRecommendation } from '@/services/assessment/mappingEngine';
import { MotivatorDomain } from '@/types/database';
import { useAssessment } from '@/hooks/useAssessment';
import { cn } from '@/lib/utils';
import { Sparkles, Trophy, Target, ArrowRight, Lightbulb } from 'lucide-react';

interface InterestAssessmentFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function InterestAssessmentFlow({ onComplete, onSkip }: InterestAssessmentFlowProps) {
  const [topMotivators, setTopMotivators] = useState<MotivatorDomain[]>([]);
  const [normalizedScores, setNormalizedScores] = useState<Partial<Record<MotivatorDomain, number>>>({});
  const [recommendations, setRecommendations] = useState<CareerClusterRecommendation[]>([]);

  const {
    currentStep: currentQuestionIndex,
    answers,
    handleAnswer,
    nextStep,
    isComplete,
    progressPercentage: progress
  } = useAssessment<number>({
    totalSteps: motivatorsQuestions.length,
    onComplete: (finalAnswers) => {
      finishAssessment(finalAnswers);
    }
  });

  const handleAnswerClick = (value: 0 | 1 | 2) => {
    const question = motivatorsQuestions[currentQuestionIndex];
    handleAnswer(question.id, value);
    nextStep();
  };

  const finishAssessment = (finalAnswers: AssessmentAnswers) => {
    const rawScores = calculateInterestDomainScores(finalAnswers, motivatorsQuestions);
    const profile = normalizeInterestProfile(rawScores);
    setNormalizedScores(profile);
    const top2 = getTopMotivators(rawScores, 2);
    setTopMotivators(top2);
    const clusters = getCareerClusterRecommendations(top2);
    setRecommendations(clusters);
  };

  const handleSkip = () => {
    onSkip();
  };

  if (isComplete) {
    return (
      <div className="max-w-5xl mx-auto space-y-16 py-12 px-8 animate-in fade-in duration-1000">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C89B3C]/10 text-[#C89B3C] rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> Discovery Complete
          </div>
          <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">Your Career <span className="text-[#C89B3C]">DNA</span></h1>
          <p className="text-xl text-[#1A1A1A]/60 font-medium max-w-2xl mx-auto">We've identified the intrinsic factors that fuel your peak performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Section 1: Top Drivers */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A1A1A] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-8 tracking-tight flex items-center gap-3">
                  <Trophy className="text-[#C89B3C] w-8 h-8" />
                  Primary Motivators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <p className="text-white/60 font-medium leading-relaxed">
                      Your dominant drivers indicate a strong alignment with environments that prioritize these specific values.
                    </p>
                    <div className="flex flex-col gap-4">
                      {topMotivators.map(m => (
                        <div key={m} className="bg-white/10 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 group-hover:bg-[#C89B3C]/20 transition-colors">
                          <div className="w-3 h-3 bg-[#C89B3C] rounded-full shadow-[0_0_10px_rgba(200,155,60,0.5)]" />
                          <span className="font-black uppercase tracking-widest text-sm">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {Object.entries(normalizedScores).sort((a,b) => b[1]! - a[1]!).slice(0, 4).map(([domain, score]) => (
                      <div key={domain} className="space-y-2">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/40">
                          <span>{domain}</span>
                          <span>{score}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5 p-0.5">
                          <div 
                            className="bg-[#C89B3C] h-full rounded-full transition-all duration-1000 delay-500" 
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            </div>

            {/* Career Clusters */}
            <div className="space-y-8 text-left">
              <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-3">
                <Target className="text-[#C89B3C] w-8 h-8" />
                Strategic Alignments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.slice(0, 2).map((rec, i) => (
                  <div key={i} className="group bg-white p-8 rounded-[2rem] border border-[#1A1A1A]/5 shadow-sm hover:shadow-xl hover:border-[#C89B3C]/20 transition-all duration-500">
                    <h3 className="text-xl font-black text-[#1A1A1A] mb-3 group-hover:text-[#C89B3C] transition-colors">{rec.title}</h3>
                    <p className="text-sm font-medium text-[#1A1A1A]/60 mb-6 leading-relaxed">{rec.description}</p>
                    <div className="bg-[#F5F2E9] p-5 rounded-2xl border border-[#1A1A1A]/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-[#C89B3C]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Reason for Fit</span>
                      </div>
                      <p className="text-xs font-bold text-[#1A1A1A]/80 leading-relaxed italic">
                        "{rec.matchReason}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#C89B3C] text-white p-10 rounded-[3rem] shadow-2xl shadow-[#C89B3C]/20 flex flex-col items-center text-center space-y-8 sticky top-32">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md">
                <ArrowRight className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3">Begin Diagnostic</h3>
                <p className="text-white/80 font-medium text-sm leading-relaxed">
                  Your Motivators are mapped. Now let's calculate your specific capability scores across the Tri-Radar.
                </p>
              </div>
              <button 
                onClick={onComplete}
                className="w-full py-5 bg-[#1A1A1A] text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-black transition-all hover:-translate-y-1 shadow-2xl shadow-black/20"
              >
                Start Radar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = motivatorsQuestions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col py-12 px-8 animate-in fade-in duration-500">
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" />
             <h1 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.3em]">Motivations Engine</h1>
          </div>
          <button 
            onClick={handleSkip}
            className="text-xs font-black text-[#1A1A1A]/40 uppercase tracking-widest hover:text-[#1A1A1A] transition-colors"
          >
            Skip Assessment
          </button>
        </div>
        
        <div className="w-full bg-[#1A1A1A]/5 h-3 rounded-full overflow-hidden p-0.5 border border-[#1A1A1A]/5">
          <div 
            className="bg-[#1A1A1A] h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_15px_rgba(0,0,0,0.1)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-widest">Intrinsic Drive Mapping</p>
          <p className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">Question {currentQuestionIndex + 1} / {motivatorsQuestions.length}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="bg-white p-12 md:p-20 rounded-[4rem] text-center space-y-16 shadow-sm border border-[#1A1A1A]/5 transition-all duration-500 transform hover:scale-[1.02]">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight tracking-tight px-4">
            "{currentQ.text}"
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Not like me', value: 0 },
              { label: 'Sometimes', value: 1 },
              { label: 'Very much like me', value: 2 }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswerClick(opt.value as 0 | 1 | 2)}
                className={cn(
                  "py-6 px-10 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300",
                  opt.value === 2 
                    ? "bg-[#C89B3C] text-white shadow-xl shadow-[#C89B3C]/20 hover:bg-[#B68A35] hover:scale-105" 
                    : "bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:bg-[#1A1A1A] hover:text-white"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
