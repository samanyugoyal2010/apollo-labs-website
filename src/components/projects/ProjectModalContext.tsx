"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/lib/types";

type Ctx = {
  project: Project | null;
  open: (project: Project, trigger: HTMLElement | null) => void;
  close: () => void;
  restoreFocus: () => void;
};

const ProjectModalContext = createContext<Ctx | null>(null);

export function ProjectModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Project, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setProject(next);
  }, []);

  const close = useCallback(() => setProject(null), []);

  const restoreFocus = useCallback(() => {
    // preventScroll: the card is already in view; focusing must not move the page.
    triggerRef.current?.focus({ preventScroll: true });
    triggerRef.current = null;
  }, []);

  const value = useMemo(
    () => ({ project, open, close, restoreFocus }),
    [project, open, close, restoreFocus],
  );

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    throw new Error("useProjectModal must be used within ProjectModalProvider");
  }
  return ctx;
}
