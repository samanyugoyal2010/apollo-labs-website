/** Linked C forms for Collaborative Research Club, rendered in a 40x40 box. */
export const OUTER_C = 'M29 9.5 C26.6 7.8 23.7 7 20.5 7 C13 7 7 12.8 7 20 C7 27.2 13 33 20.5 33 C23.7 33 26.6 32.2 29 30.5'
export const INNER_C = 'M31.5 14 C29.9 12.8 28 12.2 25.8 12.2 C21.2 12.2 17.5 15.6 17.5 20 C17.5 24.4 21.2 27.8 25.8 27.8 C28 27.8 29.9 27.2 31.5 26'
export const NODE = { cx: 31.5, cy: 20, r: 2.4 }
export const INK_CENTER = { x: 19.25, y: 20 }
export const OUTER_WIDTH = 4.2
export const INNER_WIDTH = 3

/**
 * The box the ink actually occupies inside the 40x40 viewBox, derived from the
 * geometry rather than measured, so it stays correct if the shape moves.
 *
 * The mark sits well inside its viewBox — deliberately, so it can be dropped
 * next to text without extra spacing. Standalone raster assets want the
 * opposite, so `tightViewBox()` crops to the ink with a controlled margin.
 */
export function inkBounds(strokeWidth = OUTER_WIDTH) {
  return {
    minX: 7 - strokeWidth / 2,
    maxX: NODE.cx + NODE.r,
    minY: 7 - strokeWidth / 2,
    maxY: 33 + strokeWidth / 2,
  }
}

/** A square viewBox cropped to the ink, with `margin` as a fraction of the side. */
export function tightViewBox({ strokeWidth = OUTER_WIDTH, margin = 0.06 } = {}) {
  const { minX, minY, maxX, maxY } = inkBounds(strokeWidth)
  const side = Math.max(maxX - minX, maxY - minY) * (1 + margin * 2)
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  return `${cx - side / 2} ${cy - side / 2} ${side} ${side}`
}

/**
 * The mark as a standalone SVG string, for the contexts that cannot render a
 * React component — social cards, app icons, anything going through satori.
 *
 * `tile` draws a rounded background square behind the mark and scales the mark
 * to sit inside it; omit it for a transparent, unpadded mark.
 */
export function markSvg({
  color = '#0a0a0a',
  bead = '#2563eb',
  strokeWidth = OUTER_WIDTH,
  tile = null,
  size = 40,
  width = size,
  height = size,
  viewBox = '0 0 40 40',
} = {}) {
  const outer = `<path d="${OUTER_C}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" fill="none"/>`
  const inner = `<path d="${INNER_C}" stroke="${color}" stroke-width="${INNER_WIDTH}" stroke-linecap="round" fill="none"/>`
  const dot = `<circle cx="${NODE.cx}" cy="${NODE.cy}" r="${NODE.r}" fill="${bead}"/>`
  const art = outer + inner + dot

  if (!tile) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" fill="none">${art}</svg>`
  }

  const { background = '#0a0a0a', radius = 9, scale = 0.82 } = tile
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="${radius}" fill="${background}"/><g transform="translate(20 20) scale(${scale}) translate(${-INK_CENTER.x} ${-INK_CENTER.y})">${art}</g></svg>`
}

/** The same SVG as a data URI, which is how satori accepts images. */
export function markDataUri(options) {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(options)).toString('base64')}`
}
