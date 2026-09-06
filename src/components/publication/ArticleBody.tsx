import { Figure } from "./Figure";
import type { Project } from "@/lib/types";

export function ArticleBody({ project }: { project: Project }) {
  return (
    <div>
      <section id="abstract" className="scroll-mt-28">
        <SectionRule index="01" heading="Abstract" />
        <p className="text-[1.3125rem] leading-[1.6] tracking-[-0.008em] text-paper">
          {project.abstract}
        </p>
      </section>

      {project.content.map((section, i) => (
        <section key={section.id} id={section.id} className="mt-16 scroll-mt-24">
          <SectionRule
            index={String(i + 2).padStart(2, "0")}
            heading={section.heading}
          />
          <div className="flex flex-col gap-6">
            {section.body.map((paragraph, j) => (
              <p
                key={j}
                className="t-body leading-[1.72] text-paper-dim"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {section.figure && (
            <Figure figure={section.figure} seed={`${project.id}-${section.id}`} />
          )}
        </section>
      ))}
    </div>
  );
}

function SectionRule({ index, heading }: { index: string; heading: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-4">
        <span className="mono-label text-signal-text">{index}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="t-sub mt-4 text-paper">
        {heading}
      </h2>
    </div>
  );
}
