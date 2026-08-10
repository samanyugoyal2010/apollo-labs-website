import Link from 'next/link'
import ApolloLogo from '@/components/ApolloLogo'
import DiscordIcon from '@/components/DiscordIcon'
import { CONTACT_EMAIL, DISCORD_URL } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="apollo-footer">
      <div className="apollo-container">
        <div className="apollo-footer-bar">
          <div className="apollo-footer-identity">
            <Link
              href="/"
              className="apollo-logo-link"
              aria-label="Apollo Labs — home"
            >
              <ApolloLogo />
            </Link>
            <p className="apollo-footer-brand">© {year}</p>
          </div>

          <div className="apollo-footer-links">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="apollo-footer-discord"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="apollo-footer-link">
              Email
            </a>
          </div>

          <p className="apollo-footer-credit">Designed with ❤️ by the Apollo Team</p>
        </div>
      </div>
    </footer>
  )
}
