'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ApolloMark from '@/components/ApolloMark'

const TICK_MS = 12
const HOLD_MS = 260

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, TICK_MS)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (count < 100) return
    const timeout = setTimeout(() => onCompleteRef.current?.(), HOLD_MS)
    return () => clearTimeout(timeout)
  }, [count])

  return (
    <motion.div
      className="crc-loading fixed inset-0 z-[100] flex items-center justify-center bg-black"
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
      role="status"
      aria-live="polite"
      aria-label="Loading Apollo Labs"
    >
      <div className="w-full max-w-[420px] px-6">
        {/* The mark builds itself: orbit draws, letter rises into it, bead
            lands at apogee — the identity explained in one and a half seconds. */}
        <div className="mb-10 flex justify-center">
          <ApolloMark className="apollo-mark-intro h-28 sm:h-32" />
        </div>

        <div className="mb-10 flex justify-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="crc-logo crc-logo-lg">
              <span className="crc-logo-type">
                <span className="crc-logo-name">Apollo</span>
                <span className="crc-logo-suffix">Labs</span>
              </span>
            </span>
          </motion.span>
        </div>

        <div className="crc-loading-track mb-3 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        <p className="crc-loading-status">
          <span>{count < 100 ? 'Entering orbit' : 'In orbit'}</span>
          <span className="tabular-nums text-white/70">{count}</span>
        </p>
      </div>
    </motion.div>
  )
}
