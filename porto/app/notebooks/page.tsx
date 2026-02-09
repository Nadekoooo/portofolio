import type { Metadata } from "next";
import { NotebooksClient } from "./NotebooksClient";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "All Notebooks",
  description:
    "Explore computational projects, data analysis, and algorithmic implementations. Browse through Jupyter notebooks covering Python, machine learning, data science, and algorithms.",
};

export default function NotebooksPage() {
  return (
    <PageTransition>
      <NotebooksClient />
    </PageTransition>
  );
}
