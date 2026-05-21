import Link from 'next/link'
import { PROJECTS } from '@/lib/data'

export default function ProjectsSection() {
  return (
    <section id="projects" className="apollo-section">
      <div className="apollo-container py-12 md:py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="apollo-caption mb-4 block">Projects</span>
            <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight">
              Current work
            </h2>
          </div>
          <Link href="#" className="apollo-link text-sm font-medium">
            All projects →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="apollo-project-card text-left"
            >
              <p className="apollo-caption mb-3 text-[var(--apollo-text-faint)]">
                {project.tag} · {project.date}
              </p>
              <h3 className="mb-3 text-xl font-normal leading-snug tracking-tight text-[var(--apollo-text)]">
                {project.title}
              </h3>
              <p className="apollo-body-sm leading-relaxed">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
