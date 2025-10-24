"use client";

import Image from "next/image";
import devImg from "@/public/images/services/web-development.webp";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";

export default function WebDevPreview() {
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
          <TypingAnimation>
            &gt; pnpm create next-app@latest alexvieru-portfolio --ts
          </TypingAnimation>

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
}