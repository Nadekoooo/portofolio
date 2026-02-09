import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About Me",
  description: `Learn more about ${profile.name}, a ${profile.role} passionate about algorithms, data science, and software engineering.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Side - Sticky Profile Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20">
              <Card className="overflow-hidden border-primary/20">
                {/* Avatar */}
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <CardHeader>
                  <h1 className="font-serif text-3xl font-bold">{profile.name}</h1>
                  <p className="text-lg text-muted-foreground">{profile.role}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Social Links */}
                  <div className="flex flex-wrap gap-2">
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
                      <Link
                        href={profile.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href={profile.socials.email} aria-label="Email">
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <Separator />

                  {/* Quick Links */}
                  <div className="space-y-2">
                    <Button asChild variant="default" className="w-full">
                      <Link href="/experience">View Experience</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/publications">Research Papers</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/notebooks">Project Portfolio</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Right Side - Scrollable Content */}
          <main className="lg:col-span-8">
            <div className="space-y-12">
              {/* My Story */}
              <section>
                <h2 className="mb-6 font-serif text-3xl font-bold">My Story</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {profile.longBio.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-4 leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <Separator />

              {/* Technical Arsenal */}
              <section>
                <h2 className="mb-6 font-serif text-3xl font-bold">
                  Technical Arsenal
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  A curated selection of technologies and tools I work with regularly.
                </p>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              <Separator />

              {/* Education */}
              <section>
                <h2 className="mb-6 font-serif text-3xl font-bold">Education</h2>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <Card key={index} className="border-muted/40">
                      <CardHeader>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="text-base font-medium text-muted-foreground">
                          {edu.institution}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span>{edu.period}</span>
                          {edu.gpa && (
                            <>
                              <span>•</span>
                              <span>GPA: {edu.gpa}</span>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
