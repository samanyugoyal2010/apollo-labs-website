"use client";

import { useEffect, useRef } from "react";

/**
 * An abstract view of work moving through Apollo: a model output, a field-data
 * card, and a project record under review. Layered but never overlapping each
 * other's labels. One slow cursor drift, nothing else.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}px`);
        el.style.setProperty("--tilt-y", `${(y * 4).toFixed(2)}px`);
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative aspect-[5/4] w-full min-w-0 select-none [transform:translate3d(var(--tilt-x,0),var(--tilt-y,0),0)] [transition:transform_600ms_cubic-bezier(0.22,0.61,0.36,1)]"
    >
      {/* Model output — top right, label above the grid so nothing covers it */}
      <div className="absolute right-0 top-0 z-0 w-[64%] border border-hairline bg-card p-3.5 max-[639px]:w-[76%] max-[639px]:p-2.5">
        <div className="flex items-center justify-between pb-2.5">
          <span className="mono-label text-faint">Model output</span>
          <span className="mono-label text-signal-text">0.81</span>
        </div>
        <div className="grid grid-cols-14 gap-[2px]">
          {Array.from({ length: 84 }, (_, i) => {
            const col = i % 14;
            const row = Math.floor(i / 14);
            const band = 1 - Math.abs((col / 14) * 0.9 + 0.05 - row / 6);
            const accent = i === 31 || i === 58;
            return (
              <span
                key={i}
                className={`aspect-square ${accent ? "bg-signal" : "bg-paper"}`}
                style={accent ? undefined : { opacity: 0.06 + band * 0.42 }}
              />
            );
          })}
        </div>
      </div>

      {/* Field data — left; label sits on top so the record card can overlap */}
      <div className="absolute left-0 top-[32%] z-10 w-[52%] overflow-hidden border border-hairline bg-card shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] max-[639px]:top-[30%] max-[639px]:w-[62%]">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 max-[639px]:px-2 max-[639px]:py-2">
          <span className="mono-label text-faint">ENV · Field data</span>
          <span className="mono-label text-signal-text">Published</span>
        </div>
        <svg viewBox="0 0 200 96" className="w-full text-paper" role="presentation">
          <rect width="200" height="96" className="fill-base" />
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points={`0,${36 + i * 15} 40,${24 + i * 15} 80,${44 + i * 15} 120,${20 + i * 15} 160,${38 + i * 15} 200,${26 + i * 15} 200,96 0,96`}
              fill={i === 1 ? "var(--apollo-signal)" : "currentColor"}
              fillOpacity={i === 1 ? 0.85 : 0.1 + i * 0.1}
            />
          ))}
        </svg>
      </div>

      {/* Project record — bottom right, clear of the field-data card */}
      <div className="absolute bottom-0 right-[2%] z-20 w-[56%] border border-hairline bg-card p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] max-[639px]:w-[68%] max-[639px]:p-3">
        <p className="mono-label text-signal-text">AI · Research Paper</p>
        <div className="mt-3 space-y-2">
          <span className="block h-2.5 w-[86%] bg-paper/30" />
          <span className="block h-2.5 w-[62%] bg-paper/30" />
        </div>
        <div className="mt-3.5 space-y-1.5">
          <span className="block h-1.5 w-full bg-paper/12" />
          <span className="block h-1.5 w-[92%] bg-paper/12" />
          <span className="block h-1.5 w-[70%] bg-paper/12" />
        </div>
        <div className="mt-3.5 flex items-center gap-2 border-t border-hairline pt-3">
          <span className="size-1.5 bg-signal" />
          <span className="mono-label text-faint">Under review</span>
        </div>
      </div>
    </div>
  );
}
