import { UnifiedAssessmentOutput } from '@/types/database';

/**
 * Reassessment Service
 * Handles eligibility checks and score comparisons between assessment sessions.
 */
export const reassessmentService = {
  /**
   * Checks if a user is eligible for a reassessment.
   * Criteria: 30 days since last, 15 exercises, 5 reflections.
   */
  async checkEligibility(userId: string): Promise<{ eligible: boolean; reason?: string }> {
    // In a real implementation, we would query Supabase for engagement metrics.
    // Mocking positive eligibility for demonstration.
    return { eligible: true };
  },

  /**
   * Calculates the delta between two assessment results.
   */
  calculateDeltas(oldResult: UnifiedAssessmentOutput, newResult: UnifiedAssessmentOutput) {
    const deltas: Record<string, number> = {};
    
    const allDomains = new Set([
      ...Object.keys(oldResult.scores),
      ...Object.keys(newResult.scores)
    ]);

    allDomains.forEach(domain => {
      const oldScore = oldResult.scores[domain] || 0;
      const newScore = newResult.scores[domain] || 0;
      deltas[domain] = Number((newScore - oldScore).toFixed(2));
    });

    return deltas;
  },

  /**
   * Groups deltas by primary dimension (Foundation, Leadership, Technical).
   */
  getDimensionDeltas(deltas: Record<string, number>) {
    // Mock mapping of sub-skills to dimensions
    const dimensions = {
      Foundation: ['Communication', 'Problem Solving', 'Execution', 'Collaboration', 'Adaptability'],
      Leadership: ['Strategy', 'Mentorship', 'Presence', 'Influence', 'Acumen'],
      Technical: ['Architecture', 'Code Quality', 'Testing', 'Ops', 'Domain']
    };

    const summary: Record<string, number> = {};

    Object.entries(dimensions).forEach(([dim, domains]) => {
      const dimDeltas = domains.map(d => deltas[d]).filter(d => d !== undefined);
      if (dimDeltas.length > 0) {
        const avg = dimDeltas.reduce((a, b) => a + b, 0) / dimDeltas.length;
        summary[dim] = Number(avg.toFixed(2));
      }
    });

    return summary;
  }
};
