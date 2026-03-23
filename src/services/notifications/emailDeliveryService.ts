import { invokeEmailService } from '@/lib/supabase/functions';

export interface EmailParams {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

/**
 * Email Delivery Service
 * Communicates with the Supabase Edge Function to deliver emails via Resend.
 */
export class EmailDeliveryService {
  /**
   * Sends an email via the Supabase Edge Function.
   */
  public async sendEmail(params: EmailParams): Promise<{ success: boolean; data?: any; error?: any }> {
    const { to, subject, html, text } = params;

    try {
      const data = await invokeEmailService(to, subject, html || text || '');
      return { success: true, data };
    } catch (error) {
      console.error('Email Delivery Error:', error);
      return { success: false, error };
    }
  }
}

export const emailDeliveryService = new EmailDeliveryService();
