import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProjectCover from '@/components/ProjectCover'
import { DISCORD_URL } from '@/lib/data'
import {
  authorLine,
  formatDate,
  getProject,
  isPublished,
  projectSlugs,
  statusLabel,
} from '@/lib/papers'
import { SITE_NAME, SITE_URL } from '@/lib/site'

/** Every project is known at build time, so the pages ship as static HTML. */
export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const description = project.overview ?? project.description

  return {
    title: `${project.title} — ${project.topic}`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${project.topic}`,
      description,
      url: `${SITE_URL}/projects/${project.slug}`,
      siteName: SITE_NAME,
      authors: project.authors ?? [project.lead],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${project.topic}`,
      description,
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const detail = project.detail
  const published = isPublished(project)
  const authors = project.authors ?? [project.lead]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': published ? 'ScholarlyArticle' : 'CreativeWork',
    headline: `${project.title} — ${project.topic}`,
    abstract: project.overview,
    url: `${SITE_URL}/projects/${project.slug}`,
    author: authors.map((name) => ({ '@type': 'Person', name })),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    ...(project.paper?.published && { datePublished: project.paper.published }),
  }

  return (
    <div className="apollo-site min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Nav />

      <main id="main" className="apollo-home apollo-paper">
        <article className="apollo-paper-container">
          <Link href="/#projects" className="apollo-paper-back">
            <span aria-hidden>←</span> Back to the gallery
          </Link>

          <header className="apollo-paper-header">
            <div className="apollo-paper-meta">
              <span className="apollo-caption">{project.category}</span>
              <span
                className={`apollo-status-pill ${
                  published ? 'apollo-status-pill-published' : ''
                }`}
              >
                {statusLabel(project)}
              </span>
            </div>

            <h1 className="apollo-paper-title">{project.title}</h1>
            <p className="apollo-paper-topic">{project.topic}</p>

            <p className="apollo-paper-authors">{authorLine(project)}</p>
            <p className="apollo-paper-affiliation">
              {SITE_NAME}
              {project.paper?.published &&
                ` · ${formatDate(project.paper.published)}`}
            </p>

            {published && (
              <div className="apollo-paper-actions">
                <a
                  href={project.paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apollo-hero-cta"
                >
                  Download the PDF <span aria-hidden>↓</span>
                </a>
                {project.paper.doi && (
                  <a
                    href={`https://doi.org/${project.paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apollo-link text-sm font-medium"
                  >
                    doi:{project.paper.doi}
                  </a>
                )}
              </div>
            )}
          </header>

          <ProjectCover project={project} className="apollo-paper-cover" priority />

          <section className="apollo-paper-abstract" aria-labelledby="abstract">
            <h2 id="abstract" className="apollo-paper-heading">
              Abstract
            </h2>
            <p className="apollo-paper-lede">{project.overview}</p>
          </section>

          {project.highlights?.length > 0 && (
            <section className="apollo-paper-section" aria-labelledby="contributions">
              <h2 id="contributions" className="apollo-paper-heading">
                Contributions
              </h2>
              <ul className="apollo-paper-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {detail?.methods?.length > 0 && (
            <section className="apollo-paper-section" aria-labelledby="methods">
              <h2 id="methods" className="apollo-paper-heading">
                Methods
              </h2>
              <ul className="apollo-project-methods">
                {detail.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </section>
          )}

          {detail?.sections?.map((section) => (
            <section key={section.heading} className="apollo-paper-section">
              <h2 className="apollo-paper-heading">{section.heading}</h2>
              <p className="apollo-paper-body">{section.body}</p>
            </section>
          ))}

          {published && (
            <section className="apollo-paper-section" aria-labelledby="full-text">
              <h2 id="full-text" className="apollo-paper-heading">
                Full text
              </h2>
              <p className="apollo-paper-body mb-6">
                The complete paper — figures, tables, and references included — is
                available as a PDF.
              </p>
              <object
                data={project.paper.pdf}
                type="application/pdf"
                className="apollo-paper-pdf"
                aria-label={`${project.title} full paper`}
              >
                <p className="apollo-paper-body">
                  Your browser can&apos;t display the PDF inline.{' '}
                  <a
                    href={project.paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apollo-link"
                  >
                    Open it in a new tab →
                  </a>
                </p>
              </object>
            </section>
          )}

          <aside className="apollo-paper-cta">
            <h2 className="apollo-paper-cta-title">
              {detail?.contribute ? 'Working on this' : 'Want to work on this?'}
            </h2>
            {detail?.contribute && (
              <p className="apollo-paper-body mb-5">{detail.contribute}</p>
            )}
            <div className="apollo-paper-cta-actions">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apollo-hero-cta"
              >
                Join the Discord <span aria-hidden>→</span>
              </a>
              <Link href="/#submit" className="apollo-link text-sm font-medium">
                Publish your own research →
              </Link>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  )
}
