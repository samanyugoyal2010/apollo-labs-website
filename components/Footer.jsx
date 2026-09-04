import Link from 'next/link'
import ApolloLogo from '@/components/ApolloLogo'
import DiscordIcon from '@/components/DiscordIcon'
import { CONTACT_EMAIL, DISCORD_URL } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="crc-footer">
      <div className="crc-container">
        <div className="crc-footer-bar">
          <div className="crc-footer-identity">
            <Link
              href="/"
              className="crc-logo-link"
              aria-label="Apollo Labs — home"
            >
              <ApolloLogo />
            </Link>
            <p className="crc-footer-brand">© {year}</p>
          </div>

          <div className="crc-footer-links">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="crc-footer-discord"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="crc-footer-link">
              Email
            </a>
          </div>

          <p className="crc-footer-credit">Designed with ❤️ by the Apollo Labs Team</p>
        </div>
      </div>
    </footer>
  )
}
