/* eslint-disable @next/next/no-img-element */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { googleFont } from '@/lib/google-font'
import { getProject, projectSlugs, statusLabel } from '@/lib/projects'

export const alt = 'Collaborative Research Club project note'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }))
}

export default async function ProjectOgImage({ params }) {
  const { slug } = await params
  const project = getProject(slug)
  const title = project?.title ?? 'Project note'
  const topic = project?.topic ?? 'Student research'
  const recordLabel = project ? statusLabel(project) : 'Project note'
  const eyebrow = `CRC · ${recordLabel.toUpperCase()}`
  const footer = 'Collaborative Research Club · California High School'
  const [serif, sans, dragon] = await Promise.all([
    googleFont('Instrument+Serif', title),
    googleFont('IBM+Plex+Sans:wght@500', `${eyebrow} ${topic} ${footer}`),
    readFile(join(process.cwd(), 'public/brand/crc-dragon.png')),
  ])

  const fonts = []
  if (serif) fonts.push({ name: 'Instrument Serif', data: serif, weight: 400 })
  if (sans) fonts.push({ name: 'IBM Plex Sans', data: sans, weight: 500 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#090b10',
          color: '#f2efe8',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: sans ? 'IBM Plex Sans' : 'sans-serif',
              fontSize: 18,
              letterSpacing: 3.2,
              color: '#5a87ff',
            }}
          >
            {eyebrow}
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span
              style={{
                fontFamily: serif ? 'Instrument Serif' : 'serif',
                fontSize: 92,
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: sans ? 'IBM Plex Sans' : 'sans-serif',
                fontSize: 28,
                lineHeight: 1.2,
                color: 'rgba(242,239,232,0.7)',
              }}
            >
              {topic}
            </span>
          </div>

          <span
            style={{
              fontFamily: sans ? 'IBM Plex Sans' : 'sans-serif',
              fontSize: 22,
            }}
          >
            {footer}
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '38%',
            height: '100%',
            background: '#dfe6ff',
          }}
        />

        <img
          src={`data:image/png;base64,${dragon.toString('base64')}`}
          alt=""
          width={430}
          height={393}
          style={{
            position: 'absolute',
            right: -18,
            top: 118,
            objectFit: 'contain',
            opacity: 0.95,
            filter: 'drop-shadow(0 0 38px rgba(30,94,255,0.34))',
          }}
        />
      </div>
    ),
    { ...size, fonts }
  )
}
