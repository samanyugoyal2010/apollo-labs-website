import type { ReactNode } from "react";

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
}) {
  const tones = {
    neutral: "bg-white/[0.045] text-paper-dim",
    accent: "bg-signal/12 text-signal-bright",
    outline: "border border-hairline text-muted",
  } as const;
  return (
    <span
      className={`mono-label inline-flex items-center px-2 py-1.5 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Discipline marker: a signal dot plus mono label. */
export function DisciplineMark({ children }: { children: ReactNode }) {
  return (
    <span className="mono-label inline-flex items-center gap-2 text-paper-dim">
      <span aria-hidden="true" className="size-1 shrink-0 bg-signal" />
      {children}
    </span>
  );
}
