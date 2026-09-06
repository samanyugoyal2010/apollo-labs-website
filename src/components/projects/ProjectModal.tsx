"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCover } from "./ProjectCover";
import { ProjectAbstract } from "./ProjectAbstract";
import { useProjectModal } from "./ProjectModalContext";
import { coverVariantFor } from "@/lib/disciplines";
import { formatDate } from "@/lib/projects";
import { Arrow } from "@/components/ui/Button";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function ProjectModal() {
  const { project, close, restoreFocus } = useProjectModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  // Open the native dialog (focus containment + Escape come free).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;
    if (!dialog.open) dialog.showModal();
    // Start at the top of the panel rather than on the first control, so the
    // dialog is announced from its heading and no stray ring appears mid-panel.
    panelRef.current?.focus();
  }, [project]);

  // Lock background scroll without moving the page.
  useEffect(() => {
    if (!project) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [project]);

  // Escape fires `cancel`; intercept it so the exit animation can run.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [close]);

  const enter = mobile
    ? { initial: { y: "6%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "6%", opacity: 0 } }
    : { initial: { y: 14, scale: 0.985, opacity: 0 }, animate: { y: 0, scale: 1, opacity: 1 }, exit: { y: 8, scale: 0.99, opacity: 0 } };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={project ? "project-dialog-title" : undefined}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      className="apollo-dialog"
    >
      <AnimatePresence
        onExitComplete={() => {
          dialogRef.current?.close();
          restoreFocus();
        }}
      >
        {project && (
          <motion.div
            key={project.id}
            ref={panelRef}
            tabIndex={-1}
            initial={reduced ? false : enter.initial}
            animate={enter.animate}
            exit={reduced ? { opacity: 0 } : enter.exit}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative flex max-h-[88dvh] focus:outline-none w-full flex-col overflow-hidden border border-hairline-strong bg-base shadow-[0_40px_100px_-20px_var(--apollo-modal-shadow)] max-md:max-h-[92dvh] max-md:rounded-t-2xl md:max-h-[86dvh] md:max-w-[78rem]"
          >
            {/* Mobile grab affordance */}
            <div className="flex shrink-0 justify-center pt-3 md:hidden">
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-white/15" />
            </div>

            <div className="scroll-region flex-1 overflow-y-auto overscroll-contain">
              <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                {/* Cover */}
                <div className="relative border-b border-hairline bg-surface md:sticky md:top-0 md:h-full md:min-h-[30rem] md:border-b-0 md:border-r">
                  <div className="aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full">
                    <ProjectCover
                      variant={coverVariantFor(project.discipline)}
                      seed={project.id}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <span className="mono-label border border-hairline bg-void px-2 py-1.5 text-paper-dim">
                      {project.type}
                    </span>
                    <span className="mono-label border border-hairline bg-void px-2 py-1.5 text-paper-dim">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 p-6 md:p-12">
                  <div className="flex items-center gap-3 pr-12 md:pr-14">
                    <span className="mono-label flex items-center gap-2 text-paper-dim">
                      <span aria-hidden="true" className="size-1 bg-signal" />
                      {project.discipline}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
                    <span className="mono-label text-faint">{project.year}</span>
                  </div>

                  <h2 id="project-dialog-title" className="max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.025em] text-paper">
                    {project.title}
                  </h2>

                  <div className="flex flex-col gap-1.5">
                    <p className="t-body-sm text-paper">
                      {project.authors.map((a) => a.name).join(", ")}
                    </p>
                    <p className="mono-label text-faint">
                      Published {formatDate(project.date)}
                    </p>
                  </div>

                  <p className="t-body max-w-[52ch] text-paper-dim">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono-label border border-hairline px-2 py-1.5 text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="rule" />

                  <ProjectAbstract abstract={project.abstract} />

                  <div className="mt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={close}
                      className="group inline-flex h-11 items-center gap-2 border border-signal bg-signal px-6 text-sm font-medium text-[#140803] transition-colors duration-200 hover:border-signal-bright hover:bg-signal-bright"
                    >
                      See Full Project <Arrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex size-10 items-center justify-center border border-hairline-strong bg-void/80 text-paper-dim backdrop-blur-sm transition-colors duration-200 hover:border-paper/40 hover:text-paper max-md:right-3 max-md:top-3 max-md:size-11"
            >
              <span className="sr-only">Close project preview</span>
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
