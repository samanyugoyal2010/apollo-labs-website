'use client'

import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const STORAGE_KEY = 'apollo-labs-seen'
const PRELOAD_CLASS = 'apollo-preload'

/**
 * The page content always renders — including on the server — so crawlers and
 * the first paint get the real site. The intro is an overlay on top of it,
 * gated by a first-paint class set by the inline script in the root layout.
 */
export default function AppShell({ children }) {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    const clearPreload = () =>
      document.documentElement.classList.remove(PRELOAD_CLASS)

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
  }, [])

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
