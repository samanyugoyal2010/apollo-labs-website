import type { CoverVariant } from "@/lib/types";
import { APOLLO_MARK_ORBIT_PATH } from "@/components/ui/RocketOrbit";

const W = 1200;
const H = 800;

/** Deterministic PRNG so server and client render identical artwork. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rounded so Node and the browser serialise identical attribute values. */
const q = (n: number) => Math.round(n * 100) / 100;

/** The Apollo mark, authored on a 32×32 grid, scaled into the cover. */
function Mark({ scale, cx, cy }: { scale: number; cx: number; cy: number }) {
  const half = (32 * scale) / 2;
  return (
    <g
      transform={`translate(${q(cx - half)} ${q(cy - half)}) scale(${scale})`}
      stroke="var(--cover-mark)"
      fill="none"
    >
      <path
        d={APOLLO_MARK_ORBIT_PATH}
        strokeOpacity="0.38"
        strokeWidth="0.5"
      />
      <path
        d="M6.6 26.4 L16 5.4 L25.4 26.4"
        strokeOpacity="0.8"
        strokeWidth="1.05"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M11.1 19.6 H20.9"
        strokeOpacity="0.8"
        strokeWidth="1.05"
        strokeLinecap="square"
      />
    </g>
  );
}

/**
 * A soft gradient ground, one diffuse highlight, and the Apollo mark centred.
 * The discipline picks the hue (via the `cover-*` class in globals.css) and
 * the seed nudges the gradient direction and highlight position, so two cards
 * in the same discipline are not identical.
 *
 * Any project carrying `coverImageUrl` skips generation entirely.
 */
export function ProjectCover({
  variant,
  seed,
  className,
  label,
  imageUrl,
}: {
  variant: CoverVariant;
  seed: string;
  className?: string;
  /** Screen-reader description; omit for decorative use alongside a title. */
  label?: string;
  /** When a project has real cover art, generation is skipped entirely. */
  imageUrl?: string;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={label ?? ""}
        className={`size-full object-cover ${className ?? ""}`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  const r = rng(seed);
  const flip = r() > 0.5;
  // The highlight stays in the upper half so the light reads as consistent.
  const glowX = q(0.18 + r() * 0.3);
  const glowY = q(0.12 + r() * 0.24);
  const glowR = q(0.6 + r() * 0.22);

  const gid = `cv-${seed}`;
  const glid = `cg-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`size-full cover-${variant} ${className ?? ""}`}
      role={label ? "img" : "presentation"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <linearGradient
          id={gid}
          x1={flip ? "1" : "0"}
          y1="0"
          x2={flip ? "0" : "1"}
          y2="1"
        >
          <stop offset="0%" stopColor="var(--cover-a)" />
          <stop offset="100%" stopColor="var(--cover-b)" />
        </linearGradient>

        <radialGradient id={glid} cx={glowX} cy={glowY} r={glowR}>
          <stop offset="0%" stopColor="var(--cover-glow)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="var(--cover-glow)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--cover-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${gid})`} />
      <rect width={W} height={H} fill={`url(#${glid})`} />

      <Mark scale={11} cx={W / 2} cy={H / 2} />
    </svg>
  );
}
