"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";

export function Hero() {
  const recentExperiences = experiences.slice(0, 3); // Top 3 experiences

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Column - Identity & Bio (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Identity Row - Avatar + Name + Role */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Bridging Code & Theory.
            </h1>

            {/* Bio */}
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {profile.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/notebooks">
                  View Notebooks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/publications">Read Papers</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Current Experience (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Card className="border-primary/20 bg-card/40 backdrop-blur">
              <div className="p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Current Focus
                </h3>
                <div className="space-y-4">
                  {recentExperiences.map((exp) => (
                    <div key={exp.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold leading-tight">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {exp.date.split(' - ')[0]}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/experience"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View Full Timeline
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
