import React, { useState } from 'react';
import { ResumeData, ActiveTab } from '../types';
import { alexMercerResume } from '../data/mockData';
import { enhanceBulletAI } from '../services/aiService';

interface ResumeBuilderScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
  initialResume?: ResumeData;
}

export const ResumeBuilderScreen: React.FC<ResumeBuilderScreenProps> = ({
  setActiveTab,
  initialResume = alexMercerResume,
}) => {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [activeStep, setActiveStep] = useState<
    'contact' | 'summary' | 'experience' | 'projects' | 'skills' | 'education'
  >('experience');
  const [template, setTemplate] = useState<'cosmic' | 'executive' | 'modern'>('cosmic');
  const [enhancingIndex, setEnhancingIndex] = useState<string | null>(null);
  const [copiedMd, setCopiedMd] = useState(false);

  // Student New Grad preset
  const loadStudentPreset = () => {
    setResume({
      fullName: 'Maya Patel',
      title: 'Associate Software Engineer & AI Researcher',
      email: 'maya.patel@alumni.edu',
      phone: '+1 (555) 749-2041',
      location: 'Seattle, WA',
      portfolio: 'https://mayapatel.tech',
      linkedin: 'linkedin.com/in/mayapatel-cs',
      github: 'github.com/mayapatel',
      summary:
        'Driven Computer Science graduate with hands-on capstone leadership in full-stack web applications and machine learning classification. Recognized as 1st Place Winner at CalHacks 2024 for autonomous accessibility tooling.',
      experiences: [
        {
          id: 'exp-s1',
          company: 'Nexus Tech Labs',
          role: 'Software Engineering Intern',
          location: 'Remote',
          startDate: '2024-05',
          endDate: '2024-08',
          current: false,
          bullets: [
            'Engineered RESTful microservices in Node.js and TypeScript, reducing client API endpoint latency by 28%.',
            'Implemented automated Jest testing suites across 4 repositories, elevating test coverage from 64% to 89%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-s1',
          school: 'University of Washington',
          degree: 'B.S. in Computer Science',
          field: 'Data Structures & Distributed Systems',
          graduationDate: '2024',
          gpa: '3.91',
          honors: 'Dean’s High Honor List, ACM Student Officer'
        }
      ],
      projects: [
        {
          id: 'proj-s1',
          title: 'EchoVision - Computer Vision for Accessibility',
          role: 'Lead Full-Stack Developer',
          description: 'Assistive mobile web application converting environmental video feeds into synthesized audio captions.',
          technologies: ['React', 'Python', 'WebRTC', 'TensorFlow.js', 'Tailwind CSS'],
          link: 'github.com/mayapatel/echovision',
          bullets: [
            'Awarded 1st Place out of 240 teams at CalHacks 2024.',
            'Optimized model inference time on client devices from 420ms to 95ms using Web Workers.'
          ]
        }
      ],
      skills: {
        languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
        frameworks: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'FastAPI'],
        cloudAndTools: ['Git / GitHub', 'Docker', 'AWS (EC2, S3)', 'PostgreSQL', 'Vitest'],
        methodologies: ['Agile Development', 'Object-Oriented Design', 'Code Reviews']
      },
      certifications: [
        'AWS Certified Cloud Practitioner (2024)',
        'DeepLearning.AI Machine Learning Specialization (2023)'
      ]
    });
  };

  // Quick live score calculation
  const calculateLiveScore = () => {
    let score = 50;
    if (resume.fullName && resume.email && resume.phone) score += 10;
    if (resume.summary.length > 50) score += 10;
    if (resume.experiences.length > 0) score += 10;
    const allBullets = [
      ...resume.experiences.flatMap((e) => e.bullets),
      ...resume.projects.flatMap((p) => p.bullets),
    ];
    if (allBullets.some((b) => /\d+%|\d+x|\$\d+/.test(b))) score += 10;
    if (resume.skills.languages.length >= 3) score += 5;
    if (resume.education.length > 0) score += 5;
    return Math.min(98, score);
  };

  const handleEnhanceBullet = async (expId: string, bulletIdx: number, text: string) => {
    setEnhancingIndex(`${expId}-${bulletIdx}`);
    try {
      const improved = await enhanceBulletAI(text, resume.title);
      setResume((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) => {
          if (exp.id === expId) {
            const newBullets = [...exp.bullets];
            newBullets[bulletIdx] = improved;
            return { ...exp, bullets: newBullets };
          }
          return exp;
        }),
      }));
    } finally {
      setEnhancingIndex(null);
    }
  };

  const generateMarkdown = () => {
    return `# ${resume.fullName}
**${resume.title}** | ${resume.email} | ${resume.phone} | ${resume.location}
${resume.portfolio ? `Portfolio: ${resume.portfolio} | ` : ''}${resume.linkedin ? `LinkedIn: ${resume.linkedin} | ` : ''}${resume.github ? `GitHub: ${resume.github}` : ''}

## Professional Summary
${resume.summary}

## Experience
${resume.experiences
  .map(
    (e) => `### ${e.role} — ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})
${e.bullets.map((b) => `- ${b}`).join('\n')}`
  )
  .join('\n\n')}

## Projects
${resume.projects
  .map(
    (p) => `### ${p.title} (${p.technologies.join(', ')})
${p.bullets.map((b) => `- ${b}`).join('\n')}`
  )
  .join('\n\n')}

## Education
${resume.education
  .map((ed) => `### ${ed.degree}, ${ed.school} (${ed.graduationDate}) - GPA: ${ed.gpa || 'N/A'}`)
  .join('\n')}

## Technical Skills
- **Languages:** ${resume.skills.languages.join(', ')}
- **Frameworks:** ${resume.skills.frameworks.join(', ')}
- **Cloud & Tools:** ${resume.skills.cloudAndTools.join(', ')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const liveScore = calculateLiveScore();

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-primary-container selection:text-on-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-['Inter',sans-serif] text-xs font-bold mb-2 border border-secondary/20">
              <span className="material-symbols-outlined text-[16px]">magic_button</span>
              <span>Guided Algorithmic Resume Builder</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-on-surface">
              Step-by-Step ATS Architect
            </h1>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Construct high-conversion bullet points powered by the Google XYZ formula. Optimized for university graduates, career changers, and senior engineers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setResume(alexMercerResume)}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-['Inter',sans-serif] text-xs font-semibold border border-primary/20 transition-colors cursor-pointer"
            >
              Load Senior Template
            </button>
            <button
              onClick={loadStudentPreset}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-secondary font-['Inter',sans-serif] text-xs font-semibold border border-secondary/20 transition-colors cursor-pointer"
            >
              Load Student / New Grad Template
            </button>
          </div>
        </div>

        {/* Live Score Bar & Action Controls */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-primary">
                {liveScore}
              </span>
              <span className="text-xs text-on-surface-variant font-bold">/ 100 ATS</span>
            </div>
            <div className="w-36 h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary transition-all duration-500 rounded-full"
                style={{ width: `${liveScore}%` }}
              />
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-on-surface-variant">
              {liveScore >= 90
                ? '⭐ Elite ATS Calibration'
                : '⚡ Add quantified metrics to exceed 90'}
            </span>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-['Inter',sans-serif] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedMd ? 'check' : 'code'}
              </span>
              <span>{copiedMd ? 'Markdown Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-['Inter',sans-serif] text-xs font-bold shadow-[0_0_15px_rgba(76,215,246,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Dual-Pane Layout: Left Form Editor, Right Live ATS Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-Step Editor Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step navigation tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-container-low border border-white/[0.04]">
              {(
                [
                  { id: 'experience', label: 'Experience' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'education', label: 'Education' },
                  { id: 'summary', label: 'Summary' },
                  { id: 'contact', label: 'Contact' },
                ] as const
              ).map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-['Inter',sans-serif] font-semibold transition-all cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>

            {/* Form Panels */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-xl space-y-6">
              {/* STEP 1: CONTACT */}
              {activeStep === 'contact' && (
                <div className="space-y-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                    Personal &amp; Contact Header
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={resume.fullName}
                        onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Target Professional Title
                      </label>
                      <input
                        type="text"
                        value={resume.title}
                        onChange={(e) => setResume({ ...resume, title: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={resume.email}
                        onChange={(e) => setResume({ ...resume, email: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={resume.phone}
                        onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={resume.location}
                        onChange={(e) => setResume({ ...resume, location: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        LinkedIn Profile
                      </label>
                      <input
                        type="text"
                        value={resume.linkedin}
                        onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        GitHub Profile
                      </label>
                      <input
                        type="text"
                        value={resume.github}
                        onChange={(e) => setResume({ ...resume, github: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Portfolio / Website
                      </label>
                      <input
                        type="text"
                        value={resume.portfolio}
                        onChange={(e) => setResume({ ...resume, portfolio: e.target.value })}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SUMMARY */}
              {activeStep === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                      Professional Executive Summary
                    </h3>
                    <button
                      onClick={() => {
                        setResume({
                          ...resume,
                          summary: `Accomplished ${resume.title} with proven background driving high-reliability software architectures. Expert in quantitative performance optimization, stakeholder collaboration, and modern engineering standards.`,
                        });
                      }}
                      className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      AI Draft Summary
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={resume.summary}
                    onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                    placeholder="Write a concise 2-3 sentence overview highlighting your years of experience, core technical specialties, and primary business impact..."
                    className="w-full bg-surface-container-highest p-4 rounded-xl text-sm text-on-surface border border-white/10 focus:outline-none focus:border-primary leading-relaxed resize-none"
                  />
                  <div className="p-3 rounded-xl bg-surface-container text-xs text-on-surface-variant">
                    💡 <strong>Pro Tip:</strong> Keep your summary under 60 words. Avoid generic cliches ("hard worker", "team player"); emphasize hard skills and scale of impact.
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE */}
              {activeStep === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                      Work Experience
                    </h3>
                    <button
                      onClick={() => {
                        const newExp = {
                          id: `exp-${Date.now()}`,
                          company: 'Innovative Tech Corp',
                          role: 'Software Engineer',
                          location: 'Remote',
                          startDate: '2023-01',
                          endDate: 'Present',
                          current: true,
                          bullets: [
                            'Engineered responsive web applications using TypeScript and React, accelerating page load speeds by 30%.',
                            'Partnered with product managers to deliver 5 core user journey features on schedule.'
                          ]
                        };
                        setResume({ ...resume, experiences: [newExp, ...resume.experiences] });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Add Role
                    </button>
                  </div>

                  {resume.experiences.map((exp, expIdx) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-surface-container/70 border border-white/[0.04] space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-on-surface">
                          Role #{expIdx + 1}
                        </span>
                        <button
                          onClick={() => {
                            setResume({
                              ...resume,
                              experiences: resume.experiences.filter((e) => e.id !== exp.id),
                            });
                          }}
                          className="text-xs text-error hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const newExp = [...resume.experiences];
                            newExp[expIdx].role = e.target.value;
                            setResume({ ...resume, experiences: newExp });
                          }}
                          placeholder="Role (e.g. Senior Frontend Engineer)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...resume.experiences];
                            newExp[expIdx].company = e.target.value;
                            setResume({ ...resume, experiences: newExp });
                          }}
                          placeholder="Company (e.g. Aether Cloud Systems)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...resume.experiences];
                            newExp[expIdx].startDate = e.target.value;
                            setResume({ ...resume, experiences: newExp });
                          }}
                          placeholder="Start Date (e.g. 2022-03)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...resume.experiences];
                            newExp[expIdx].endDate = e.target.value;
                            setResume({ ...resume, experiences: newExp });
                          }}
                          placeholder="End Date (or leave blank if Present)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                      </div>

                      {/* Bullets with AI enhancement */}
                      <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                        <label className="block text-xs font-semibold text-on-surface-variant">
                          Key Deliverables (Google XYZ Formula)
                        </label>
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="space-y-1.5">
                            <div className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => {
                                  const newExp = [...resume.experiences];
                                  newExp[expIdx].bullets[bIdx] = e.target.value;
                                  setResume({ ...resume, experiences: newExp });
                                }}
                                className="w-full bg-surface-container-highest p-2 rounded-lg text-xs text-on-surface border border-white/10 resize-none"
                              />
                              <button
                                onClick={() => handleEnhanceBullet(exp.id, bIdx, bullet)}
                                disabled={enhancingIndex === `${exp.id}-${bIdx}`}
                                title="Enhance with AI Power Verbs and Metrics"
                                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  {enhancingIndex === `${exp.id}-${bIdx}`
                                    ? 'hourglass_empty'
                                    : 'auto_awesome'}
                                </span>
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => {
                            const newExp = [...resume.experiences];
                            newExp[expIdx].bullets.push(
                              'Spearheaded automated testing pipelines, slashing deployment errors by 22%.'
                            );
                            setResume({ ...resume, experiences: newExp });
                          }}
                          className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                          Add Bullet Point
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 4: PROJECTS */}
              {activeStep === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                        Academic &amp; Open-Source Projects
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        Perfect for students, bootcamps, and career switchers to showcase hands-on competencies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newProj = {
                          id: `proj-${Date.now()}`,
                          title: 'Autonomous Data Pipeline',
                          description: 'Streamed live telemetry using Kafka and Python.',
                          technologies: ['Python', 'Docker', 'PostgreSQL'],
                          bullets: [
                            'Built resilient microservices processing 10,000 requests/sec with 99.9% uptime.'
                          ]
                        };
                        setResume({ ...resume, projects: [...resume.projects, newProj] });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Add Project
                    </button>
                  </div>

                  {resume.projects.map((proj, pIdx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-surface-container/70 border border-white/[0.04] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-on-surface">
                          Project #{pIdx + 1}
                        </span>
                        <button
                          onClick={() => {
                            setResume({
                              ...resume,
                              projects: resume.projects.filter((p) => p.id !== proj.id),
                            });
                          }}
                          className="text-xs text-error hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const newProj = [...resume.projects];
                            newProj[pIdx].title = e.target.value;
                            setResume({ ...resume, projects: newProj });
                          }}
                          placeholder="Project Title"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={proj.technologies.join(', ')}
                          onChange={(e) => {
                            const newProj = [...resume.projects];
                            newProj[pIdx].technologies = e.target.value
                              .split(',')
                              .map((t) => t.trim());
                            setResume({ ...resume, projects: newProj });
                          }}
                          placeholder="Tech Stack (comma separated)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                          Project Bullet Point
                        </label>
                        <textarea
                          rows={2}
                          value={proj.bullets[0] || ''}
                          onChange={(e) => {
                            const newProj = [...resume.projects];
                            newProj[pIdx].bullets[0] = e.target.value;
                            setResume({ ...resume, projects: newProj });
                          }}
                          placeholder="Accomplished [X] measured by [Y] by doing [Z]"
                          className="w-full bg-surface-container-highest p-2 rounded-lg text-xs text-on-surface border border-white/10 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 5: SKILLS */}
              {activeStep === 'skills' && (
                <div className="space-y-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                    Categorized Technical Competencies
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Languages (comma separated)
                      </label>
                      <input
                        type="text"
                        value={resume.skills.languages.join(', ')}
                        onChange={(e) => {
                          setResume({
                            ...resume,
                            skills: {
                              ...resume.skills,
                              languages: e.target.value.split(',').map((s) => s.trim()),
                            },
                          });
                        }}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-xs text-on-surface border border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Frameworks &amp; Libraries
                      </label>
                      <input
                        type="text"
                        value={resume.skills.frameworks.join(', ')}
                        onChange={(e) => {
                          setResume({
                            ...resume,
                            skills: {
                              ...resume.skills,
                              frameworks: e.target.value.split(',').map((s) => s.trim()),
                            },
                          });
                        }}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-xs text-on-surface border border-white/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Cloud &amp; Developer Tools
                      </label>
                      <input
                        type="text"
                        value={resume.skills.cloudAndTools.join(', ')}
                        onChange={(e) => {
                          setResume({
                            ...resume,
                            skills: {
                              ...resume.skills,
                              cloudAndTools: e.target.value.split(',').map((s) => s.trim()),
                            },
                          });
                        }}
                        className="w-full bg-surface-container-highest px-3 py-2 rounded-xl text-xs text-on-surface border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: EDUCATION */}
              {activeStep === 'education' && (
                <div className="space-y-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-on-surface">
                    Education &amp; Credentials
                  </h3>
                  {resume.education.map((edu, idx) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl bg-surface-container/70 border border-white/[0.04] space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].school = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          placeholder="Institution Name"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].degree = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          placeholder="Degree (e.g. B.S. in Computer Science)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={edu.graduationDate}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].graduationDate = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          placeholder="Graduation Year"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => {
                            const newEdu = [...resume.education];
                            newEdu[idx].gpa = e.target.value;
                            setResume({ ...resume, education: newEdu });
                          }}
                          placeholder="GPA (e.g. 3.82 or leave blank)"
                          className="bg-surface-container-highest px-3 py-2 rounded-lg text-xs text-on-surface border border-white/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Interactive ATS-Tested Document Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  visibility
                </span>
                Live ATS-Compliant Document View
              </span>

              {/* Template Style Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['cosmic', 'executive', 'modern'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                      template === t
                        ? 'bg-surface-container-highest text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Document sheet */}
            <div
              id="resume-printable-sheet"
              className={`w-full min-h-[640px] p-6 sm:p-10 rounded-2xl shadow-2xl transition-all border ${
                template === 'cosmic'
                  ? 'bg-surface-container-low text-on-surface border-primary/20'
                  : template === 'executive'
                    ? 'bg-white text-gray-900 border-gray-200'
                    : 'bg-[#0f172a] text-slate-100 border-cyan-500/20'
              }`}
            >
              {/* Header */}
              <div className="border-b pb-4 mb-4 border-current/15">
                <h2 className="text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {resume.fullName || 'Your Full Name'}
                </h2>
                <p className="text-sm font-semibold opacity-90">{resume.title}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-75 mt-1">
                  <span>{resume.email}</span>
                  <span>·</span>
                  <span>{resume.phone}</span>
                  <span>·</span>
                  <span>{resume.location}</span>
                  {resume.portfolio && (
                    <>
                      <span>·</span>
                      <span>{resume.portfolio}</span>
                    </>
                  )}
                  {resume.github && (
                    <>
                      <span>·</span>
                      <span>{resume.github}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80 border-b border-current/10 pb-0.5">
                    Professional Summary
                  </h3>
                  <p className="text-xs leading-relaxed opacity-90">{resume.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resume.experiences.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80 border-b border-current/10 pb-0.5">
                    Work Experience
                  </h3>
                  <div className="space-y-3">
                    {resume.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold">{exp.role}</span>
                          <span className="opacity-75">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="text-xs opacity-85 italic mb-1">{exp.company}</div>
                        <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
                          {exp.bullets.filter(Boolean).map((bullet, i) => (
                            <li key={i} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80 border-b border-current/10 pb-0.5">
                    Projects &amp; Capstones
                  </h3>
                  <div className="space-y-2">
                    {resume.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold">{proj.title}</span>
                          <span className="opacity-75">{proj.technologies.join(', ')}</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-xs opacity-90">
                          {proj.bullets.filter(Boolean).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resume.education.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80 border-b border-current/10 pb-0.5">
                    Education
                  </h3>
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-bold">{edu.degree}</span> — {edu.school}
                      </div>
                      <span className="opacity-75">{edu.graduationDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80 border-b border-current/10 pb-0.5">
                  Technical Skills
                </h3>
                <div className="text-xs space-y-0.5 opacity-90">
                  <p>
                    <strong>Languages:</strong> {resume.skills.languages.filter(Boolean).join(', ')}
                  </p>
                  <p>
                    <strong>Frameworks:</strong> {resume.skills.frameworks.filter(Boolean).join(', ')}
                  </p>
                  <p>
                    <strong>Tools:</strong> {resume.skills.cloudAndTools.filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Test in Scorer Link */}
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setActiveTab('resume-score');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                <span>Audit this resume with Autonomous Scorer AI</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
