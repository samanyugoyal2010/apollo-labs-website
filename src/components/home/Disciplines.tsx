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
          label="Disciplines"
          title="Explore work across research and engineering."
          lede="Apollo does not privilege papers over builds. Pick a field to see what members have published in it."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d) => (
            <li key={d.name} className="flex">
              <Link
                href={`/explore?discipline=${encodeURIComponent(d.name)}`}
                className="group flex w-full items-center justify-between gap-4 border border-hairline bg-card px-5 py-6 transition-colors duration-200 hover:border-signal/60"
              >
                <span className="flex items-center gap-3">
                  <span className="mono-label text-faint transition-colors duration-200 group-hover:text-signal-text">
                    {d.code}
                  </span>
                  <span className="t-body font-medium leading-tight">{d.name}</span>
                </span>
                <span className="mono-label text-paper-dim">
                  {String(counts.get(d.name) ?? 0).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
