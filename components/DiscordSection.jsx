import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL } from '@/lib/data'

export default function DiscordSection() {
  return (
    <section id="announcements" className="crc-discord-section" data-scene="discord">
      <div className="crc-page-frame crc-discord-layout">
        <div>
          <p className="crc-eyebrow">Announcements and events</p>
          <h2>Know what CRC is doing next.</h2>
          <p>Join the Discord for announcements and events.</p>
        </div>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="crc-discord-button"
        >
          <DiscordIcon />
          Join the Discord
          <span aria-hidden>↗</span>
        </a>
      </div>
    </section>
  )
}
