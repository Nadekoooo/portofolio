import type { Metadata } from "next";
import { TimelineItem } from "@/components/experience/TimelineItem";
import { experiences } from "@/data/experience";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Professional Experience",
  description:
    "Professional work experience including internships, research positions, and teaching roles in computer science, data science, and software development.",
};

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-3xl px-4 py-12 pt-24 md:pt-28">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Professional Experience
          </h1>
          <p className="text-lg text-muted-foreground">
            A timeline of my work experience, research, and teaching roles.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Empty State (if needed) */}
        {experiences.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No work experience available at this time.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
