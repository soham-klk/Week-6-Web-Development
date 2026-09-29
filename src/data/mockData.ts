import { Course, FAQItem, ResumeData, ScoreReport } from '../types';

export const alexMercerResume: ResumeData = {
  fullName: 'Alex Mercer',
  title: 'Senior Frontend Engineer',
  email: 'alex.mercer@devorbit.io',
  phone: '+1 (555) 382-9104',
  location: 'San Francisco, CA (Open to Remote)',
  portfolio: 'https://alexmercer.dev',
  linkedin: 'linkedin.com/in/alex-mercer-tech',
  github: 'github.com/alexmercer',
  summary:
    'High-velocity Senior Frontend Engineer with 6+ years specializing in TypeScript, React architecture, distributed design systems, and WebGL telemetry dashboards. Proven track record scaling client performance by 40% across 5M+ monthly active users and mentoring engineering squads on CI/CD test automation.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Aether Cloud Systems',
      role: 'Staff Frontend Architect',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      bullets: [
        'Architected Next.js micro-frontend ecosystem serving 5.2M MAUs, reducing initial page bundle size by 42% and slashing LCP from 2.8s to 0.9s.',
        'Spearheaded enterprise design system consumed across 14 cross-functional squads, cutting feature delivery velocity cycle from 3 weeks to 6 business days.',
        'Engineered high-throughput canvas telemetry streaming layer handling 50,000 WebSocket events/sec with zero browser frame drops.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Veloce Data Labs',
      role: 'Senior React Engineer',
      location: 'Austin, TX',
      startDate: '2019-08',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Built full-stack analytical dashboards in TypeScript, React, and GraphQL with automated end-to-end Cypress and Vitest test coverage at 92%.',
        'Implemented client-side caching with React Query and service workers, resulting in $140,000 annual cloud ingress bandwidth cost savings.',
        'Collaborated with product leadership to execute 18 algorithmic A/B experiments, improving checkout trial conversion rate by +24%.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering & Human-Computer Interaction',
      graduationDate: '2019',
      gpa: '3.82',
      honors: 'Summa Cum Laude, Dean’s Honors List'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'HyperGrid Canvas Engine',
      role: 'Creator & Lead Maintainer',
      description: 'Open-source WebGL data grid capable of rendering 1,000,000 data rows at steady 60 FPS.',
      technologies: ['TypeScript', 'WebGL', 'Web Workers', 'React'],
      link: 'github.com/alexmercer/hypergrid',
      bullets: [
        'Achieved 4,800+ GitHub stars and adoption by 3 Fortune 500 enterprise dashboards.',
        'Authored benchmark test suites comparing memory footprints against AG-Grid and Canvas-Datagrid.'
      ]
    }
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'HTML5/CSS3', 'SQL'],
    frameworks: ['React 19', 'Next.js 15', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Vite'],
    cloudAndTools: ['AWS (S3, CloudFront, Lambda)', 'Docker', 'Git / GitHub Actions', 'Datadog', 'Jest / Vitest'],
    methodologies: ['Micro-frontends', 'Design Systems', 'Agile/Scrum', 'CI/CD Pipelines', 'Web Performance / Core Web Vitals']
  },
  certifications: [
    'AWS Certified Solutions Architect – Associate (2024)',
    'Meta Certified Front-End Developer Specialization (2022)'
  ]
};

export const sampleAlexScoreReport: ScoreReport = {
  overallScore: 94,
  trajectoryBand: 'Top 3% - Elite Market Calibration',
  percentile: '97th Percentile',
  interviewBoost: '+24% Interview Callbacks',
  atsReadability: {
    score: 98,
    status: 'Optimal',
    strengths: [
      'Clean single-column chronological structure parsed with 100% fidelity.',
      'Standardized section headers (Experience, Education, Skills) recognized by Workday & Taleo.',
      'Zero unparseable floating textboxes, background images, or multi-column flex truncations.'
    ],
    issues: []
  },
  impactAndMetrics: {
    score: 95,
    quantifiedRate: '88% of bullets contain numerical proof points',
    actionVerbDensity: 'Exceptional (Architected, Spearheaded, Engineered, Slashed)',
    strengths: [
      'Outstanding usage of business impact metrics (42% bundle reduction, 5.2M MAUs, $140k savings).',
      'Consistent implementation of the Google XYZ formula (Accomplished [X] as measured by [Y] by doing [Z]).'
    ],
    suggestions: [
      'Consider adding team size or budget context to the Aether Cloud Systems architectural achievements.'
    ]
  },
  keywordsAndFit: {
    score: 92,
    matchedKeywords: [
      'TypeScript',
      'React Architecture',
      'Micro-frontends',
      'Design Systems',
      'GraphQL',
      'Core Web Vitals',
      'CI/CD Pipelines',
      'AWS Cloud',
      'Performance Optimization'
    ],
    missingKeywords: [
      'Cloud Infrastructure (AWS CDK / IaC)',
      'AI Agent Integration / LLM APIs',
      'System Architecture Diagrams'
    ],
    densityComment: 'Dense, natural semantic coverage. Ready for Senior/Staff Engineering applicant screening.'
  },
  structureAndStyle: {
    score: 96,
    pageLength: '1.0 Page (Optimal density for 6 years experience)',
    wordCount: 465,
    bulletFormat: 'Clean 1-2 line concise statements with strong leading verbs.',
    suggestions: [
      'Summary is tightly aligned with target roles. Keep it refreshed as you add AI systems.'
    ]
  },
  detectedSkillGaps: [
    {
      skill: 'AWS Cloud CDK & IaC',
      category: 'Cloud Infrastructure',
      priority: 'high',
      avgSalaryLift: '+$18,000 / yr',
      marketDemand: 82,
      relatedCourseId: 'course-aws-cdk',
      reason: 'Staff/Lead frontend roles increasingly require end-to-end fullstack deployment infrastructure ownership.'
    },
    {
      skill: 'LLM Orchestration & Client AI Agents',
      category: 'Generative AI & ML',
      priority: 'critical',
      avgSalaryLift: '+$26,500 / yr',
      marketDemand: 94,
      relatedCourseId: 'course-ai-agents',
      reason: '87% of Tier-1 tech job descriptions in 2025+ prioritize engineers capable of embedding intelligent agent telemetry.'
    },
    {
      skill: 'Distributed System Design',
      category: 'Backend Architecture',
      priority: 'recommended',
      avgSalaryLift: '+$14,000 / yr',
      marketDemand: 76,
      relatedCourseId: 'course-system-design',
      reason: 'Enhances performance in technical loop rounds when discussing edge caching and global state synchronization.'
    }
  ],
  lineRewrites: [
    {
      original: 'Helped build the user interface for internal admin tools with React.',
      improved: 'Architected modular internal telemetry console with React 19 & TypeScript, accelerating internal triage workflows by 34% across 80+ operators.',
      reason: 'Replaces passive "helped build" with commanding power verb and embeds quantified operational velocity.',
      category: 'Quantified Impact'
    },
    {
      original: 'Responsible for writing unit tests to make sure code worked.',
      improved: 'Authored 250+ automated unit & integration suites in Vitest, boosting test coverage to 92% and preventing regression defects in bi-weekly production releases.',
      reason: 'Eliminates passive duties phrasing; specifies test frameworks and quantitative reliability delta.',
      category: 'Power Verbs'
    },
    {
      original: 'Worked with cloud services to host our website.',
      improved: 'Configured automated AWS CloudFront edge caching and S3 static asset distribution, trimming global TTFB by 140ms.',
      reason: 'Replaces generic "cloud services" with ATS-scanned keywords (AWS CloudFront, S3, TTFB).',
      category: 'ATS Keyword Alignment'
    }
  ]
};

export const curatedCourses: Course[] = [
  {
    id: 'course-ai-agents',
    title: 'Modern LLM Orchestration & Autonomous Agent Telemetry',
    provider: 'DeepLearning Labs',
    instructor: 'Dr. Aris Thorne',
    rating: 4.9,
    reviewsCount: 3840,
    duration: '16 hours · 6 modules',
    level: 'Intermediate',
    tags: ['AI Agents', 'TypeScript', 'LangChain', 'Prompt Engineering', 'Vector DBs'],
    salaryImpact: '+$26,500 / yr',
    description: 'Master practical production integration of generative AI models, function calling, agentic memory loops, and streaming telemetry directly in frontend web applications.',
    matchedSkills: ['LLM Orchestration & Client AI Agents', 'AI Telemetry', 'Vector Search'],
    featured: true
  },
  {
    id: 'course-aws-cdk',
    title: 'AWS Cloud CDK & Serverless Microservices at Scale',
    provider: 'CloudFlight Academy',
    instructor: 'Elena Rostova (Principal Cloud Architect)',
    rating: 4.85,
    reviewsCount: 2910,
    duration: '22 hours · 8 modules',
    level: 'Advanced',
    tags: ['AWS CDK', 'Infrastructure as Code', 'Serverless', 'Lambda', 'API Gateway'],
    salaryImpact: '+$18,000 / yr',
    description: 'Code real infrastructure in TypeScript using AWS Cloud Development Kit (CDK v2). Build robust CI/CD deployment pipelines with zero configuration drift.',
    matchedSkills: ['AWS Cloud CDK & IaC', 'Cloud Architecture', 'CI/CD Pipelines'],
    featured: true
  },
  {
    id: 'course-system-design',
    title: 'High-Performance System Design & Scale Architecture',
    provider: 'Systems Elite',
    instructor: 'Karthik Ramanujan',
    rating: 4.95,
    reviewsCount: 7120,
    duration: '28 hours · 12 modules',
    level: 'Advanced',
    tags: ['System Design', 'Distributed Systems', 'Caching', 'Kafka', 'Microservices'],
    salaryImpact: '+$22,000 / yr',
    description: 'Reverse-engineer real-world architectures from Netflix, Uber, and Discord. Ace senior and staff tech loop interviews with confidence.',
    matchedSkills: ['Distributed System Design', 'High Concurrency', 'Microservices'],
    featured: true
  },
  {
    id: 'course-ts-architecture',
    title: 'Advanced TypeScript & Large-Scale Frontend Patterns',
    provider: 'Frontend Masters',
    instructor: 'Mike North',
    rating: 4.92,
    reviewsCount: 5410,
    duration: '14 hours · 5 modules',
    level: 'Intermediate',
    tags: ['TypeScript', 'Design Patterns', 'Generics', 'State Management'],
    salaryImpact: '+$15,000 / yr',
    description: 'Deep dive into conditional types, template literals, variance, AST transformations, and clean architectural boundaries in enterprise React codebases.',
    matchedSkills: ['TypeScript / React Architecture', 'Design Systems'],
    featured: false
  },
  {
    id: 'course-k8s',
    title: 'Kubernetes & Container Orchestration for Developers',
    provider: 'DevOps Engine',
    instructor: 'Siddharth Nair',
    rating: 4.8,
    reviewsCount: 1940,
    duration: '18 hours · 7 modules',
    level: 'Intermediate',
    tags: ['Kubernetes', 'Docker', 'Helm', 'Ingress', 'Monitoring'],
    salaryImpact: '+$16,500 / yr',
    description: 'Take containerized apps to production clusters. Master Helm charts, rolling deployments, health probes, and Prometheus telemetry dashboards.',
    matchedSkills: ['Kubernetes', 'Containerization', 'DevOps'],
    featured: false
  },
  {
    id: 'course-perf',
    title: 'Web Performance Telemetry & Core Web Vitals Mastery',
    provider: 'Chrome Dev Experts',
    instructor: 'Addy & Team',
    rating: 4.9,
    reviewsCount: 2280,
    duration: '10 hours · 4 modules',
    level: 'Advanced',
    tags: ['Performance', 'LCP', 'INP', 'CLS', 'DevTools', 'Web Workers'],
    salaryImpact: '+$12,500 / yr',
    description: 'Diagnose and fix real-world performance bottlenecks. Profile runtime tasks, optimize Interaction to Next Paint (INP), and eliminate layout shifts.',
    matchedSkills: ['Web Performance / Core Web Vitals', 'Profiling'],
    featured: false
  }
];

export const faqList: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ATS Mechanics',
    question: 'How does CareerPilot evaluate ATS compatibility?',
    answer:
      'Our autonomous evaluation engine runs resumes through three distinct parsing architectures matching the leading enterprise ATS platforms (Greenhouse, Workday, and Lever). We check for keyword density, layout readability, font safety, and semantic relevance to your target job titles, ensuring your resume reaches human hiring managers without parse truncation.'
  },
  {
    id: 'faq-2',
    category: 'Data & Privacy',
    question: 'Is my resume data kept private and confidential?',
    answer:
      'Yes. Your career telemetry is encrypted using SOC2-compliant standards both at rest and in transit. We do not sell your personal information or use your proprietary job history to train public AI models without your express consent. You retain full ownership and deletion rights over your data at any time.'
  },
  {
    id: 'faq-3',
    category: 'Career Shifters',
    question: 'Can students or career shifters use the Resume Builder without corporate experience?',
    answer:
      'Absolutely. The CareerPilot builder is custom-tailored for early-career innovators and career transitioners. It guides you to highlight academic achievements, group capstones, hackathon projects, open-source GitHub repositories, and verified certifications into high-impact bullet points that hiring managers respect.'
  },
  {
    id: 'faq-4',
    category: 'Optimization',
    question: 'What is the "Google XYZ Formula" used in line rewrites?',
    answer:
      'The XYZ formula stands for: "Accomplished [X] as measured by [Y], by doing [Z]". For example: "Slashed database query latency by 45% (Y) across 300,000 daily active users (X) by implementing Redis read-replica caching layers (Z)". CareerPilot automatically detects weak, task-based bullet points and offers one-click upgrades into this high-impact formula.'
  },
  {
    id: 'faq-5',
    category: 'ATS Mechanics',
    question: 'Should I submit PDF or Word .docx files to job postings?',
    answer:
      'Modern ATS systems parse standard text-based PDFs flawlessly when generated through clean single-column semantic markup (like CareerPilot exports). However, if a job portal explicitly requests .docx, we provide one-click markdown/text exports that convert cleanly without losing formatting.'
  },
  {
    id: 'faq-6',
    category: 'Pricing',
    question: 'Is CareerPilot free to use?',
    answer:
      'Yes! CareerPilot provides a 100% free initial telemetry diagnostic report, resume builder exports, ATS audits, and course pathway matching with zero credit card required.'
  }
];

export const targetRolePresets = [
  {
    title: 'Senior Frontend Engineer',
    keywords: ['React', 'TypeScript', 'Next.js', 'Design Systems', 'Micro-frontends', 'Core Web Vitals', 'GraphQL', 'AWS', 'CI/CD']
  },
  {
    title: 'Full Stack AI / ML Engineer',
    keywords: ['Python', 'TypeScript', 'LangChain', 'FastAPI', 'PyTorch', 'Vector Databases', 'OpenAI / Gemini APIs', 'Docker', 'RAG']
  },
  {
    title: 'Senior Product Manager',
    keywords: ['Product Strategy', 'Roadmapping', 'A/B Testing', 'User Telemetry', 'SQL / Analytics', 'Agile / Scrum', 'GTM Execution', 'Stakeholder Management']
  },
  {
    title: 'DevOps / Cloud Platform Engineer',
    keywords: ['Kubernetes', 'Terraform', 'AWS CDK', 'CI/CD Pipelines', 'Docker', 'Linux', 'Prometheus / Grafana', 'Zero Trust Security']
  }
];
