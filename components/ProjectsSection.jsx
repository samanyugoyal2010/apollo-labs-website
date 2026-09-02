'use client'

import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import ProjectCover from '@/components/ProjectCover'
import { PROJECT_CATEGORIES, PROJECTS } from '@/lib/data'
import { authorLine, isPublished, projectHref, statusLabel } from '@/lib/papers'

const PREVIEW_TITLE_ID = 'apollo-project-preview-title'

/**
 * The gallery card: cover, field, title, authors, status. Opens the preview
 * rather than navigating, so a reader can skim abstracts without losing the
 * page — the full write-up is one more click, at its own URL.
 */
function ProjectCard({ project, onOpen, priority }) {
  return (
    <li className="apollo-gallery-item">
      <button
        type="button"
        className="apollo-gallery-card"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
      >
        <ProjectCover project={project} priority={priority} />

        <span className="apollo-gallery-body">
          <span className="apollo-gallery-meta">
            <span className="apollo-caption">{project.category}</span>
            <span
              className={`apollo-status-pill ${
                isPublished(project) ? 'apollo-status-pill-published' : ''
              }`}
            >
              {statusLabel(project)}
            </span>
          </span>

          <span className="apollo-gallery-title">{project.title}</span>
          <span className="apollo-gallery-topic">{project.topic}</span>
          <span className="apollo-gallery-authors">{authorLine(project)}</span>
          <span className="apollo-gallery-abstract">{project.description}</span>

          <span className="apollo-gallery-hint">Read the abstract →</span>
        </span>
      </button>
    </li>
  )
}

/** Abstract-level preview. "Read the full paper" leaves for the project page. */
function ProjectPreviewModal({ project, onClose }) {
  return (
    <Modal
      open={!!project}
      onClose={onClose}
      labelledBy={PREVIEW_TITLE_ID}
      className="apollo-modal-project"
    >
      {project && (
        <>
          <span className="apollo-caption mb-2 block">
            {project.category} · {statusLabel(project)}
          </span>
          <h3
            id={PREVIEW_TITLE_ID}
            className="text-[clamp(26px,4vw,36px)] font-normal leading-tight tracking-tight mb-1"
          >
            {project.title}
          </h3>
          <p className="text-base font-medium text-[var(--apollo-text-body)] mb-1">
            {project.topic}
          </p>
          <p className="apollo-caption mb-6">{authorLine(project)}</p>

          <p className="apollo-caption mb-2">Abstract</p>
          <p className="apollo-body-sm leading-relaxed mb-6">{project.overview}</p>

          <p className="apollo-caption mb-3">Standout aspects</p>
          <ul className="apollo-modal-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="apollo-preview-actions">
            <Link href={projectHref(project)} className="apollo-hero-cta">
              {isPublished(project) ? 'Read the full paper' : 'Read the full write-up'}
              <span aria-hidden> →</span>
            </Link>
            {isPublished(project) && (
              <a
                href={project.paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="apollo-link text-sm font-medium"
              >
                Download PDF ↓
              </a>
            )}
          </div>
        </>
      )}
    </Modal>
  )
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('All')

  const close = useCallback(() => setSelected(null), [])
  const open = useCallback((project) => setSelected(project), [])

  const shown = useMemo(
    () =>
      category === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === category),
    [category]
  )

  return (
    <section id="projects" className="apollo-section apollo-projects-section">
      <div className="apollo-container">
        <div className="mb-8 md:mb-10">
          <span className="apollo-caption mb-4 block">Projects</span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4">
            The research gallery
          </h2>
          <p className="apollo-body max-w-xl">
            Every Apollo Labs project lives here — open one for the abstract, then read
            the full write-up on its own page.{' '}
            <a href="#submit" className="apollo-link">
              Finished something of your own?
            </a>
          </p>
        </div>

        <div
          className="apollo-project-filters mb-8"
          role="group"
          aria-label="Filter by field"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              className={`apollo-project-filter ${
                category === cat ? 'apollo-project-filter-active' : ''
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {shown.length > 0 ? (
          <ul className="apollo-gallery-grid">
            {shown.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={open}
                priority={i < 3}
              />
            ))}
          </ul>
        ) : (
          <p className="apollo-gallery-empty">
            Nothing published in {category} yet — it could be yours.{' '}
            <a href="#submit" className="apollo-link">
              Submit a paper →
            </a>
          </p>
        )}

        <p className="apollo-more-soon">More Coming Soon!</p>
      </div>

      <ProjectPreviewModal project={selected} onClose={close} />
    </section>
  )
}
