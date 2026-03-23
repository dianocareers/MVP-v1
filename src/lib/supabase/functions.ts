import { createClient } from './client';

export async function invokeCoachingEngine<T>(action: string, payload: any): Promise<T> {
  const supabase = createClient();
  const { data, error } = await supabase.functions.invoke('coaching-engine', {
    body: { action, ...payload },
  });

  if (error) {
    console.error(`[AI Engine] Error invoking ${action}:`, error);
    throw new Error(`AI Service Failure: ${error.message}`);
  }

  if (!data) {
    throw new Error('AI Service returned empty response');
  }

  return data as T;
}

export async function invokeEmailService(to: string, subject: string, html: string): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, html },
  });

  if (error) {
    console.error('[Email Service] Error sending email:', error);
    throw new Error(`Email Service Failure: ${error.message}`);
  }

  return data;
}
