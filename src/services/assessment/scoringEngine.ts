import { MotivatorDomain } from '@/types/database';

export type AssessmentAnswers = Record<string, number>; 
// For interest: 0 | 1 | 2
// For foundation/advancement: 1 | 2 | 3 | 4 | 5

export type NormalizedInterestProfile = Record<MotivatorDomain, number>;

// Radars
export type FoundationDomain = 'Communication' | 'Problem Solving' | 'Execution & Delivery' | 'Collaboration' | 'Adaptability';
export type LeadershipDomain = 'Strategic Thinking' | 'Mentorship' | 'Executive Presence' | 'Influence' | 'Business Acumen';
export type TechnicalDomain = 'Architecture' | 'Code Quality' | 'Testing' | 'Operational Excellence' | 'Domain Expertise';

export interface UnifiedAssessmentOutput {
  interestProfile?: {
    rawScores: Record<MotivatorDomain, number>;
    normalizedScores: NormalizedInterestProfile;
    topMotivators: MotivatorDomain[];
  };
  foundationScores?: Record<FoundationDomain | string, number>;
  leadershipScores?: Record<LeadershipDomain | string, number>;
  technicalScores?: Record<TechnicalDomain | string, number>;
}

// -------------------------------------------------------------
// 1. Interest Architecture (0-10 Sum Scoring)
// -------------------------------------------------------------
export const calculateInterestDomainScores = (answers: AssessmentAnswers, questions: {id: string, domain: MotivatorDomain}[]) => {
  const scores: Record<MotivatorDomain, number> = {
    Theoretical: 0,
    Utilitarian: 0,
    Social: 0,
    Aesthetic: 0,
    Individualistic: 0,
    Traditional: 0,
  };

  questions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      scores[q.domain] += answers[q.id];
    }
  });

  return scores;
};

export const normalizeInterestProfile = (scores: Record<MotivatorDomain, number>): NormalizedInterestProfile => {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  if (total === 0) {
    return {
      Theoretical: 0,
      Utilitarian: 0,
      Social: 0,
      Aesthetic: 0,
      Individualistic: 0,
      Traditional: 0,
    };
  }

  const normalized: Partial<NormalizedInterestProfile> = {};
  (Object.keys(scores) as MotivatorDomain[]).forEach((domain) => {
    normalized[domain] = Math.round((scores[domain] / total) * 100);
  });

  return normalized as NormalizedInterestProfile;
};

export const getTopMotivators = (scores: Record<MotivatorDomain, number>, count: number = 2): MotivatorDomain[] => {
  return (Object.entries(scores) as [MotivatorDomain, number][])
    .sort((a, b) => b[1] - a[1]) // Sort descending by score
    .slice(0, count)
    .map(([domain]) => domain);
};

// -------------------------------------------------------------
// 2. Foundation & Advancement Architecture (1-5 Average Scoring)
// -------------------------------------------------------------
export const calculateSkillDomainScores = <T extends string>(
  answers: AssessmentAnswers, 
  questions: {id: string, domain: T}[]
): Record<T, number> => {
  
  // Group questions by domain
  const domainTotals: Record<string, { sum: number, count: number }> = {};
  
  // Initialize tracking
  questions.forEach(q => {
    if (!domainTotals[q.domain]) {
      domainTotals[q.domain] = { sum: 0, count: 0 };
    }
  });

  // Tally the Likert (1-5) answers
  questions.forEach((q) => {
    if (answers[q.id] !== undefined) {
       domainTotals[q.domain].sum += answers[q.id];
       domainTotals[q.domain].count += 1;
    }
  });

  // Calculate Average Score per Domain
  const finalizedScores: Partial<Record<T, number>> = {};
  (Object.keys(domainTotals) as T[]).forEach(domain => {
    const { sum, count } = domainTotals[domain as string];
    // Return average rounded to 1 decimal place, or 0 if no questions answered
    finalizedScores[domain] = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
  });

  return finalizedScores as Record<T, number>;
};

// -------------------------------------------------------------
// 3. Unified Orchestration Factory
// -------------------------------------------------------------
export const generateUnifiedOutput = (
  interestAnswers?: { answers: AssessmentAnswers, questions: {id: string, domain: MotivatorDomain}[] },
  foundationAnswers?: { answers: AssessmentAnswers, questions: {id: string, domain: FoundationDomain | string}[] },
  leadershipAnswers?: { answers: AssessmentAnswers, questions: {id: string, domain: LeadershipDomain | string}[] },
  technicalAnswers?: { answers: AssessmentAnswers, questions: {id: string, domain: TechnicalDomain | string}[] },
): UnifiedAssessmentOutput => {
  
  const output: UnifiedAssessmentOutput = {};

  if (interestAnswers) {
    const rawScores = calculateInterestDomainScores(interestAnswers.answers, interestAnswers.questions);
    output.interestProfile = {
      rawScores,
      normalizedScores: normalizeInterestProfile(rawScores),
      topMotivators: getTopMotivators(rawScores, 2)
    };
  }

  if (foundationAnswers) {
    output.foundationScores = calculateSkillDomainScores(foundationAnswers.answers, foundationAnswers.questions);
  }

  if (leadershipAnswers) {
    output.leadershipScores = calculateSkillDomainScores(leadershipAnswers.answers, leadershipAnswers.questions);
  }

  if (technicalAnswers) {
    output.technicalScores = calculateSkillDomainScores(technicalAnswers.answers, technicalAnswers.questions);
  }

  return output;
};
