import type { Metadata } from "next";
import { NotebooksClient } from "./NotebooksClient";

export const metadata: Metadata = {
  title: "All Notebooks",
  description:
    "Explore computational projects, data analysis, and algorithmic implementations. Browse through Jupyter notebooks covering Python, machine learning, data science, and algorithms.",
};

export default function NotebooksPage() {
  return <NotebooksClient />;
}
