import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ setActiveTab }) => {
  const { login } = useAuth();

  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Local state for feedback messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validation function
  const validateForm = (): boolean => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. user@example.com).');
      return false;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await login(email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        setActiveTab('dashboard');
      }, 1000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-md bg-surface-container-low/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect header accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Title Section */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface tracking-tight">Welcome Back</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Sign in to access your protected career telemetry dashboard.
          </p>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-start gap-2.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification Banner */}
        {successMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-start gap-2.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-high/80 border border-white/[0.08] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setActiveTab('forgot-password')}
                className="text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                key
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-high/80 border border-white/[0.08] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-[0_0_20px_rgba(76,215,246,0.3)] hover:shadow-[0_0_28px_rgba(76,215,246,0.5)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div className="mt-8 text-center text-sm text-on-surface-variant border-t border-white/[0.06] pt-5">
          Don't have an account?{' '}
          <button
            onClick={() => setActiveTab('signup')}
            className="font-semibold text-primary hover:underline cursor-pointer"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
