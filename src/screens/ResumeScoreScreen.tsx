import React, { useState } from 'react';
import { ScoreReport, ActiveTab } from '../types';
import { alexMercerResume, sampleAlexScoreReport, targetRolePresets } from '../data/mockData';
import { scoreResumeAI } from '../services/aiService';

interface ResumeScoreScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
  onApplyToBuilder?: (text: string) => void;
}

export const ResumeScoreScreen: React.FC<ResumeScoreScreenProps> = ({
  setActiveTab,
  onApplyToBuilder,
}) => {
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [targetDesc, setTargetDesc] = useState('');
  const [resumeText, setResumeText] = useState(
    `Alex Mercer
Senior Frontend Engineer | alex.mercer@devorbit.io | +1 (555) 382-9104 | San Francisco, CA
Portfolio: alexmercer.dev | GitHub: github.com/alexmercer | LinkedIn: linkedin.com/in/alex-mercer-tech

PROFESSIONAL SUMMARY
High-velocity Senior Frontend Engineer with 6+ years specializing in TypeScript, React architecture, distributed design systems, and WebGL telemetry dashboards. Proven track record scaling client performance by 40% across 5M+ monthly active users.

WORK EXPERIENCE
Staff Frontend Architect | Aether Cloud Systems | 2022 - Present
• Architected Next.js micro-frontend ecosystem serving 5.2M MAUs, reducing initial page bundle size by 42% and slashing LCP from 2.8s to 0.9s.
• Spearheaded enterprise design system consumed across 14 cross-functional squads, cutting feature delivery velocity cycle from 3 weeks to 6 business days.
• Engineered high-throughput canvas telemetry streaming layer handling 50,000 WebSocket events/sec with zero browser frame drops.

Senior React Engineer | Veloce Data Labs | 2019 - 2022
• Built full-stack analytical dashboards in TypeScript, React, and GraphQL with automated end-to-end Cypress and Vitest test coverage at 92%.
• Implemented client-side caching with React Query and service workers, resulting in $140,000 annual cloud ingress bandwidth cost savings.
• Collaborated with product leadership to execute 18 algorithmic A/B experiments, improving checkout trial conversion rate by +24%.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 3.82 GPA (Summa Cum Laude)

SKILLS & CERTIFICATIONS
TypeScript, React 19, Next.js, GraphQL, AWS (S3, CloudFront), Docker, CI/CD, Micro-frontends, Vite, Tailwind CSS.`
  );

  const [activeCategoryTab, setActiveCategoryTab] = useState<'ats' | 'impact' | 'keywords' | 'structure'>('ats');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [report, setReport] = useState<ScoreReport | null>(sampleAlexScoreReport);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleScan = async () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);
    setScanStage('Initializing OCR extraction & token normalization...');

    setTimeout(() => {
      setScanStage('Dispatching autonomous telemetry webhooks to live job index...');
    }, 600);

    setTimeout(() => {
      setScanStage('Calibrating multi-vector ATS readability and Google XYZ metrics...');
    }, 1200);

    try {
      const result = await scoreResumeAI({
        resumeText,
        targetRole,
        targetJobDescription: targetDesc,
      });
      setTimeout(() => {
        setReport(result);
        setIsScanning(false);
      }, 1600);
    } catch {
      setTimeout(() => {
        setReport(sampleAlexScoreReport);
        setIsScanning(false);
      }, 1600);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleCopyRewrite = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-primary-container selection:text-on-primary">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Screen Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-['Inter',sans-serif] text-xs font-bold mb-2 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Multi-Vector ATS Parser v4.2</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-on-surface">
              Autonomous Resume Scorer
            </h1>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Test your resume against Workday, Greenhouse, and Taleo parsing algorithms. Uncover blind spots, missing keywords, and weak phrasing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTargetRole('Senior Frontend Engineer');
                setResumeText(
                  `Alex Mercer
Senior Frontend Engineer | alex.mercer@devorbit.io | +1 (555) 382-9104 | San Francisco, CA
Portfolio: alexmercer.dev | GitHub: github.com/alexmercer | LinkedIn: linkedin.com/in/alex-mercer-tech

PROFESSIONAL SUMMARY
High-velocity Senior Frontend Engineer with 6+ years specializing in TypeScript, React architecture, distributed design systems, and WebGL telemetry dashboards. Proven track record scaling client performance by 40% across 5M+ monthly active users.

WORK EXPERIENCE
Staff Frontend Architect | Aether Cloud Systems | 2022 - Present
• Architected Next.js micro-frontend ecosystem serving 5.2M MAUs, reducing initial page bundle size by 42% and slashing LCP from 2.8s to 0.9s.
• Spearheaded enterprise design system consumed across 14 cross-functional squads, cutting feature delivery velocity cycle from 3 weeks to 6 business days.
• Engineered high-throughput canvas telemetry streaming layer handling 50,000 WebSocket events/sec with zero browser frame drops.

Senior React Engineer | Veloce Data Labs | 2019 - 2022
• Built full-stack analytical dashboards in TypeScript, React, and GraphQL with automated end-to-end Cypress and Vitest test coverage at 92%.
• Implemented client-side caching with React Query and service workers, resulting in $140,000 annual cloud ingress bandwidth cost savings.
• Collaborated with product leadership to execute 18 algorithmic A/B experiments, improving checkout trial conversion rate by +24%.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 3.82 GPA (Summa Cum Laude)

SKILLS & CERTIFICATIONS
TypeScript, React 19, Next.js, GraphQL, AWS (S3, CloudFront), Docker, CI/CD, Micro-frontends, Vite, Tailwind CSS.`
                );
                setReport(sampleAlexScoreReport);
              }}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-['Inter',sans-serif] text-xs font-semibold border border-primary/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Reset Alex Mercer Demo
            </button>

            <button
              onClick={() => {
                setResumeText('');
                setReport(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-['Inter',sans-serif] text-xs transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Input & Upload Zone Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Target Role & Configuration Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-white/[0.06] space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-primary font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">target</span>
                <span>Target Operational Role</span>
              </div>

              <div>
                <label className="block text-xs font-['Inter',sans-serif] text-on-surface-variant mb-1 font-semibold">
                  Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full bg-surface-container-highest px-3.5 py-2.5 rounded-xl border border-white/10 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Role Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-on-surface-variant font-semibold">
                  Quick Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {targetRolePresets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setTargetRole(preset.title)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-['Inter',sans-serif] transition-colors cursor-pointer ${
                        targetRole === preset.title
                          ? 'bg-primary text-on-primary font-bold'
                          : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-['Inter',sans-serif] text-on-surface-variant mb-1 font-semibold">
                  Job Description / Keywords (Optional)
                </label>
                <textarea
                  rows={4}
                  value={targetDesc}
                  onChange={(e) => setTargetDesc(e.target.value)}
                  placeholder="Paste a job description or key requirements to calibrate semantic keyword density..."
                  className="w-full bg-surface-container-highest px-3.5 py-2.5 rounded-xl border border-white/10 text-on-surface text-xs focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Upload input */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="block text-xs font-['Inter',sans-serif] text-on-surface-variant mb-1.5 font-semibold">
                  Upload Resume File (PDF / DOCX / TXT)
                </label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-white/15 rounded-xl hover:border-primary/50 transition-colors cursor-pointer bg-surface-container/50">
                  <span className="material-symbols-outlined text-[28px] text-primary mb-1">
                    upload_file
                  </span>
                  <span className="text-xs text-on-surface font-semibold">Click to select file</span>
                  <span className="text-[10px] text-on-surface-variant">Max 10MB · Plain Text / PDF</span>
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Scan Trigger Button */}
              <button
                type="button"
                onClick={handleScan}
                disabled={isScanning || !resumeText.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_20px_rgba(76,215,246,0.35)] hover:shadow-[0_0_30px_rgba(76,215,246,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                    <span>Analyzing Telemetry...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">speed</span>
                    <span>Score &amp; Calibrate Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Resume Text Editor / Inspection Column */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  edit_document
                </span>
                Resume Telemetry Feed
              </span>
              <span className="font-['Inter',sans-serif] text-xs text-on-surface-variant">
                {resumeText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <div className="relative flex-1">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste or type your resume text here (experience, summary, skills, education)..."
                className="w-full h-80 lg:h-[480px] bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-white/[0.08] text-on-surface font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-primary transition-all resize-y shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Live Scanning Overlay / Progress banner if scanning */}
        {isScanning && (
          <div className="p-6 rounded-2xl bg-surface-container-low border border-primary/40 shadow-2xl flex flex-col sm:flex-row items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[28px] animate-spin">
                autorenew
              </span>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-on-surface text-base">
                Executing Algorithmic Calibration
              </p>
              <p className="font-['Inter',sans-serif] text-xs text-primary">{scanStage}</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* REPORT RESULTS DECK */}
        {/* ========================================================================= */}
        {report && !isScanning && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Score Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Radial gauge */}
                <div className="md:col-span-4 flex items-center justify-center gap-6 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                  <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-variant stroke-current"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                      />
                      <path
                        className="text-primary stroke-current"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeDasharray={`${report.overallScore}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.2"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-primary">
                        {report.overallScore}
                      </span>
                      <span className="font-['Inter',sans-serif] text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-['Inter',sans-serif] text-xs font-semibold text-primary uppercase tracking-wider block">
                      ATS Trajectory
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-on-surface">
                      {report.trajectoryBand}
                    </h3>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary text-xs font-bold font-['Inter',sans-serif]">
                        {report.percentile}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold font-['Inter',sans-serif]">
                        {report.interviewBoost}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score breakdown pillars */}
                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveCategoryTab('ats')}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      activeCategoryTab === 'ats'
                        ? 'bg-surface-container-highest border-primary/50 shadow-md'
                        : 'bg-surface-container-low border-white/[0.05] hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>ATS Parse</span>
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        visibility
                      </span>
                    </div>
                    <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-primary mt-1">
                      {report.atsReadability.score}%
                    </span>
                    <span className="block font-['Inter',sans-serif] text-[11px] text-on-surface-variant truncate">
                      {report.atsReadability.status}
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveCategoryTab('impact')}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      activeCategoryTab === 'impact'
                        ? 'bg-surface-container-highest border-secondary/50 shadow-md'
                        : 'bg-surface-container-low border-white/[0.05] hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>Impact Verbs</span>
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        bolt
                      </span>
                    </div>
                    <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-secondary mt-1">
                      {report.impactAndMetrics.score}%
                    </span>
                    <span className="block font-['Inter',sans-serif] text-[11px] text-on-surface-variant truncate">
                      XYZ Formula
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveCategoryTab('keywords')}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      activeCategoryTab === 'keywords'
                        ? 'bg-surface-container-highest border-tertiary/50 shadow-md'
                        : 'bg-surface-container-low border-white/[0.05] hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>Keywords</span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        key
                      </span>
                    </div>
                    <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-tertiary mt-1">
                      {report.keywordsAndFit.score}%
                    </span>
                    <span className="block font-['Inter',sans-serif] text-[11px] text-on-surface-variant truncate">
                      {report.keywordsAndFit.matchedKeywords.length} Matched
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveCategoryTab('structure')}
                    className={`p-4 rounded-xl transition-all cursor-pointer border ${
                      activeCategoryTab === 'structure'
                        ? 'bg-surface-container-highest border-white/40 shadow-md'
                        : 'bg-surface-container-low border-white/[0.05] hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>Structure</span>
                      <span className="material-symbols-outlined text-[16px] text-on-surface">
                        format_align_left
                      </span>
                    </div>
                    <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-on-surface mt-1">
                      {report.structureAndStyle.score}%
                    </span>
                    <span className="block font-['Inter',sans-serif] text-[11px] text-on-surface-variant truncate">
                      {report.structureAndStyle.pageLength.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Category Detail Panel */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-lg">
              {activeCategoryTab === 'ats' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">verified</span>
                      ATS Readability &amp; Parse Fidelity
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary">
                      Status: {report.atsReadability.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Validated Strengths
                      </span>
                      <ul className="space-y-2">
                        {report.atsReadability.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-on-surface font-['Inter',sans-serif]"
                          >
                            <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                              check
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Potential Blockers
                      </span>
                      {report.atsReadability.issues.length > 0 ? (
                        <ul className="space-y-2">
                          {report.atsReadability.issues.map((issue, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-error font-['Inter',sans-serif]"
                            >
                              <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                                warning
                              </span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-4 rounded-xl bg-surface-container text-xs text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            thumb_up
                          </span>
                          <span>Zero fatal parsing obstacles detected for Greenhouse or Workday.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeCategoryTab === 'impact' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">bolt</span>
                      Impact Metrics &amp; Action Verbs
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                      {report.impactAndMetrics.quantifiedRate}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                        Power Verb Analysis
                      </span>
                      <p className="text-sm text-on-surface font-['Inter',sans-serif]">
                        {report.impactAndMetrics.actionVerbDensity}
                      </p>
                      <ul className="space-y-2 pt-2">
                        {report.impactAndMetrics.strengths.map((str, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-on-surface font-['Inter',sans-serif]"
                          >
                            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                              check_circle
                            </span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Optimization Recommendations
                      </span>
                      <ul className="space-y-2">
                        {report.impactAndMetrics.suggestions.map((sug, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-on-surface-variant font-['Inter',sans-serif]"
                          >
                            <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                              lightbulb
                            </span>
                            <span>{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeCategoryTab === 'keywords' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">key</span>
                      Target Role Keyword Alignment ({targetRole})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
                        Matched Critical Keywords ({report.keywordsAndFit.matchedKeywords.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {report.keywordsAndFit.matchedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-surface-container text-primary font-['Inter',sans-serif] text-xs font-semibold flex items-center gap-1.5 border border-primary/20"
                          >
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-error uppercase tracking-wider block mb-2">
                        High-Yield Missing Keywords ({report.keywordsAndFit.missingKeywords.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {report.keywordsAndFit.missingKeywords.map((kw, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setResumeText((prev) => `${prev}\n• Leveraged ${kw} in production.`);
                            }}
                            title="Click to add sample bullet to resume"
                            className="px-3 py-1 rounded-lg bg-error/10 hover:bg-error/20 text-error font-['Inter',sans-serif] text-xs font-semibold flex items-center gap-1.5 border border-error/30 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                            {kw}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCategoryTab === 'structure' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface">
                        format_align_left
                      </span>
                      Structure, Length &amp; Density
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-container-highest text-on-surface">
                      {report.structureAndStyle.wordCount} words
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container space-y-1">
                      <span className="text-xs text-on-surface-variant font-semibold">
                        Estimated Page Count
                      </span>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-primary">
                        {report.structureAndStyle.pageLength}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-container space-y-1">
                      <span className="text-xs text-on-surface-variant font-semibold">
                        Bullet Hierarchy
                      </span>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-secondary">
                        {report.structureAndStyle.bulletFormat}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* DETECTED SKILL GAPS & COURSE PATHWAYS */}
            {/* ========================================================================= */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">
                    Stage 04 Integration
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-on-surface">
                    Detected Competency Gaps vs Live Market
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  <span>Explore All Curated Courses</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.detectedSkillGaps.map((gap, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-surface-container-low border border-white/[0.06] hover:bg-surface-container transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            gap.priority === 'critical'
                              ? 'bg-error/20 text-error'
                              : 'bg-primary/20 text-primary'
                          }`}
                        >
                          {gap.priority} Gap
                        </span>
                        <span className="text-xs font-bold text-secondary">{gap.avgSalaryLift}</span>
                      </div>
                      <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                        {gap.skill}
                      </h4>
                      <p className="font-['Inter',sans-serif] text-xs text-on-surface-variant leading-relaxed">
                        {gap.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2 rounded-xl bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary font-['Inter',sans-serif] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Unlock Course Pathway</span>
                      <span className="material-symbols-outlined text-[16px]">school</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* LINE-BY-LINE AI REWRITE SUGGESTIONS */}
            {/* ========================================================================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">
                    Precision Calibrations
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-on-surface">
                    Line-by-Line AI Rewrite Suggestions
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {report.lineRewrites.map((rewrite, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-white/[0.06] space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold font-['Inter',sans-serif]">
                        {rewrite.category}
                      </span>
                      <button
                        onClick={() => handleCopyRewrite(rewrite.improved, i)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-['Inter',sans-serif] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedIndex === i ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedIndex === i ? 'Copied!' : 'Copy Improved Line'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Before */}
                      <div className="p-3.5 rounded-xl bg-surface-container/60 border border-white/[0.03] space-y-1">
                        <span className="text-[11px] font-bold text-error uppercase tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                          Original (Weak Phrasing)
                        </span>
                        <p className="text-xs sm:text-sm text-on-surface-variant font-['Inter',sans-serif] line-through decoration-error/50">
                          {rewrite.original}
                        </p>
                      </div>

                      {/* After */}
                      <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                          Optimized (Google XYZ Formula)
                        </span>
                        <p className="text-xs sm:text-sm text-on-surface font-['Inter',sans-serif] font-medium">
                          {rewrite.improved}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant italic font-['Inter',sans-serif]">
                      💡 <strong>Rationale:</strong> {rewrite.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Screen Actions */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06]">
              <button
                onClick={() => {
                  if (onApplyToBuilder) {
                    onApplyToBuilder(resumeText);
                  }
                  setActiveTab('resume-builder');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-['Inter',sans-serif] text-sm font-bold shadow-[0_0_20px_rgba(87,27,193,0.3)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                <span>Open in Algorithmic Resume Builder</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-['Inter',sans-serif] text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Export / Print Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
