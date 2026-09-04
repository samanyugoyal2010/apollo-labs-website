import Link from 'next/link'
import HeroVisual from '@/components/HeroVisual'
import ResearchTags from '@/components/ResearchTags'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL } from '@/lib/data'

export default function Hero() {
  return (
    <section id="mission" className="crc-home pt-24 pb-10 sm:pt-28 md:pt-36 md:pb-12">
      <div className="crc-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="crc-hero-badge">
              Cal High · Student-led · Research
            </p>
            <h1 className="crc-hero-h1 mb-6">
              High school students building <em>research</em>, together.
            </h1>
            <p className="crc-body mb-8 max-w-lg text-[17px] leading-relaxed">
              Collaborative Research Club is a student-led club at California High
              School where students work together on research projects, from hypothesis
              to write-up. Everything happens in our Discord.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="crc-discord-cta relative overflow-hidden crc-shimmer"
              >
                <DiscordIcon className="h-[18px] w-[18px]" />
                Join our Discord
              </a>
              <Link href="#team" className="crc-hero-cta-secondary">
                Meet the team
              </Link>
            </div>
            <p className="crc-hero-meta">
              Based at Cal High · Free to join
            </p>
          </div>
          <HeroVisual />
        </div>
        <ResearchTags />
      </div>
    </section>
  )
}
