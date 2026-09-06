import { Arrow } from "@/components/ui/Button";
import type { Project } from "@/lib/types";

const LABELS: Record<string, { label: string; note: string }> = {
  paper: { label: "Full Paper", note: "PDF · Apollo Labs Press" },
  github: { label: "Source Repository", note: "GitHub" },
  demo: { label: "Live Demo", note: "Interactive" },
  video: { label: "Project Video", note: "Recorded walkthrough" },
};

export function ResourceLinks({ project }: { project: Project }) {
  const entries = Object.entries(project.links ?? {}).filter(([, href]) => href);
  if (entries.length === 0) return null;

  return (
    <section id="resources" className="mt-14 scroll-mt-24">
      <div className="flex items-center gap-4">
        <span className="mono-label text-signal-text">◆</span>
        <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="mt-4 text-[1.4rem] font-medium leading-tight tracking-[-0.02em]">
        Resources
      </h2>
      <ul className="mt-7 border-t border-hairline">
        {entries.map(([key, href]) => {
          const meta = LABELS[key] ?? { label: key, note: "External" };
          return (
            <li key={key} className="border-b border-hairline">
              <a
                href={href}
                className="group flex items-center justify-between gap-6 py-5 transition-colors duration-200"
              >
                <span className="flex flex-col gap-1.5">
                  <span className="text-[0.9375rem] text-paper transition-colors duration-200 group-hover:text-signal-bright">
                    {meta.label}
                  </span>
                  <span className="mono-label text-faint">{meta.note}</span>
                </span>
                <span className="text-muted transition-colors duration-200 group-hover:text-signal-text">
                  <Arrow />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mono-label mt-5 text-faint">
        Prototype build — resource links are placeholders
      </p>
    </section>
  );
}
