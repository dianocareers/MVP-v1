export type AssessmentType = 'interest' | 'foundation' | 'leadership' | 'technical' | 'reassessment';
export type AssessmentStatus = 'in_progress' | 'completed' | 'abandoned';
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type ActionStatus = 'planned' | 'in_progress' | 'completed' | 'skipped';
export type ListingType = 'job' | 'coaching' | 'course' | 'mentorship';
export type UserRole = 'superadmin' | 'admin' | 'member' | 'coach';

export type MotivatorDomain = 
  | 'Theoretical' 
  | 'Utilitarian' 
  | 'Social' 
  | 'Aesthetic' 
  | 'Individualistic' 
  | 'Traditional';

export interface AssessmentSession {
  id: string; // uuid
  userId: string; // uuid
  type: AssessmentType;
  status: AssessmentStatus;
  startedAt: string; // ISO date string
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentResponse {
  id: string; // uuid
  sessionId: string; // uuid
  questionIdentifier: string; // e.g., 'm_theo_1'
  answerValue: string; // '0', '1', '2'
  confidence?: ConfidenceLevel;
  timeTakenSeconds?: number;
  createdAt: string;
}

export interface DomainScore {
  id: string; // uuid
  userId: string; // uuid
  sessionId?: string | null;
  domainName: string; // e.g. 'Aesthetic' or 'React'
  scoreValue: number; // 0-10 or 0-100
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  domain: string;
}

export interface DomainReflection {
  id: string; // uuid
  sessionId: string; // uuid
  domainName: string;
  reflectionText: string;
  createdAt: string;
}

export interface UnifiedAssessmentOutput {
  userId: string;
  sessionId: string;
  scores: Record<string, number>;
  reflections: DomainReflection[];
  completedAt: string;
}

// --- Growth Plan & Micro-learning ---

export type UserFrequency = 'daily' | '3x_week' | 'weekly';
export type NotificationChannel = 'email' | 'in_app';
export type ExerciseType = 'reflection' | 'action' | 'scenario' | 'practice';
export type ProgressStatus = 'not_started' | 'in_progress' | 'mastered';

export interface UserPreferences {
  userId: string; // uuid
  frequency: UserFrequency;
  sessionDuration: 5 | 10 | 15;
  notificationChannels: NotificationChannel[];
  aiModel: 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-3.1-flash-lite';
  updatedAt: string;
}

export interface SkillTree {
  id: string; // uuid
  domain: string;
  createdAt: string;
}

export interface SubSkill {
  id: string; // uuid
  skillTreeId: string; // uuid
  domain: string;
  masteryThreshold: number;
  sequenceOrder: number;
  createdAt: string;
}

export interface MicroExercise {
  id: string; // uuid
  subskillId: string; // uuid
  durationMinutes: number;
  type: ExerciseType;
  title: string;
  content: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string; // uuid
  subskillId: string; // uuid
  masteryScore: number;
  status: ProgressStatus;
  lastActivityAt: string;
  updatedAt: string;
}

export interface ExerciseFeedback {
  userId: string; // uuid
  exerciseId: string; // uuid
  subskillId: string; // uuid
  responseText: string;
  completionStatus: 'completed' | 'draft' | 'skipped';
  feedbackSummary: string;
  strengths: string[];
  improvementAreas: string[];
  coachingTip: string;
  masterySignalScore: number; // 0-1
  createdAt: string;
}
export interface Organization {
  id: string; // uuid
  name: string;
  slug: string;
  branding: TenantBranding;
  createdAt: string;
}

export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  terminologyOverrides: Record<string, string>; // e.g. { 'assessment': 'Diagnostic' }
}

export interface AdminMetrics {
  total_users: number;
  active_users: number;
  completion_rate: number;
  domain_aggregates: {
    domain: string;
    average_score: number;
    user_count: number;
  }[];
}
// --- Marketplace MVP ---

export type MarketplaceCategory = 'course' | 'certification' | 'training' | 'leadership_dev';

export interface MarketplaceListing {
  id: string; // uuid
  title: string;
  provider: string; // e.g., 'Coursera', 'Diano Executive'
  description: string;
  type: MarketplaceCategory;
  priceLabel: string; // 'Free', '$29.99', 'Employer Sponsored'
  imageUrl: string;
  externalUrl: string;
  alignmentTags: string[]; // e.g., ['Architecture', 'Influence']
  isCurated: boolean;
}

export interface SavedListing {
  userId: string; // uuid
  listingId: string; // uuid
  createdAt: string;
}
