"use client";
import HeroSection from "@/components/sections/hero-section";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import QuoteSection from "@/components/sections/quote-section";
import ProcessSection from "@/components/sections/process-section";
import ServicesSection from "@/components/sections/services-section";
import FeaturedWorkSection from "@/components/sections/featured-work";
import ContactSection from "@/components/sections/process-section/contact-section";

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <div ref={container} className="scroll-smooth">
      <div className="relative h-[200vh]">
        <HeroSection scrollYProgress={scrollYProgress} />
        <QuoteSection scrollYProgress={scrollYProgress} />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="featured-work">
        <FeaturedWorkSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
