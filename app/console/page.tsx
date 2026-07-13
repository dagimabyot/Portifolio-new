'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Console() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/console/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid credentials');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('admin_token', data.token);
      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md glass rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Console</h1>
        <p className="text-center text-foreground/60 mb-8">Enter your credentials to access the admin dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-foreground/80 font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-foreground/80 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-card rounded-lg border border-accent/20 focus:border-accent focus:outline-none text-foreground placeholder-foreground/50 transition-colors"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-error/20 border border-error text-error rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-accent hover:text-accent-dark font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
