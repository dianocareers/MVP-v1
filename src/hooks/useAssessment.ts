import { useState, useCallback } from 'react';

export interface UseAssessmentOptions<TAnswer, TOutput> {
  totalSteps: number;
  onComplete: (answers: Record<string, TAnswer>, reflections?: Record<string, string>) => void;
  initialAnswers?: Record<string, TAnswer>;
  initialReflections?: Record<string, string>;
}

/**
 * A shared hook to manage assessment state, progress, and transitions.
 * Supports both step-by-step (Interest) and domain-by-domain (Radar) assessment patterns.
 */
export function useAssessment<TAnswer, TOutput = any>({
  totalSteps,
  onComplete,
  initialAnswers = {},
  initialReflections = {}
}: UseAssessmentOptions<TAnswer, TOutput>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, TAnswer>>(initialAnswers);
  const [reflections, setReflections] = useState<Record<string, string>>(initialReflections);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback((id: string, value: TAnswer) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleReflection = useCallback((id: string, text: string) => {
    setReflections(prev => ({ ...prev, [id]: text }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
      return false;
    } else {
      setIsComplete(true);
      onComplete(answers, reflections);
      return true;
    }
  }, [currentStep, totalSteps, answers, reflections, onComplete]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);

  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return {
    currentStep,
    setCurrentStep,
    answers,
    setAnswers,
    reflections,
    setReflections,
    handleAnswer,
    handleReflection,
    nextStep,
    prevStep,
    progressPercentage,
    isComplete,
    setIsComplete,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1
  };
}
