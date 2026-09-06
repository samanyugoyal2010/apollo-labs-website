type RocketOrbitProps = {
  className?: string;
  /** Seconds into the loop at first paint; rendered as a negative delay. */
  delay?: number;
};

const ORBIT_DURATION = 4.5;

/** Apollo-mark orbit, authored on the same 32×32 coordinate system. */
export const APOLLO_MARK_ORBIT_PATH =
  "M 3.48 23.06 A 13.5 6.5 -22 1 1 28.52 12.94 A 13.5 6.5 -22 1 1 3.48 23.06";

/** A CSS-drawn craft used by project cards and compact interface accents. */
export function RocketCraft({ className }: { className?: string }) {
  return (
    <span className={`rocket-craft${className ? ` ${className}` : ""}`}>
      <span className="rocket-craft__body">
        <span className="rocket-craft__window" />
        <span className="rocket-craft__seam" />
      </span>
      <span className="rocket-craft__fin rocket-craft__fin--port" />
      <span className="rocket-craft__fin rocket-craft__fin--starboard" />
      <span className="rocket-craft__nozzle" />
      <span className="rocket-craft__flame">
        <span className="rocket-craft__flame-core" />
      </span>
    </span>
  );
}

function ProjectRocketGlyph() {
  return (
    <g className="project-cover-rocket__glyph" transform="scale(0.18)">
      <path d="M12 0 3-5H-8l-3 2.5v5L-8 5H3Z" fill="currentColor" />
      <path d="M-3-5-8-11-11-5Z" fill="currentColor" />
      <path d="M-3 5-8 11-11 5Z" fill="currentColor" />
      <circle cx="4" cy="0" r="1.9" fill="var(--color-void)" />
      <path
        className="project-cover-rocket__flame"
        d="M-11-1.7-18.5 0-11 1.7Z"
        fill="var(--color-signal-bright)"
      />
    </g>
  );
}

/** Full-cover overlay using the exact viewBox, mark transform, and orbit path. */
export function RocketOrbit({ className, delay = 0 }: RocketOrbitProps) {
  const safeDelay = Number.isFinite(delay) ? Math.abs(delay) : 0;

  return (
    <svg
      aria-hidden="true"
      className={`project-cover-rocket${className ? ` ${className}` : ""}`}
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      <g transform="translate(424 224) scale(11)">
        <g className="project-cover-rocket__animated">
          <animateMotion
            begin={`${-safeDelay}s`}
            calcMode="linear"
            dur={`${ORBIT_DURATION}s`}
            path={APOLLO_MARK_ORBIT_PATH}
            repeatCount="indefinite"
            rotate="auto"
          />
          <ProjectRocketGlyph />
        </g>
        <g
          className="project-cover-rocket__static"
          transform="translate(28.52 12.94) rotate(68)"
        >
          <ProjectRocketGlyph />
        </g>
      </g>
    </svg>
  );
}
