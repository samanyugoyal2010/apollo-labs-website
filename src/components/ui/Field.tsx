"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";

export function Field({
  label,
  hint,
  error,
  className,
  ...props
}: { label: string; hint?: string; error?: string } & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  const descriptionId = hint || error ? `${id}-description` : undefined;
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={id} className="mono-label text-muted">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        className="h-11 border-b border-hairline-strong bg-transparent text-[1rem] text-paper outline-none transition-colors duration-200 placeholder:text-faint hover:border-paper/35 focus:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
        {...props}
      />
      {(error || hint) && (
        <p
          id={descriptionId}
          className={`text-xs ${error ? "text-signal-text" : "text-faint"}`}
          role={error ? "alert" : undefined}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
