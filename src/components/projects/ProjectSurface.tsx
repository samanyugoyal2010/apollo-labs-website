"use client";

import type { ReactNode } from "react";
import { ProjectModalProvider } from "./ProjectModalContext";
import { ProjectModal } from "./ProjectModal";

/** Wraps any surface that browses projects: gallery + shared preview dialog. */
export function ProjectSurface({ children }: { children: ReactNode }) {
  return (
    <ProjectModalProvider>
      {children}
      <ProjectModal />
    </ProjectModalProvider>
  );
}
