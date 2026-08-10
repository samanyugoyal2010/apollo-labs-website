import Link from 'next/link'
import ApolloMark from '@/components/ApolloMark'
import DiscordIcon from '@/components/DiscordIcon'
import { DISCORD_URL } from '@/lib/data'

export const metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="apollo-site apollo-home flex min-h-screen items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <Link href="/" className="apollo-logo-link mb-8 inline-block" aria-label="Apollo Labs — home">
          <ApolloMark className="apollo-notfound-mark" />
        </Link>
        <p className="apollo-caption mb-4">404</p>
        <h1 className="apollo-hero-h1 mx-auto mb-5 !text-[clamp(32px,6vw,52px)]">
          Off course.
        </h1>
        <p className="apollo-body mb-9">
          That page doesn&apos;t exist. Head back to the launch pad, or find us in the
          Discord.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="apollo-hero-cta">
            Back to home
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="apollo-discord-cta"
          >
            <DiscordIcon className="h-[18px] w-[18px]" />
            Join our Discord
          </a>
        </div>
      </div>
    </div>
  )
}
