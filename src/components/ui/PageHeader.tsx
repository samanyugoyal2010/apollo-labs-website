import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/** A compact page introduction with one clear title and optional support copy. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="gutter border-b border-hairline pb-12 pt-24 md:pb-16 md:pt-32">
      <div className="shell-wide">
        <Eyebrow>{eyebrow}</Eyebrow>

        <div className="mt-7 grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h1 className="t-page max-w-[15ch] text-paper lg:col-span-8">
            {title}
          </h1>
          {lede && (
            <p className="t-lead max-w-[42ch] text-paper-dim lg:col-span-4 lg:pb-2">
              {lede}
            </p>
          )}
        </div>

        {aside}
      </div>
    </header>
  );
}

/**
 * A composed band on the static pages: the heading holds the left half, the
 * supporting copy and any structured points the right. Two columns across the
 * full width rather than one narrow essay column.
 */
export function Prose({
  index,
  label,
  title,
  lead,
  points,
  children,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  points?: { term: string; detail: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="gutter border-b border-hairline py-20 md:py-28">
      <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mono-label flex gap-3 text-muted">
            <span className="text-signal-text">{index}</span>
            <span>{label}</span>
          </p>
          <h2 className="t-section mt-6 max-w-[16ch] text-paper">{title}</h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {lead && (
            <p className="t-lead max-w-[44ch] text-paper lg:mt-11">{lead}</p>
          )}

          {children && (
            <div className="t-body mt-6 flex max-w-[54ch] flex-col gap-4 text-muted [&_strong]:font-medium [&_strong]:text-paper">
              {children}
            </div>
          )}

          {points && (
            <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point.term} className="border-t border-hairline pt-4">
                  <dt className="t-sub text-paper">{point.term}</dt>
                  <dd className="t-body-sm mt-2.5 max-w-[34ch] text-muted">
                    {point.detail}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {aside}
        </div>
      </div>
    </section>
  );
}
