export type ActiveTab =
  | 'home'
  | 'resume-score'
  | 'resume-builder'
  | 'how-it-works'
  | 'courses'
  | 'faq'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'forgot-password';

// User account data structure
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

// Server authentication API response
export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
  error?: string;
  demoResetCode?: string;
}

// Telemetry Dashboard protected response payload
export interface DashboardData {
  message: string;
  user: User;
  dashboardStats: {
    resumesScored: number;
    avgAtsScore: number;
    interviewCallbackLift: string;
    skillUpgradesCompleted: number;
    targetRole: string;
  };
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  description: string;
  technologies: string[];
  link?: string;
  bullets: string[];
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  github: string;
  summary: string;
  experiences: WorkExperience[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: {
    languages: string[];
    frameworks: string[];
    cloudAndTools: string[];
    methodologies: string[];
  };
  certifications: string[];
}

export interface SkillGap {
  skill: string;
  category: string;
  priority: 'critical' | 'high' | 'recommended';
  avgSalaryLift: string;
  marketDemand: number; // percentage
  relatedCourseId?: string;
  reason: string;
}

export interface LineRewrite {
  original: string;
  improved: string;
  reason: string;
  category: 'Quantified Impact' | 'Power Verbs' | 'ATS Keyword Alignment' | 'Clarity & Brevity';
}

export interface ScoreReport {
  overallScore: number;
  trajectoryBand: string;
  percentile: string;
  interviewBoost: string;
  atsReadability: {
    score: number;
    status: 'Optimal' | 'Caution' | 'Blocker';
    strengths: string[];
    issues: string[];
  };
  impactAndMetrics: {
    score: number;
    quantifiedRate: string;
    actionVerbDensity: string;
    strengths: string[];
    suggestions: string[];
  };
  keywordsAndFit: {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    densityComment: string;
  };
  structureAndStyle: {
    score: number;
    pageLength: string;
    wordCount: number;
    bulletFormat: string;
    suggestions: string[];
  };
  detectedSkillGaps: SkillGap[];
  lineRewrites: LineRewrite[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  instructor?: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  salaryImpact: string;
  description: string;
  matchedSkills: string[];
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface FAQItem {
  id: string;
  category: 'ATS Mechanics' | 'Data & Privacy' | 'Career Shifters' | 'Optimization' | 'Pricing';
  question: string;
  answer: string;
}
