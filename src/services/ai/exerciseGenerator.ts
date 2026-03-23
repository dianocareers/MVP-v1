import { ExerciseType, MicroExercise } from '@/types/database';
import { invokeCoachingEngine } from '@/lib/supabase/functions';
import { APP_CONFIG } from '@/lib/constants';

export interface GeneratedExercise extends Partial<MicroExercise> {
  instructions: string;
  reflectionPrompt: string;
  evaluationCriteria: string[];
}

/**
 * Micro-Exercise Generation Engine
 * Responsible for creating practical, time-bound tasks tailored to user gaps.
 */
export class ExerciseGenerator {
  public async generateExercise(params: {
    domain: string;
    subskill: string;
    level: 'Emerging' | 'Developing' | 'Proficient' | 'Advanced';
    difficultyAdjustment?: 'increment' | 'decrement' | 'maintain';
  }): Promise<GeneratedExercise> {
    const { domain, subskill, level } = params;

    try {
      return await invokeCoachingEngine<GeneratedExercise>('generate-exercise', {
        payload: { domain, subskill, level }
      });
    } catch (error) {
      console.error('AI Exercise Generation Error:', error);
      // Fallback logic
      return {
        title: `Practice ${subskill}: Foundational Strategy`,
        durationMinutes: 10,
        type: 'practice',
        instructions: "Perform a 10-minute task focused on applying basic principles.",
        reflectionPrompt: "How did it go?",
        evaluationCriteria: ["Completion of task"]
      };
    }
  }

  private getVerb(level: string): string {
    const verbs: Record<string, string> = {
      Emerging: 'Foundational',
      Developing: 'Operational',
      Proficient: 'Strategic',
      Advanced: 'Mastery'
    };
    return verbs[level] || 'Applied';
  }

  private getAppropriateType(domain: string): ExerciseType {
    if (domain === 'Technical') return 'practice';
    if (domain === 'Leadership') return 'action';
    return 'reflection';
  }

  private getInstructions(domain: string, subskill: string, level: string): string {
    // Simplified instruction logic simulating personalized AI output
    if (subskill === 'Active Listening') {
      return "1. In your next meeting, wait for a speaker to finish a complex point.\n2. Paraphrase their point back: 'If I understand correctly, you're saying...'\n3. Do not add your opinion until they confirm you're correct.";
    }
    if (subskill === 'Delegation') {
      return "1. Identify a task you usually do because it's 'faster'.\n2. Assign it to a peer or junior with a clear definition of 'done'.\n3. Set a check-in time instead of jumping in early.";
    }
    return `Perform a 10-minute task focused on applying ${subskill} principles within your current ${domain} context. Focus on consistency and intentionality.`;
  }

  private getReflectionPrompt(subskill: string): string {
    return `What was the most surprising reaction you noticed when you applied this ${subskill} technique?`;
  }
}

export const exerciseGenerator = new ExerciseGenerator();
