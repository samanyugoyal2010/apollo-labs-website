import { BEAD, CHEVRON, RING, RING_WIDTH, WEAVE } from '@/lib/mark'

/**
 * Apollo Labs mark. Geometry lives in `lib/mark.js` so the social card and the
 * app icon draw the identical shape.
 *
 * Colors come from `currentColor` and the `--apollo-mark-bead` custom property,
 * so the mark inverts for free — dark on the nav, light on the intro. Callers
 * set a height; width follows the viewBox.
 *
 * variant="full"  — chevron + ring + bead
 * variant="glyph" — chevron only, for contexts that supply their own orbit and
 *                   their own bead (the hero visual's concentric rings)
 */
export default function ApolloMark({
  className = '',
  variant = 'full',
  title,
  ringWidth = RING_WIDTH,
}) {
  const labelled = Boolean(title)

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`apollo-mark ${className}`}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {variant === 'full' && (
        <ellipse
          className="apollo-mark-ring"
          cx={RING.cx}
          cy={RING.cy}
          rx={RING.rx}
          ry={RING.ry}
          transform={`rotate(${RING.rotate} ${RING.cx} ${RING.cy})`}
          stroke="currentColor"
          strokeWidth={ringWidth}
          pathLength={1}
        />
      )}

      <path className="apollo-mark-chevron" d={CHEVRON} fill="currentColor" />

      {variant === 'full' && (
        <path
          className="apollo-mark-weave"
          d={WEAVE}
          stroke="currentColor"
          strokeWidth={ringWidth}
          strokeLinecap="round"
          pathLength={1}
        />
      )}

      {variant === 'full' && (
        <circle
          className="apollo-mark-bead"
          cx={BEAD.cx}
          cy={BEAD.cy}
          r={BEAD.r}
          fill="var(--apollo-mark-bead, currentColor)"
        />
      )}
    </svg>
  )
}
