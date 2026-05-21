'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import RocketIcon from '@/components/RocketIcon'

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (count >= 100) {
      const timeout = setTimeout(() => onComplete?.(), 400)
      return () => clearTimeout(timeout)
    }
  }, [count, onComplete])

  const flameIntensity = count / 100

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      exit={{ y: '-100%', transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8 flex flex-col items-center justify-center gap-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <RocketIcon className="h-24 w-16" flameIntensity={flameIntensity} />
          <div className="text-5xl font-light tracking-tight text-white md:text-7xl">
            apollo labs
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mb-4 h-1 w-64 overflow-hidden rounded-full bg-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.div
          className="text-lg text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {count < 100 ? 'Launching…' : 'Ready for liftoff'}
          <span className="mt-1 block text-2xl text-white/90">{count}%</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
