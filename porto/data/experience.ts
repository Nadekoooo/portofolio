import type { WorkExperience } from "@/types";

export const experiences: WorkExperience[] = [
  {
    id: "exp-eth",
    role: "AI Research Assistant",
    company: "ETH Zürich",
    logo: "/images/eth.png", // Ganti dengan path logo ETH Zürich yang benar
    date: "Oct 2025 - Present",
    description:
      "Engineered micro-accurate Ground Truth datasets for Egocentric Video analysis, focusing on complex human-object interactions. Provided core datasets instrumental in securing publications at top-tier AI conferences like CVPR and ICCV.",
    skills: ["Computer Vision", "Data Annotation", "Research", "Video Analysis"],
  },
  {
    id: "exp-rti",
    role: "AI Engineer Intern",
    company: "RTI Infokom",
    logo: "/images/rti.png", 
    date: "Jun 2025 - Aug 2025",
    description:
      "Developed and deployed an intelligent RAG-based AI Agent system for RTI Business. Led research in stock market automation by integrating NLP-driven sentiment analysis with financial indicators for improved equity predictions.",
    skills: ["RAG", "NLP", "LangChain", "Sentiment Analysis", "Financial Tech"],
  },
  {
    id: "exp-ui-ai",
    role: "Teaching Assistant - Intro to AI & Data Science",
    company: "University of Indonesia",
    logo: "/images/ui.png",
    date: "Jan 2025 - Present",
    description:
      "Mentored over 300 undergraduate students in foundational programming, Machine Learning basics, and AI concepts. Developed course materials, assisted in lectures, and provided personalized tutoring to ensure strong student comprehension.",
    skills: ["Teaching", "Machine Learning", "Python", "Data Science", "Mentoring"],
  },
  {
    id: "exp-compfest",
    role: "AI Consultant",
    company: "COMPFEST",
    logo: "/images/compfest.png", 
    date: "Jan 2025 - Sep 2025",
    description:
      "Served as the main consultant for the AI Innovation Challenge. Designed competition guidelines, defined evaluation criteria, and managed technical documentation for an AI-based competition involving 100+ teams and 300+ participants.",
    skills: ["AI Strategy", "Consulting", "Event Management", "Technical Evaluation"],
  },
  {
    id: "exp-ui-prog",
    role: "Teaching Assistant - Programming Foundations",
    company: "University of Indonesia",
    logo: "/images/ui.png", 
    date: "Jan 2025 - Present",
    description:
      "Supported the core Programming Basics (DDP) course for over 300 students. Assisted students in mastering foundational programming logic, syntax, and algorithmic thinking through interactive lab sessions and grading.",
    skills: ["Programming Logic", "Python", "Java", "Algorithmic Thinking"],
  },
];