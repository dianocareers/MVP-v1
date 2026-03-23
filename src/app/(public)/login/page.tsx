'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh(); // Ensure layout Server Components (like our roles check) update
  };
  
  const handleGoogleLogin = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Welcome Back</h1>
      <p className="text-slate-500 mb-6 text-center text-sm">Sign in to your Diano Careers account.</p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
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
            autoComplete="current-password"
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
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
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
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Google
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-slate-900 font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
