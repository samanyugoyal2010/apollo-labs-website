"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * A very small magnetic pull toward the cursor — a few pixels at most.
 * Writes movement into CSS variables rather than through state. That lets the
 * control compose the pull with its own press animation, and stays inert for
 * touch input and reduced-motion users.
 */
export function useMagnetic<T extends HTMLElement>(strength = 8, active = true) {
  const ref = useRef<T>(null);

  const enabled = useCallback(() => {
    if (!active || typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, [active]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const rect = el.getBoundingClientRect();
      const dx = Math.max(
        -1.2,
        Math.min(1.2, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)),
      );
      const dy = Math.max(
        -1.2,
        Math.min(1.2, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)),
      );
      el.style.setProperty("--magnetic-x", `${(dx * strength).toFixed(2)}px`);
      el.style.setProperty(
        "--magnetic-y",
        `${(dy * strength * 0.6).toFixed(2)}px`,
      );
    },
    [enabled, strength],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--magnetic-x", "0px");
    el.style.setProperty("--magnetic-y", "0px");
  }, []);

  /** Spread onto the element: `<button {...useMagnetic()} />` */
  return { ref, onPointerMove, onPointerLeave, onPointerCancel: onPointerLeave };
}
