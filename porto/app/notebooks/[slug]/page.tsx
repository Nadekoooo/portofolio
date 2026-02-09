import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notebooks } from "@/data/notebooks";

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

  return (
    <div className="flex flex-col">
      {/* Notebook Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
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

      {/* Iframe Viewer */}
      <div className="bg-white dark:bg-white">
        <iframe
          src={`/notebooks/${slug}.html`}
          className="h-[calc(100vh-7.5rem)] w-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          title={notebook.title}
        />
      </div>
    </div>
  );
}
