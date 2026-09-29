import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { HeroHoloCard } from '../components/HeroHoloCard';
import { PaperTearSection } from '../components/PaperTearSection';

interface HomeScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToPaths = () => {
    document.getElementById('user-paths')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqData = [
    {
      q: 'How does CareerPilot evaluate ATS compatibility?',
      a: 'Our autonomous evaluation engine runs resumes through three distinct parsing architectures matching the leading enterprise ATS platforms (Greenhouse, Workday, and Lever). We check for keyword density, layout readability, font safety, and semantic relevance to your target job titles.'
    },
    {
      q: 'Is my resume data kept private and confidential?',
      a: 'Yes. Your career telemetry is encrypted using SOC2-compliant standards both at rest and in transit. We do not sell your personal information or use your proprietary job history to train public AI models without your express consent.'
    },
    {
      q: 'Can students or career shifters use the Resume Builder without experience?',
      a: 'Absolutely. The CareerPilot builder is custom-tailored for early-career innovators. It guides you to highlight academic achievements, group projects, GitHub repositories, and certifications into bullet points that hiring managers respect.'
    }
  ];

  return (
    <div className="flex flex-col w-full selection:bg-primary-container selection:text-on-primary">
      {/* ========================================================================= */}
      {/* 1. TOP HERO AMBIENCE & INTERACTIVE TELEMETRY DECK */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-28">
        {/* Volumetric ambient background glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary-container/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-container/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-tertiary-container/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Command Telemetry & Value Prop */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-container-low border border-white/[0.08] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-['Inter',sans-serif] text-[11px] font-bold text-primary uppercase tracking-widest">
                Autonomous Telemetry v4.2
              </span>
              <span className="text-on-surface-variant font-['Inter',sans-serif] text-xs">·</span>
              <span className="text-on-surface font-['Inter',sans-serif] text-xs font-semibold">
                142k+ Resumes Analyzed
              </span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1]">
              Build a Better Career with{' '}
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                CareerPilot
              </span>
              .
            </h1>

            <p className="font-['Inter',sans-serif] text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Analyze your resume, discover your career gaps, build a professional resume, and upgrade your skills — all in one place with military-grade intelligence.
            </p>

            {/* CTA cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToPaths}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(76,215,246,0.55)] hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('how-it-works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-['Inter',sans-serif] text-sm font-semibold transition-all flex items-center gap-1.5 border border-white/[0.06] cursor-pointer"
              >
                <span>Explore How It Works</span>
                <span className="material-symbols-outlined text-[18px] text-primary">north_east</span>
              </button>
            </div>

            {/* Social Proof Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
              <div className="bg-surface-container-low p-4 rounded-xl border border-white/[0.05]">
                <span className="block font-['Inter',sans-serif] text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Average Boost
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl text-primary font-extrabold">
                  +24%
                </span>
                <span className="block font-['Inter',sans-serif] text-xs text-on-surface-variant mt-0.5">
                  Interview Calls
                </span>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-white/[0.05]">
                <span className="block font-['Inter',sans-serif] text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">
                  ATS Precision
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl text-secondary font-extrabold">
                  98.4%
                </span>
                <span className="block font-['Inter',sans-serif] text-xs text-on-surface-variant mt-0.5">
                  Parse Fidelity
                </span>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-white/[0.05]">
                <span className="block font-['Inter',sans-serif] text-[11px] font-bold text-on-surface-variant tracking-wider uppercase">
                  Talent Velocity
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl text-tertiary font-extrabold">
                  3.2x
                </span>
                <span className="block font-['Inter',sans-serif] text-xs text-on-surface-variant mt-0.5">
                  Faster Placement
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Orbit Deck */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroHoloCard onInspect={() => setActiveTab('resume-score')} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.5. SCROLL-DRIVEN PAPER TEAR REVEAL (ATS BARRIER STORY) */}
      {/* ========================================================================= */}
      <PaperTearSection />

      {/* ========================================================================= */}
      {/* 2. TWO MAIN USER PATHS SECTION */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-20" id="user-paths">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-['Inter',sans-serif] text-xs text-primary uppercase tracking-widest font-bold">
              Intent Calibration
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              What brings you to CareerPilot today?
            </h2>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant">
              Select your operational runway to launch targeted artificial intelligence workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Path 1 Card: I Have a Resume */}
            <div className="group relative rounded-2xl bg-surface-container-low p-6 sm:p-10 hover:bg-surface-container transition-all duration-300 shadow-xl border border-white/[0.06] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary-container/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-container/20 transition-all" />

              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                  <span className="material-symbols-outlined text-[36px]">document_scanner</span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-high text-primary font-['Inter',sans-serif] text-xs font-bold">
                    <span>AUDIT &amp; OPTIMIZE</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl text-on-surface font-bold">
                    I Have a Resume
                  </h3>
                  <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant">
                    Feed your current document into our algorithmic parser to reveal hidden blind spots and scoring blockers.
                  </p>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span>Deep 4-Category AI Resume Scoring</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span>Comprehensive ATS keyword analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span>Real-time skill gap detection vs market jobs</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span>Actionable line-by-line rewrite suggestions</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('resume-score');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_20px_rgba(76,215,246,0.3)] transition-all cursor-pointer"
                >
                  <span>Check My Resume</span>
                  <span className="material-symbols-outlined text-[20px]">trending_up</span>
                </button>
              </div>
            </div>

            {/* Path 2 Card: I Need a Resume */}
            <div className="group relative rounded-2xl bg-surface-container-low p-6 sm:p-10 hover:bg-surface-container transition-all duration-300 shadow-xl border border-white/[0.06] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary-container/30 transition-all" />

              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-110 transition-transform border border-secondary/20">
                  <span className="material-symbols-outlined text-[36px]">magic_button</span>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-high text-secondary font-['Inter',sans-serif] text-xs font-bold">
                    <span>CREATE FROM SCRATCH</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl text-on-surface font-bold">
                    I Need a Resume
                  </h3>
                  <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant">
                    Step-by-step guided generation calibrated for collegiate graduates, career shifters, and creators.
                  </p>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span>AI-assisted resume copy generation</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span>Beginner &amp; student friendly smart prompts</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span>Showcase university projects &amp; verified certs</span>
                  </li>
                  <li className="flex items-center gap-3 text-on-surface font-['Inter',sans-serif] text-sm">
                    <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                    <span>Instant ATS-tested PDF &amp; markdown exports</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('resume-builder');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_20px_rgba(87,27,193,0.3)] transition-all cursor-pointer"
                >
                  <span>Build My Resume</span>
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 5-STAGE VISUAL CAREER JOURNEY PIPELINE */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-['Inter',sans-serif] text-xs text-primary uppercase tracking-widest font-bold">
                Telemetry Workflow
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
                The 5-Stage Flight Plan
              </h2>
            </div>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant max-w-md">
              A continuous autonomous feedback loop transforming raw application profiles into executive-ready career trajectories.
            </p>
          </div>

          {/* Horizontal Interconnected Pipeline Track */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div
              onClick={() => setActiveTab('resume-score')}
              className="group bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between hover:bg-surface-container transition-all border border-white/[0.04] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary font-['Plus_Jakarta_Sans',sans-serif] text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    cloud_upload
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                  Upload / Input
                </h3>
                <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                  Inject existing documents or begin with guided modular profile schemas.
                </p>
              </div>
              <div className="pt-4">
                <span className="font-['Inter',sans-serif] text-[11px] text-primary uppercase tracking-wider font-semibold">
                  Stage 01
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveTab('how-it-works')}
              className="group bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between hover:bg-surface-container transition-all border border-white/[0.04] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary font-['Plus_Jakarta_Sans',sans-serif] text-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    cognition
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                  n8n AI Engine
                </h3>
                <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                  Autonomous telemetry webhooks cross-reference real-time job openings.
                </p>
              </div>
              <div className="pt-4">
                <span className="font-['Inter',sans-serif] text-[11px] text-primary uppercase tracking-wider font-semibold">
                  Stage 02
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveTab('resume-score')}
              className="group bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between hover:bg-surface-container transition-all border border-white/[0.04] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-['Plus_Jakarta_Sans',sans-serif] text-sm flex items-center justify-center font-bold">
                    3
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    speed
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                  Score &amp; Calibrate
                </h3>
                <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                  Multi-vector analysis grades ATS clarity, impact metrics, and phrasing.
                </p>
              </div>
              <div className="pt-4">
                <span className="font-['Inter',sans-serif] text-[11px] text-secondary uppercase tracking-wider font-semibold">
                  Stage 03
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => setActiveTab('courses')}
              className="group bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between hover:bg-surface-container transition-all border border-white/[0.04] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-tertiary/20 text-tertiary font-['Plus_Jakarta_Sans',sans-serif] text-sm flex items-center justify-center font-bold">
                    4
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    school
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                  Targeted Courses
                </h3>
                <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                  Curated modules close detected competency gaps to unlock salary jumps.
                </p>
              </div>
              <div className="pt-4">
                <span className="font-['Inter',sans-serif] text-[11px] text-tertiary uppercase tracking-wider font-semibold">
                  Stage 04
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div
              onClick={() => setActiveTab('resume-builder')}
              className="group bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between hover:bg-surface-container transition-all border border-white/[0.04] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container font-['Plus_Jakarta_Sans',sans-serif] text-sm flex items-center justify-center font-bold">
                    5
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                    rocket_launch
                  </span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                  Career Flight
                </h3>
                <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                  High-conversion applications submitted with confidence and proof points.
                </p>
              </div>
              <div className="pt-4">
                <span className="font-['Inter',sans-serif] text-[11px] text-primary uppercase tracking-wider font-semibold">
                  Stage 05
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE BENEFITS BENTO GRID */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-['Inter',sans-serif] text-xs text-primary uppercase tracking-widest font-bold">
              Architecture
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Core Platform Capabilities
            </h2>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant">
              Engineered specifically to outmaneuver legacy algorithmic applicant tracking systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => setActiveTab('resume-score')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                <span className="material-symbols-outlined text-[28px]">query_stats</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                AI-Powered Resume Analysis
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Leverage state-of-the-art LLM evaluators that deconstruct your bullet points against top 1% market benchmarks.
              </p>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => setActiveTab('resume-builder')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">school</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                Student-Friendly Builder
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Turn collegiate hackathons, capstones, and self-directed repositories into high-value professional credentials.
              </p>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => setActiveTab('how-it-works')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform border border-tertiary/20">
                <span className="material-symbols-outlined text-[28px]">troubleshoot</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                ATS Awareness Engine
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Direct reverse-engineering of Taleo, Workday, and Greenhouse parsing patterns to guarantee zero truncation.
              </p>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => setActiveTab('courses')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                <span className="material-symbols-outlined text-[28px]">timeline</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                Skill Upgrade Mapping
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Detect precision deficiencies between your actual skills and live market demand for target executive compensation.
              </p>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => setActiveTab('resume-score')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">sync_alt</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                Real-Time Telemetry
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Instantaneous metric recalculations as you adjust bullet structures, power verbs, and quantitative deliverables.
              </p>
            </div>

            {/* Card 6 */}
            <div
              onClick={() => setActiveTab('courses')}
              className="bg-surface-container-low p-6 rounded-2xl space-y-4 hover:bg-surface-container transition-colors shadow-sm border border-white/[0.04] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform border border-tertiary/20">
                <span className="material-symbols-outlined text-[28px]">local_mall</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg text-on-surface font-bold">
                Curated Course Marketplace
              </h3>
              <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant leading-relaxed">
                Access vetted high-yield certifications from top instructors mapped directly to your detected knowledge gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. QUICK FAQ TEASER WITH ACCORDIONS */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="font-['Inter',sans-serif] text-xs text-primary uppercase tracking-widest font-bold">
              Knowledge Base
            </span>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant">
              Get transparent answers on how CareerPilot handles your intelligence assets.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-surface-container-low overflow-hidden border border-white/[0.05] transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-on-surface hover:text-primary transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg font-semibold pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-on-surface-variant font-['Inter',sans-serif] text-sm sm:text-base leading-relaxed border-t border-white/[0.04] pt-4 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setActiveTab('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 font-['Inter',sans-serif] text-sm font-semibold text-primary hover:text-primary-fixed-dim transition-colors cursor-pointer"
            >
              <span>View all 24+ common questions in our Knowledge Center</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM HIGH-IMPACT CTA BANNER */}
      {/* ========================================================================= */}
      <section className="w-full bg-surface px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container-low p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl border border-white/[0.08]">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-['Inter',sans-serif] text-xs font-bold border border-primary/25">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>100% Free Initial Telemetry Check</span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Ready to discover your real market value?
            </h2>

            <p className="font-['Inter',sans-serif] text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Receive an instant algorithmic diagnostic report on your current resume within 45 seconds. Zero credit card required.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('resume-score');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_24px_rgba(76,215,246,0.35)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Analyze My Resume Now</span>
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('resume-builder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-on-surface font-['Inter',sans-serif] text-sm font-semibold transition-all border border-white/[0.08] cursor-pointer"
              >
                <span>Create New Resume</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
