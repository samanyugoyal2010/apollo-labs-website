import type { ReactNode } from "react";

/** Numbered section marker: `01 — Selected Work` */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mono-label flex items-center gap-3 text-muted ${className ?? ""}`}>
      {index && <span className="text-signal-text">{index}</span>}
      <span>{children}</span>
    </p>
  );
}
