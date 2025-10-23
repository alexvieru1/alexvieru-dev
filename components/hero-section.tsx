"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";
import BlurText from "./BlurText";
import Silk from "./Silk";
import ShinyText from "./ShinyText";
import { useEffect, useState } from "react";

type HeroSectionProps = {
  scrollYProgress: MotionValue<number>;
};

const HeroSection = ({scrollYProgress}: HeroSectionProps) => {
  const [now, setNow] = useState<string>("");
  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 0.95, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 4]);

  useEffect(() => {
    const update = () => {
      const dt = new Date();
      const time = dt.toLocaleTimeString("en-US", {
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setNow(time);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section className="sticky top-0 h-screen w-screen bg-black flex justify-center items-center px-4">
      <motion.div className="relative h-[90%] w-full max-w-8xl overflow-hidden rounded-[2.5rem] border border-amber-800 sm:h-[90%]">
        <Silk
          speed={5}
          scale={1}
          color="#762900"
          noiseIntensity={1.5}
          rotation={0}
        />

        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="max-w-3xl space-y-4 flex flex-col items-center justify-center text-center">
            {/* Headline stack with layered ampersand */}
            <div className="relative grid place-items-center">
              {/* Big & behind */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
              >
                <span
                  className="text-[22vw] md:text-[12rem] leading-none
                 bg-linear-to-b from-[#d7873c] to-[#a73a00]
                 text-transparent bg-clip-text
                 drop-shadow-[0_0_28px_rgba(255,184,92,0.35)]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                  }}
                >
                  ❖
                </span>
              </span>

              {/* Line 1 */}
              <h1
                className="relative z-10 text-white text-[8vw] md:text-6xl leading-tight
               drop-shadow-[0_0_24px_rgba(255,255,255,0.25)] italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Where systems evolve,
              </h1>

              {/* Line 2 */}
              <h1
                className="relative z-10 -mt-4 text-white text-[8vw] md:text-6xl leading-tight
               drop-shadow-[0_0_24px_rgba(255,255,255,0.25)] italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                details matter.
              </h1>
            </div>
            <BlurText
              text="Think. Build. Refine."
              className="text-base text-white/80 md:text-2xl"
              delay={750}
              animateBy="words"
              direction="bottom"
            />
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-6 flex w-full items-center justify-between px-8 text-xs uppercase tracking-[0.35em] text-white/60">
          <span className="hidden lg:flex">{now}</span>
          <ShinyText
            text="Scroll to Explore"
            speed={2}
            className="flex-1 text-center lg:flex-none animate-shine"
          />
          <span className="hidden lg:flex">CT, RO</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
