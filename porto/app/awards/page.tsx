import type { Metadata } from "next";
import Image from "next/image";
import { awards } from "@/data/awards";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Honors & Awards",
  description:
    "A complete history of competitive achievements and recognition in data science and technology competitions.",
};

export default function AwardsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-7xl px-4 py-12 pt-24 md:pt-28">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Honors & Awards
          </h1>
          <p className="text-lg text-muted-foreground">
            A complete history of competitive achievements and recognition in data science and technology.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => (
            <div
              key={award.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow transition-all duration-300 hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image 
                  src={award.imageUrl} 
                  alt={award.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Award Badge Overlay */}
                <div className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                  {award.award}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{award.organizer}</span>
                  <span className="text-xs text-muted-foreground">{award.date}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary">{award.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
