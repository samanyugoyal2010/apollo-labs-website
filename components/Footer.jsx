import Link from 'next/link'
import CRCLogo from '@/components/CRCLogo'
import { DISCORD_URL, NAV_LINKS } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="crc-footer">
      <div className="crc-page-frame crc-footer-layout">
        <div>
          <Link
            href="/"
            className="crc-logo-link"
            aria-label="Collaborative Research Club home"
          >
            <CRCLogo priority />
          </Link>
          <p>Student-led research club at California High School.</p>
        </div>

        <nav aria-label="Footer navigation" className="crc-footer-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={`/${link.href}`}>
              {link.label}
            </Link>
          ))}
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            Discord <span aria-hidden>↗</span>
          </a>
        </nav>

        <p className="crc-footer-year">© {new Date().getFullYear()} CRC</p>
      </div>
    </footer>
  )
}
