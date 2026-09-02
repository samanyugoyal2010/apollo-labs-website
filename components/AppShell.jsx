'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const STORAGE_KEY = 'apollo-labs-seen'
const PRELOAD_CLASS = 'apollo-preload'

/**
 * The page content always renders — including on the server — so crawlers and
 * the first paint get the real site. The intro is an overlay on top of it,
 * gated by a first-paint class set by the inline script in the root layout.
 *
 * Home only: a project page is what gets shared and cited, and a reader who
 * followed a link to a paper should land on the paper, not on an intro. The
 * same path test lives in PRELOAD_SCRIPT so the class and the overlay agree.
 */
export default function AppShell({ children }) {
  const [showLoading, setShowLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const clearPreload = () =>
      document.documentElement.classList.remove(PRELOAD_CLASS)

    if (pathname !== '/') {
      clearPreload()
      return
    }

    let seen = true
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      // Private mode or blocked storage — never hold content hostage.
      seen = true
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (seen || reduced) {
      clearPreload()
      return
    }

    setShowLoading(true)
  }, [pathname])

  const handleLoadingComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Non-fatal: the intro just replays next visit.
    }
    document.documentElement.classList.remove(PRELOAD_CLASS)
    setShowLoading(false)
  }, [])

  return (
    <>
      {children}
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </>
  )
}
