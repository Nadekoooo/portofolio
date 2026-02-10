"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ResearchPaper } from "@/types";

interface PaperEntryProps {
  paper: ResearchPaper;
}

export function PaperEntry({ paper }: PaperEntryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-2 break-words font-serif text-xl font-bold leading-tight hyphens-auto md:text-2xl">
            {paper.title}
          </h3>
          <p className="mb-2 text-sm italic text-muted-foreground">
            {paper.authors.join(", ")}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{paper.venue}</Badge>
            <Badge variant="secondary">{paper.year}</Badge>
            {paper.featured && (
              <Badge variant="default">Featured</Badge>
            )}
          </div>
        </div>

        {/* Download Button */}
        <Link href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline" className="shrink-0">
            <Download className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">PDF</span>
          </Button>
        </Link>
      </div>

      {/* Collapsible Abstract */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 flex w-full justify-between px-0 hover:bg-transparent"
          >
            <span className="text-sm font-medium">Abstract</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {paper.abstract}
          </p>
        </CollapsibleContent>
      </Collapsible>
    </article>
  );
}
