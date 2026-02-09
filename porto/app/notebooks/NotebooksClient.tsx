"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { notebooks } from "@/data/notebooks";

export function NotebooksClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotebooks = notebooks.filter((notebook) =>
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-12 pt-24 md:pt-28">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">All Notebooks</h1>
          <p className="text-lg text-muted-foreground">
            Explore computational projects, data analysis, and algorithmic implementations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search notebooks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-muted-foreground">
          {filteredNotebooks.length} {filteredNotebooks.length === 1 ? "notebook" : "notebooks"} found
        </p>

        {/* Notebooks Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotebooks.map((notebook) => (
            <Link key={notebook.id} href={`/notebooks/${notebook.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2">{notebook.title}</CardTitle>
                    {notebook.featured && (
                      <Badge variant="default" className="shrink-0">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-3">
                    {notebook.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {notebook.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(notebook.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotebooks.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No notebooks match your search. Try a different query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
