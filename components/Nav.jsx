'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RocketIcon from '@/components/RocketIcon'
import { NAV_LINKS } from '@/lib/data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`apollo-nav fixed top-3 md:top-5 z-50 flex items-center justify-between max-w-[1280px] ${scrolled ? 'apollo-nav-scrolled' : ''}`}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
          <RocketIcon className="h-8 w-5" flameIntensity={0} inverted />
          <span className="text-sm font-semibold tracking-tight text-[var(--apollo-text)]">
            Apollo Labs
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="apollo-nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="#join-us"
            className="apollo-hero-cta shrink-0 text-sm !py-2 !px-3 md:!px-4 !shadow-none hover:!shadow-none"
            onClick={closeMenu}
          >
            Join us
          </Link>
          <button
            type="button"
            className="apollo-nav-menu-btn md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="apollo-mobile-menu md:hidden" role="dialog" aria-modal="true">
          <div className="apollo-mobile-menu-backdrop" onClick={closeMenu} aria-hidden />
          <div className="apollo-mobile-menu-panel">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="apollo-mobile-menu-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
