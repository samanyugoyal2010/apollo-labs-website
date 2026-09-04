/* eslint-disable @next/next/no-img-element */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'
export const runtime = 'nodejs'

export default async function Icon() {
  const dragon = await readFile(join(process.cwd(), 'public/brand/crc-dragon.png'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f2efe8',
        }}
      >
        <img
          src={`data:image/png;base64,${dragon.toString('base64')}`}
          alt=""
          width={44}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    size
  )
}
