import type { ReactNode } from "react";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { RocketOrbit } from "@/components/ui/RocketOrbit";

/**
 * Split-screen auth shell: Apollo identity on one side, the form set directly
 * into the page on the other — no floating card.
 */
export function AuthLayout({
  eyebrow,
  title,
  statement,
  description,
  accessDetails,
  workspaceItems,
  showRocket = false,
  children,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  statement: string;
  description?: ReactNode;
  accessDetails?: Array<{ label: string; value: string }>;
  workspaceItems?: string[];
  /** Adds one decorative craft to the artwork. Reserved for sign-in. */
  showRocket?: boolean;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] border-b border-hairline lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)]">
      {/* Identity */}
      <aside className="relative hidden overflow-hidden border-r border-hairline bg-base lg:block">
        <div className="absolute inset-0">
          <ProjectCover variant="curves" seed="apollo-auth-panel" />
        </div>
        {showRocket ? (
          <RocketOrbit
            className="absolute inset-0 z-[2] size-full"
            delay={2.5}
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] bg-gradient-to-b from-void/75 via-void/30 to-void/95"
        />
        <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col justify-between gutter py-12 xl:py-16">
          <div className="flex items-center justify-between border-b border-paper/15 pb-5 text-paper">
            <p className="mono-label">Apollo Member Workspace</p>
            <p className="mono-label text-paper/55">Account Gateway</p>
          </div>

          <div className="max-w-[38rem]">
            <p className="mono-label mb-7 flex items-center gap-3 text-paper/70">
              <span aria-hidden="true" className="size-1.5 bg-signal" />
              Research does not stop at the draft
            </p>
            <p className="t-section max-w-[17ch] text-paper">{statement}</p>

            {workspaceItems?.length ? (
              <ul className="mt-10 grid border-y border-paper/15 sm:grid-cols-3">
                {workspaceItems.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-paper/15 py-4 text-sm text-paper/75 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <span className="font-mono text-[0.6875rem] text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mono-label mt-8 text-paper/45">
              Apollo Labs · Est. 2026 · Student-Led Research
            </p>
          </div>
        </div>
      </aside>

      {/* Form */}
      <section className="gutter flex flex-col justify-center bg-base py-24 sm:py-28 lg:py-16">
        <div className="mx-auto w-full max-w-[31rem]">
          <div className="mb-10 flex items-center justify-between border-b border-hairline pb-5">
            <p className="mono-label text-faint">Member Portal</p>
            <p className="flex items-center gap-2 text-xs text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
              Account access
            </p>
          </div>

          <p className="mono-label flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="h-px w-5 bg-signal" />
            {eyebrow}
          </p>
          <h1 className="t-section mt-7 text-paper">{title}</h1>

          {description ? (
            <div className="mt-5 max-w-[42ch] text-[1rem] leading-relaxed text-paper-dim">
              {description}
            </div>
          ) : null}

          {accessDetails?.length ? (
            <dl className="mt-8 grid grid-cols-2 border-y border-hairline">
              {accessDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className={`py-4 ${index > 0 ? "border-l border-hairline pl-5" : "pr-5"}`}
                >
                  <dt className="mono-label text-faint">{detail.label}</dt>
                  <dd className="mt-2 text-sm font-medium text-paper">{detail.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {workspaceItems?.length ? (
            <div className="mt-7 border border-hairline bg-surface/55 p-4 lg:hidden">
              <p className="mono-label text-faint">Inside your workspace</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper-dim">
                {workspaceItems.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {children}
          <div className="mt-10 border-t border-hairline pt-6">{footer}</div>
        </div>
      </section>
    </div>
  );
}
