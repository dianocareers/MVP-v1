'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AssessmentAnswers, calculateInterestDomainScores, normalizeInterestProfile, getTopMotivators } from '@/services/assessment/scoringEngine';
import { motivatorsQuestions } from '@/services/assessment/questionBank';
import { getCareerClusterRecommendations, CareerClusterRecommendation } from '@/services/assessment/mappingEngine';
import { MotivatorDomain } from '@/types/database';

interface InterestAssessmentFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

import { useAssessment } from '@/hooks/useAssessment';

export default function InterestAssessmentFlow({ onComplete, onSkip }: InterestAssessmentFlowProps) {
  // Results State
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
    // 1. Calculate raw domain sums
    const rawScores = calculateInterestDomainScores(finalAnswers, motivatorsQuestions);
    
    // 2. Normalize out of 100% distribution across domains
    const profile = normalizeInterestProfile(rawScores);
    setNormalizedScores(profile);
    
    // 3. Extract top 2 for the mapping engine
    const top2 = getTopMotivators(rawScores, 2);
    setTopMotivators(top2);
    
    // 4. Map to exact career clusters
    const clusters = getCareerClusterRecommendations(top2);
    setRecommendations(clusters);
  };

  const handleSkip = () => {
    onSkip();
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 pb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your Career DNA</h1>
          <p className="text-xl text-slate-600">Here's what intrinsically motivates you.</p>
        </div>

        {/* Section 1: What Drives You */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">What Drives You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-slate-600">Your top drivers dictate the type of environment and problems you'll find most fulfilling.</p>
              <div className="flex flex-wrap gap-2">
                {topMotivators.map(m => (
                  <span key={m} className="bg-slate-900 text-white px-4 py-2 rounded-full font-medium shadow-sm">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(normalizedScores).sort((a,b) => b[1] - a[1]).map(([domain, score]) => (
                <div key={domain}>
                  <div className="flex justify-between mb-1 text-sm font-medium text-slate-700">
                    <span>{domain}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-slate-400 h-2.5 rounded-full" style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Where You Might Thrive */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Recommended Career Clusters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{rec.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{rec.description}</p>
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-md text-sm">
                  <span className="font-semibold block mb-1">Why it fits:</span>
                  {rec.matchReason}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-8 border-t border-slate-200">
          <Button onClick={onComplete} size="lg" className="px-8 bg-slate-900">
            Next: Validate Technical Skills
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = motivatorsQuestions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto min-h-[60vh] flex flex-col pt-12">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Motivations Profile</h1>
          <Button variant="ghost" className="text-slate-500 text-sm" onClick={handleSkip}>
            Skip this optional step
          </Button>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-slate-900 h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-slate-500 mt-2 font-medium">Question {currentQuestionIndex + 1} of {motivatorsQuestions.length}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white p-8 md:p-12 border border-slate-200 shadow-sm rounded-2xl text-center space-y-12 min-h-[300px] flex flex-col justify-center transition-opacity duration-300">
          <h2 className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed">
            "{currentQ.text}"
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="py-6 text-base font-medium text-slate-600 hover:text-slate-900"
              onClick={() => handleAnswerClick(0)}
            >
              Not like me
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="py-6 text-base font-medium text-slate-600 hover:text-slate-900"
              onClick={() => handleAnswerClick(1)}
            >
              Sometimes
            </Button>
            <Button 
              size="lg" 
              className="py-6 text-base font-medium bg-slate-900 hover:bg-slate-800"
              onClick={() => handleAnswerClick(2)}
            >
              Very much like me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
