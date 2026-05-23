export interface ProjectLinks {
  live?: string;
  github?: string;
  casestudy?: string;
}

export interface CaseStudySection {
  title: string;
  content: string;
}

export interface Project {
  title: string;
  slug: string;
  category: string;
  year: string;
  status: string;
  shortDescription: string;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  impact: string;
  links: ProjectLinks;
  image?: string;
  imageAlt?: string;
  imagePlaceholderColor: string; // for nice elegant abstract minimalist shapes / gradient representations
  caseStudySections: CaseStudySection[];
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  readingTime: string;
  content: string; // Markdown or simple HTML text
}

export interface ThreeDItem {
  id: string;
  title: string;
  category: string;
  date: string;
  tools: string[];
  imagePlaceholderColor: string;
  description: string;
  process: string;
  learning: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
