import React from "react";
import { cn } from "@/lib/utils";
import WebDevPreview from "../features/web-dev-preview";
import InterfaceDesignPreview from "../features/interface-design-preview";
import BrandIdentityPreview from "../features/brand-identity-preview";
import CreativeDirectionPreview from "../features/creative-direction-preview";

export default function ServicesSection() {
  const features: Feature[] = [
    {
      title: "Web Development",
      description:
        "Fast, scalable, and accessible builds with modern stacks—clean architecture, smooth interactions, and performance by default.",
      skeleton: <WebDevPreview />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Interface Design",
      description:
        "Elegant, usable interfaces that balance aesthetics with clarity. Systems, components, and micro‑interactions that feel effortless.",
      skeleton: <InterfaceDesignPreview />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Brand & Identity",
      description:
        "Cohesive visual language—type, color, and voice—translated into digital experiences that feel distinct and consistent.",
      skeleton: <BrandIdentityPreview />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Creative Direction",
      description:
        "From concept to launch: visual direction, story, and polish—aligning product, brand, and experience into one narrative.",
      skeleton: <CreativeDirectionPreview />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h2
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight text-white"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          What I Offer
        </h2>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-300 text-center">
          Bridging creativity and technology with precision.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// Types
interface Feature {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className?: string;
}

// Layout primitives
const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className="max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug"
      style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
    >
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-300 font-normal",
        "max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};