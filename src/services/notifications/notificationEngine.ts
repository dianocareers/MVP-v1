import { NotificationChannel, UserPreferences } from '@/types/database';

export interface NotificationTrigger {
  userId: string;
  type: 'daily_reminder' | 'missed_session' | 'streak_milestone' | 'mastery_unlock' | 're-engagement';
  channels: NotificationChannel[];
  message: string;
}

/**
 * Notification & Reminder System
 * Orchestrates when and how users are nudged to continue their growth journey.
 */
export class NotificationEngine {
  /**
   * Evaluates if a notification should be triggered for a user.
   */
  public async evaluateTriggers(params: {
    userId: string;
    preferences: UserPreferences;
    lastActivityDate: Date;
    currentStreak: number;
    hasNewMastery: boolean;
  }): Promise<NotificationTrigger[]> {
    const { userId, preferences, lastActivityDate, currentStreak, hasNewMastery } = params;
    const triggers: NotificationTrigger[] = [];
    const now = new Date();

    // 1. Mastery Unlock (Immediate High Value)
    if (hasNewMastery) {
      triggers.push({
        userId,
        type: 'mastery_unlock',
        channels: preferences.notificationChannels,
        message: "🏆 Mastery Achieved! You've unlocked a new sub-skill in your roadmap."
      });
    }

    // 2. Streak Milestones (Progress Celebration)
    if ([3, 7, 14, 30].includes(currentStreak)) {
      triggers.push({
        userId,
        type: 'streak_milestone',
        channels: preferences.notificationChannels,
        message: `🔥 Impressive! You've hit a ${currentStreak}-day growth streak.`
      });
    }

    // 3. Re-engagement (Inactivity check > 3 days)
    const daysInactive = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysInactive >= 3) {
      triggers.push({
        userId,
        type: 're-engagement',
        channels: ['email'], // Primary channel for re-engagement
        message: "We've missed you! Your career roadmap has new insights waiting for you."
      });
    }

    return triggers;
  }

  /**
   * Sending Logic
   */
  public async sendNotification(trigger: NotificationTrigger): Promise<void> {
    const { userId, channels, message, type } = trigger;
    console.log(`Processing ${type} for user ${userId} via ${channels.join(', ')}`);

    if (channels.includes('email')) {
      const { emailDeliveryService } = await import('./emailDeliveryService');
      
      // In a real app, we'd fetch the user's email from the profiles table
      const userEmail = "user@example.com"; 

      await emailDeliveryService.sendEmail({
        to: userEmail,
        subject: this.getEmailSubject(type),
        text: message,
        html: `<p>${message}</p>`
      });
    }

    // Handle other channels (In-app, push etc.)
    if (channels.includes('in_app')) {
      // Supabase insert into notifications table
    }
  }

  private getEmailSubject(type: string): string {
    const subjects: Record<string, string> = {
      daily_reminder: "Your growth session is waiting...",
      missed_session: "Don't break your streak!",
      streak_milestone: "🔥 Milestone Achieved!",
      mastery_unlock: "🏆 New Mastery Unlocked!",
      're-engagement' : "We've missed you!"
    };
    return subjects[type] || "Diano Careers Update";
  }
}

export const notificationEngine = new NotificationEngine();
