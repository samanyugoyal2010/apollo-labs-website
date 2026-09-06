import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DISCIPLINES } from "@/lib/disciplines";
import { disciplineCounts } from "@/lib/projects";

export function Disciplines() {
  const counts = disciplineCounts();

  return (
    <section id="disciplines" className="gutter section scroll-mt-20">
      <div className="shell-wide">
        <SectionHeading
          label="Project areas"
          title="Every good question needs a corner to grow in."
          lede="Apollo is ready for its first projects. Pick an area, bring a question, and make the first pin."
        />

        <div className="board-surface mt-14 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3 border-b border-paper/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="mono-label text-paper/70">Apollo project board</p>
            <p className="mono-label text-paper/55">{DISCIPLINES.length} open areas · 0 projects pinned</p>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {DISCIPLINES.map((discipline, index) => (
              <li
                key={discipline.name}
                className={`board-note board-note--${(index % 4) + 1}`}
              >
                <Link
                  href={`/explore?discipline=${encodeURIComponent(discipline.name)}`}
                  className="group flex h-full min-h-56 flex-col p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-signal"
                >
                  <span aria-hidden="true" className="board-note__pin" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="mono-label text-signal-text">{discipline.code}</span>
                    <span className="mono-label text-muted transition-colors group-hover:text-signal-text">
                      {String(counts.get(discipline.name) ?? 0).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="t-sub mt-10 max-w-[14ch] text-paper">
                    {discipline.name}
                  </h3>
                  <p className="t-meta mt-4 max-w-[34ch] text-muted">
                    {discipline.description}
                  </p>
                  <span className="mono-label mt-auto pt-7 text-signal-text transition-transform duration-300 group-hover:translate-x-1">
                    Open area →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
