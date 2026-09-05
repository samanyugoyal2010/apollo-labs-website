"use client";

import { useEffect, useRef } from "react";

/**
 * A faint light that trails the cursor across empty background. It writes
 * two CSS custom properties on its own element and nothing else — no React
 * state, so moving the mouse never triggers a render.
 *
 * Deliberately restrained: it sits behind all content at low opacity and
 * eases toward the pointer rather than snapping to it. Disabled for coarse
 * pointers and for anyone who asked to reduce motion.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    // Target follows the pointer; current eases toward it each frame.
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let frame = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      el.style.setProperty("--gx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--gy", `${cy.toFixed(1)}px`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-glow" />;
}
