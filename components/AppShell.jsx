'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const STORAGE_KEY = 'apollo-labs-seen'

export default function AppShell({ children }) {
  const [showLoading, setShowLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY)
    setShowLoading(!seen)
    setMounted(true)
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setShowLoading(false)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-[#fafaf9]" />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {!showLoading && children}
    </>
  )
}
