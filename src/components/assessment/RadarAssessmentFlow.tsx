'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadarDomainDef } from '@/services/assessment/radarQuestionBank';
import { AssessmentType } from '@/types/database';
import { useAssessment } from '@/hooks/useAssessment';
import { cn } from '@/lib/utils';
import { ShieldCheck, Info, Sparkles, ChevronRight } from 'lucide-react';

export interface RadarAssessmentFlowProps {
  assessmentType: AssessmentType;
  title: string;
  subtitle?: string;
  description: string;
  domains: RadarDomainDef[];
  onComplete: (domainScores: Record<string, number>, reflections: Record<string, string>) => void;
}

export default function RadarAssessmentFlow({
  assessmentType,
  title,
  subtitle,
  description,
  domains,
  onComplete,
}: RadarAssessmentFlowProps) {
  const {
    currentStep: currentDomainIndex,
    answers,
    reflections,
    handleAnswer,
    handleReflection,
    nextStep,
    progressPercentage,
  } = useAssessment<number>({
    totalSteps: domains.length,
    onComplete: (finalAnswers, finalReflections) => {
      onComplete(finalAnswers, finalReflections || {});
    }
  });

  const currentDomain = domains[currentDomainIndex];
  const currentReflection = reflections[currentDomain.id] || '';

  const allCurrentQuestionsAnswered = currentDomain.questions.every(
    (q) => answers[q.id] !== undefined
  );

  const isReflectionValid = currentReflection.trim().length > 10;
  const canProceed = allCurrentQuestionsAnswered && isReflectionValid;

  const handleScoreSelect = (questionId: string, score: number) => {
    handleAnswer(questionId, score);
  };

  const handleNextDomain = () => {
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-8">
      
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {subtitle && (
            <span className="px-3 py-1 bg-[#C89B3C]/10 text-[#C89B3C] text-xs font-black uppercase tracking-widest rounded-full">
              {subtitle}
            </span>
          )}
          <div className="h-px flex-1 bg-[#1A1A1A]/5" />
        </div>
        
        <h1 className="text-4xl font-black text-[#1A1A1A] mb-3 tracking-tight">{title}</h1>
        <p className="text-[#1A1A1A]/60 font-medium text-lg leading-relaxed mb-8">{description}</p>

        {/* Brand Banner */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl mb-10 flex items-start gap-4 shadow-xl shadow-[#1A1A1A]/10 border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-[#C89B3C] flex items-center justify-center shrink-0">
            <Info className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">Retrospective Focus</p>
            <p className="text-white/60 text-sm font-medium">Please evaluate your behavior based strictly on the <span className="text-[#C89B3C] font-black underline underline-offset-4 decoration-2">LAST 3 MONTHS</span>.</p>
          </div>
        </div>

        {/* Progress System */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <p className="text-sm font-black text-[#1A1A1A] tracking-tight uppercase">
              Phase Progress
            </p>
            <p className="text-sm font-bold text-[#1A1A1A]/40 uppercase">
              Domain {currentDomainIndex + 1} of {domains.length}: <span className="text-[#1A1A1A]">{currentDomain.name}</span>
            </p>
          </div>
          <div className="w-full bg-[#1A1A1A]/5 h-3 rounded-full overflow-hidden p-0.5 border border-[#1A1A1A]/5">
            <div 
              className="bg-[#C89B3C] h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_15px_rgba(200,155,60,0.3)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Domain Questions */}
      <div className="space-y-8 mb-16">
        {currentDomain.questions.map((q, index) => (
          <div key={q.id} className="group bg-white/60 p-8 rounded-3xl border border-[#1A1A1A]/5 shadow-sm transition-all hover:shadow-md hover:bg-white hover:border-[#C89B3C]/20">
            <div className="flex items-start gap-4 mb-8">
              <span className="w-8 h-8 rounded-lg bg-[#1A1A1A]/5 flex items-center justify-center text-xs font-black text-[#1A1A1A]/40 group-hover:bg-[#C89B3C] group-hover:text-white transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A] leading-snug">
                {q.text}
              </h3>
            </div>
            
            <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreSelect(q.id, score)}
                  className={cn(
                    "relative flex flex-col items-center justify-center h-20 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                    answers[q.id] === score 
                      ? 'border-[#C89B3C] bg-[#C89B3C] text-white shadow-xl shadow-[#C89B3C]/20 scale-105 z-10' 
                      : 'border-[#1A1A1A]/5 bg-white text-[#1A1A1A]/40 hover:border-[#1A1A1A]/20 hover:text-[#1A1A1A]'
                  )}
                >
                  <span className="text-2xl font-black">{score}</span>
                  {answers[q.id] === score && (
                    <div className="absolute top-1 right-1">
                      <ShieldCheck className="w-3 h-3 text-white/50" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between max-w-2xl mx-auto mt-6 px-2 text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-[0.2em]">
              <span>Rarely</span>
              <span>Consistently</span>
            </div>
          </div>
        ))}
      </div>

      {/* Required Reflection Area */}
      {allCurrentQuestionsAnswered && (
        <div className="bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-white/10 mb-12 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-[#C89B3C]" />
            <h4 className="text-2xl font-black text-white tracking-tight">Intelligence Reflection</h4>
          </div>
          
          <p className="text-white/60 text-lg leading-relaxed mb-10 font-medium italic border-l-4 border-[#C89B3C] pl-6">
            "{currentDomain.reflectionPrompt}"
          </p>
          
          <div className="relative">
            <Textarea 
              placeholder="Structure your thoughts here... (minimum 10 characters required)"
              className="min-h-[160px] bg-white/5 border-white/10 text-white placeholder:text-white/20 text-lg p-6 rounded-2xl focus:border-[#C89B3C] transition-colors resize-none"
              value={currentReflection}
              onChange={(e) => handleReflection(currentDomain.id, e.target.value)}
            />
            <div className="absolute bottom-4 right-6 flex items-center gap-3">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                isReflectionValid ? "text-[#C89B3C]" : "text-white/30"
              )}>
                {currentReflection.trim().length} / 10 CHARS
              </span>
              <div className={cn(
                "w-2 h-2 rounded-full transition-colors",
                isReflectionValid ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-white/10"
              )} />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-end pt-12 border-t border-[#1A1A1A]/5">
        <button 
          onClick={handleNextDomain}
          disabled={!canProceed}
          className={cn(
            "group flex items-center gap-4 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl",
            canProceed 
              ? "bg-[#C89B3C] text-white hover:bg-[#B68A35] hover:-translate-y-1 shadow-[#C89B3C]/20" 
              : "bg-[#1A1A1A]/5 text-[#1A1A1A]/20 cursor-not-allowed border border-[#1A1A1A]/5 shadow-none"
          )}
        >
          {currentDomainIndex === domains.length - 1 ? 'Finalize Phase' : 'Next Domain'}
          <ChevronRight className={cn(
            "h-5 w-5 transition-transform group-hover:translate-x-1",
            !canProceed && "opacity-20"
          )} />
        </button>
      </div>

    </div>
  );
}
