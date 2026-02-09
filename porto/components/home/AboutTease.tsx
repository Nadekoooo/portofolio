"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

export function AboutTease() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Abstract background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          {/* Left Side - Text Content (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            {/* Eyebrow */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              Meet the Researcher
            </p>

            {/* Headline */}
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
              Driven by Curiosity, Grounded in Data.
            </h2>

            {/* Description */}
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {profile.shortBio}
            </p>

            {/* CTA Link */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-base font-medium text-primary transition-colors hover:text-primary/80"
            >
              More about me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Side - Image (5 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="relative">
              {/* Abstract shape behind the image */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl" />
              <div className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full border-4 border-primary/20" />

              {/* Profile Image */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-primary/20">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  priority
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Name overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {profile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
