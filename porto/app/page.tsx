"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { notebooks } from "@/data/notebooks";
import { papers } from "@/data/papers";
import { experiences } from "@/data/experience";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Briefcase } from "lucide-react";

export default function Home() {
  const featuredNotebooks = notebooks.filter((n) => n.featured).slice(0, 3);
  const featuredPapers = papers.filter((p) => p.featured).slice(0, 2);
  const recentExperiences = experiences.slice(0, 3);

  return (
    <main className="no-scrollbar h-screen w-full snap-y snap-mandatory scroll-smooth overflow-y-scroll">
      {/* Section 1: Hero */}
      <section className="relative flex h-screen w-full snap-start flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="px-4 text-center">
          {/* Avatar + Name Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30">
              <Image
                src={profile.profPic}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="rounded-full border border-muted bg-muted/30 px-4 py-1.5 text-sm font-medium backdrop-blur">
              {profile.name}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-7xl"
          >
            Bridging Code & Theory.
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {profile.shortBio}
          </motion.p>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Scroll Down
          </span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Section 2: Featured Notebooks */}
      <section className="flex min-h-screen w-full snap-start flex-col justify-center bg-transparent py-20 md:h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24">
          {/* Header */}
          <div className="mb-12 text-left">
            <h2 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
              Some Notebooks worth Read About
            </h2>
            <p className="text-lg text-muted-foreground">
              My Data science projects, AI Works, etc
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {featuredNotebooks.map((notebook, index) => (
              <motion.div
                key={notebook.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/notebooks/${notebook.slug}`}>
                  <Card className="group h-full border-border bg-card transition-all duration-300 hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl transition-colors group-hover:text-primary">
                        {notebook.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-sm">
                        {notebook.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {notebook.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-start">
            <Button asChild variant="outline" size="lg">
              <Link href="/notebooks">
                View All Notebooks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3: Research Highlights */}
      <section className="flex min-h-screen w-full snap-start flex-col justify-center py-20 md:h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24">
          {/* Header */}
          <div className="mb-12 text-left">
            <h2 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
              Publications
            </h2>
            <p className="text-lg text-muted-foreground">
              Peer-reviewed research contributions
            </p>
          </div>

          {/* Papers List */}
          <div className="space-y-8">
            {featuredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block min-w-0 w-full rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm"
                >
                  <h3 className="mb-3 break-words whitespace-normal font-serif text-lg font-semibold leading-tight tracking-tight hyphens-auto transition-colors group-hover:text-primary md:text-xl">
                    {paper.title}
                  </h3>
                  <p className="mb-3 w-full break-words whitespace-normal text-sm text-muted-foreground hyphens-auto">
                    {paper.authors.join(", ")} • <span className="font-medium break-words">{paper.venue}</span> ({paper.year})
                  </p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {paper.abstract}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-start">
            <Button asChild variant="outline" size="lg">
              <Link href="/publications">
                View All Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Professional Experience */}
      <section className="flex min-h-screen w-full snap-start flex-col justify-center bg-transparent py-20 md:h-screen md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24">
          {/* Header */}
          <div className="mb-12 text-left">
            <h2 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
              Experience
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional journey and expertise
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {recentExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-muted">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <p className="text-base text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {exp.date}
                      </Badge>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.slice(0, 5).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {exp.skills.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{exp.skills.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-start">
            <Button asChild variant="outline" size="lg">
              <Link href="/experience">
                View Full Timeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Final Snap Point */}
      <footer className="w-full snap-end bg-background/50 backdrop-blur-sm border-t border-border/40 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-6 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Christian Yudistira. All rights reserved.</p>
          <div className="flex gap-4">
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
    </main>
  );
}
