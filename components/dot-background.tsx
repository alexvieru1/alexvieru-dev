import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./ui/text-generate-effect";

type DotBackgroundProps = {
  showGradient?: boolean;
  textGenerateEffect?: boolean;
  words: string;
  author?: string;
};

export function DotBackground({
  showGradient = false,
  textGenerateEffect = false,
  words,
  author,
}: DotBackgroundProps) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[20px_20px]",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Optional bottom fade */}
      {showGradient && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[linear-gradient(to_top,black,transparent_60%)] dark:bg-black" />
      )}
      {textGenerateEffect && (
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          {/* Wrapper needed for absolute positioning on md+ */}
          <div className="relative mx-auto w-full max-w-3xl">
            {/* Opening quote — centered on mobile, left on md+ */}
            <span
              className="block text-[9rem] leading-none text-white/15 select-none mb-6
                         md:absolute md:-left-14 md:top-1/2 md:-translate-y-1/2 md:mb-0 md:text-[10rem]"
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}
            >
              “
            </span>

            {/* The quote text */}
            <TextGenerateEffect
              className="mx-auto max-w-3xl text-3xl md:text-6xl text-white italic leading-tight"
              words={words}
            />

            {/* Closing quote — centered on mobile, right on md+ */}
            <span
              className="block text-[9rem] leading-none text-white/15 select-none mt-14
                         md:absolute md:-right-14 md:top-1/2 md:-translate-y-1/2 md:mt-0 md:text-[10rem]"
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}
            >
              ”
            </span>
          </div>

          {author && (
            <p className="mt-6 text-white/60 text-sm md:text-base font-medium tracking-wide">
              — {author}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
