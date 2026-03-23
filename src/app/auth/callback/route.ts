import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Execute the decision tree
      
      // 1. Check if user exists in user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (!profile) {
        // First login -> redirect to assessment
        return NextResponse.redirect(`${origin}/assessment`)
      }
      
      // 2. Check if they have an active/completed assessment
      const { data: sessions } = await supabase
        .from('assessment_sessions')
        .select('*')
        .eq('user_id', data.user.id)
        .limit(1);
        
      if (!sessions || sessions.length === 0) {
        return NextResponse.redirect(`${origin}/assessment`)
      }
      
      // 3. Check roles (B2B Admin vs Member vs B2C)
      const { data: membership } = await supabase
        .from('organization_memberships')
        .select('role')
        .eq('user_id', data.user.id)
        .limit(1)
        .single();
        
      if (membership) {
        if (membership.role === 'superadmin' || membership.role === 'admin') {
          return NextResponse.redirect(`${origin}/admin`)
        }
      }
      
      // B2C or standard member -> dashboard
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Fallback if no code or error
  return NextResponse.redirect(`${origin}/login?error=auth-failure`)
}
