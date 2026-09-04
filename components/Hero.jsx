import Link from 'next/link'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL, PROJECTS } from '@/lib/data'

export default function Hero() {
  return (
    <section id="about" className="crc-hero" data-scene="hero">
      <div className="crc-page-frame crc-hero-frame">
        <div className="crc-hero-copy">
          <p className="crc-eyebrow">
            Collaborative Research Club
            <span>California High School</span>
          </p>

          <h1 className="crc-hero-title">
            Bring a question.
            <em>Build the record.</em>
          </h1>

          <p className="crc-hero-intro">
            CRC is a student-led club at California High School. Students read prior
            work, define a method, examine evidence, and document what they learn.
          </p>

          <div className="crc-hero-actions">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="crc-button crc-button-primary"
            >
              <DiscordIcon />
              Join the Discord
            </a>
            <Link href="#projects" className="crc-text-link">
              View project notes
              <span aria-hidden>↓</span>
            </Link>
          </div>

          <p className="crc-discord-note">
            Join the Discord for announcements and events.
          </p>
        </div>

        <div className="crc-hero-flight-note" aria-hidden="true">
          <span>Scroll</span>
          <span className="crc-flight-rule" />
          <span>Follow the dragon</span>
        </div>

        <dl className="crc-hero-ledger">
          <div>
            <dt>Current record</dt>
            <dd>{String(PROJECTS.length).padStart(2, '0')} project notes</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Question, method, evidence, limits</dd>
          </div>
          <div>
            <dt>Home</dt>
            <dd>Cal High, San Ramon</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
