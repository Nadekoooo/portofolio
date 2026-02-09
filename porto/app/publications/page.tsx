import type { Metadata } from "next";
import { PaperEntry } from "@/components/research/PaperEntry";
import { papers } from "@/data/papers";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research contributions in computer science, data science, and algorithms. Explore academic papers on machine learning, graph algorithms, and system optimization.",
};

export default function PublicationsPage() {
  // Group papers by year (descending order)
  const papersByYear = papers.reduce((acc, paper) => {
    const year = paper.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(paper);
    return acc;
  }, {} as Record<number, typeof papers>);

  // Sort years in descending order
  const sortedYears = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <PageTransition>
      <div className="container mx-auto max-w-3xl px-4 py-12 pt-24 md:pt-28">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Publications</h1>
          <p className="text-lg text-muted-foreground">
            Peer-reviewed research contributions in computer science, data science, and algorithms.
          </p>
        </div>

        {/* Papers Grouped by Year */}
        <div className="space-y-12">
          {sortedYears.map((year) => (
            <section key={year}>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">{year}</h2>
              <div className="space-y-6">
                {papersByYear[year].map((paper) => (
                  <PaperEntry key={paper.id} paper={paper} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Empty State */}
        {sortedYears.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No publications available at this time.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
