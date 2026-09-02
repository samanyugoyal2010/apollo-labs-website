'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ApolloLogo from '@/components/ApolloLogo'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL, NAV_LINKS } from '@/lib/data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // NAV_LINKS are in-page anchors. On a project page there is nothing to
  // scroll to, so they have to route home first.
  const onHome = pathname === '/'
  const hrefFor = (href) => (onHome || !href.startsWith('#') ? href : `/${href}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        aria-label="Main"
        className={`apollo-nav fixed top-3 md:top-5 z-50 flex items-center justify-between max-w-[1280px] ${scrolled ? 'apollo-nav-scrolled' : ''}`}
      >
        <Link
          href="/"
          className="apollo-logo-link shrink-0"
          aria-label="Apollo Labs — home"
          onClick={closeMenu}
        >
          <ApolloLogo />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={hrefFor(link.href)} className="apollo-nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="apollo-nav-discord"
            onClick={closeMenu}
          >
            <DiscordIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Join Discord</span>
            <span className="sm:hidden">Join</span>
          </a>
          <button
            type="button"
            className="apollo-nav-menu-btn md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="apollo-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
            <span className={menuOpen ? 'apollo-nav-menu-open' : ''} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="apollo-mobile-menu" className="apollo-mobile-menu md:hidden">
          <div className="apollo-mobile-menu-backdrop" onClick={closeMenu} aria-hidden />
          <div className="apollo-mobile-menu-panel">
            <Link
              href="/"
              className="apollo-logo-link apollo-mobile-menu-brand"
              aria-label="Apollo Labs — home"
              onClick={closeMenu}
            >
              <ApolloLogo />
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={hrefFor(link.href)}
                className="apollo-mobile-menu-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="apollo-mobile-menu-discord"
              onClick={closeMenu}
            >
              <DiscordIcon className="h-[18px] w-[18px]" />
              Join our Discord
            </a>
          </div>
        </div>
      )}
    </>
  )
}
