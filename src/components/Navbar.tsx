import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { CareerPilotLogo } from './CareerPilotLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Navigation Links dynamically adjusted for authentication state
  const baseNavLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'resume-score', label: 'Resume Score' },
    { id: 'resume-builder', label: 'Resume Builder' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'courses', label: 'Courses' },
    { id: 'faq', label: 'FAQ' },
  ];

  const navLinks = isAuthenticated
    ? [{ id: 'dashboard' as ActiveTab, label: 'Dashboard' }, ...baseNavLinks]
    : baseNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-white/[0.06] transition-colors">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left focus:outline-none cursor-pointer"
        >
          <CareerPilotLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low/60 border border-white/[0.04]">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 font-['Inter',sans-serif] text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Auth State & Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            aria-label="Toggle color scheme"
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center border border-white/[0.05] cursor-pointer"
            id="theme-toggle"
            type="button"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* If Authenticated: Show Welcome Badge & Dashboard/Logout */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-primary/30 text-on-surface hover:border-primary transition-colors text-xs font-medium cursor-pointer"
                title="Go to Dashboard"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-primary">{user.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                title="Telemetry Dashboard"
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
              </button>

              <button
                onClick={async () => {
                  await logout();
                  setActiveTab('login');
                }}
                className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                title="Logout"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            /* If Unauthenticated: Show Login & Sign Up CTA */
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-on-surface hover:text-primary text-sm font-semibold transition-colors cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setActiveTab('signup');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-sm font-semibold transition-all shadow-[0_0_16px_rgba(76,215,246,0.25)] hover:shadow-[0_0_24px_rgba(76,215,246,0.45)] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-surface-container-low/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-primary-container text-on-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}

          {!isAuthenticated && (
            <div className="pt-2 border-t border-white/[0.06] flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg border border-white/[0.1] text-center text-sm font-semibold text-on-surface hover:bg-surface-container"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg bg-primary text-center text-sm font-semibold text-on-primary shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
