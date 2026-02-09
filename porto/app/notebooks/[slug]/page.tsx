import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notebooks } from "@/data/notebooks";
import { NotebookRenderer } from "@/components/notebook/NotebookRenderer";

interface NotebookDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return notebooks.map((notebook) => ({
    slug: notebook.slug,
  }));
}

export async function generateMetadata({ params }: NotebookDetailPageProps) {
  const { slug } = await params;
  const notebook = notebooks.find((n) => n.slug === slug);

  if (!notebook) {
    return {
      title: "Notebook Not Found",
    };
  }

  return {
    title: `${notebook.title} | Notebook`,
    description: notebook.description,
  };
}

export default async function NotebookDetailPage({ params }: NotebookDetailPageProps) {
  const { slug } = await params;
  const notebook = notebooks.find((n) => n.slug === slug);

  if (!notebook) {
    notFound();
  }

  // Read the .ipynb file
  const notebookPath = path.join(process.cwd(), "public", "notebooks", `${slug}.ipynb`);
  
  let notebookData;
  try {
    const fileContent = fs.readFileSync(notebookPath, "utf-8");
    notebookData = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to load notebook: ${slug}`, error);
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Notebook Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 py-6 backdrop-blur supports-[backdrop-filter]:bg-background/95">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/notebooks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="hidden h-6 w-px bg-border md:block" />
            <h1 className="line-clamp-1 text-sm font-semibold md:text-base">
              {notebook.title}
            </h1>
          </div>

          {notebook.githubUrl && (
            <Button asChild variant="outline" size="sm">
              <Link href={notebook.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">View Source</span>
                <span className="sm:hidden">Code</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Notebook Renderer */}
      <div className="pb-20 pt-16 px-4 md:px-8">
        <NotebookRenderer data={notebookData} />
      </div>
    </div>
  );
}
