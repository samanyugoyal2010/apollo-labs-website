import { ImageResponse } from 'next/og'
import { markSvg } from '@/lib/mark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Home-screen icon. iOS ignores transparency and squares off the corners
// itself, so the tile is drawn edge to edge with no radius of its own.
export default function AppleIcon() {
  const svg = markSvg({
    color: '#ffffff',
    bead: '#5b8dff',
    strokeWidth: 3,
    size: 180,
    tile: { background: '#0a0a0a', radius: 0, scale: 0.8 },
  })

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`}
          width={180}
          height={180}
          alt=""
        />
      </div>
    ),
    size
  )
}
