"use client";

import { useEffect } from "react";

const DURATION = 3000;

/**
 * First-visit intro: points settle, the orbit draws, the Apollo A resolves,
 * a rocket traces the orbit, and a ringed-planet silhouette rises behind the
 * mark before the wordmark lands.
 *
 * The decision to play happens in a blocking inline script (see `IntroGate`)
 * so repeat visits never flash the overlay, and the motion is pure CSS so it
 * starts at parse time rather than after hydration.
 */
export function IntroSequence() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.apolloIntro !== "play") return;
    const timer = window.setTimeout(() => {
      delete root.dataset.apolloIntro;
    }, DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div id="apollo-intro" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="intro-scene" fill="none">
        {/* Ringed planet, behind everything */}
        <g className="intro-planet">
          <circle cx="100" cy="108" r="62" stroke="currentColor" strokeWidth="1.2" />
          <ellipse
            cx="100"
            cy="108"
            rx="94"
            ry="25"
            transform="rotate(-17 100 108)"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <ellipse
            cx="100"
            cy="108"
            rx="80"
            ry="21"
            transform="rotate(-17 100 108)"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </g>

        {/* Settling points */}
        <g className="intro-points">
          <circle cx="34" cy="70" r="2" fill="currentColor" />
          <circle cx="168" cy="88" r="2" fill="currentColor" />
          <circle cx="72" cy="170" r="2" fill="currentColor" />
          <circle cx="146" cy="158" r="2" fill="currentColor" />
        </g>

        {/* Orbit + rocket share one rotated frame */}
        <g transform="rotate(-20 100 112)">
          <ellipse
            className="intro-orbit"
            cx="100"
            cy="112"
            rx="78"
            ry="38"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <g className="intro-rocket-track">
            <g className="intro-rocket">
              <path d="M12 0 3-5H-8l-3 2.5v5L-8 5H3Z" fill="currentColor" />
              <path d="M-3-5-8-11-11-5Z" fill="currentColor" />
              <path d="M-3 5-8 11-11 5Z" fill="currentColor" />
              <circle cx="4" cy="0" r="1.9" fill="var(--color-void)" />
              <path d="M-11-1.7-18.5 0-11 1.7Z" fill="var(--apollo-signal)" opacity="0.9" />
            </g>
          </g>
        </g>

        {/* The Apollo A */}
        <path
          className="intro-a"
          d="M41 165 L100 34 L159 165"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="square"
        />
        <path
          className="intro-bar"
          d="M69 122 H131"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="square"
        />
        <circle className="intro-node" cx="178" cy="81" r="7.5" fill="var(--apollo-signal)" />
      </svg>

      <span className="intro-word">
        <span>Apollo</span>
        <span className="intro-word-dim">Labs</span>
      </span>
    </div>
  );
}

/** Runs before first paint; must stay dependency-free and tiny. */
export function IntroGate() {
  const script =
    "try{if(!sessionStorage.getItem('apollo-intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.apolloIntro='play';sessionStorage.setItem('apollo-intro-seen','1')}}catch(e){}";
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
