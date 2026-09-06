"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";
import type { Project, ProjectType } from "@/lib/types";

const TYPES: ProjectType[] = [
  "Research Paper",
  "Engineering",
  "Software",
  "Experiment",
];

type Sort = "newest" | "featured";

const ARCHIVE_LAYOUT = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-12",
  "lg:col-span-5 lg:col-start-2 lg:-mt-2",
  "lg:col-span-7 lg:col-start-6 lg:mt-8",
];

function matches(project: Project, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(q) ||
    project.summary.toLowerCase().includes(q) ||
    project.abstract.toLowerCase().includes(q) ||
    project.discipline.toLowerCase().includes(q) ||
    project.tags.some((t) => t.toLowerCase().includes(q)) ||
    project.authors.some((a) => a.name.toLowerCase().includes(q))
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 border border-hairline bg-card px-3 transition-colors focus-within:border-signal">
      <span className="mono-label text-faint">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 bg-transparent text-sm text-paper outline-none"
      >
        {children}
      </select>
    </label>
  );
}

export function ExploreArchive() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<string | null>(() => {
    const requested = params.get("discipline");
    return DISCIPLINES.some((d) => d.name === requested) ? requested : null;
  });
  const [type, setType] = useState<ProjectType | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const results = useMemo(() => {
    const filtered = PROJECTS.filter(
      (p) =>
        matches(p, query) &&
        (!discipline || p.discipline === discipline) &&
        (!type || p.type === type),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "featured" && a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return b.date.localeCompare(a.date);
    });
  }, [query, discipline, type, sort]);

  const clear = () => {
    setQuery("");
    setDiscipline(null);
    setType(null);
  };
  const filtering = Boolean(query || discipline || type);

  return (
    <>
      <section className="gutter border-b border-hairline py-6">
        <div className="shell-wide grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex items-center gap-4 border-b border-hairline pb-3 lg:border-0 lg:pb-0">
            <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-faint" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <label htmlFor="archive-search" className="sr-only">
              Search projects by title, author, tag, or summary
            </label>
            <input
              id="archive-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive"
              className="h-9 w-full bg-transparent text-[1rem] text-paper outline-none placeholder:text-faint"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterSelect
              label="Field"
              value={discipline ?? ""}
              onChange={(value) => setDiscipline(value || null)}
            >
              <option value="">All fields</option>
              {DISCIPLINES.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.code}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              label="Type"
              value={type ?? ""}
              onChange={(value) => setType((value as ProjectType) || null)}
            >
              <option value="">All types</option>
              {TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              label="Sort"
              value={sort}
              onChange={(value) => setSort(value as Sort)}
            >
              <option value="newest">Newest</option>
              <option value="featured">Featured</option>
            </FilterSelect>
            {filtering && (
              <button
                type="button"
                onClick={clear}
                className="link-reveal px-2 text-sm text-muted transition-colors hover:text-paper"
              >
                Clear
              </button>
            )}
            </div>
        </div>
      </section>

      <section className="gutter section">
        <div className="shell-wide">
          <div className="flex items-baseline justify-between gap-6 border-b border-hairline pb-5">
            <p className="mono-label text-muted">
              <span className="text-signal-text">
                {String(results.length).padStart(2, "0")}
              </span>
              <span className="ml-3">{results.length === 1 ? "Project" : "Projects"}</span>
            </p>
          </div>

          {results.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[1.25rem] font-medium text-paper-dim">
                {PROJECTS.length === 0
                  ? "No projects have been pinned yet."
                  : "Nothing matches that yet."}
              </p>
              <p className="mt-3 text-sm text-muted">
                {PROJECTS.length === 0
                  ? "Pick an area, bring a question, and make the first entry."
                  : "Try a broader term, or clear the filters to see the full archive."}
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
              {results.map((project, index) => (
                <div
                  key={project.id}
                  className={ARCHIVE_LAYOUT[index % ARCHIVE_LAYOUT.length]}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
