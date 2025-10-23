"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { DotBackground } from "./dot-background";

type QuoteSectionProps = {
  scrollYProgress: MotionValue<number>;
};

export default function QuoteSection({ scrollYProgress }: QuoteSectionProps) {
  // Opposite curve to the hero (grows into place)
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["6vh", "0vh"]);
  const quote =
    "Design is not just what it looks like and feels like. Design is how it works.";
  const author = "Steve Jobs";

  return (
    <motion.section
      style={{ scale, rotateX, y, transformOrigin: "50% 50%" }}
      className="relative h-screen flex items-end justify-center bg-black"
    >
      <DotBackground textGenerateEffect={true} words={quote} author={author} />
    </motion.section>
  );
}
