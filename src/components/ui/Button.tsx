"use client";

import Link, { useLinkStatus } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "button-motion group relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,border-color,color,transform,opacity] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-signal-ink hover:bg-signal-bright border border-signal hover:border-signal-bright",
  secondary:
    "border border-hairline-strong text-paper hover:border-paper/45 hover:bg-paper/[0.04]",
  ghost: "text-paper-dim hover:text-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-8 text-[1.0625rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  busy?: boolean;
  className?: string;
  children: ReactNode;
};

function ProgressStatus({ pending }: { pending: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`button-progress${pending ? " is-pending" : ""}`}
    >
      <span className="button-progress__signal" />
    </span>
  );
}

function LinkProgressStatus() {
  const { pending } = useLinkStatus();
  return <ProgressStatus pending={pending} />;
}

export function Button({
  variant = "primary",
  size = "md",
  magnetic,
  busy = false,
  className,
  children,
  disabled,
  ...props
}: SharedProps & ComponentPropsWithoutRef<"button">) {
  const isMagnetic = magnetic ?? variant === "primary";
  const magneticProps = useMagnetic<HTMLButtonElement>(8, isMagnetic);
  return (
    <button
      {...magneticProps}
      className={`${base} ${isMagnetic ? "magnetic-action" : ""} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      {...props}
    >
      <span className="button-motion__label">{children}</span>
      <ProgressStatus pending={busy} />
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  magnetic,
  className,
  children,
  href,
  ...props
}: Omit<SharedProps, "busy"> & ComponentPropsWithoutRef<typeof Link>) {
  const isMagnetic = magnetic ?? variant === "primary";
  const magneticProps = useMagnetic<HTMLAnchorElement>(8, isMagnetic);
  return (
    <Link
      {...magneticProps}
      href={href}
      className={`${base} ${isMagnetic ? "magnetic-action" : ""} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
      {...props}
    >
      <span className="button-motion__label">{children}</span>
      <LinkProgressStatus />
    </Link>
  );
}

/** Small arrow that nudges on parent hover. */
export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1 ${className ?? ""}`}
    >
      →
    </span>
  );
}
