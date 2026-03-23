'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadarDomainDef } from '@/services/assessment/radarQuestionBank';
import { AssessmentType } from '@/types/database';

export interface RadarAssessmentFlowProps {
  assessmentType: AssessmentType;
  title: string;
  description: string;
  domains: RadarDomainDef[];
  onComplete: (domainScores: Record<string, number>, reflections: Record<string, string>) => void;
}

import { useAssessment } from '@/hooks/useAssessment';

export default function RadarAssessmentFlow({
  assessmentType,
  title,
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

  // Helper to check if all questions in the current domain have answers
  const allCurrentQuestionsAnswered = currentDomain.questions.every(
    (q) => answers[q.id] !== undefined
  );

  // Requirement: reflection text must be > 10 characters
  const isReflectionValid = currentReflection.trim().length > 10;
  const canProceed = allCurrentQuestionsAnswered && isReflectionValid;

  const handleScoreSelect = (questionId: string, score: number) => {
    handleAnswer(questionId, score);
  };

  const handleNextDomain = () => {
    nextStep();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600 mb-6">{description}</p>

        {/* CRITICAL REMINDER BANNER */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md mb-6">
          <p className="text-amber-900 font-medium">
            Answer based on your behavior in the past 3 months
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-slate-900 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          Domain {currentDomainIndex + 1} of {domains.length}: {currentDomain.name}
        </p>
      </div>

      {/* Domain Container */}
      <div className="space-y-12 mb-12">
        {currentDomain.questions.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm transition-all hover:border-slate-300">
            <h3 className="text-lg font-medium text-slate-900 mb-6">
              {index + 1}. {q.text}
            </h3>
            
            <div className="grid grid-cols-5 gap-2 max-w-xl mx-auto">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreSelect(q.id, score)}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all
                    ${answers[q.id] === score 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-105' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }
                  `}
                >
                  <span className="text-2xl font-bold mb-1">{score}</span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between max-w-xl mx-auto mt-3 px-2 text-xs font-medium text-slate-400">
              <span>Rarely / Strongly Disagree</span>
              <span>Consistently / Strongly Agree</span>
            </div>
          </div>
        ))}
      </div>

      {/* Required Reflection Area */}
      {allCurrentQuestionsAnswered && (
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 animate-in fade-in slide-in-from-bottom-4">
          <h4 className="text-lg font-semibold text-slate-900 mb-2">Domain Reflection</h4>
          <p className="text-slate-600 text-sm mb-4">
            {currentDomain.reflectionPrompt}
          </p>
          <Textarea 
            placeholder="Write your reflection here... (minimum 10 characters)"
            className="min-h-[120px] bg-white text-base"
            value={currentReflection}
            onChange={(e) => handleReflection(currentDomain.id, e.target.value)}
          />
          {!isReflectionValid && currentReflection.length > 0 && (
            <p className="text-xs text-red-500 mt-2 font-medium">Please expand on your reflection slightly (min 10 characters).</p>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-end pt-6 border-t border-slate-100">
        <Button 
          onClick={handleNextDomain}
          disabled={!canProceed}
          size="lg"
          className="px-8"
        >
          {currentDomainIndex === domains.length - 1 ? 'Complete Assessment' : 'Next Domain'}
        </Button>
      </div>

    </div>
  );
}
