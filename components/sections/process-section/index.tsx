"use client";

import { IconBrush, IconBulb, IconHammer } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type Step = {
  id: number;
  title: string;
  description: string; // emoji or react component
  icon: string | React.ReactNode;
  image?: string;   // desktop uses this
};

const steps: Step[] = [
  {
    id: 1,
    title: "Ideate",
    image: "/images/journey/process-left.webp",
    description:
      "Initially, I embark on a comprehensive exploration of diverse viewpoints, uncovering potential opportunities, defining clear objectives, and establishing the foundational framework that will guide the project’s entire trajectory.",
    icon: <IconBulb size={24} color="white" />,
  },
  {
    id: 2,
    title: "Design",
    image: "/images/journey/process-center.webp",
    description:
      "Through a meticulous design process, I refine concepts into tangible solutions that harmonize aesthetics with functionality, resulting in intuitive and memorable experiences.",
    icon: <IconBrush size={24} color="white" />,
  },
  {
    id: 3,
    title: "Build",
    image: "/images/journey/process-right.webp",
    description:
      "I bring ideas to life with precision and care, developing, testing, and optimizing every detail to ensure performance, scalability, and long-term reliability.",
    icon: <IconHammer size={24} color="white" />,
  },
];

// Lazy-load each variant so we only ship what's needed
const Desktop = dynamic(() => import("./desktop"), { ssr: false });
const Mobile  = dynamic(() => import("./mobile"),  { ssr: false });

export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)"); // lg breakpoint
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Avoid hydration mismatch: render nothing until we know viewport
  if (isMobile === null) return null;

  return isMobile ? (
    <Mobile steps={steps} />
  ) : (
    <Desktop steps={steps} />
  );
}