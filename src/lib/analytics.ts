'use client';

/**
 * Basic Analytics Service
 * High-level event tracking for pilot feedback and usage patterns.
 */
export const analytics = {
  /**
   * Track a custom event.
   */
  track(event: string, properties: Record<string, any> = {}) {
    console.info(`[Analytics] ${event}`, properties);
    
    // In production, this would send to Segment, Mixpanel, or PostHog.
    // Example: posthog.capture(event, properties);
    
    // For MVP, we'll store events in a simple Supabase table if needed.
    // supabase.from('analytics_events').insert({ event, properties, timestamp: new Date() });
  },

  /**
   * Identify the user for session tracking.
   */
  identify(userId: string, traits: Record<string, any> = {}) {
    console.info(`[Analytics] Identify User: ${userId}`, traits);
  },

  /**
   * Predefined Event Hooks
   */
  events: {
    ASSESSMENT_STARTED: 'assessment_started',
    ASSESSMENT_COMPLETED: 'assessment_completed',
    EXERCISE_STARTED: 'exercise_started',
    EXERCISE_COMPLETED: 'exercise_completed',
    MARKETPLACE_CLICK: 'marketplace_click',
    AI_COACH_INVOKED: 'ai_coach_invoked',
    BRANDING_LOADED: 'branding_loaded',
  }
};

export function useAnalytics() {
  return analytics;
}
