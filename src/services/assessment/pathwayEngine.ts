import { UnifiedAssessmentOutput } from './scoringEngine';

export type CareerRole = 'Junior Engineer' | 'Senior Engineer' | 'Engineering Manager' | 'Director' | 'Architect';

export interface RoleRequirement {
  name: CareerRole;
  minFoundation: number;
  minLeadership: number;
  minTechnical: number;
  description: string;
}

export interface LayerReadiness {
  score: number; // 0-100
  level: number; // Actual L1-L5
  required: number; // Required L1-L5
  isMet: boolean;
}

export interface RoleReadiness {
  roleName: string;
  overallReadiness: number; // 0-100
  foundation: LayerReadiness;
  leadership: LayerReadiness;
  technical: LayerReadiness;
  gaps: string[];
}

export const ROLE_BENCHMARKS: RoleRequirement[] = [
  {
    name: 'Junior Engineer',
    minFoundation: 2,
    minLeadership: 1,
    minTechnical: 2,
    description: 'Focused on learning, execution, and growing technical foundations.'
  },
  {
    name: 'Senior Engineer',
    minFoundation: 3,
    minLeadership: 2,
    minTechnical: 4,
    description: 'Expert execution, technical mentorship, and high-quality delivery.'
  },
  {
    name: 'Engineering Manager',
    minFoundation: 3,
    minLeadership: 3,
    minTechnical: 2,
    description: 'Focus on people, team execution, and strategic coordination.'
  },
  {
    name: 'Architect',
    minFoundation: 4,
    minLeadership: 2,
    minTechnical: 5,
    description: 'Strategic technical vision, complex systems design, and broad influence.'
  },
  {
    name: 'Director',
    minFoundation: 4,
    minLeadership: 4,
    minTechnical: 2,
    description: 'Organizational strategy, leadership of leaders, and business impact.'
  }
];

/**
 * Calculates average level (L1-L5) for a set of domain scores
 */
const calculateAverageLevel = (scores: Record<string, number> | undefined): number => {
  if (!scores || Object.keys(scores).length === 0) return 0;
  const vals = Object.values(scores);
  const avg = vals.reduce((sum, val) => sum + val, 0) / vals.length;
  // We return the raw average to be more precise for the readiness %
  return Math.round(avg * 10) / 10;
};

/**
 * Calculates readiness for a specific role
 */
export function calculateRoleReadiness(
  userScores: UnifiedAssessmentOutput,
  role: RoleRequirement
): RoleReadiness {
  const fAvg = calculateAverageLevel(userScores.foundation_scores);
  const lAvg = calculateAverageLevel(userScores.leadership_scores);
  const tAvg = calculateAverageLevel(userScores.technical_scores);

  const calculateLayer = (actual: number, required: number): LayerReadiness => {
    const score = Math.min(100, Math.round((actual / required) * 100));
    return {
      score,
      level: actual,
      required,
      isMet: actual >= required
    };
  };

  const foundation = calculateLayer(fAvg, role.minFoundation);
  const leadership = calculateLayer(lAvg, role.minLeadership);
  const technical = calculateLayer(tAvg, role.minTechnical);

  const overallReadiness = Math.round((foundation.score + leadership.score + technical.score) / 3);

  const gaps: string[] = [];
  if (!foundation.isMet) gaps.push(`Foundation: Need L${role.minFoundation} (Currently L${foundation.level || 0})`);
  if (!leadership.isMet) gaps.push(`Leadership: Need L${role.minLeadership} (Currently L${leadership.level || 0})`);
  if (!technical.isMet) gaps.push(`Technical: Need L${role.minTechnical} (Currently L${technical.level || 0})`);

  return {
    roleName: role.name,
    overallReadiness,
    foundation,
    leadership,
    technical,
    gaps
  };
}

/**
 * Matches user scores against all roles and returns sorted readiness
 */
export function getPathwayMatches(userScores: UnifiedAssessmentOutput): RoleReadiness[] {
  return ROLE_BENCHMARKS.map(role => calculateRoleReadiness(userScores, role))
    .sort((a, b) => b.overallReadiness - a.overallReadiness);
}
