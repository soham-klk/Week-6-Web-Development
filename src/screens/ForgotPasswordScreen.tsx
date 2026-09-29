import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { requestForgotPassword, resetPasswordWithCode } from '../services/authService';

interface ForgotPasswordScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ setActiveTab }) => {
  // Step 1 = Request Reset Code, Step 2 = Enter Reset Code & New Password
  const [step, setStep] = useState<1 | 2>(1);

  // Form inputs
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Request Reset Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await requestForgotPassword(email.trim());
    setIsSubmitting(false);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      setSuccessMessage(result.message);
      if (result.demoResetCode) {
        setDemoCode(result.demoResetCode);
        setResetCode(result.demoResetCode);
      }
      setStep(2); // Move to Step 2
    }
  };

  // Step 2: Reset Password with Code
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!resetCode.trim()) {
      setErrorMessage('Please enter the 6-digit reset code.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPasswordWithCode(email.trim(), resetCode.trim(), newPassword);
    setIsSubmitting(false);

    if (result.error) {
      setErrorMessage(result.error);
    } else {
      setSuccessMessage(result.message);
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-surface">
      <div className="w-full max-w-md bg-surface-container-low/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        {/* Title Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <span className="material-symbols-outlined text-[28px]">lock_reset</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface tracking-tight">
            {step === 1 ? 'Reset Password' : 'Set New Password'}
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            {step === 1
              ? 'Enter your email to receive a 6-digit password reset code.'
              : 'Enter your reset code and choose a new password.'}
          </p>
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-start gap-2.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm space-y-2 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">check_circle</span>
              <span>{successMessage}</span>
            </div>
            {demoCode && (
              <div className="mt-2 p-2 bg-emerald-500/20 rounded-lg text-xs font-mono text-center">
                Demo Reset Code: <strong className="text-white text-base tracking-widest ml-1">{demoCode}</strong>
              </div>
            )}
          </div>
        )}

        {/* Step 1 Form */}
        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                Account Email Address
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-[0_0_20px_rgba(76,215,246,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Generating Code...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2 Form */
          <form onSubmit={handleResetPassword} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                6-Digit Reset Code
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  pin
                </span>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-high/80 border border-white/[0.08] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-mono tracking-widest text-center"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                New Password (min. 6 chars)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  key
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-high/80 border border-white/[0.08] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-[0_0_20px_rgba(76,215,246,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Confirm New Password</span>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-on-surface-variant hover:text-on-surface"
            >
              ← Back to enter email again
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="mt-8 text-center text-sm text-on-surface-variant border-t border-white/[0.06] pt-5">
          Remembered your password?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="font-semibold text-primary hover:underline cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
