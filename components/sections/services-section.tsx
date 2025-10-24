import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import devImg from "@/public/images/services/web-development.webp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";

export default function ServicesSection() {
  const features: Feature[] = [
    {
      title: "Web Development",
      description:
        "Fast, scalable, and accessible builds with modern stacks—clean architecture, smooth interactions, and performance by default.",
      skeleton: <WebDevPreview />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Interface Design",
      description:
        "Elegant, usable interfaces that balance aesthetics with clarity. Systems, components, and micro‑interactions that feel effortless.",
      skeleton: <SkeletonComponents />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Brand & Identity",
      description:
        "Cohesive visual language—type, color, and voice—translated into digital experiences that feel distinct and consistent.",
      skeleton: <SkeletonBrandBoard />, // neutral visual
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Creative Direction",
      description:
        "From concept to launch: visual direction, story, and polish—aligning product, brand, and experience into one narrative.",
      skeleton: <SkeletonTimeline />, // neutral visual
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h2
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight text-white"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          What I Offer
        </h2>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-300 text-center">
          Bridging creativity and technology with precision.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// Types
interface Feature {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className?: string;
}

// Layout primitives
const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className="max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug"
      style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
    >
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-300 font-normal",
        "max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

// Concrete preview for Web Development
const WebDevPreview = () => {
  const tech = ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"];
  return (
    <div className="mt-4">
      {/* Screenshot */}
      <div className="relative h-72 w-full overflow-hidden rounded-xl ring-1 ring-white/10">
        <Image
          src={devImg}
          alt="Web development project preview"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          placeholder="blur"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Quote */}
      <p
        className="mt-6 text-center text-neutral-400 italic text-sm md:text-base"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        “From concept to deployment, every line of code serves clarity and purpose.”
      </p>

      {/* Tech badges */}
      <div className="mt-4 flex justify-center flex-wrap gap-3">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Animated terminal (MagicUI) */}
      <div className="mt-6 flex justify-center">
        <Terminal className="bg-black/40 border-white/10 text-white">
          <TypingAnimation>&gt; pnpm create next-app@latest alexvieru-portfolio --ts</TypingAnimation>

          <AnimatedSpan className="text-green-500">
            ✔ Framework: Next.js + TypeScript + Tailwind
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Added Framer Motion for seamless transitions
          </AnimatedSpan>

          <AnimatedSpan className="text-green-500">
            ✔ Optimized for performance and clarity
          </AnimatedSpan>

          <TypingAnimation className="text-white/70">
            &gt; pnpm run build
          </TypingAnimation>

          <AnimatedSpan className="text-green-500">
            🚀 Deployment ready — where creativity meets precision.
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
};

// Neutral skeletons (no external APIs, no Math.random)
const SkeletonCode = () => {
  const lines = Array.from({ length: 6 });
  return (
    <div className="relative flex py-8 px-2 gap-2 h-full">
      <div className="w-full p-5 mx-auto bg-neutral-900/60 ring-1 ring-white/10 rounded-xl h-full">
        <div className="flex flex-col gap-2">
          {lines.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-3 rounded",
                i % 3 === 0 ? "bg-white/20 w-5/6" : i % 3 === 1 ? "bg-white/15 w-4/6" : "bg-white/10 w-3/6"
              )}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-24 rounded bg-white/5 ring-1 ring-white/10" />
          <div className="h-24 rounded bg-white/5 ring-1 ring-white/10" />
          <div className="h-24 rounded bg-white/5 ring-1 ring-white/10" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-black via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-24 bg-linear-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

const SkeletonComponents = () => {
  return (
    <div className="relative flex flex-col items-start p-6 md:p-8 gap-6 h-full overflow-hidden">
      <div className="grid grid-cols-3 gap-3 w-full">
        {/* 1) Button group */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3">
            <Button className="bg-[#B81817] hover:bg-[#b81817]/90 text-white">
              Continue
              <IconArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Explore
              <IconSparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* 2) Input with label */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-2 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label htmlFor="email" className="text-white/80 text-xs">
            Your email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40"
          />
        </motion.div>

        {/* 3) Switch with label */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-1 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="notify" className="text-white/80 text-sm">
              Notifications
            </Label>
            <Switch
              id="notify"
              defaultChecked
              className="data-[state=checked]:bg-[#B81817]"
            />
          </div>
        </motion.div>

        {/* 4) Card with image + text */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-2 rounded-xl bg-neutral-900/60 ring-1 ring-white/10 overflow-hidden"
        >
          <Card className="bg-transparent border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Preview Card</CardTitle>
              <CardDescription className="text-white/60 text-xs">
                Compact layout & clear hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 w-full rounded-lg bg-white/5 ring-1 ring-white/10" />
              <div className="mt-3 h-2 w-5/6 rounded bg-white/15" />
              <div className="mt-2 h-2 w-3/6 rounded bg-white/10" />
            </CardContent>
          </Card>
        </motion.div>

        {/* 5) Select */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 md:col-span-1 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label className="text-white/80 text-sm">Discipline</Label>
          <div className="mt-2">
            <Select defaultValue="design">
              <SelectTrigger className="bg-white/5 border-white/15 text-white">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white border-white/15">
                <SelectItem value="design">Interface Design</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* 6) Progress */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          className="col-span-3 rounded-xl p-4 bg-neutral-900/60 ring-1 ring-white/10"
        >
          <Label className="text-white/80 text-sm">Prototype fidelity</Label>
          <div className="mt-2">
            <Progress value={62} className="h-2 bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Edge fades for overflow safety on narrow widths */}
      <div className="absolute left-0 inset-y-0 w-16 bg-linear-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-linear-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
};

const SkeletonBrandBoard = () => {
  return (
    <div className="relative h-full w-full p-6">
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-3 h-24 rounded-xl bg-[#26091B] ring-1 ring-white/10" />
        <div className="col-span-3 h-24 rounded-xl bg-[#801827] ring-1 ring-white/10" />
        <div className="col-span-2 h-24 rounded-xl bg-[#B81817] ring-1 ring-white/10" />
        <div className="col-span-2 h-24 rounded-xl bg-white/10 ring-1 ring-white/10" />
        <div className="col-span-2 h-24 rounded-xl bg-white/5 ring-1 ring-white/10" />
        <div className="col-span-6 h-24 rounded-xl bg-white/5 ring-1 ring-white/10" />
      </div>
    </div>
  );
};

const SkeletonTimeline = () => {
  const steps = [
    { t: "Discovery", w: "w-24" },
    { t: "Design", w: "w-20" },
    { t: "Build", w: "w-16" },
    { t: "Launch", w: "w-20" },
  ];
  return (
    <div className="relative h-full w-full p-8">
      <div className="flex flex-col gap-4">
        {steps.map((s, i) => (
          <div key={s.t} className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#B81817]" />
            <div className={cn("h-3 rounded bg-white/15", s.w)} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};
