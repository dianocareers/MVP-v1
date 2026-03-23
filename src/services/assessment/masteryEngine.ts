import { ExerciseFeedback, ProgressStatus, UserProgress } from '@/types/database';

export interface MasteryEvaluation {
  status: ProgressStatus;
  currentScore: number;
  unlockedNext: boolean;
  difficultySignal: 'increment' | 'decrement' | 'maintain';
}

/**
 * Sub-Skill Mastery Evaluation System
 * Manages the state machine for sub-skill progression and difficulty logic.
 */
export class MasteryEngine {
  private readonly MASTERY_THRESHOLD = 0.85;
  private readonly MIN_EXERCISES = 3;
  private readonly STAGNATION_THRESHOLD = 0.6;

  /**
   * Evaluates the mastery of a sub-skill based on recent feedback.
   */
  public async evaluateMastery(
    userId: string,
    subSkillId: string,
    recentFeedback: ExerciseFeedback[]
  ): Promise<MasteryEvaluation> {
    if (recentFeedback.length === 0) {
      return { status: 'not_started', currentScore: 0, unlockedNext: false, difficultySignal: 'maintain' };
    }

    const avgScore = this.calculateRollingAverage(recentFeedback);
    const count = recentFeedback.length;

    // 1. MASTERY LOGIC
    if (avgScore >= this.MASTERY_THRESHOLD && count >= this.MIN_EXERCISES) {
      return {
        status: 'mastered',
        currentScore: avgScore,
        unlockedNext: true,
        difficultySignal: 'increment'
      };
    }

    // 2. STAGNATION / ADAPTIVE LOGIC
    if (avgScore < this.STAGNATION_THRESHOLD) {
      return {
        status: 'in_progress',
        currentScore: avgScore,
        unlockedNext: false,
        difficultySignal: 'decrement' // Triggers easier exercises
      };
    }

    // 3. STEADY PROGRESS
    return {
      status: 'in_progress',
      currentScore: avgScore,
      unlockedNext: false,
      difficultySignal: 'maintain'
    };
  }

  /**
   * Unlocks the next sub-skill in the sequence order.
   * In production, this would update the Supabase 'user_progress' table.
   */
  public async unlockNextSubSkill(userId: string, currentSubSkillId: string): Promise<void> {
    console.log(`Unlocking next sub-skill for user ${userId} after completion of ${currentSubSkillId}`);
    // Logic to find skill_tree_id and sequence_order + 1 goes here
  }

  private calculateRollingAverage(feedback: ExerciseFeedback[]): number {
    const scores = feedback.map(f => f.masterySignalScore);
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }
}

export const masteryEngine = new MasteryEngine();
