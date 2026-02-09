export interface NotebookProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  date: string;
  featured: boolean;
  githubUrl?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  venue: string;
  year: number;
  pdfUrl: string;
  featured: boolean;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  logo: string;
  date: string;
  description: string;
  skills: string[];
}
