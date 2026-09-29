import React, { useState } from 'react';
import { Course, ActiveTab } from '../types';
import { curatedCourses } from '../data/mockData';

interface CoursesScreenProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({ setActiveTab }) => {
  const [filter, setFilter] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<string[]>(['course-ai-agents']);
  const [selectedSkillsForCalc, setSelectedSkillsForCalc] = useState<string[]>([
    'LLM Orchestration & Client AI Agents',
    'AWS Cloud CDK & IaC'
  ]);

  const categories = ['All', 'Generative AI', 'Cloud & DevOps', 'Architecture', 'Frontend'];

  const filteredCourses = curatedCourses.filter((course) => {
    if (filter === 'All') return true;
    if (filter === 'Generative AI') return course.tags.some((t) => t.includes('AI'));
    if (filter === 'Cloud & DevOps')
      return course.tags.some((t) => t.includes('AWS') || t.includes('Kubernetes') || t.includes('Cloud'));
    if (filter === 'Architecture')
      return course.tags.some((t) => t.includes('System') || t.includes('Distributed'));
    if (filter === 'Frontend')
      return course.tags.some((t) => t.includes('TypeScript') || t.includes('Performance'));
    return true;
  });

  const skillLiftValues: Record<string, number> = {
    'LLM Orchestration & Client AI Agents': 26500,
    'AWS Cloud CDK & IaC': 18000,
    'Distributed System Design': 22000,
    'Kubernetes & Helm Microservices': 16500,
    'Web Performance & INP Tuning': 12500,
  };

  const calculatedLift = selectedSkillsForCalc.reduce(
    (acc, skill) => acc + (skillLiftValues[skill] || 0),
    0
  );

  const toggleSkillCalc = (skill: string) => {
    if (selectedSkillsForCalc.includes(skill)) {
      setSelectedSkillsForCalc(selectedSkillsForCalc.filter((s) => s !== skill));
    } else {
      setSelectedSkillsForCalc([...selectedSkillsForCalc, skill]);
    }
  };

  const toggleEnroll = (courseId: string) => {
    if (enrolledIds.includes(courseId)) {
      setEnrolledIds(enrolledIds.filter((id) => id !== courseId));
    } else {
      setEnrolledIds([...enrolledIds, courseId]);
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-primary-container selection:text-on-primary">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary font-['Inter',sans-serif] text-xs font-bold mb-2 border border-tertiary/20">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>Stage 04 Upskill Telemetry</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl sm:text-4xl font-extrabold text-on-surface">
              Curated Upskill Pathways
            </h1>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-on-surface-variant max-w-2xl mt-1">
              Close detected competency gaps with verified, high-yield courses mapped directly to real-world salary bracket increases.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('resume-score');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-['Inter',sans-serif] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer border border-primary/20 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            <span>Detect My Skill Gaps</span>
          </button>
        </div>

        {/* Interactive Salary Upside Simulator Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block font-['Inter',sans-serif]">
                Interactive Compensation Telemetry
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-extrabold text-on-surface">
                Calculate Your Projected Salary Uplift
              </h2>
              <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                Toggle in-demand competencies to estimate your combined annual market compensation delta based on verified Q3 placements.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(skillLiftValues).map((skill) => {
                  const isSelected = selectedSkillsForCalc.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkillCalc(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-['Inter',sans-serif] font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-white/[0.06]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isSelected ? 'check' : 'add'}
                      </span>
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 bg-surface-container-lowest/80 p-6 rounded-2xl border border-white/[0.08] text-center space-y-1">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block font-['Inter',sans-serif]">
                Projected Annual Uplift
              </span>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl sm:text-5xl font-extrabold text-primary">
                +${calculatedLift.toLocaleString()}
              </div>
              <span className="text-[11px] text-on-surface-variant block">
                per year across verified tier-1 roles
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-['Inter',sans-serif] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-surface-container-low border border-white/[0.06] hover:bg-surface-container transition-all flex flex-col justify-between space-y-6 shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Top badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-['Inter',sans-serif] text-[11px] font-semibold">
                      {course.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-['Inter',sans-serif] text-xs font-bold border border-primary/20">
                      {course.salaryImpact}
                    </span>
                  </div>

                  {/* Course Title & Provider */}
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1 font-['Inter',sans-serif]">
                      {course.provider} · {course.instructor}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-on-surface-variant leading-relaxed font-['Inter',sans-serif]">
                    {course.description}
                  </p>

                  {/* Rating & Duration */}
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant pt-1 border-t border-white/[0.04]">
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      {course.rating}
                    </span>
                    <span>{course.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[10px] font-['Inter',sans-serif]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => toggleEnroll(course.id)}
                    className={`flex-1 py-2.5 rounded-xl font-['Inter',sans-serif] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isEnrolled
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-primary hover:bg-primary-container text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isEnrolled ? 'bookmark_added' : 'add_task'}
                    </span>
                    <span>{isEnrolled ? 'Saved in Flight Plan' : 'Add to Flight Plan'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="p-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-on-surface transition-colors cursor-pointer"
                    title="View Full Curriculum"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-container-low max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold font-['Inter',sans-serif]">
                    {selectedCourse.level}
                  </span>
                  <span className="text-xs text-secondary font-bold font-['Inter',sans-serif]">
                    {selectedCourse.salaryImpact}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-on-surface">
                  {selectedCourse.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Offered by {selectedCourse.provider} · Instructed by {selectedCourse.instructor}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Curriculum Overview
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedCourse.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant pt-2 border-t border-white/[0.06]">
                  <span>⏱ {selectedCourse.duration}</span>
                  <span>⭐ {selectedCourse.rating} ({selectedCourse.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                  Targeted Skills Unlocked
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.matchedSkills.map((ms, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-surface-container-high text-primary text-xs font-semibold"
                    >
                      ✓ {ms}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    toggleEnroll(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  {enrolledIds.includes(selectedCourse.id)
                    ? 'Remove from Plan'
                    : 'Save to Flight Plan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
