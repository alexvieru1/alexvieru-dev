'use client'
import HeroSection from "@/components/hero-section";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';
import QuoteSection from "@/components/quote-section";


export default function Home() {
    const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <div ref={container} className="relative h-[200vh]">
      <HeroSection scrollYProgress={scrollYProgress}/>
      <QuoteSection scrollYProgress={scrollYProgress}/>
    </div>
  );
}
