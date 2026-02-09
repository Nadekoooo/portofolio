"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { navItems } from "@/data/menu";
import { Code, BookOpen, Briefcase, User, ArrowRight, LucideIcon } from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Code,
  BookOpen,
  Briefcase,
  User,
};

export function NavSlider() {
  return (
    <div className="w-full">
      {/* Eyebrow Label */}
      <div className="mb-4 pl-4">
        <span className="text-[10px] tracking-[0.2em] text-zinc-500">
          EXPLORE PORTFOLIO
        </span>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-6">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <CarouselItem
                key={item.title}
                className="basis-[85%] pl-3 md:basis-1/3 md:pl-6"
              >
                <Link href={item.href} className="block h-full">
                  <Card className="group relative flex h-44 flex-col justify-between overflow-hidden border border-white/5 bg-zinc-900/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-zinc-800/60">
                    {/* Watermark Icon - Background */}
                    <div className="absolute -bottom-4 -right-4 transition-all duration-500 ease-out group-hover:scale-110">
                      <Icon className="h-24 w-24 -rotate-12 text-foreground opacity-[0.04]" />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="mb-1 text-lg font-semibold tracking-wide text-zinc-100 transition-all duration-300 group-hover:translate-x-1">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
                        {item.desc}
                      </p>
                    </div>

                    {/* Arrow Indicator - Bottom Left */}
                    <div className="relative z-10 self-start">
                      <ArrowRight className="h-4 w-4 text-zinc-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-60" />
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
