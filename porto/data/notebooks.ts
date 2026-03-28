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
  },
  {
    id: "nb-radar-002",
    title: "Radar-Based Human Detection with ERASENet",
    description:
      "Segments human presence from millimeter-wave radar heatmaps using a custom ERASENet-style model. The notebook covers radar tensor visualization, weighted pixel scoring, and a 30-epoch PyTorch training run that reached a best validation score of 0.9733 and a test score of 0.9394.",
    tags: ["PyTorch", "Radar", "Segmentation", "Sensor AI"],
    slug: "radar-human-detection-erasenet",
    date: "2025-10-21",
    featured: true,
  },
  {
    id: "nb-crowd-003",
    title: "Crowd Counting and Head Localization",
    description:
      "Builds a slice-based crowd analysis pipeline that predicts both head counts and head-center coordinates in dense scenes. It combines density-map regression, SAHI-based patching, and localization evaluation, with a best validation loss of 0.0002 across the training run.",
    tags: ["PyTorch", "Crowd Counting", "Localization", "Computer Vision"],
    slug: "crowd-counting-localization",
    date: "2025-10-24",
    featured: true,
  },
  {
    id: "nb-har-004",
    title: "Human Activity Recognition Using Sensor Data",
    description:
      "Classifies four activity classes from accelerometer and gyroscope time-series signals. The notebook combines exploratory analysis, feature engineering, and gradient-boosted modeling for competition-style sensor classification.",
    tags: ["Python", "Time Series", "Human Activity Recognition", "XGBoost"],
    slug: "gemas-dan-menggelitik-suika",
    date: "2025-07-21",
    featured: true,
  },
  {
    id: "nb-ristek-005",
    title: "Fraud Detection on Fintech Loan Transaction Data",
    description:
      "Detects fraudulent users in a fintech lending platform using anonymized user attributes and loan activity records. The notebook combines user profiles and transaction history to classify users as fraud or non-fraud.",
    tags: ["Python", "Classification", "Fraud Detection", "Fintech"],
    slug: "ristek-datathon-final-notebook",
    date: "2024-08-31",
    featured: true,
  },
  {
    id: "nb-final-006",
    title: "Multilabel Classification of Fashion Products from Images",
    description:
      "Classifies multiple attributes from fashion product images, including clothing type and product color. The notebook builds an image-based multilabel classification pipeline to predict all relevant attributes from a single image.",
    tags: ["Python", "Computer Vision", "Multilabel Classification", "Deep Learning"],
    slug: "finalversion_personal_clean",
    date: "2024-10-05",
    featured: true,
  },
  {
    id: "nb-mental-007",
    title: "Mental Health Condition Prediction from Survey Responses",
    description:
      "Analyzes questionnaire-based mental health indicators to predict diagnosed mental health conditions. The notebook focuses on structured-data cleaning, survey response exploration, and supervised classification over multi-class mental health labels.",
    tags: ["Python", "Classification", "Mental Health", "Survey Data"],
    slug: "iconic_personal_clean",
    date: "2024-09-10",
    featured: true,
  },
  {
    id: "nb-health-008",
    title: "Employee Health Risk Analysis and Cholesterol Modeling",
    description:
      "Investigates which health and demographic factors most strongly relate to total cholesterol in an employee wellness dataset. The notebook emphasizes anomaly correction, feature engineering, and Random Forest feature-importance analysis over 1,336 employee records.",
    tags: ["Python", "EDA", "Health Analytics", "Regression"],
    slug: "employee-health-risk-analysis",
    date: "2024-04-17",
    featured: true,
  },
  {
    id: "nb-ref-009",
    title: "Multi-View Scientific Citation Prediction",
    description:
      "Predicts whether one scientific paper should cite another by combining SPECTER-style document embeddings, sliding-window local similarity, metadata priors, and XGBoost. The final fused feature table reaches a mean 5-fold MCC of 0.6097 and produces a 336,021-row competition submission.",
    tags: ["NLP", "Scientific Citation Prediction", "Transformers", "XGBoost"],
    slug: "main-ref-checker",
    date: "2026-03-28",
    featured: true,
  },
];
