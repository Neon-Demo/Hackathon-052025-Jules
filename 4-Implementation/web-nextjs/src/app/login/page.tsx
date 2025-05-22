"use client";

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'; // For the logo placeholder
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/dashboard'); // Redirect if already logged in
    }
  }, [status, router]);

  const handleSignIn = async (provider?: string) => {
    if (provider === 'credentials' && (!email || !password)) {
      console.error("Email and password are required for credentials login.");
      // Optionally, display an error message to the user
      alert("Please enter both email and password.");
      return;
    }

    const result = await signIn(provider, {
      email: provider === 'credentials' ? email : undefined,
      password: provider === 'credentials' ? password : undefined,
      redirect: false, // Handle redirection manually
      callbackUrl: '/dashboard', // Desired redirect after successful OAuth or credentials login
    });

    if (result?.error) {
      console.error("Sign-in error:", result.error);
      // Handle error display to the user, e.g., show an alert or a message on the page
      alert(`Login failed: ${result.error}`); // Simple alert for now
    } else if (result?.ok) {
      console.log("Sign-in successful, redirecting...");
      // For credentials provider, since redirect is false, we need to manually redirect.
      // For OAuth providers, NextAuth might handle the redirect if it receives a URL.
      // In both cases, if ok, we redirect to callbackUrl.
      router.push(result.url || '/dashboard'); // result.url might be null for credentials, so fallback
    }
  };
  
  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // If already authenticated, don't render the login form (useEffect will redirect)
  // This check is technically redundant due to useEffect but good for clarity
  if (status === "authenticated") {
    return <div className="flex justify-center items-center min-h-screen">Redirecting to dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-lg">
        <div>
          {/* Placeholder for Company Logo */}
          <div className="mx-auto h-12 w-auto flex items-center justify-center">
            <svg className="h-12 w-auto text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 16v-2m0-10v2m0 6v2m0-10a7 7 0 100 14 7 7 0 000-14zm0 0V2m0 20v-2m0-14a7 7 0 00-7 7h-2m18 0h-2a7 7 0 00-7-7V2m0 6a7 7 0 007 7h2M5 12H3m18 0h-2" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Greenhouse
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSignIn('credentials'); }}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/password-reset" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <button
                onClick={() => handleSignIn('google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                {/* You can add a Google icon here */}
                <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM8.285 15.264c-2.003 0-3.628-1.626-3.628-3.628s1.625-3.628 3.628-3.628c1.002 0 1.812.403 2.416 1.008l-1.02.988c-.385-.364-.98-.78-1.396-.78-.993 0-1.812.82-1.812 1.82s.82 1.82 1.812 1.82c1.15 0 1.546-.665 1.63-1.065H8.285V9.49h3.02c.06.32.1.64.1.985 0 2.145-1.442 3.789-3.115 3.789zm6.097-3.424c0 .78-.06 1.396-.162 1.932h-2.69v-2.59h4.037c.06.342.09.705.09 1.118a4.528 4.528 0 01-4.588 4.528c-2.562 0-4.64-2.077-4.64-4.64s2.078-4.64 4.64-4.64c1.42 0 2.5.546 3.292 1.285l-1.226 1.186c-.42-.402-1.03-.79-2.066-.79-1.557 0-2.83.93-2.83 2.96s1.273 2.96 2.83 2.96c1.795 0 2.455-1.03 2.585-1.596h-2.585v-2.035h4.287z" clipRule="evenodd" />
                </svg>
                Sign in with Google
              </button>
            </div>

            <div>
              <button
                onClick={() => handleSignIn('azure-ad')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Microsoft</span>
                {/* You can add a Microsoft icon here */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#f25022" d="M1 1h9v9H1z"/>
                  <path fill="#00a4ef" d="M1 11h9v9H1z"/>
                  <path fill="#7fba00" d="M11 1h9v9h-9z"/>
                  <path fill="#ffb900" d="M11 11h9v9h-9z"/>
                </svg>
                Sign in with Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
