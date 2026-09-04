import { INNER_C, INNER_WIDTH, NODE, OUTER_C, OUTER_WIDTH } from '@/lib/mark'

/**
 * Collaborative Research Club mark. Geometry lives in `lib/mark.js` so the social card and the
 * app icon draw the identical shape.
 *
 * Colors come from `currentColor` and the `--crc-mark-node` custom property,
 * so the mark inverts with its container. Callers
 * set a height; width follows the viewBox.
 *
 * variant="full" includes both linked forms and the shared node.
 * variant="glyph" includes the outer C only.
 */
export default function CRCMark({
  className = '',
  variant = 'full',
  title,
  strokeWidth = OUTER_WIDTH,
}) {
  const labelled = Boolean(title)

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`crc-mark ${className}`}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {variant === 'full' && (
        <path
          className="crc-mark-inner"
          d={INNER_C}
          stroke="currentColor"
          strokeWidth={INNER_WIDTH}
          strokeLinecap="round"
          pathLength={1}
        />
      )}

      <path
        className="crc-mark-outer"
        d={OUTER_C}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
      />

      {variant === 'full' && (
        <circle
          className="crc-mark-node"
          cx={NODE.cx}
          cy={NODE.cy}
          r={NODE.r}
          fill="var(--crc-mark-node, currentColor)"
        />
      )}
    </svg>
  )
}
