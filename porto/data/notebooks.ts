import type { NotebookProject } from "@/types";

export const notebooks: NotebookProject[] = [
  {
    id: "nb-001",
    title: "Estimated Time Arrival approach and analysis for UI's Bis Kuning",
    description:
      "A data-driven approach to predicting the Estimated Time of Arrival (ETA) for Universitas Indonesia's campus shuttle (Bis Kuning). This notebook analyzes travel patterns and route efficiency to improve campus mobility.",
    tags: ["Transportation", "ETA Prediction", "Data Analysis", "Universitas Indonesia"],
    slug: "analysys-fin",
    date: "2025-11-15",
    featured: true,
    githubUrl: "https://github.com/username/climate-analysis",
  },
  {
    id: "nb-suika-002",
    title: "Activity Type Prediction from GPS Trajectory Data",
    description:
      "Predicts human activity types over time using GPS trajectory data consisting of XYZ coordinates and movement speed. The notebook analyzes temporal movement patterns and trains a model to classify activities at each timestamp.",
    tags: ["Python", "Time Series", "Classification", "Trajectory Data"],
    slug: "fit-competition-by-ccc",
    date: "2024-10-12",
    featured: true,
    githubUrl: "https://github.com/username/suika-activity-prediction",
  },
  {
    id: "nb-fit-003",
    title: "Predicting City Happiness Scores from Smart City Indicators",
    description:
      "Builds a regression model to predict the Happiness Score of Indonesian cities and regencies using smart city indicators such as population density, traffic conditions, green open space, HDI, and economic metrics from 2022–2023 data.",
    tags: ["Python", "Regression", "Smart City", "Public Data"],
    slug: "gemas-dan-menggelitik-suika",
    date: "2024-09-28",
    featured: true,
    githubUrl: "https://github.com/username/fit-smart-city-happiness",
  },
  {
    id: "nb-ristek-004",
    title: "Fraud Detection on Fintech Loan Transaction Data",
    description:
      "Detects fraudulent users in a fintech lending platform using anonymized user attributes and loan activity records. The notebook combines user profiles and transaction history to classify users as fraud or non-fraud.",
    tags: ["Python", "Classification", "Fraud Detection", "Fintech"],
    slug: "ristek-datathon-final-notebook",
    date: "2024-08-31",
    featured: true,
    githubUrl: "https://github.com/username/fintech-fraud-detection",
  },
  {
  id: "nb-final-005",
  title: "Multilabel Classification of Fashion Products from Images",
  description:
    "Classifies multiple attributes from fashion product images, including clothing type and product color. The notebook builds an image-based multilabel classification pipeline to predict all relevant attributes from a single image.",
  tags: ["Python", "Computer Vision", "Multilabel Classification", "Deep Learning"],
  slug: "finalversion_personal_clean",
  date: "2024-10-05",
  featured: true,
  githubUrl: "https://github.com/username/multilabel-fashion-classification",
  },
  {
  id: "nb-iconic-006",
  title: "Predicting User Outcomes from Behavioral and Transaction Data",
  description:
    "Predicts user outcomes using structured behavioral and transactional data. The notebook analyzes user-level features and historical records to build a classification model that estimates outcome classes for each user.",
  tags: ["Python", "Classification", "User Behavior", "Structured Data"],
  slug: "iconic_personal_clean",
  date: "2024-09-10",
  featured: true,
  githubUrl: "https://github.com/username/iconic-user-outcome-prediction",
  },

];
