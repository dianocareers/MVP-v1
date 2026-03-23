import { UnifiedAssessmentOutput } from '@/services/assessment/scoringEngine';

export interface ReflectionInsight {
  themes: string[];
  strengths: string[];
  risks: string[];
  confidence_gap: boolean;
  gap_type: 'overestimation' | 'underconfidence' | 'aligned';
  analysis_summary: string;
}

/**
 * Reflection Analysis Engine
 * Processes qualitative text and quantitative scores to generate behavioral insights.
 */
export class ReflectionAnalysisEngine {
  public async analyzeReflection(
    reflectionText: string,
    scores: Record<string, number>
  ): Promise<ReflectionInsight> {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();

    const { data, error } = await supabase.functions.invoke('coaching-engine', {
      body: {
        action: 'analyze-reflection',
        payload: { reflectionText, scores }
      }
    });

    if (error) {
      console.error('AI Reflection Analysis Error:', error);
      return {
        themes: ['General Performance'],
        strengths: ['Analytical thinking'],
        risks: [],
        confidence_gap: false,
        gap_type: 'aligned',
        analysis_summary: "Manual processing fallback due to connection issues."
      };
    }

    return {
      themes: data.themes,
      strengths: data.strengths,
      risks: data.risks,
      confidence_gap: data.confidenceGap,
      gap_type: data.gapType,
      analysis_summary: data.analysisSummary
    };
  }
}

export const reflectionAnalysisEngine = new ReflectionAnalysisEngine();
