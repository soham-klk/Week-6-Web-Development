import React from 'react';
import { ActiveTab } from '../types';
import { CareerPilotLogo } from './CareerPilotLogo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant border-t border-white/[0.05] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <CareerPilotLogo size="md" />
            <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Next-generation AI trajectory navigator and telemetry engine for ambitious professionals transitioning into high-impact roles.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-['Inter',sans-serif] text-xs font-semibold border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Core Engine v4.2 Online
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-['Inter',sans-serif] text-xs font-semibold border border-secondary/20">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                SOC2 Certified
              </span>
            </div>
          </div>

          {/* Column 1: Intelligence Platform */}
          <div className="space-y-3">
            <h3 className="font-['Inter',sans-serif] text-sm text-on-surface font-bold uppercase tracking-wider">
              Intelligence Platform
            </h3>
            <ul className="space-y-2 font-['Inter',sans-serif] text-sm text-on-surface-variant">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('resume-score');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Resume Scorer AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('resume-builder');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Algorithmic Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Trajectory Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Upskill Pathways
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company & Ops */}
          <div className="space-y-3">
            <h3 className="font-['Inter',sans-serif] text-sm text-on-surface font-bold uppercase tracking-wider">
              Company &amp; Ops
            </h3>
            <ul className="space-y-2 font-['Inter',sans-serif] text-sm text-on-surface-variant">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  About CareerPilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  FAQ &amp; Knowledge Base
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Industry Benchmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Executive Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-3">
            <h3 className="font-['Inter',sans-serif] text-sm text-on-surface font-bold uppercase tracking-wider">
              Legal &amp; Trust
            </h3>
            <ul className="space-y-2 font-['Inter',sans-serif] text-sm text-on-surface-variant">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Privacy Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  AI Safety &amp; Ethics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  SOC2 Compliance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.04]">
          <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant">
            © 2025 CareerPilot Autonomous Systems Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-['Inter',sans-serif] text-xs text-on-surface-variant">
            <button
              onClick={() => setActiveTab('faq')}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className="hover:text-primary transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className="hover:text-primary transition-colors"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
