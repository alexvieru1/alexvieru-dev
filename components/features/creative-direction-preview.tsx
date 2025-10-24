"use client";

import { motion } from "framer-motion";
import { IconBulb, IconPalette, IconRocket } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function CreativeDirectionPreview() {
  const layers = [
    {
      title: "Concept Vision",
      desc: "Define the narrative, audience, and desired emotion.",
      Icon: IconBulb,
      from: "#1B0A0E",
      to: "#3A1A1C",
    },
    {
      title: "Aesthetic Language",
      desc: "Unify typography, color, and motion into a system.",
      Icon: IconPalette,
      from: "#26091B",
      to: "#801827",
    },
    {
      title: "Execution Harmony",
      desc: "Guide design and delivery so every detail aligns.",
      Icon: IconRocket,
      from: "#200F1A",
      to: "#7A1E1F",
    },
  ] as const;

  return (
    <div className="relative h-full w-full p-8">
      <div className="relative mx-auto max-w-md">
        {layers.map(({ title, desc, Icon, from, to }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            className={cn(
              "relative mb-4 rounded-2xl p-5 ring-1 ring-white/10 backdrop-blur-sm",
              "shadow-[0_10px_40px_-15px_rgba(184,24,23,0.35)]"
            )}
            style={{
              backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
              zIndex: 30 - i,
              transform: `translateY(${i * -10}px)`,
            }}
          >
            {/* subtle inner fade */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 mask-[radial-gradient(ellipse_at_top,transparent_25%,black)]" />

            <div className="relative z-10 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Icon size={20} stroke={1.6} color="#B81817" />
              </span>
              <div>
                <h4
                  className="text-white text-base tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                >
                  {title}
                </h4>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-center text-white/70 italic text-sm md:text-base"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Design without direction is decoration.
      </p>

      {/* soft bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}