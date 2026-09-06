"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

/** Expands in place inside the preview — never a second dialog or page. */
export function ProjectAbstract({ abstract }: { abstract: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="group inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:text-signal-bright"
      >
        <span className="link-reveal">{open ? "Hide Abstract" : "Read Abstract"}</span>
        <span
          aria-hidden="true"
          className={`text-[0.75rem] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="abstract"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-hairline pt-6">
              <p className="mono-label text-signal-text">Abstract</p>
              <p className="t-body-sm mt-4 max-w-[64ch] leading-[1.72] text-paper-dim">
                {abstract}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
