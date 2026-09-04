import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
import { projectHref, statusLabel } from '@/lib/projects'

export default function ProjectsSection() {
  return (
    <section id="projects" className="crc-projects" data-scene="projects">
      <div className="crc-page-frame">
        <div className="crc-section-heading">
          <p className="crc-eyebrow">Current work</p>
          <h2>Project notes, stated plainly.</h2>
          <p>
            These are working records, not published findings. No listed project
            currently reports a result, public dataset, or paper on this site.
          </p>
        </div>

        <ul className="crc-project-list">
          {PROJECTS.map((project, index) => {
            const evidence = project.evidence

            return (
              <li key={project.id} className="crc-project-item">
                <Link
                  href={projectHref(project)}
                  className="crc-project-link"
                  aria-label={`Open ${project.title} project note`}
                >
                  <div className="crc-project-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <article className="crc-project-card">
                    <header className="crc-project-header">
                      <div>
                        <p className="crc-project-category">{project.category}</p>
                        <h3>{project.title}</h3>
                        <p className="crc-project-topic">{project.topic}</p>
                      </div>
                      <span className="crc-record-pill">{statusLabel(project)}</span>
                    </header>

                    <p className="crc-project-question">{project.question}</p>

                    <dl className="crc-project-facts">
                      <div>
                        <dt>Lead</dt>
                        <dd>{project.lead}</dd>
                      </div>
                      <div>
                        <dt>Current work</dt>
                        <dd>{project.currentWork}</dd>
                      </div>
                      <div>
                        <dt>Results</dt>
                        <dd>{evidence.resultsStatus}</dd>
                      </div>
                      <div>
                        <dt>Last verified</dt>
                        <dd>{evidence.lastUpdated ?? 'Not listed'}</dd>
                      </div>
                    </dl>

                    {project.boundary && (
                      <p className="crc-project-boundary">{project.boundary}</p>
                    )}

                    <span className="crc-project-action">
                      Open project note
                      <span aria-hidden>↗</span>
                    </span>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
