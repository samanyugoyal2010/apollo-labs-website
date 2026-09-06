import type { ReactNode } from "react";

/**
 * Section header: a mono label carrying the section's name as *metadata*,
 * a real title beneath it, and an optional action on the same row.
 *
 * The label is never the heading on its own — at 12px it cannot carry the
 * hierarchy, so `title` is required.
 */
export function SectionHeading({
  label,
  title,
  lede,
  action,
  className,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`flex flex-col gap-6 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-16 ${className ?? ""}`}
    >
      <div className="flex flex-col gap-4">
        <p className="mono-label text-signal-text">{label}</p>
        <h2 className="t-section max-w-[18ch] text-paper">{title}</h2>
        {lede && (
          <p className="t-body max-w-[54ch] text-paper-dim">{lede}</p>
        )}
      </div>
      {action && <div className="shrink-0 sm:pb-1">{action}</div>}
    </header>
  );
}
