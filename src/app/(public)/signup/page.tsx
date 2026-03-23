'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
      setError("An account with this email already exists.");
      setIsLoading(false);
      return;
    }

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
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-6 lg:px-8 bg-[#F5F2E9]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Create your account</h1>
          <p className="mt-3 text-[#1A1A1A]/60 font-medium">
            Join Diano Careers to accelerate your growth.
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl shadow-black/5 rounded-2xl border border-[#1A1A1A]/5">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center">
                <span className="font-bold mr-2">!</span>
                {error}
              </div>
            </div>
          )}

          {success ? (
            <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Check your email</h3>
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
                We've sent a verification link to <br/>
                <strong className="text-[#1A1A1A] font-bold">{email}</strong>.<br/>
                Please follow the link to complete your setup.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#1A1A1A] font-semibold">First Name</Label>
                    <Input 
                      id="firstName" 
                      autoComplete="given-name"
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required 
                      disabled={isLoading}
                      className="h-11 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/10 transition-all rounded-xl bg-[#F5F2E9]/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#1A1A1A] font-semibold">Last Name</Label>
                    <Input 
                      id="lastName" 
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required 
                      disabled={isLoading}
                      className="h-11 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/10 transition-all rounded-xl bg-[#F5F2E9]/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1A1A1A] font-semibold">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    autoComplete="email"
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="h-11 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/10 transition-all rounded-xl bg-[#F5F2E9]/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1A1A1A] font-semibold">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    disabled={isLoading}
                    className="h-11 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/10 transition-all rounded-xl bg-[#F5F2E9]/10"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-bold rounded-xl shadow-lg shadow-[#1A1A1A]/20 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Get Started'}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#1A1A1A]/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                  <span className="bg-white px-4 text-[#1A1A1A]/40">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full h-12 font-bold border-[#1A1A1A]/10 hover:bg-[#F5F2E9]/50 rounded-xl transition-all"
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </>
          )}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-[#1A1A1A]/60">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="text-[#C89B3C] font-bold hover:text-[#C89B3C]/80 underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
