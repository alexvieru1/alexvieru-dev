"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Step } from "./index";
import { DotBackground } from "@/components/dot-background"; // ← import
import { IconBulb, IconPalette, IconSettings } from "@tabler/icons-react";

export default function Desktop({ steps }: { steps: Step[] }) {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Dots background (continuous + bottom fade to black) */}
      <div className="absolute inset-0 ">
        <DotBackground
          words=" "
          showGradient={true}
          textGenerateEffect={false}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <h2
          className="text-center text-3xl md:text-5xl mb-14"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Where are you in your journey?
        </h2>

        {/* Stage: three panels start as one seamless image, then split + round */}
        <SplitPanels steps={steps} />
      </div>
    </section>
  );
}

function SplitPanels({ steps }: { steps: Step[] }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stageRef, { margin: "-20% 0px", once: true });

  // Drive a 0→1 progress when in view
  const raw = useMotionValue(inView ? 1 : 0);
  // Smoother, slower animation
  const progress = useSpring(raw, { stiffness: 80, damping: 30 });
  if (inView) {
    setTimeout(() => raw.set(1), 1500);
  } else {
    raw.set(0);
  }

  // Horizontal separation amount (px)
  const gap = 24;
  const leftX = useTransform(progress, [0, 1], [0, -gap]);
  const midX = useTransform(progress, [0, 1], [0, 0]);
  const rightX = useTransform(progress, [0, 1], [0, gap]);

  // Corners: square → rounded
  const radius = useTransform(progress, [0, 1], [0, 16]);

  // Soft shadow as they separate
  const shadowOpacity = useTransform(progress, [0, 1], [0, 0.25]);

  return (
    <div ref={stageRef} className="relative h-[460px]">
      <Panel
        x={leftX}
        radius={radius}
        shadowOpacity={shadowOpacity}
        img={steps[0]?.image}
        title={steps[0]?.title}
        desc={steps[0]?.description}
        icon={steps[0]?.icon}
        align="left"
        variant="left"
      />
      <Panel
        x={midX}
        radius={radius}
        shadowOpacity={shadowOpacity}
        img={steps[1]?.image}
        title={steps[1]?.title}
        desc={steps[1]?.description}
        icon={steps[1]?.icon}
        align="center"
        variant="center"
      />
      <Panel
        x={rightX}
        radius={radius}
        shadowOpacity={shadowOpacity}
        img={steps[2]?.image}
        title={steps[2]?.title}
        desc={steps[2]?.description}
        icon={steps[2]?.icon}
        align="right"
        variant="right"
      />
    </div>
  );
}

function Panel({
  x,
  radius,
  shadowOpacity,
  img,
  title,
  align,
  desc,
  icon,
  variant,
}: {
  x: MotionValue<number>;
  radius: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  img?: string;
  title?: string;
  align: "left" | "center" | "right";
  desc?: string;
  icon?: Step["icon"];
  variant: "left" | "center" | "right";
}) {
  const [hovered, setHovered] = useState(false);
  const basePos =
    align === "left"
      ? "left-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-0";

  const palettes = {
    left:   { from: "#26091B", to: "#801827", accent: "#B81817" },
    center: { from: "#1F0D0E", to: "#5A1414", accent: "#B81817" },
    right:  { from: "#200F1A", to: "#7A1E1F", accent: "#B81817" },
  } as const;
  const palette = palettes[variant];

  const rotation = useSpring(0, { stiffness: 160, damping: 18, mass: 0.75 });
  const lift = useSpring(0, { stiffness: 260, damping: 22, mass: 0.45 });
  useEffect(() => {
    rotation.set(hovered ? 180 : 0);
    lift.set(hovered ? -16 : 0);
  }, [hovered, rotation, lift]);

  const scale = useTransform(lift, [-16, 0], [1.03, 1]);
  const frontOpacity = useTransform(rotation, [0, 60, 90], [1, 0.35, 0]);
  const backOpacity = useTransform(rotation, [90, 120, 180], [0, 0.65, 1]);

  const boxShadow = useTransform(
    shadowOpacity,
    (o) => `0 12px 40px rgba(0,0,0,${o})`
  );

  const FallbackIcon = title?.toLowerCase().includes("design")
    ? IconPalette
    : title?.toLowerCase().includes("build")
    ? IconSettings
    : IconBulb;

  // 3D Flip Group
  return (
    <motion.div
      className={`group absolute top-0 h-full w-1/3 ${basePos} overflow-hidden will-change-transform`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        x,
        y: lift,
        scale,
        borderRadius: radius,
        boxShadow,
      }}
    >
      {/* Rotator */}
      <div className="relative h-full w-full perspective-distant">
        <motion.div
          className="absolute inset-0 transform-3d"
          style={{ rotateY: rotation }}
        >
          {/* FRONT */}
          <motion.div
            className="absolute inset-0 backface-hidden overflow-hidden rounded-inherit bg-black/0"
            style={{ opacity: frontOpacity }}
          >
            {img && (
              <Image
                src={img}
                alt={title ?? ""}
                fill
                className="object-cover object-center select-none"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
            <p
              className="absolute bottom-4 left-4 right-4 text-center text-2xl italic tracking-wide"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
            >
              {title}
            </p>
          </motion.div>

          {/* BACK */}
          <motion.div
            className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] rounded-inherit text-center px-6 flex flex-col items-center justify-center"
            style={{ 
              opacity: backOpacity,
              backgroundImage: `linear-gradient(135deg, ${palette.from}, ${palette.to})`
            }}
          >
            {/* subtle inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-inherit ring-1 ring-white/10 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            {/* icon */}
            <div className="mb-4">
              {icon ? (
                  <span className="text-2xl" style={{ color: palette.accent }}>{icon}</span>
              ) : (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <FallbackIcon size={24} stroke={1.6} color={palette.accent} />
                </span>
              )}
            </div>
            {/* title */}
            <h3
              className="text-2xl md:text-3xl text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              {title}
            </h3>
            {/* accent divider */}
            <span
              className="mt-2 mb-4 inline-block h-0.5 w-10 rounded-full"
              style={{ backgroundColor: palette.accent }}
            />
            {/* description */}
            {desc ? (
              <p className="text-zinc-100/85 text-sm leading-relaxed max-w-xs">
                {desc}
              </p>
            ) : (
              <p className="text-zinc-100/85 text-sm leading-relaxed max-w-xs">
                Hover to discover more about our process.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
