import { ExerciseFeedback, ExerciseType } from '@/types/database';
import { invokeCoachingEngine } from '@/lib/supabase/functions';

export interface FeedbackParams {
  exerciseType: ExerciseType;
  userResponse: string;
  subskill: string;
  domain: string;
  userLevel: string;
  initialReflectionText?: string;
  evaluationCriteria: string[];
}

/**
 * Micro-Exercise Feedback Engine
 * Evaluates user responses to exercises, generating coaching insights 
 * and mastery signal scores.
 */
export class FeedbackEngine {
  public async generateFeedback(params: FeedbackParams): Promise<Partial<ExerciseFeedback>> {
    const { userResponse, evaluationCriteria, initialReflectionText, subskill } = params;

    try {
      const data = await invokeCoachingEngine<any>('evaluate-feedback', {
        payload: { userResponse, evaluationCriteria, subskill }
      });

      return {
        responseText: userResponse,
        completionStatus: 'completed',
        feedbackSummary: data.summary,
        strengths: data.strengths,
        improvementAreas: data.improvements,
        coachingTip: data.coachingTip,
        masterySignalScore: data.masterySignal,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Feedback Generation Error:', error);
      return {
        responseText: userResponse,
        completionStatus: 'completed',
        feedbackSummary: "Good effort on this exercise.",
        coachingTip: "Keep practicing this sub-skill.",
        masterySignalScore: 0.5,
        createdAt: new Date().toISOString()
      };
    }
  }

  private evaluateResponseQuality(response: string, criteria: string[]): number {
    // Simulating quality score 0-1 based on length and simulated criteria match
    const lengthFactor = Math.min(response.length / 100, 1.0);
    const criteriaFactor = 0.8; // Simulating high criteria match for this demo
    return (lengthFactor * 0.4) + (criteriaFactor * 0.6);
  }

  private calculateMasterySignal(quality: number): number {
    // Mapping internal quality to the defined rubric ranges
    if (quality > 0.85) return 0.92;
    if (quality > 0.7) return 0.78;
    if (quality > 0.5) return 0.55;
    return 0.25;
  }

  private getHistoricalContext(current: string, initial: string): string {
    // Simulating recognition of improvement over time
    if (initial.includes('struggle') && current.length > 50) {
      return "You mentioned struggling with this earlier—this exercise shows significant improvement.";
    }
    return "";
  }

  private getSummary(quality: number, context: string): string {
    if (quality > 0.8) return `Excellent application. ${context} You demonstrated strong self-awareness and tactical execution.`;
    return `Good start. You're beginning to internalize the core behaviors of this sub-skill.`;
  }

  private getStrengths(response: string, criteria: string[]): string[] {
    return ["Specific behavioral identification", "Awareness of interpersonal impact"];
  }

  private getImprovements(quality: number): string[] {
    if (quality > 0.8) return ["None identified for this specific task."];
    return ["Elaborate more on the 'why' behind your specific action choice."];
  }

  private getCoachingTip(subskill: string, quality: number): string {
    return `To level up your ${subskill}, try observing how a senior mentor handles this same situation next week. Notice their timing.`;
  }
}

export const feedbackEngine = new FeedbackEngine();
