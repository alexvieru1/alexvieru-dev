"use client";

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Safari } from "./safari";

export type FeaturedCardProps = {
  /** Project title displayed on the overlay */
  title: string;
  /** Project hero image path for the Safari frame */
  imageSrc: string;
  /** Optional external/internal link */
  href?: string;
  /** Optional short description for hover/overlay */
  description?: string;
  /** Optional tech stack badges */
  tech?: readonly string[];
  /** Optional URL text to render inside Safari's location bar */
  url?: string;
  /** Optional wrapper className */
  className?: string;
};

const formatUrl = (value?: string) => {
  if (!value) return undefined;
  return value.replace(/^https?:\/\//, "").replace(/^www\./, "");
};

/**
 * FeaturedCard
 * -------------------------------------------------------------
 * A polished card for showcasing a project screenshot inside a Safari mockup,
 * wrapped in MagicUI's MagicCard for a subtle branded glow. Designed to be
 * dropped inside the FeaturedCarousel.
 */
export default function FeaturedCard({
  title,
  imageSrc,
  href,
  description,
  tech,
  url,
  className,
}: FeaturedCardProps) {
  const safariUrl = url ?? formatUrl(href);

  return (
    <div className={cn("group relative", className)}>
        <div className="relative overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
          <Safari url={safariUrl} imageSrc={imageSrc} className="block w-full" />

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className="truncate text-base text-white md:text-lg"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                  title={title}
                >
                  {title}
                </h3>
                {description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-white/80 md:text-sm">{description}</p>
                ) : null}
                {tech && tech.length > 0 ? (
                  <div className="mt-2 hidden flex-wrap gap-2 md:flex">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-white/75 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${title}`}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1.5",
                    "bg-white/10 text-white ring-1 ring-white/15",
                    "transition-colors hover:bg-white/15 hover:ring-white/25"
                  )}
                >
                  <span className="text-xs">View</span>
                  <IconArrowUpRight size={16} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
    </div>
  );
}
