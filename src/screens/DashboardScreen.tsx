import React, { useEffect, useState } from 'react';
import { ActiveTab, DashboardData } from '../types';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../services/authService';

interface DashboardScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ setActiveTab }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Redirect to login screen if user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setActiveTab('login');
    }
  }, [isAuthenticated, isLoading, setActiveTab]);

  // Fetch protected dashboard data from API
  useEffect(() => {
    async function loadData() {
      if (!isAuthenticated) return;
      setFetchingData(true);
      const res = await getDashboardData();
      setFetchingData(false);

      if (res.success && res.data) {
        setDashboardData(res.data);
      } else {
        setErrorMsg(res.error || 'Unable to load dashboard details.');
      }
    }

    loadData();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    setActiveTab('login');
  };

  if (isLoading || fetchingData) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[36px] text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-sm font-medium">Verifying authentication token & loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const stats = dashboardData?.dashboardStats || {
    resumesScored: 5,
    avgAtsScore: 92,
    interviewCallbackLift: '+28%',
    skillUpgradesCompleted: 3,
    targetRole: 'Senior Software Engineer / Tech Lead',
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Protected Account Session
            </div>
            {/* Display "Welcome, <User Name>" */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Welcome, <span className="text-primary">{user.name}</span>!
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-xl">
              Logged in as <span className="text-on-surface font-mono text-xs bg-surface-container-high px-2 py-0.5 rounded">{user.email}</span>. Your authentication status is verified via JSON Web Token (JWT).
            </p>
          </div>

          {/* Action Buttons & Logout */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setActiveTab('resume-score')}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-[0_0_15px_rgba(76,215,246,0.3)] cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              <span>Score Resume</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-error/10 border border-error/30 text-error hover:bg-error/20 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
              title="Sign out of account"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Error notification if dashboard failed */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Protected Dashboard Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-5 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Resumes Scored</span>
              <span className="material-symbols-outlined text-[22px] text-primary">description</span>
            </div>
            <div className="text-3xl font-extrabold text-on-surface">{stats.resumesScored}</div>
            <p className="text-xs text-on-surface-variant/70 mt-1">Live ATS benchmark checks</p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-5 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Avg ATS Score</span>
              <span className="material-symbols-outlined text-[22px] text-emerald-400">speed</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{stats.avgAtsScore} / 100</div>
            <p className="text-xs text-on-surface-variant/70 mt-1">Top 3% percentile range</p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-5 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Interview Callback Lift</span>
              <span className="material-symbols-outlined text-[22px] text-cyan-400">trending_up</span>
            </div>
            <div className="text-3xl font-extrabold text-cyan-400">{stats.interviewCallbackLift}</div>
            <p className="text-xs text-on-surface-variant/70 mt-1">Versus unoptimized candidates</p>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-5 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Skill Upgrades</span>
              <span className="material-symbols-outlined text-[22px] text-purple-400">school</span>
            </div>
            <div className="text-3xl font-extrabold text-on-surface">{stats.skillUpgradesCompleted}</div>
            <p className="text-xs text-on-surface-variant/70 mt-1">Modules finished</p>
          </div>
        </div>

        {/* Protected Navigation Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Action 1: Resume Builder */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">edit_note</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Interactive Resume Builder</h3>
              <p className="text-sm text-on-surface-variant">
                Craft Google XYZ bullet points with automated AI action verb density checks.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('resume-builder')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              <span>Launch Builder</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Quick Action 2: Course Catalog */}
          <div className="bg-surface-container-low/70 border border-white/[0.06] rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Recommended Upskilling Courses</h3>
              <p className="text-sm text-on-surface-variant">
                Close your detected skill gaps in AWS Cloud CDK, AI Agent Orchestration, and System Design.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('courses')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:underline cursor-pointer"
            >
              <span>Explore Courses</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
