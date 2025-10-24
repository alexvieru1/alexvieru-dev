

"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

/**
 * FeaturedCarousel
 * -------------------------------------------------------------
 * A lightweight, accessible, scroll-snap carousel that renders
 * any children as slides (e.g., Safari mockups with project screenshots).
 *
 * - Uses native horizontal scrolling + CSS scroll-snap for buttery perf
 * - Prev/Next controls + pagination dots
 * - Keyboard navigation (←/→) when focused
 * - Responsive slide widths via Tailwind utilities on the child wrapper
 *
 * Usage (example):
 *
 * <FeaturedCarousel>
 *   <FeaturedCarousel.Slide>
 *     <Safari>...</Safari>
 *   </FeaturedCarousel.Slide>
 *   <FeaturedCarousel.Slide>...</FeaturedCarousel.Slide>
 *   <FeaturedCarousel.Slide>...</FeaturedCarousel.Slide>
 * </FeaturedCarousel>
 */

export interface FeaturedCarouselProps {
  children: React.ReactNode;
  className?: string;
  /** Gap between slides in Tailwind space (default: 24px => gap-6) */
  gapClassName?: string; // e.g., "gap-6", "gap-8"
  /** Optional aria-label for the region */
  ariaLabel?: string;
}

export function FeaturedCarousel({
  children,
  className,
  gapClassName = "gap-6",
  ariaLabel = "Featured projects carousel",
}: FeaturedCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const isAutoScrolling = useRef(false);
  const snapTimeout = useRef<number | null>(null);

  const slides = useMemo(() => React.Children.toArray(children), [children]);

  // Observe which slide is most visible to sync active index
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const items = Array.from(viewport.querySelectorAll<HTMLElement>("[data-carousel-slide]"));

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersection ratio inside the viewport
        const sorted = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        const current = sorted[0]?.target as HTMLElement | undefined;
        if (!current || isAutoScrolling.current) return;
        const idxAttr = current.getAttribute("data-index");
        if (idxAttr) setActive(parseInt(idxAttr, 10));
      },
      {
        root: viewport,
        threshold: [0.35, 0.6, 0.75],
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(
    () => () => {
      if (snapTimeout.current) {
        window.clearTimeout(snapTimeout.current);
      }
    },
    []
  );

  const scrollToIndex = useCallback(
    (idx: number) => {
      const viewport = viewportRef.current;
      const target = slideRefs.current[idx];
      if (!viewport || !target) return;

      isAutoScrolling.current = true;
      if (snapTimeout.current) {
        window.clearTimeout(snapTimeout.current);
      }
      setSnapEnabled(false);

      const firstSlide = slideRefs.current[0];
      const firstOffset = firstSlide?.offsetLeft ?? 0;
      const left = target.offsetLeft - firstOffset;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const clamped = Math.max(0, Math.min(left, maxScroll));

      viewport.scrollTo({ left: clamped, behavior: "smooth" });
      setActive(idx);

      snapTimeout.current = window.setTimeout(() => {
        setSnapEnabled(true);
        isAutoScrolling.current = false;
      }, 450);
    },
    [setActive]
  );

  const handlePrev = () => {
    const next = Math.max(0, active - 1);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(slides.length - 1, active + 1);
    scrollToIndex(next);
  };

  // Keyboard navigation when the viewport is focused
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      className={cn("relative w-full", className)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      {/* Viewport */}
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "group/viewport relative flex w-full overflow-x-auto overflow-y-hidden",
          "scroll-smooth no-scrollbar", // hide scrollbars globally, but keep native scrolling
          snapEnabled ? "snap-x snap-mandatory" : "snap-none",
          gapClassName
        )}
      >
        {/* Spacer to center the first and last slides a bit on large screens */}
        <div aria-hidden className="shrink-0 basis-4 lg:basis-12" />

        {slides.map((child, i) => (
          <div
            key={i}
            data-carousel-slide
            data-index={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={cn(
              "snap-start shrink-0",
              // Responsive widths for slides
              "w-[88vw] sm:w-[70vw] lg:w-[60vw] xl:w-[52vw]",
              "relative"
            )}
          >
            {/* subtle enter animation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35, once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-full"
            >
              {child}
            </motion.div>
          </div>
        ))}

        <div aria-hidden className="shrink-0 basis-4 lg:basis-12" />
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full",
              "bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10"
            )}
          >
            <IconArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full",
              "bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10"
            )}
          >
            <IconArrowRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "h-1.5 w-5 rounded-full transition-all",
                active === i ? "bg-white/90 w-8" : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedCarouselSlide({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full">{children}</div>;
}

FeaturedCarousel.Slide = FeaturedCarouselSlide;

/**
 * Utility class to hide native scrollbars without breaking accessibility.
 * Ensure you have this in your global CSS if not already:
 * .no-scrollbar::-webkit-scrollbar { display: none; }
 * .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
 */
