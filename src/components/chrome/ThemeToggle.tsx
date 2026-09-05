"use client";

import { useCallback, useSyncExternalStore } from "react";
import { RocketCraft } from "@/components/ui/RocketOrbit";

type Theme = "dark" | "light";

const STORAGE_KEY = "apollo-theme";

/** The document element is the source of truth; the store follows it. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const nextTheme = theme === "dark" ? "light" : "dark";

  const toggle = useCallback(() => {
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* storage unavailable — the choice simply will not persist */
    }
  }, [nextTheme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={`theme-toggle group inline-flex h-11 items-center gap-2 border border-hairline px-2.5 text-paper-dim transition-[color,border-color,background-color] duration-200 hover:border-hairline-strong hover:bg-paper/[0.04] hover:text-paper ${className ?? ""}`}
    >
      <span aria-hidden="true" className="theme-toggle__icon">
        <RocketCraft className="theme-toggle__craft" />
      </span>
      <span aria-hidden="true" className="theme-toggle__label">
        {nextTheme} mode
      </span>
    </button>
  );
}

/** Runs before first paint so the stored theme never flashes. */
export function ThemeGate() {
  const script = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
