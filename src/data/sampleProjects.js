/**
 * Internlytic Projects Showcase - Sample Demonstration Data
 * 
 * DISCLAIMER & NOTICE:
 * This dataset contains fictional, clearly labelled demonstration records
 * created exclusively to showcase frontend gallery and filtering capabilities.
 * These records do NOT represent real submissions, private corporate databases,
 * or proprietary intellectual property of Internlytic Technologies.
 * 
 * All statuses are explicitly labelled as "Sample Project"
 * to maintain complete honesty and compliance with showcase guidelines.
 */

export const SAMPLE_PROJECTS = [
  {
    id: "proj-001",
    projectTitle: "AI Study Planner",
    internName: "Demonstration Intern - Track Alpha",
    track: "AI & Machine Learning",
    description: "An adaptive revision schedule generator that analyzes syllabus topics, student exam dates, and daily availability to generate optimized spaced-repetition schedules with personalized focus sessions.",
    thumbnailUrl: "/images/projects/ai-study-planner.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "Python", "FastAPI", "scikit-learn", "Tailwind CSS"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-002",
    projectTitle: "Expense Tracking Dashboard",
    internName: "Demonstration Intern - Track Beta",
    track: "Web Development",
    description: "An intuitive financial management dashboard with real-time budget forecasting, interactive expense category breakdowns, receipt categorization, and CSV transaction exports.",
    thumbnailUrl: "/images/projects/expense-tracker.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "TypeScript", "Chart.js", "Node.js", "Express"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-003",
    projectTitle: "Smart Library Management",
    internName: "Demonstration Intern - Track Gamma",
    track: "Web Development",
    description: "A centralized catalog system featuring barcode scanning simulation, automated overdue loan notifications, reservation queues, and comprehensive inventory management for academic institutions.",
    thumbnailUrl: "/images/projects/smart-library.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-004",
    projectTitle: "Developer Portfolio Builder",
    internName: "Demonstration Intern - Track Delta",
    track: "UI/UX Design",
    description: "A modular, accessible portfolio construction toolkit for junior engineers offering accessible theme configurations, dynamic markdown project showcases, and live layout switching.",
    thumbnailUrl: "/images/projects/portfolio-builder.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Figma", "React", "CSS Modules", "HTML5 Semantics", "Vite"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-005",
    projectTitle: "Weather Forecast Dashboard",
    internName: "Demonstration Intern - Track Epsilon",
    track: "Web Development",
    description: "A weather intelligence terminal providing 7-day hourly forecasts, interactive precipitation radar overlays, air quality metrics (AQI), and geocoded multi-city weather tracking.",
    thumbnailUrl: "/images/projects/weather-dashboard.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "Vite", "OpenMeteo API", "Leaflet Maps", "Vanilla CSS"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-006",
    projectTitle: "E-commerce Analytics Tool",
    internName: "Demonstration Intern - Track Zeta",
    track: "Data Science",
    description: "An exploratory business intelligence suite tracking conversion funnels, churn probability signals, customer lifetime value (CLV) estimations, and cohort retention visualizers.",
    thumbnailUrl: "/images/projects/ecommerce-analytics.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Python", "Pandas", "React", "Recharts", "SQL"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-007",
    projectTitle: "Mobile Habit Tracker",
    internName: "Demonstration Intern - Track Eta",
    track: "Mobile Applications",
    description: "A cross-platform daily habit discipline companion with customizable streaks, milestone badges, motivational micro-animations, and offline-first local storage caching.",
    thumbnailUrl: "/images/projects/habit-tracker.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React Native", "Expo", "AsyncStorage", "TypeScript"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-008",
    projectTitle: "Document Processing Assistant",
    internName: "Demonstration Intern - Track Theta",
    track: "AI & Machine Learning",
    description: "An automated document workflow processor providing key entity extraction, multi-lingual summarization, table extraction from PDFs, and instant structured JSON export.",
    thumbnailUrl: "/images/projects/document-assistant.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Python", "OCR", "Hugging Face", "FastAPI", "React"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-009",
    projectTitle: "Cloud Deployment Monitor",
    internName: "Demonstration Intern - Track Iota",
    track: "Cloud & DevOps",
    description: "A unified infrastructure health dashboard tracking Kubernetes pod statuses, container deployment rollout stages, latency heatmaps, and simulated incident alerting thresholds.",
    thumbnailUrl: "/images/projects/cloud-monitor.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Docker", "Kubernetes", "Prometheus", "Grafana", "React"],
    approvalStatus: "Sample Project"
  },
  {
    id: "proj-010",
    projectTitle: "Student Attendance Management",
    internName: "Demonstration Intern - Track Kappa",
    track: "Web Development",
    description: "A streamlined classroom attendance recorder featuring rapid digital roll-call, anomaly detection for frequent absentees, automated guardian alert digests, and semester compliance reports.",
    thumbnailUrl: "/images/projects/attendance-management.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "Express.js", "SQLite", "Tailwind CSS"],
    approvalStatus: "Sample Project"
  }
];

export const TOP_5_INTERN_PROJECTS = [
  {
    id: "top-001",
    rank: 1,
    internName: "Fatima Ahmad",
    internId: "INT-2026-000042",
    projectTitle: "Personal Portfolio Website",
    track: "Web Development",
    description: "A high-performance personal portfolio website built with modern responsive design, interactive animations, and optimized showcase modules for creative web engineering.",
    thumbnailUrl: "/images/projects/portfolio-builder.svg",
    liveUrl: "https://fatimaahmadportfolio.vercel.app/",
    githubUrl: null,
    technologies: ["React", "CSS3", "JavaScript", "Vite", "Responsive Design"],
    approvalStatus: "Top Ranked Intern"
  },
  {
    id: "top-002",
    rank: 2,
    internName: "Sharmeen Mehboob",
    internId: "INT-2026-000012",
    projectTitle: "Internlytic Intern Portal — Mobile UI/UX Design Concept",
    track: "UI/UX Design",
    description: "An end-to-end mobile UX case study and high-fidelity prototype designed for seamless intern onboarding, daily attendance logging, and assignment management.",
    thumbnailUrl: "/images/projects/smart-library.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Figma", "Design Systems", "Prototyping", "User Research"],
    approvalStatus: "Top Ranked Intern"
  },
  {
    id: "top-003",
    rank: 3,
    internName: "iqra ismaeel",
    internId: "INT-2026-000043",
    projectTitle: "Internlytic AI Prompt Library",
    track: "AI & Machine Learning",
    description: "A curated intelligent prompt engineering library empowering developers and designers with pre-tested AI prompts, categories, and direct execution templates.",
    thumbnailUrl: "/images/projects/ai-study-planner.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["React", "FastAPI", "Prompt Engineering", "Tailwind CSS"],
    approvalStatus: "Top Ranked Intern"
  },
  {
    id: "top-004",
    rank: 4,
    internName: "Muhammad Rayyan Bhatti",
    internId: "INT-2026-000021",
    projectTitle: "Internlytic Intern Portal UI/UX",
    track: "UI/UX Design",
    description: "A comprehensive web portal experience designed for interns and administrators with unified dashboard metrics, progress tracking, and certificate verification.",
    thumbnailUrl: "/images/projects/ecommerce-analytics.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Figma", "UI Architecture", "Design Tokens", "Wireframing"],
    approvalStatus: "Top Ranked Intern"
  },
  {
    id: "top-005",
    rank: 5,
    internName: "Fiza Ishaq",
    internId: "INT-2026-000038",
    projectTitle: "3D Interactive Personal Portfolio Website",
    track: "Web Development",
    description: "A cutting-edge 3D interactive portfolio featuring Three.js scenes, custom shaders, camera depth transitions, and immersive spatial web navigation.",
    thumbnailUrl: "/images/projects/weather-dashboard.svg",
    liveUrl: null,
    githubUrl: null,
    technologies: ["Three.js", "React", "WebGL", "GSAP", "3D Motion"],
    approvalStatus: "Top Ranked Intern"
  }
];

export const AVAILABLE_TRACKS = [
  "All Tracks",
  "Web Development",
  "AI & Machine Learning",
  "Data Science",
  "Mobile Applications",
  "UI/UX Design",
  "Cloud & DevOps"
];

