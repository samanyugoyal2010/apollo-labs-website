type LogoProps = {
  size?: number;
  className?: string;
  /** Renders the orbital node in the signal accent. */
  accentNode?: boolean;
  title?: string;
};

/**
 * The Apollo mark: an abstract geometric A intersected by an inclined orbital
 * path, with a single node riding the orbit. Stroke geometry is authored on a
 * 32×32 grid so the mark stays crisp from favicon to hero scale.
 */
export function Logo({
  size = 28,
  className,
  accentNode = true,
  title,
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <ellipse
        cx="16"
        cy="18"
        rx="13.5"
        ry="6.5"
        transform="rotate(-22 16 18)"
        stroke="currentColor"
        strokeOpacity="0.34"
        strokeWidth="1.1"
      />
      <path
        d="M6.6 26.4 L16 5.4 L25.4 26.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M11.1 19.6 H20.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
      />
      <circle
        cx="28.5"
        cy="12.9"
        r="2.1"
        fill={accentNode ? "var(--color-signal)" : "currentColor"}
      />
    </svg>
  );
}
