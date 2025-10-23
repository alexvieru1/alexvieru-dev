"use client";

import { motion } from "framer-motion";
import type { Step } from "./index";
import { DotBackground } from "@/components/dot-background";

export default function Mobile({ steps }: { steps: Step[] }) {
  return (
    <section className="relative w-full h-[150vh] bg-black text-white py-20 overflow-hidden">
      {/* Dots background (continuous + bottom fade to black) */}
      <div className="absolute inset-0">
        <DotBackground words=" " showGradient={true} textGenerateEffect={false} />
      </div>
      <div className="relative z-10 mx-auto max-w-xl px-6">
        <h2 className="text-center text-3xl mb-10" style={{ fontFamily: "var(--font-playfair)" }}>
          Where are you in your journey?
        </h2>

        <div className="space-y-6">
          {steps.map((s, i) => {
            const palettes = [
              { from: "#26091B", to: "#801827", accent: "#B81817" },
              { from: "#1F0D0E", to: "#5A1414", accent: "#B81817" },
              { from: "#200F1A", to: "#7A1E1F", accent: "#B81817" },
            ];
            const palette = palettes[i % palettes.length];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 p-6 relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                }}
              >
                {/* Subtle inner highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="relative z-10 flex flex-col items-start">
                  <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                    {typeof s.icon === "string" ? (
                      <span className="text-2xl" style={{ color: palette.accent }}>
                        {s.icon}
                      </span>
                    ) : (
                      s.icon
                    )}
                  </span>
                  <h3
                    className="text-xl md:text-2xl text-white tracking-tight"
                    style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                  >
                    {s.title}
                  </h3>
                  <span
                    className="mt-2 mb-4 inline-block h-[2px] w-10 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <p className="text-zinc-100/85 text-sm leading-relaxed max-w-xs">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}