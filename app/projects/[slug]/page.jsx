import Link from 'next/link'
import { notFound } from 'next/navigation'
import CRCMark from '@/components/CRCMark'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { DISCORD_URL } from '@/lib/data'
import {
  authorLine,
  formatDate,
  getProject,
  isPublished,
  projectSlugs,
  statusLabel,
} from '@/lib/projects'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const description = project.overview ?? project.description

  return {
    title: `${project.title}: ${project.topic}`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title}: ${project.topic}`,
      description,
      url: `${SITE_URL}/projects/${project.slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title}: ${project.topic}`,
      description,
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const published = isPublished(project)
  const evidence = project.evidence
  const detail = project.detail
  const contributors = project.authors?.length ? project.authors : [project.lead]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': published ? 'ScholarlyArticle' : 'CreativeWork',
    name: `${project.title}: ${project.topic}`,
    description: project.overview,
    url: `${SITE_URL}/projects/${project.slug}`,
    contributor: contributors.map((name) => ({ '@type': 'Person', name })),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    ...(project.paper?.published && { datePublished: project.paper.published }),
  }

  return (
    <div className="crc-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Nav />

      <main id="main" className="crc-project-page">
        <article className="crc-page-frame crc-project-record">
          <Link href="/#projects" className="crc-project-back">
            <span aria-hidden>←</span>
            All project notes
          </Link>

          <header className="crc-project-hero">
            <div className="crc-project-hero-copy">
              <div className="crc-project-hero-meta">
                <span>{project.category}</span>
                <span>{statusLabel(project)}</span>
              </div>
              <h1>{project.title}</h1>
              <p className="crc-project-hero-topic">{project.topic}</p>
              <p className="crc-project-hero-question">{project.question}</p>
            </div>

            <div className="crc-project-hero-mark" aria-hidden="true">
              <CRCMark priority sizes="(max-width: 767px) 72vw, 420px" />
            </div>
          </header>

          <dl className="crc-project-record-facts">
            <div>
              <dt>Project lead</dt>
              <dd>{project.lead}</dd>
            </div>
            <div>
              <dt>Current work</dt>
              <dd>{project.currentWork}</dd>
            </div>
            <div>
              <dt>Last verified</dt>
              <dd>{evidence.lastUpdated ?? 'Not listed'}</dd>
            </div>
            <div>
              <dt>Results</dt>
              <dd>{evidence.resultsStatus}</dd>
            </div>
          </dl>

          {project.boundary && (
            <aside className="crc-project-record-boundary">
              <span>Research boundary</span>
              <p>{project.boundary}</p>
            </aside>
          )}

          <div className="crc-project-record-grid">
            <section aria-labelledby="project-summary">
              <p className="crc-eyebrow">Project summary</p>
              <h2 id="project-summary">What the current note says</h2>
              <p className="crc-project-record-lede">{project.overview}</p>
            </section>

            <aside className="crc-evidence-panel" aria-labelledby="public-evidence">
              <p className="crc-eyebrow">Evidence record</p>
              <h2 id="public-evidence">What is public right now</h2>
              <dl>
                <div>
                  <dt>Sources</dt>
                  <dd>
                    {evidence.sources?.length
                      ? `${evidence.sources.length} linked`
                      : 'Not linked'}
                  </dd>
                </div>
                <div>
                  <dt>Code</dt>
                  <dd>{evidence.codeUrl ? 'Linked' : 'Not linked'}</dd>
                </div>
                <div>
                  <dt>Data</dt>
                  <dd>{evidence.dataStatus}</dd>
                </div>
                <div>
                  <dt>Results</dt>
                  <dd>{evidence.resultsStatus}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {detail?.methods?.length > 0 && (
            <section className="crc-record-section" aria-labelledby="project-methods">
              <p className="crc-eyebrow">Method areas</p>
              <h2 id="project-methods">Work named in the project note</h2>
              <ul className="crc-method-list">
                {detail.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="crc-project-sections">
            {detail?.sections?.map((section, index) => (
              <section key={section.heading} className="crc-record-section">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>

          {published && (
            <section className="crc-record-section" aria-labelledby="published-paper">
              <p className="crc-eyebrow">Published paper</p>
              <h2 id="published-paper">Full record</h2>
              <p>
                Published {formatDate(project.paper.published)} by{' '}
                {authorLine(project)}.
              </p>
              <a
                href={project.paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="crc-button crc-button-primary"
              >
                Open the PDF <span aria-hidden>↗</span>
              </a>
            </section>
          )}

          <aside className="crc-project-discord">
            <div>
              <p className="crc-eyebrow">CRC updates</p>
              <h2>Announcements and events</h2>
              <p>Join the Discord for announcements and events.</p>
            </div>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="crc-button crc-button-light"
            >
              Join the Discord <span aria-hidden>↗</span>
            </a>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  )
}
