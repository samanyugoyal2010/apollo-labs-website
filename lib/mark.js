/**
 * Apollo Labs mark — the single source of geometry.
 *
 * "The orbit completes the A": the chevron is the letter, and the tilted ring
 * sweeping through it is at once the crossbar, an orbit, and a trajectory. The
 * ring passes in front of the left leg and behind the right one, so the two
 * forms read as one woven object rather than a letter with a circle around it.
 *
 * Everything that draws the mark — the React component, the social card, the
 * app icon — pulls from here, so a change to the shape lands everywhere at once.
 * Rendered in a 40x40 box.
 */

// Flat-cut apex, flat feet, inner vertex at (20, 12.62).
export const CHEVRON =
  'M6.7 32 L17.7 7.5 L22.3 7.5 L33.3 32 L28.7 32 L20 12.62 L11.3 32 Z'

// The ring, tilted so it ascends to the right.
export const RING = { cx: 20, cy: 21, rx: 14, ry: 5, rotate: -14 }

// The one slice of ring drawn on top of the chevron — the weave point, where
// the ring crosses the left leg. Same curve and width as the ring underneath,
// so it seams in invisibly.
export const WEAVE = 'M12.16 18.49 A14 5 -14 0 1 20.46 15.77'

// The bead caps the low end of the orbit, so the trajectory reads as ascending
// away from it. Drawn last, over the ring's terminus.
export const BEAD = { cx: 6.42, cy: 24.39, r: 2.3 }

// Where the ink actually sits inside the 40x40 box. Used to optically center
// the mark when it is placed on a tile, since the bead pulls it left.
export const INK_CENTER = { x: 19.3, y: 19.75 }

export const RING_WIDTH = 2.5

/**
 * The box the ink actually occupies inside the 40x40 viewBox, derived from the
 * geometry rather than measured, so it stays correct if the shape moves.
 *
 * The mark sits well inside its viewBox — deliberately, so it can be dropped
 * next to text without extra spacing. Standalone raster assets want the
 * opposite, so `tightViewBox()` crops to the ink with a controlled margin.
 */
export function inkBounds(ringWidth = RING_WIDTH) {
  const rad = (RING.rotate * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  // Half-extents of a rotated ellipse, plus half the stroke.
  const halfW = Math.hypot(RING.rx * cos, RING.ry * sin) + ringWidth / 2
  const halfH = Math.hypot(RING.rx * sin, RING.ry * cos) + ringWidth / 2

  return {
    minX: Math.min(6.7, RING.cx - halfW, BEAD.cx - BEAD.r),
    maxX: Math.max(33.3, RING.cx + halfW, BEAD.cx + BEAD.r),
    minY: Math.min(7.5, RING.cy - halfH, BEAD.cy - BEAD.r),
    maxY: Math.max(32, RING.cy + halfH, BEAD.cy + BEAD.r),
  }
}

/** A square viewBox cropped to the ink, with `margin` as a fraction of the side. */
export function tightViewBox({ ringWidth = RING_WIDTH, margin = 0.06 } = {}) {
  const { minX, minY, maxX, maxY } = inkBounds(ringWidth)
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
  ringWidth = RING_WIDTH,
  tile = null,
  size = 40,
  width = size,
  height = size,
  viewBox = '0 0 40 40',
} = {}) {
  const ring = `<ellipse cx="${RING.cx}" cy="${RING.cy}" rx="${RING.rx}" ry="${RING.ry}" transform="rotate(${RING.rotate} ${RING.cx} ${RING.cy})" stroke="${color}" stroke-width="${ringWidth}" fill="none"/>`
  const chevron = `<path d="${CHEVRON}" fill="${color}"/>`
  const weave = `<path d="${WEAVE}" stroke="${color}" stroke-width="${ringWidth}" stroke-linecap="round" fill="none"/>`
  const dot = `<circle cx="${BEAD.cx}" cy="${BEAD.cy}" r="${BEAD.r}" fill="${bead}"/>`
  const art = ring + chevron + weave + dot

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
