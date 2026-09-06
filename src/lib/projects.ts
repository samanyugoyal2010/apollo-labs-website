import type { Project } from "./types";

/** Apollo has no published projects yet. Real records will arrive here from Supabase. */
export const PROJECTS: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const byDiscipline = PROJECTS.filter(
    (candidate) =>
      candidate.id !== project.id && candidate.discipline === project.discipline,
  );
  const byTag = PROJECTS.filter(
    (candidate) =>
      candidate.id !== project.id &&
      !byDiscipline.includes(candidate) &&
      candidate.tags.some((tag) => project.tags.includes(tag)),
  );
  const rest = PROJECTS.filter(
    (candidate) =>
      candidate.id !== project.id &&
      !byDiscipline.includes(candidate) &&
      !byTag.includes(candidate),
  );
  return [...byDiscipline, ...byTag, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function authorLine(project: Project): string {
  const names = project.authors.map((author) => author.name);
  if (names.length <= 2) return names.join(" & ");
  return `${names[0]} +${names.length - 1}`;
}

export function disciplineCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const project of PROJECTS) {
    counts.set(
      project.discipline,
      (counts.get(project.discipline) ?? 0) + 1,
    );
  }
  return counts;
}
