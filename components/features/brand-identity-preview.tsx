"use client";

export default function BrandIdentityPreview() {
  const palette = ["#26091B", "#801827", "#B81817", "#3A2A28", "#0F0F10"] as const;

  return (
    <div className="relative h-full w-full p-6">
      <div className="grid gap-4">
        {/* Palette row */}
        <div className="grid grid-cols-5 gap-3">
          {palette.map((hex) => (
            <div
              key={hex}
              className="relative h-20 rounded-xl ring-1 ring-white/10"
              style={{ backgroundColor: hex }}
            >
              <span className="absolute bottom-2 right-2 text-[10px] tracking-wide text-white/70 px-1.5 py-0.5 rounded bg-black/30 ring-1 ring-white/10">
                {hex}
              </span>
            </div>
          ))}
        </div>

        {/* Typography specimens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Headline specimen (Playfair) */}
          <div className="rounded-2xl p-5 bg-neutral-900/60 ring-1 ring-white/10">
            <h4 className="text-white text-sm tracking-wider uppercase" style={{ letterSpacing: ".12em" }}>
              Headline Typeface
            </h4>
            <p className="text-white/60 text-xs">Playfair Display / 600</p>
            <div
              className="mt-3 text-2xl md:text-3xl leading-snug text-white"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              Where systems evolve, details matter.
            </div>
          </div>

          {/* Body specimen */}
          <div className="rounded-2xl p-5 bg-neutral-900/60 ring-1 ring-white/10">
            <h4 className="text-white text-sm tracking-wider uppercase" style={{ letterSpacing: ".12em" }}>
              Interface Text
            </h4>
            <p className="text-white/60 text-xs">Sans-serif / Regular</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Clear, readable body copy for product interfaces and long-form content. Balanced contrast and comfortable
              line-height ensure a relaxed reading rhythm across devices.
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="pt-2 text-center">
          <p
            className="text-white/70 italic text-sm md:text-base"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Identity isn’t invented — it’s refined through repetition and clarity.
          </p>
        </div>
      </div>
    </div>
  );
}