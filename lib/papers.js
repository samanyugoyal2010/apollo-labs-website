import { PROJECTS } from '@/lib/data'

/**
 * Gallery + paper-page accessors over `PROJECTS`.
 *
 * A project is a gallery entry from the day it starts; `paper` is what gets
 * filled in once a write-up clears review, so an in-progress project and a
 * published one share one shape and one detail page.
 */

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null
}

export function projectSlugs() {
  return PROJECTS.map((p) => p.slug)
}

export function projectHref(project) {
  return `/projects/${project.slug}`
}

export function isPublished(project) {
  return !!project.paper?.pdf
}

/** "In progress" / "Published · March 2026" — the card's status line. */
export function statusLabel(project) {
  if (!isPublished(project)) return project.tag ?? 'In progress'
  const when = formatDate(project.paper.published)
  return when ? `Published · ${when}` : 'Published'
}

/** ISO date → "March 2026". Returns null for missing or unparseable input. */
export function formatDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** "Samanyu Goyal", "A and B", "A, B, and C" — falls back to the lead. */
export function authorLine(project) {
  const names = project.authors?.length ? project.authors : [project.lead]
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}

/**
 * Deterministic hue for a project without a cover image, so the generated
 * cover is stable across renders and distinct between neighbouring cards.
 */
export function coverHue(project) {
  let hash = 0
  for (const ch of project.slug) hash = (hash * 31 + ch.charCodeAt(0)) % 360
  return hash
}
