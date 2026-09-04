'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CRCLogo from '@/components/CRCLogo'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL, NAV_LINKS } from '@/lib/data'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuButtonRef = useRef(null)
  const onHome = pathname === '/'
  const hrefFor = (href) => (onHome || !href.startsWith('#') ? href : `/${href}`)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="crc-header">
      <nav className="crc-nav" aria-label="Main navigation">
        <Link
          href="/"
          className="crc-logo-link"
          aria-label="Collaborative Research Club home"
          onClick={closeMenu}
        >
          <CRCLogo priority />
        </Link>

        <div className="crc-nav-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={hrefFor(link.href)} className="crc-nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="crc-nav-actions">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="crc-nav-discord"
            aria-label="Join the Discord"
          >
            <DiscordIcon />
            <span>Join Discord</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="crc-menu-button"
            aria-expanded={menuOpen}
            aria-controls="crc-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div id="crc-mobile-menu" className="crc-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={hrefFor(link.href)}
                className="crc-mobile-menu-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="crc-mobile-discord"
              onClick={closeMenu}
            >
              Join the Discord
              <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
