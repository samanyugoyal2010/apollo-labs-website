import { ImageResponse } from 'next/og'
import { markDataUri } from '@/lib/mark'
import { googleFont } from '@/lib/google-font'
import { authorLine, getProject, projectSlugs, statusLabel } from '@/lib/papers'

export const alt = 'Apollo Labs research'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

/** Satori has no text-overflow, so long titles get trimmed by hand. */
function clamp(text, max) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

export default async function ProjectOgImage({ params }) {
  const { slug } = await params
  const project = getProject(slug)

  const title = clamp(project?.title ?? 'Apollo Labs', 40)
  const topic = clamp(project?.topic ?? 'Student-led research', 70)
  const byline = project ? authorLine(project) : 'Apollo Labs'
  const status = project ? statusLabel(project) : 'Research'

  const [serif, sans] = await Promise.all([
    googleFont('Instrument+Serif', `Apollo${title}${topic}`),
    googleFont('Inter:wght@500', `LABS${byline}${status}·`),
  ])

  const fonts = []
  if (serif) fonts.push({ name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 })
  if (sans) fonts.push({ name: 'Inter', data: sans, style: 'normal', weight: 500 })

  const serifStack = serif ? 'Instrument Serif' : 'serif'
  const sansStack = sans ? 'Inter' : 'sans-serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(37, 99, 235, 0.24) 0%, transparent 55%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markDataUri({ color: '#ffffff', bead: '#7ea8ff', size: 56 })}
            width={56}
            height={56}
            alt=""
          />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <span style={{ fontFamily: serifStack, fontSize: 42, letterSpacing: -0.5 }}>
              Apollo
            </span>
            <span
              style={{
                fontFamily: sansStack,
                fontSize: 14,
                letterSpacing: 4,
                paddingBottom: 8,
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              LABS
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span
            style={{
              fontFamily: sansStack,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'rgba(126, 168, 255, 0.9)',
            }}
          >
            {status}
          </span>
          <span
            style={{
              fontFamily: serifStack,
              fontSize: 72,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: sansStack,
              fontSize: 30,
              lineHeight: 1.3,
              maxWidth: 900,
              color: 'rgba(255, 255, 255, 0.72)',
            }}
          >
            {topic}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 26,
            borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            fontFamily: sansStack,
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <span>{byline}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Apollo Labs</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
