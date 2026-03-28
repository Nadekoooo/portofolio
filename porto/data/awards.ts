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
    title: "GEMASTIK 2025: Data Mining Division",
    award: "Silver Medalist & Best National Paper",
    organizer: "Kemendikbudristek",
    description:
      "Engineered a high-precision computer vision pipeline combining OCR and deep learning for automated Javanese script classification.",
    date: "2025",
    imageUrl: "/images/gemastik.png",
  },
  {
    id: "aw-002",
    title: "Satria Data BDC 2025",
    award: "1st Candidate & Finalist",
    organizer: "Kemendikbudristek",
    description:
      "Architected a multimodal video analytics system using OpenAI Whisper, FFmpeg, and FFT-based acoustic shift detection across 200+ hours of video.",
    date: "2025",
    imageUrl: "/images/satriadata.png",
  },
  {
    id: "aw-003",
    title: "Google Developer Group x Amartha Hackathon 2025",
    award: "3rd Place, Professional League",
    organizer: "GDG Jakarta x Amartha",
    description:
      "Engineered a Gemini-2.0-Flash extraction pipeline and LangGraph ReAct agent for financial predictive analytics in Kubuku.",
    date: "2025",
    imageUrl: "/images/gdgjakarta.jpg",
  },
  {
    id: "aw-004",
    title: "GAMMAFEST 2025",
    award: "1st Place & Most Creative Approach",
    organizer: "IPB University",
    description:
      "Developed an end-to-end citation prediction web application in Django with NLP chunking and semantic retrieval similarity at sub-10ms latency.",
    date: "2025",
    imageUrl: "/images/IPB_gammafest.png",
  },
  {
    id: "aw-005",
    title: "DSOC",
    award: "1st Place, Best Approach & Best Presentation",
    organizer: "Binus University",
    description:
      "Designed a phishing URL detection model with CatBoost and XGBoost ensembles, extensive EDA, and feature engineering to reach 99% precision.",
    date: "2024",
    imageUrl: "/images/binus_dsoc.png",
  },
  {
    id: "aw-006",
    title: "Dataslayer 2024",
    award: "1st Leaderboard",
    organizer: "Telkom University",
    description:
      "Built a spatiotemporal LSTM pipeline for frame-by-frame video understanding, delivering high-accuracy real-time human fall detection.",
    date: "2024",
    imageUrl: "/images/telkom.png",
  },
  {
    id: "aw-007",
    title: "GEMASTIK LB",
    award: "UI's #1 Leaderboard Rank",
    organizer: "University of Indonesia",
    description:
      "Developed an advanced time-series forecasting model to predict sequential football kinesiology movements and secure UI's top leaderboard rank.",
    date: "2024",
    imageUrl: "/images/ui.png",
  },
  {
    id: "aw-008",
    title: "Hology 2024",
    award: "2nd Leaderboard",
    organizer: "Brawijaya University",
    description:
      "Implemented an unsupervised clustering pipeline for high-dimensional pattern discovery, emphasizing stable segmentation and interpretable feature profiling.",
    date: "2024",
    imageUrl: "/images/brawijaya.jpeg",
  },
];
