'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // 1. Sign up the user via Supabase Auth
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
      // Supabase peculiar edge-case: If user exists, but we allowed sign-in vs sign-up, identities might be zero.
      setError("An account with this email already exists.");
      setIsLoading(false);
      return;
    }

    // Usually, we would show a "Check your email" successfully. 
    // If auto-confirm is enabled in local/dashboard, they might log in immediately.
    setSuccess(true);
    setIsLoading(false);
  };
  
  const handleGoogleSignup = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Create an Account</h1>
      <p className="text-slate-500 mb-6 text-center text-sm">Join Diano Careers to accelerate your growth.</p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-md text-center">
          <h3 className="font-semibold mb-2">Check your email</h3>
          <p className="text-sm">We've sent a verification link to <strong>{email}</strong>.</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                autoComplete="email"
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign Up'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              Google
            </Button>
          </div>
        </>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <a href="/login" className="text-slate-900 font-medium hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
