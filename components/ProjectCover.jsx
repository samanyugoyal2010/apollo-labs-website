import ApolloMark from '@/components/ApolloMark'
import { coverHue } from '@/lib/papers'

/**
 * A project's cover art. Uses the supplied image when there is one; otherwise
 * draws a deterministic gradient behind the mark, so a gallery of papers with
 * no figures yet still reads as designed rather than as missing images.
 */
export default function ProjectCover({ project, className = '', priority = false }) {
  const hue = coverHue(project)

  return (
    <div
      className={`apollo-cover ${className}`}
      style={{ '--apollo-cover-hue': hue }}
      aria-hidden={!project.cover}
    >
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover}
          alt={`Cover figure for ${project.title}`}
          className="apollo-cover-image"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <>
          <span className="apollo-cover-wash" />
          <span className="apollo-cover-grid" />
          <ApolloMark className="apollo-cover-mark" />
        </>
      )}
    </div>
  )
}
