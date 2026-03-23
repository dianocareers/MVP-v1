export const APP_CONFIG = {
  ASSESSMENT_WINDOW_MONTHS: 3,
  MIN_REFLECTION_LENGTH: 10,
  DEFAULT_AI_MODEL: 'gemini-1.5-flash-lite' as const,
};

export const UI_MESSAGES = {
  ASSESSMENT_TIME_REMINDER: `Answer based on your behavior in the past ${APP_CONFIG.ASSESSMENT_WINDOW_MONTHS} months`,
  REFLECTION_MIN_LENGTH_ERROR: `Please expand on your reflection slightly (min ${APP_CONFIG.MIN_REFLECTION_LENGTH} characters).`,
};
