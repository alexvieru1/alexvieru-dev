"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  return (
    <section className="relative z-20 justify-center h-screen w-full py-12 md:py-20 lg:py-24">
      <div
        className={cn(
          "relative mx-auto flex w-full flex-col overflow-hidden",
          "max-w-[min(90vw,680px)] sm:max-w-[1100px] lg:max-w-[1600px]",
          "rounded-[2.5rem] sm:rounded-[2.75rem] border border-white/10 bg-black",
          "px-5 sm:px-10 md:px-16",
          "min-h-[72vh] sm:min-h-[78vh] lg:min-h-[90vh]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        )}
        style={{
          background:
            "radial-gradient(65% 80% at 50% 60%, rgba(189,44,26,0.65), rgba(40,14,12,0.75) 55%, rgba(5,5,5,0.92)), radial-gradient(80% 60% at 50% 30%, rgba(255,109,71,0.45), transparent 65%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:url('/noise.png')] [background-size:320px_320px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.85))]" />

        <div className="relative flex flex-1 flex-col items-center justify-center py-16 text-center md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.4em] text-white/70"
          >
            Beyond the Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="mt-4 px-4 text-3xl text-white drop-shadow-[0_0_26px_rgba(255,255,255,0.25)] md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Let&apos;s talk about your{" "}
            <span className="italic text-white/90">project</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="mt-5 max-w-xl px-6 text-sm text-white/75 md:text-base"
          >
            Crafting digital experiences that feel as intentional as they look.
            Let&apos;s collaborate to elevate what’s next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
            className="mt-8"
          >
            <Link
              href="mailto:vieru.alexandruu@gmail.com"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-2.5",
                "bg-white text-black font-medium tracking-wide",
                "ring-1 ring-black/10 shadow-[0_12px_38px_-18px_rgba(255,255,255,0.55)]",
                "transition-colors hover:bg-white/90"
              )}
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        <div className="relative">
          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-col items-center justify-between gap-3 px-2 py-4 text-xs text-white/65 md:flex-row">
            <span>
              © {new Date().getFullYear()} Alex Vieru. All rights reserved.
            </span>
            <nav className="flex items-center gap-6">
              <Link
                href="#services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>
              <Link
                href="#featured-work"
                className="transition-colors hover:text-white"
              >
                Featured Work
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
