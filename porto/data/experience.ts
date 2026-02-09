import type { WorkExperience } from "@/types";

export const experiences: WorkExperience[] = [
  {
    id: "exp-001",
    role: "Data Science Intern",
    company: "Tech Innovations Lab",
    logo: "/images/company1.png",
    date: "Jan 2024 - Present",
    description:
      "Developing machine learning models for predictive analytics on large-scale datasets. Collaborated with cross-functional teams to deploy data pipelines using Apache Spark and AWS. Presented weekly insights to senior management, influencing product strategy decisions.",
    skills: ["Python", "TensorFlow", "AWS", "Tableau", "SQL", "Pandas"],
  },
  {
    id: "exp-002",
    role: "Research Assistant",
    company: "University CS Department",
    logo: "/images/company2.png",
    date: "Sep 2023 - Dec 2023",
    description:
      "Assisted Professor Chen in graph algorithm research, implementing novel subgraph isomorphism detection methods. Conducted literature reviews, ran benchmarks on multiple datasets, and co-authored a paper submitted to ICDE 2025. Managed a GitHub repository with reproducible experiments.",
    skills: ["C++", "NetworkX", "LaTeX", "Git", "Data Structures"],
  },
  {
    id: "exp-003",
    role: "Teaching Assistant - Intro to Algorithms",
    company: "University CS Department",
    logo: "/images/company2.png",
    date: "Jan 2023 - May 2023",
    description:
      "Led weekly recitation sections for 40+ students, covering sorting algorithms, dynamic programming, and graph theory. Held office hours to provide one-on-one tutoring, graded assignments, and designed coding challenges. Received a 4.8/5.0 student evaluation rating.",
    skills: ["Algorithms", "Teaching", "Python", "Communication", "Mentoring"],
  },
];
