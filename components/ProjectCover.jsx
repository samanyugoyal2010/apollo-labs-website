import CRCMark from '@/components/CRCMark'
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
      className={`crc-cover ${className}`}
      style={{ '--crc-cover-hue': hue }}
      aria-hidden={!project.cover}
    >
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover}
          alt={`Cover figure for ${project.title}`}
          className="crc-cover-image"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <>
          <span className="crc-cover-wash" />
          <span className="crc-cover-grid" />
          <CRCMark className="crc-cover-mark" />
        </>
      )}
    </div>
  )
}
