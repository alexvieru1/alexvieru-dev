"use client";
import { motion } from "framer-motion";
import Silk from "./Silk";

const HeroSection = () => {
  return (
    <motion.section
      className="h-[99vh] w-screen bg-black flex justify-center items-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.25 }}
      style={{ perspective: 1600 }}
    >
      <div className="relative h-[90%] w-full max-w-8xl overflow-hidden rounded-[2.5rem] border border-amber-800 sm:h-[90%]">
        
        <Silk
          speed={5}
          scale={1}
          color="#762900"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
