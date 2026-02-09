import type { NotebookProject } from "@/types";

export const notebooks: NotebookProject[] = [
  {
    id: "nb-001",
    title: "Exploratory Data Analysis on Global Climate Trends",
    description:
      "A comprehensive EDA using pandas and matplotlib to uncover patterns in global temperature anomalies, CO₂ emissions, and sea-level data spanning 1950–2024.",
    tags: ["Python", "Pandas", "Matplotlib", "EDA"],
    slug: "analysis-1",
    date: "2025-11-15",
    featured: true,
    githubUrl: "https://github.com/username/climate-analysis",
  },
  {
    id: "nb-002",
    title: "Graph Algorithm Performance Benchmarking",
    description:
      "Benchmarking BFS, DFS, Dijkstra, and A* on synthetic and real-world graphs. Includes time-complexity analysis and visualization of traversal paths.",
    tags: ["Python", "NetworkX", "Algorithms", "Benchmarking"],
    slug: "algo-test",
    date: "2025-09-22",
    featured: true,
    githubUrl: "https://github.com/username/graph-algorithms",
  },
  {
    id: "nb-003",
    title: "Sentiment Analysis with Transformer Models",
    description:
      "Fine-tuning a DistilBERT model on an IMDB review dataset for binary sentiment classification, achieving 92% accuracy on the test set.",
    tags: ["NLP", "Transformers", "PyTorch", "Deep Learning"],
    slug: "sentiment-nlp",
    date: "2025-07-10",
    featured: false,
  },
  {
    id: "nb-004",
    title: "Statistical Hypothesis Testing Cookbook",
    description:
      "A reference notebook covering t-tests, chi-squared tests, ANOVA, and non-parametric alternatives with real-world examples and interpretation guidelines.",
    tags: ["Statistics", "SciPy", "Python", "Hypothesis Testing"],
    slug: "stats-cookbook",
    date: "2025-05-03",
    featured: false,
  },
];
