import * as React from "react";
import {
  FeaturedCarousel,
  FeaturedCarouselSlide,
} from "@/components/ui/featured-carousel";
import FeaturedCard from "@/components/ui/featured-card";

// You can move this to /lib/projects.ts later if you want to reuse it
const projects = [
  {
    title: "eXpert Photobooth 360",
    imageSrc: "/images/featured/expert-photobooth.webp",
    href: "https://expertphotobooth360.com",
    description:
      "An immersive web experience designed for a high-end event service brand. The interface blends cinematic visuals, interactive motion, and bold typography to capture the brand’s energy and innovation.",
    tech: ["Next.js", "Framer Motion", "GSAP"] as const,
  },
  {
    title: "Asclepios Medical",
    imageSrc: "/images/featured/asclepios-medical.webp",
    href: "https://asclepios-medical-nextjs-wp.vercel.app",
    description:
      "A clean, professional presentation site for a medical clinic, seamlessly integrating WordPress as a headless CMS. Emphasizing trust and precision through subtle motion, structured typography, and a balanced visual hierarchy.",
    tech: ["Next.js", "WordPress", "TailwindCSS"] as const,
  },
  {
    title: "Central Nord",
    imageSrc: "/images/featured/centralnord.webp",
    href: "https://centralnord.ro",
    description:
      "A refined real estate showcase built to highlight modern developments in northern Bucharest. Smooth scroll-based animations and architectural layouts create a sense of depth and sophistication while maintaining high performance across devices.",
    tech: ["Next.js", "Framer Motion", "TailwindCSS"] as const,
  },
] as const;

export default function FeaturedWorkSection() {
  return (
    <section id="work" className="relative z-20 py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <header className="mb-8 md:mb-12 text-center">
          <h2
            className="text-3xl md:text-5xl tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Featured Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-white/70">
            Selected projects that blend clarity, performance, and expressive
            motion.
          </p>
        </header>

        <FeaturedCarousel>
          {projects.map((p) => (
            <FeaturedCarouselSlide key={p.title}>
              <FeaturedCard
                title={p.title}
                imageSrc={p.imageSrc}
                href={p.href}
                description={p.description}
                tech={p.tech}
              />
            </FeaturedCarouselSlide>
          ))}
        </FeaturedCarousel>
      </div>
    </section>
  );
}
