import React from 'react';
import { ActiveTab } from '../types';

interface HowItWorksScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ setActiveTab }) => {
  const stages = [
    {
      step: '01',
      title: 'Ingestion & Schema Normalization',
      badge: 'Optical Character & JSON Parser',
      icon: 'cloud_upload',
      color: 'text-primary',
      borderColor: 'border-primary/20',
      bgColor: 'bg-primary/10',
      summary:
        'Raw resume documents (PDF, DOCX, TXT) or interactive form data are stripped of dangerous layout artifacts and mapped into structured JSON entities.',
      points: [
        'Eliminates unparseable tables, multi-column CSS splits, and graphic layers.',
        'Extracts chronological work history, company names, titles, and dates.',
        'Normalizes technical skills into standard taxonomy graphs.'
      ]
    },
    {
      step: '02',
      title: 'Autonomous n8n AI Intelligence Engine',
      badge: 'Real-Time Market Webhooks',
      icon: 'cognition',
      color: 'text-secondary',
      borderColor: 'border-secondary/20',
      bgColor: 'bg-secondary/10',
      summary:
        'Dispatches parallel telemetry tasks to evaluate candidate profiles against 140,000+ live Tier-1 job postings, salary benchmarks, and hiring manager signals.',
      points: [
        'Continuous synchronization with Workday, Greenhouse, and Lever criteria.',
        'Semantic embedding analysis detecting keyword density without keyword stuffing.',
        'Compensation bracket modeling matching experience seniority with live market offers.'
      ]
    },
    {
      step: '03',
      title: 'Multi-Vector Scoring & Calibration',
      badge: 'Google XYZ Formula & ATS Verification',
      icon: 'speed',
      color: 'text-tertiary',
      borderColor: 'border-tertiary/20',
      bgColor: 'bg-tertiary/10',
      summary:
        'Calculates a rigorous ATS Trajectory Score across 4 distinct dimensions: Readability, Impact & Quantitative Metrics, Keyword Density, and Brevity.',
      points: [
        'Flags passive duties phrasing and replaces them with authoritative leadership verbs.',
        'Checks for quantifiable outcomes (%, $, time saved, user scale).',
        'Generates line-by-line rewrite comparisons with detailed rationale.'
      ]
    },
    {
      step: '04',
      title: 'Precision Skill Gap & Course Pathways',
      badge: 'ROI-Verified Upskilling',
      icon: 'school',
      color: 'text-primary',
      borderColor: 'border-primary/20',
      bgColor: 'bg-primary/10',
      summary:
        'Pinpoints high-value missing competencies preventing candidate shortlisting, connecting users directly with vetted courses offering measurable salary lift.',
      points: [
        'Ranks gaps by market urgency (Critical, High, Recommended).',
        'Calculates estimated annual compensation upside (e.g. +$26,500/yr for LLM orchestration).',
        'Recommends hands-on capstone projects to prove competence to interviewers.'
      ]
    },
    {
      step: '05',
      title: 'Career Flight & Application Execution',
      badge: 'Zero Truncation Guarantee',
      icon: 'rocket_launch',
      color: 'text-secondary',
      borderColor: 'border-secondary/20',
      bgColor: 'bg-secondary/10',
      summary:
        'Export verified, pristine ATS-compliant PDFs and Markdown resumes ready for direct submission, securing an average +24% increase in interview callbacks.',
      points: [
        'Single-column typographic hierarchy designed for automated OCR scanners.',
        'One-click export to Markdown, PDF, and JSON.',
        'Ongoing telemetry tracking to refresh metrics as your career progresses.'
      ]
    }
  ];

  return (
    <div className="w-full bg-surface min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary-container selection:text-on-primary">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-low border border-white/[0.08] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-['Inter',sans-serif] text-xs font-bold text-primary uppercase tracking-widest">
              Autonomous Systems Architecture
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            How CareerPilot Powers Your Flight Plan
          </h1>
          <p className="font-['Inter',sans-serif] text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Most resumes are rejected in 6 seconds by legacy ATS software before any human recruiter ever sees them. Here is how our 5-stage telemetry engine reverse-engineers the hiring pipeline.
          </p>
        </div>

        {/* 5 Stages Breakdown Cards */}
        <div className="space-y-8">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-surface-container-low border ${stage.borderColor} shadow-xl relative overflow-hidden transition-all duration-300 hover:bg-surface-container`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stage.bgColor} ${stage.color} flex items-center justify-center shrink-0 border ${stage.borderColor}`}
                  >
                    <span className="material-symbols-outlined text-[32px]">{stage.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-['Inter',sans-serif]">
                        Stage {stage.step}
                      </span>
                      <span className="text-xs">·</span>
                      <span className={`text-xs font-bold ${stage.color} font-['Inter',sans-serif]`}>
                        {stage.badge}
                      </span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-on-surface">
                      {stage.title}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant max-w-2xl pt-1 leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>
                </div>

                <div className="md:w-72 shrink-0 p-4 rounded-2xl bg-surface-container/60 border border-white/[0.04] space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface block font-['Inter',sans-serif]">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-on-surface-variant font-['Inter',sans-serif]">
                    {stage.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table: Before vs After CareerPilot */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-low border border-white/[0.06] shadow-2xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-bold text-on-surface">
              The CareerPilot Advantage
            </h3>
            <p className="font-['Inter',sans-serif] text-sm text-on-surface-variant">
              Comparing standard job applicant outcomes with autonomous AI-calibrated profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container/60 border border-error/20 space-y-4">
              <div className="flex items-center gap-2 text-error font-bold text-base font-['Plus_Jakarta_Sans',sans-serif]">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span>Unoptimized Traditional Application</span>
              </div>
              <ul className="space-y-2.5 text-sm text-on-surface-variant font-['Inter',sans-serif]">
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>75% of resumes automatically culled by unreadable formats or tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Passive task-based bullet points ("Responsible for writing code").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Blind to salary ceiling gaps and missing architectural keywords.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Average 120+ applications required to secure a single interview loop.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/30 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-base font-['Plus_Jakarta_Sans',sans-serif]">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>CareerPilot Telemetry-Calibrated Profile</span>
              </div>
              <ul className="space-y-2.5 text-sm text-on-surface font-['Inter',sans-serif]">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>98.4% parse fidelity across Workday, Greenhouse, and Taleo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Google XYZ formula compliance with verified quantitative metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Targeted upskilling paths targeting immediate +$18k - $26k salary lifts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>+24% callback boost and 3.2x faster placement into high-impact roles.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-6 pt-4">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-on-surface">
            Ready to test your flight plan?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('resume-score');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_20px_rgba(76,215,246,0.35)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Audit Your Resume</span>
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('resume-builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-['Inter',sans-serif] text-sm font-semibold transition-all border border-white/[0.08] cursor-pointer"
            >
              <span>Build New Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
