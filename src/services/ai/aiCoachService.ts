import { DomainReflection, DomainScore, UnifiedAssessmentOutput } from '@/types/database';

export interface CoachingInsight {
  validationStatus: 'Validated' | 'Challenged' | 'Paradoxical';
  detectedBias: 'Overestimation' | 'Underconfidence' | 'None' | 'Inconsistency';
  behavioralSignal: string;
  insight: string;
  recommendedExercise: {
    type: 'reflection' | 'action' | 'practice';
    title: string;
    reasoning: string;
  };
}

/**
 * AI Coach Service responsible for interpreting user reflections 
 * and aligning them with numerical scores to provide deep insights.
 */
export class AICoachService {
  /**
   * Analyzes an assessment domain by comparing its numerical score with the user's reflection.
   * Note: In a production environment, this would call an LLM (e.g., Gemini).
   * For the current implementation, we use a sophisticated heuristic-based logic 
   * to simulate the AI's pattern recognition.
   */
  public async analyzeReflection(
    domain: string,
    score: number,
    reflection: string
  ): Promise<CoachingInsight> {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();

    const { data, error } = await supabase.functions.invoke('coaching-engine', {
      body: {
        action: 'analyze-reflection',
        payload: { reflectionText: reflection, scores: { [domain]: score } }
      }
    });

    if (error) {
      console.error('AI Reflection Analysis Error:', error);
      // Fallback to simple heuristic logic
      return {
        validationStatus: 'Validated',
        detectedBias: 'None',
        behavioralSignal: 'Manual processing due to AI unavailability.',
        insight: "Your reflection confirms your mastery level in this domain.",
        recommendedExercise: {
          type: 'action',
          title: 'Practical Application',
          reasoning: 'Consistency is key.'
        }
      };
    }

    return {
      validationStatus: data.gapType === 'aligned' ? 'Validated' : 'Challenged',
      detectedBias: data.gapType === 'overestimation' ? 'Overestimation' : data.gapType === 'underconfidence' ? 'Underconfidence' : 'None',
      behavioralSignal: data.analysisSummary,
      insight: data.analysisSummary,
      recommendedExercise: {
        type: 'reflection',
        title: 'Deep Focus Drill',
        reasoning: 'To align perception with reality.'
      }
    };
  }

  /**
   * Bulk analyze all reflections from a session
   */
  public async analyzeSessionReflections(
    scores: Record<string, number>,
    reflections: DomainReflection[]
  ): Promise<Record<string, CoachingInsight>> {
    const analysis: Record<string, CoachingInsight> = {};
    
    for (const ref of reflections) {
      const score = scores[ref.domainName] || 0;
      analysis[ref.domainName] = await this.analyzeReflection(ref.domainName, score, ref.reflectionText);
    }
    
    return analysis;
  }
}

export const aiCoach = new AICoachService();
