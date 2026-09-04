/**
 * Renders the raster logo set into `public/`.
 *
 *   npm run logos
 *
 * PNGs are generated rather than hand-exported so they stay derived from the
 * geometry in `lib/mark.js` — change the shape there, re-run this, and every
 * raster asset follows.
 *
 * Rendering goes through `next/og` (satori + resvg), which already ships with
 * Next, so this needs no extra dependency. It is also the only rasterizer here
 * that can embed Instrument Serif and Inter: a generic SVG converter would set
 * the wordmark in whatever serif the OS happens to have.
 */
import { createElement as h } from 'react'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
// `next/og.js`, not `next/og`: Next resolves the bare specifier through its
// bundler, but plain Node ESM needs the extension.
import { ImageResponse } from 'next/og.js'
import { markDataUri, tightViewBox } from '../lib/mark.js'
import { googleFont } from '../lib/google-font.js'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const INK = '#0a0a0a'
const LIGHT = '#ffffff'
const BEAD_ON_LIGHT = '#2563eb'
const BEAD_ON_DARK = '#7ea8ff'

// Proportions follow the site's nav lockup: the mark's *ink* height matches the
// wordmark's cap height. The mark is drawn on its tight viewBox here, where the
// ink fills ~71% of the box, so the box is sized up to compensate — on the full
// 40x40 viewBox the mark reads small and sits low against large type.
const TYPE = 120
const CAP_HEIGHT = 0.77 // Instrument Serif cap height, as a fraction of the em
const INK_IN_BOX = 0.711 // ink height within the tight viewBox
const MARK = Math.round((TYPE * CAP_HEIGHT) / INK_IN_BOX)
const SUFFIX = 40

/** Mark + "Apollo" + "LABS", laid out like `components/ApolloLogo.jsx`. */
function lockup({ color, bead, serif, sans }) {
  return h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 46,
        color,
      },
    },
    h('img', {
      src: markDataUri({
        color,
        bead,
        width: MARK,
        height: MARK,
        viewBox: tightViewBox(),
      }),
      width: MARK,
      height: MARK,
    }),
    // satori ignores `baseline`, so the qualifier is sat on the wordmark's
    // baseline by hand: align box bottoms, then pad up by the descender delta.
    h(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end', gap: 26 } },
      h(
        'span',
        { style: { fontFamily: serif, fontSize: TYPE, letterSpacing: -1.5 } },
        'Apollo'
      ),
      h(
        'span',
        {
          style: {
            fontFamily: sans,
            fontSize: SUFFIX,
            letterSpacing: 9,
            paddingBottom: 20,
            opacity: 0.45,
          },
        },
        'LABS'
      )
    )
  )
}

/** A bare mark, cropped to its ink so the asset has no dead margin. */
function markOnly({ color, bead, size }) {
  return h(
    'div',
    {
      style: { width: '100%', height: '100%', display: 'flex' },
    },
    h('img', {
      src: markDataUri({
        color,
        bead,
        width: size,
        height: size,
        viewBox: tightViewBox(),
      }),
      width: size,
      height: size,
    })
  )
}

/** The mark on its dark rounded tile — app stores, Discord, org avatars. */
function tile({ size }) {
  return h(
    'div',
    { style: { width: '100%', height: '100%', display: 'flex' } },
    h('img', {
      src: markDataUri({
        color: LIGHT,
        bead: '#5b8dff',
        ringWidth: 3,
        width: size,
        height: size,
        tile: { background: INK, radius: 9, scale: 0.82 },
      }),
      width: size,
      height: size,
    })
  )
}

async function render(name, element, size, fonts) {
  const png = Buffer.from(
    await new ImageResponse(element, { ...size, fonts }).arrayBuffer()
  )
  await writeFile(join(OUT, name), png)
  console.log(
    `  ${name.padEnd(16)} ${String(size.width).padStart(4)}x${String(size.height).padEnd(4)}  ${(png.length / 1024).toFixed(1)} kB`
  )
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const [serifData, sansData] = await Promise.all([
    googleFont('Instrument+Serif', 'Apollo'),
    googleFont('Inter:wght@500', 'LABS'),
  ])

  if (!serifData || !sansData) {
    console.warn(
      'Could not fetch brand fonts from Google — the wordmark will fall back to\n' +
        'a system face. Check the network and re-run before committing logo.png.'
    )
  }

  const fonts = []
  if (serifData) {
    fonts.push({ name: 'Instrument Serif', data: serifData, style: 'normal', weight: 400 })
  }
  if (sansData) {
    fonts.push({ name: 'Inter', data: sansData, style: 'normal', weight: 500 })
  }

  const serif = serifData ? 'Instrument Serif' : 'serif'
  const sans = sansData ? 'Inter' : 'sans-serif'

  // Sized to the drawn lockup plus ~5% clear space, so the file has no dead
  // margin to crop out when it is dropped into a deck or a README.
  const lockupSize = { width: 680, height: 190 }
  const square = { width: 512, height: 512 }

  console.log('Writing logo assets to public/')

  await render(
    'logo.png',
    lockup({ color: INK, bead: BEAD_ON_LIGHT, serif, sans }),
    lockupSize,
    fonts
  )
  await render(
    'logo-light.png',
    lockup({ color: LIGHT, bead: BEAD_ON_DARK, serif, sans }),
    lockupSize,
    fonts
  )
  await render(
    'mark.png',
    markOnly({ color: INK, bead: BEAD_ON_LIGHT, size: square.width }),
    square,
    fonts
  )
  await render(
    'mark-light.png',
    markOnly({ color: LIGHT, bead: BEAD_ON_DARK, size: square.width }),
    square,
    fonts
  )
  await render('icon.png', tile({ size: square.width }), square, fonts)
}

await main()
