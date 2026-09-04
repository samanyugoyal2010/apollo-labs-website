'use client'

import Image from 'next/image'
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const progressStops = [0, 0.1, 0.22, 0.34, 0.48, 0.63, 0.78, 0.9, 1]

function FlightPath({ compact = false }) {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const x = useTransform(
    scrollYProgress,
    progressStops,
    compact
      ? ['50vw', '38vw', '54vw', '45vw', '48vw', '38vw', '50vw', '42vw', '52vw']
      : ['58vw', '-18vw', '58vw', '66vw', '-20vw', '-22vw', '48vw', '14vw', '58vw']
  )
  const y = useTransform(
    scrollYProgress,
    progressStops,
    compact
      ? ['12vh', '60vh', '20vh', '58vh', '20vh', '62vh', '18vh', '58vh', '28vh']
      : ['13vh', '58vh', '18vh', '65vh', '23vh', '67vh', '17vh', '61vh', '28vh']
  )
  const rotate = useTransform(
    scrollYProgress,
    progressStops,
    compact ? [1, -4, 2, -2, 3, -3, 2, -2, 0] : [1, -8, 5, -4, 7, -7, 4, -4, 0]
  )
  const scale = useTransform(
    scrollYProgress,
    progressStops,
    compact
      ? [0.78, 0.62, 0.52, 0.58, 0.48, 0.54, 0.46, 0.58, 0.65]
      : [1, 0.72, 0.58, 0.68, 0.52, 0.64, 0.5, 0.72, 0.82]
  )
  const opacity = useTransform(
    scrollYProgress,
    progressStops,
    compact
      ? [1, 0.32, 0.2, 0.22, 0.18, 0.24, 0.18, 0.22, 0.48]
      : [1, 0.9, 0.78, 0.9, 0.72, 0.88, 0.7, 0.9, 1]
  )

  const motionStyle = reduceMotion
    ? { opacity: compact ? 0.12 : 0.16 }
    : { x, y, rotate, scale, opacity }

  return (
    <m.div
      className={`crc-dragon-flight crc-dragon-flight--${compact ? 'compact' : 'wide'}`}
      style={motionStyle}
      initial={false}
      aria-hidden="true"
    >
      <Image
        src="/brand/apollo-dragon.png"
        alt=""
        width={1312}
        height={1199}
        priority
        sizes={compact ? '76vw' : '(max-width: 1200px) 46vw, 620px'}
        unoptimized
        draggable={false}
      />
    </m.div>
  )
}

export default function DragonFlight() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <FlightPath />
        <FlightPath compact />
      </MotionConfig>
    </LazyMotion>
  )
}
