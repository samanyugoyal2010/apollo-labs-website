import Link from 'next/link'
import HeroVisual from '@/components/HeroVisual'
import ResearchTags from '@/components/ResearchTags'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_HANDLE, DISCORD_URL } from '@/lib/data'

export default function Hero() {
  return (
    <section id="mission" className="apollo-home pt-24 pb-10 sm:pt-28 md:pt-36 md:pb-12">
      <div className="apollo-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="apollo-hero-badge">
              Student-led · Collaborative · Research
            </p>
            <h1 className="apollo-hero-h1 mb-6">
              High school students building <em>research</em>, together.
            </h1>
            <p className="apollo-body mb-8 max-w-lg text-[17px] leading-relaxed">
              Apollo Labs is a student-led organization where collaborators work on
              shared research projects — from hypothesis to write-up. Everything
              happens in our Discord.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apollo-discord-cta relative overflow-hidden apollo-shimmer"
              >
                <DiscordIcon className="h-[18px] w-[18px]" />
                Join our Discord
              </a>
              <Link href="#team" className="apollo-hero-cta-secondary">
                Meet the team
              </Link>
            </div>
            <p className="apollo-hero-meta">
              {DISCORD_HANDLE} · Free to join · Open to all high school students
            </p>
          </div>
          <HeroVisual />
        </div>
        <ResearchTags />
      </div>
    </section>
  )
}
