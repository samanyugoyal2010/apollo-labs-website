'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { PROJECT_CATEGORIES, PROJECTS } from '@/lib/data'

function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="apollo-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`apollo-modal ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button type="button" className="apollo-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null

  return (
    <Modal open={!!project} onClose={onClose} className="apollo-modal-project">
      <span className="apollo-caption mb-2 block">
        {project.category} · {project.tag}
      </span>
      <h3 className="text-[clamp(26px,4vw,36px)] font-normal leading-tight tracking-tight mb-1">
        {project.title}
      </h3>
      <p className="text-base font-medium text-[var(--apollo-text-body)] mb-1">{project.topic}</p>
      <p className="apollo-caption mb-6">Lead: {project.lead}</p>

      <p className="apollo-body-sm leading-relaxed mb-6">{project.overview}</p>

      <p className="apollo-caption mb-3">Standout aspects</p>
      <ul className="apollo-modal-highlights">
        {project.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Modal>
  )
}

function AllProjectsModal({ open, onClose, onSelectProject }) {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    if (category === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.category === category)
  }, [category])

  return (
    <Modal open={open} onClose={onClose} className="apollo-modal-list">
      <span className="apollo-caption mb-2 block">All projects</span>
      <h3 className="text-[clamp(24px,3.5vw,32px)] font-normal leading-tight tracking-tight mb-6">
        Apollo Labs research
      </h3>

      <div className="apollo-project-filters" role="tablist" aria-label="Filter by category">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            className={`apollo-project-filter ${category === cat ? 'apollo-project-filter-active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="apollo-project-list">
        {filtered.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="apollo-project-list-item"
              onClick={() => {
                onClose()
                onSelectProject(project)
              }}
            >
              <div className="apollo-project-list-meta">
                <span className="apollo-caption">{project.category}</span>
                <span className="apollo-caption">{project.tag}</span>
              </div>
              <span className="apollo-project-list-title">{project.title}</span>
              <span className="apollo-project-list-topic">{project.topic}</span>
              <span className="apollo-project-list-lead">Lead: {project.lead}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="apollo-project-coming-soon">More projects coming soon.</p>
    </Modal>
  )
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const closeDetail = useCallback(() => setSelectedProject(null), [])
  const openProject = useCallback((project) => setSelectedProject(project), [])

  return (
    <section id="projects" className="apollo-section apollo-projects-section">
      <div className="apollo-container">
        <div className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-4">
          <div>
            <span className="apollo-caption mb-4 block">Projects</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-tight">
              Current work
            </h2>
          </div>
          <button
            type="button"
            className="apollo-link text-sm font-medium text-left sm:text-right"
            onClick={() => setShowAll(true)}
          >
            All projects →
          </button>
        </div>

        <div className="apollo-cards-row">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              className="apollo-card-vertical apollo-project-card text-left w-full"
              onClick={() => openProject(project)}
            >
              <p className="apollo-caption mb-3 text-[var(--apollo-text-faint)]">
                {project.tag} · Lead: {project.lead}
              </p>
              <h3 className="mb-2 text-xl font-normal leading-snug tracking-tight text-[var(--apollo-text)]">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-[var(--apollo-text-body)] mb-3">
                {project.topic}
              </p>
              <p className="apollo-body-sm leading-relaxed flex-1">{project.description}</p>
              <span className="apollo-project-card-hint mt-4 text-sm text-[var(--apollo-text-faint)]">
                Tap to explore →
              </span>
            </button>
          ))}
        </div>

        <p className="apollo-more-soon">More Coming Soon!</p>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={closeDetail} />
      <AllProjectsModal
        open={showAll}
        onClose={() => setShowAll(false)}
        onSelectProject={openProject}
      />
    </section>
  )
}
