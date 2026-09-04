import { PROJECTS } from '@/lib/data'

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug) ?? null
}

export function projectSlugs() {
  return PROJECTS.map((project) => project.slug)
}

export function projectHref(project) {
  return `/projects/${project.slug}`
}

export function isPublished(project) {
  return Boolean(project.paper?.pdf)
}

export function statusLabel(project) {
  if (!isPublished(project)) {
    return project.evidence?.recordLabel ?? project.stage ?? 'In progress'
  }

  const published = formatDate(project.paper.published)
  return published ? `Published, ${published}` : 'Published'
}

export function formatDate(iso) {
  if (!iso) return null

  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function authorLine(project) {
  const names = project.authors?.length ? project.authors : [project.lead]
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}
