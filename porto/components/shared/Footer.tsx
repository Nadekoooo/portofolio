import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} Chris's | Nadekoooo Academic Portfolio.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/notebooks" className="hover:text-foreground transition-colors">
            Notebooks
          </Link>
          <Link href="/publications" className="hover:text-foreground transition-colors">
            Research
          </Link>
          <Link href="/experience" className="hover:text-foreground transition-colors">
            Experience
          </Link>
        </div>
      </div>
    </footer>
  );
}
