import { ImageResponse } from 'next/og'
import { markDataUri } from '@/lib/mark'
import { DISCORD_HANDLE } from '@/lib/data'

export const alt =
  'Apollo Labs — high school students building research, together'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Fetch a font from Google at build time. Returns null on any failure so an
 * offline or blocked build still produces a card, just in the default face.
 */
async function googleFont(query, text) {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`
    const css = await fetch(api, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    }).then((r) => r.text())

    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

const HEADLINE = 'High school students building research, together.'
const WORDMARK = 'Apollo'

export default async function OpengraphImage() {
  const [serif, sans] = await Promise.all([
    googleFont('Instrument+Serif', `${WORDMARK}${HEADLINE}`),
    googleFont('Inter:wght@500', `LABS${DISCORD_HANDLE}Student-ledCollaborativeResearch·`),
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
            'radial-gradient(circle at 78% 22%, rgba(37, 99, 235, 0.22) 0%, transparent 55%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markDataUri({ color: '#ffffff', bead: '#7ea8ff', size: 88 })}
            width={88}
            height={88}
            alt=""
          />
          {/* satori ignores `baseline` alignment, so the qualifier is sat on the
              wordmark's baseline by hand: align the boxes' bottoms, then pad up
              by the difference between the two descenders. */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <span style={{ fontFamily: serifStack, fontSize: 68, letterSpacing: -1 }}>
              {WORDMARK}
            </span>
            <span
              style={{
                fontFamily: sansStack,
                fontSize: 20,
                letterSpacing: 6,
                paddingBottom: 12,
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              LABS
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: serifStack,
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          {HEADLINE}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            fontFamily: sansStack,
            fontSize: 22,
            letterSpacing: 2,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <span>Student-led · Collaborative · Research</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{DISCORD_HANDLE}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
