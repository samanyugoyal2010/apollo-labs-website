/* eslint-disable @next/next/no-img-element */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { googleFont } from '@/lib/google-font'

export const alt =
  'Collaborative Research Club at California High School'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

export default async function OpengraphImage() {
  const eyebrow = 'COLLABORATIVE RESEARCH CLUB · CAL HIGH'
  const firstLine = 'Bring a question.'
  const secondLine = 'Build the record.'
  const footer = 'Student-led research at California High School'
  const [serif, sans, dragon] = await Promise.all([
    googleFont('Instrument+Serif', `${firstLine} ${secondLine}`),
    googleFont('IBM+Plex+Sans:wght@500', `${eyebrow} ${footer}`),
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
          background: '#f2efe8',
          color: '#090b10',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            width: '61%',
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
              color: '#1e5eff',
            }}
          >
            {eyebrow}
          </span>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: serif ? 'Instrument Serif' : 'serif',
                fontSize: 86,
                lineHeight: 0.92,
                letterSpacing: -2,
              }}
            >
              {firstLine}
            </span>
            <span
              style={{
                fontFamily: serif ? 'Instrument Serif' : 'serif',
                fontSize: 86,
                lineHeight: 0.92,
                letterSpacing: -2,
                color: '#1e5eff',
              }}
            >
              {secondLine}
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

        <img
          src={`data:image/png;base64,${dragon.toString('base64')}`}
          alt=""
          width={560}
          height={512}
          style={{
            position: 'absolute',
            right: -52,
            top: 58,
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    { ...size, fonts }
  )
}
