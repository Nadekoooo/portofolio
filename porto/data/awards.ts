export interface Award {
  id: string;
  title: string;
  award: string; // e.g. "1st Place", "Gold Medal"
  organizer: string;
  description: string;
  date: string;
  imageUrl: string; // Path to photo
}

export const awards: Award[] = [
  {
    id: "aw-001",
    title: "GEMASTIK XVII: Data Mining Division",
    award: "Finalist / Top 10",
    organizer: "Puspresnas & Kemendikbud",
    description: "Developed 'S-TEA', a sequential transfer learning framework for poverty mapping using satellite imagery.",
    date: "2024",
    imageUrl: "/images/compfest.png", // Temporary placeholder
  },
  {
    id: "aw-002",
    title: "Satria Data 2024: Big Data Challenge",
    award: "National Finalist",
    organizer: "Puspresnas",
    description: "Created 'SCENT', a semantic video chaptering system using exponential decay algorithms for short-form content.",
    date: "2024",
    imageUrl: "/images/compfest.png", // Temporary placeholder
  },
  {
    id: "aw-003",
    title: "Ristek Datathon 2024",
    award: "1st Place Winner",
    organizer: "Fasilkom UI",
    description: "Built a predictive model for credit scoring with 92% accuracy using ensemble learning techniques.",
    date: "2024",
    imageUrl: "/images/ui.png", // UI competition - use UI logo
  },
  {
    id: "aw-004",
    title: "FIT Competition 2024",
    award: "2nd Place Winner",
    organizer: "Universitas Salatiga",
    description: "Strategic analysis and modeling for financial data optimization.",
    date: "2024",
    imageUrl: "/images/compfest.png", // Temporary placeholder
  },
];
