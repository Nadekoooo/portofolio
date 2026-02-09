"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { WorkExperience } from "@/types";

interface TimelineItemProps {
  experience: WorkExperience;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 pb-8"
    >
      {/* Left Side - Logo and Timeline */}
      <div className="flex flex-col items-center">
        {/* Company Logo */}
        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted">
          <Image
            src={experience.logo}
            alt={`${experience.company} logo`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Vertical Line */}
        {!isLast && (
          <div className="h-full w-0.5 bg-border" />
        )}
      </div>

      {/* Right Side - Content Card */}
      <div className="flex-1 pb-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold leading-tight">
                {experience.role}
              </h3>
              <p className="text-base font-medium text-muted-foreground">
                {experience.company}
              </p>
              <Badge variant="outline" className="w-fit text-xs">
                {experience.date}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
