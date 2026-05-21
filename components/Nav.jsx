'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RocketIcon from '@/components/RocketIcon'
import { NAV_LINKS } from '@/lib/data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`apollo-nav fixed top-5 z-50 flex items-center justify-between max-w-[1280px] ${scrolled ? 'apollo-nav-scrolled' : ''}`}
    >
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <RocketIcon className="h-8 w-5" flameIntensity={0} inverted />
        <span className="text-sm font-semibold tracking-tight text-[var(--apollo-text)]">
          Apollo Labs
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="apollo-nav-link">
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="#get-involved" className="apollo-hero-cta text-sm !py-2.5 !px-5">
        Get involved
      </Link>
    </nav>
  )
}
