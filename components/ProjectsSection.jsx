'use client'

import { useCallback, useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import { PROJECT_CATEGORIES, PROJECTS } from '@/lib/data'

const DETAIL_TITLE_ID = 'apollo-project-modal-title'
const LIST_TITLE_ID = 'apollo-project-list-title'

function ProjectDetailModal({ project, onClose }) {
  return (
    <Modal
      open={!!project}
      onClose={onClose}
      labelledBy={DETAIL_TITLE_ID}
      className="apollo-modal-project"
    >
      {project && (
        <>
          <span className="apollo-caption mb-2 block">
            {project.category} · {project.tag}
          </span>
          <h3
            id={DETAIL_TITLE_ID}
            className="text-[clamp(26px,4vw,36px)] font-normal leading-tight tracking-tight mb-1"
          >
            {project.title}
          </h3>
          <p className="text-base font-medium text-[var(--apollo-text-body)] mb-1">
            {project.topic}
          </p>
          <p className="apollo-caption mb-6">Lead: {project.lead}</p>

          <p className="apollo-body-sm leading-relaxed mb-6">{project.overview}</p>

          <p className="apollo-caption mb-3">Standout aspects</p>
          <ul className="apollo-modal-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
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
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={LIST_TITLE_ID}
      className="apollo-modal-list"
    >
      <span className="apollo-caption mb-2 block">All projects</span>
      <h3
        id={LIST_TITLE_ID}
        className="text-[clamp(24px,3.5vw,32px)] font-normal leading-tight tracking-tight mb-6"
      >
        Apollo Labs research
      </h3>

      <div className="apollo-project-filters" role="group" aria-label="Filter by category">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
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
              <span className="apollo-project-list-meta">
                <span className="apollo-caption">{project.category}</span>
                <span className="apollo-caption">{project.tag}</span>
              </span>
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
  const closeAll = useCallback(() => setShowAll(false), [])
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
            aria-haspopup="dialog"
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
              aria-haspopup="dialog"
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
        onClose={closeAll}
        onSelectProject={openProject}
      />
    </section>
  )
}
