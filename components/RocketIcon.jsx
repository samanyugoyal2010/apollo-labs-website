'use client'

import { motion } from 'framer-motion'

export default function RocketIcon({ className = '', flameIntensity = 1, inverted = false }) {
  const bodyFill = inverted ? '#000000' : '#ffffff'
  const windowFill = inverted ? '#ffffff' : '#0a0a0a'
  const finFill = inverted ? '#666666' : '#c9d1e0'

  return (
    <motion.svg
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <path
        d="M32 4C24 20 16 36 16 52C16 62 22 70 32 76C42 70 48 62 48 52C48 36 40 20 32 4Z"
        fill={bodyFill}
      />
      <circle cx="32" cy="44" r="6" fill={windowFill} />
      <path d="M20 68L12 88L24 76Z" fill={finFill} />
      <path d="M44 68L52 88L40 76Z" fill={finFill} />
      {!inverted && (
        <motion.path
          d="M26 76C28 84 30 92 32 96C34 92 36 84 38 76"
          fill="url(#flame)"
          animate={{
            scaleY: [1, 1 + flameIntensity * 0.35, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '32px 76px' }}
        />
      )}
      <defs>
        <linearGradient id="flame" x1="32" y1="76" x2="32" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#aaaaaa" />
          <stop offset="1" stopColor="#666666" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
