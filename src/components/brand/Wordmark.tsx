import { Logo } from "./Logo";

type WordmarkProps = {
  size?: number;
  className?: string;
  /** Hide the lettering, leaving only the mark (used on narrow viewports). */
  markOnly?: boolean;
};

export function Wordmark({ size = 26, className, markOnly }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Logo size={size} />
      {!markOnly && (
        <span className="flex items-baseline gap-[0.45em] text-[0.8125rem] font-medium uppercase leading-none tracking-[0.2em]">
          <span className="text-paper">Apollo</span>
          <span className="text-muted">Labs</span>
        </span>
      )}
    </span>
  );
}
