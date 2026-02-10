import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/data/profile";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "About Me",
  description: `Learn more about ${profile.name}, a ${profile.role} passionate about algorithms, data science, and software engineering.`,
};

export default function AboutPage() {
  return (
    <PageTransition className="min-h-screen">
      <div className="container mx-auto px-4 pb-16 pt-24 md:pt-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Sidebar - Profile */}
          <aside className="h-fit md:sticky md:top-32">
            {/* Avatar */}
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl bg-muted md:h-64 md:w-64">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name & Role */}
            <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{profile.role}</p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="icon">
                <Link
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href={profile.socials.email} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Download CV */}
            <Button asChild variant="default" size="lg" className="w-full">
              <Link href="https://drive.google.com/file/d/1L08rZL_xBc4Czf3eUsNVu8GN3IO3DCfP/view?usp=sharing" target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>

            {/* Quick Links */}
            <div className="mt-4 space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/experience">View Experience</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/publications">Research Papers</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/notebooks">Project Portfolio</Link>
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-12">
            {/* Biography */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight first:mt-0">
                About Me
              </h2>
              <div className="space-y-4">
                {profile.longBio.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <Separator />

            {/* Skills */}
            <section>
              <h2 className="mb-6 mt-12 text-2xl font-semibold tracking-tight">
                Technical Skills
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                A curated selection of technologies and tools I work with regularly.
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            {/* Education */}
            <section>
              <h2 className="mb-6 mt-12 text-2xl font-semibold tracking-tight">
                Education
              </h2>
              <div className="space-y-8">
                {profile.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-medium text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground/80">
                      <span className="tabular-nums">{edu.period}</span>
                      {edu.gpa && (
                        <>
                          <span>•</span>
                          <span className="font-medium">GPA: {edu.gpa}</span>
                        </>
                      )}
                      {edu.honors && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-foreground">
                            {edu.honors}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
