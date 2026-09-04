import DiscordSection from '@/components/DiscordSection'
import DragonFlight from '@/components/DragonFlight'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Nav from '@/components/Nav'
import ProjectsSection from '@/components/ProjectsSection'
import ResearchBoundary from '@/components/ResearchBoundary'
import ResearchProcess from '@/components/ResearchProcess'
import TeamSection from '@/components/TeamSection'
import { DISCORD_URL, TEAM_MEMBERS } from '@/lib/data'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'A student-led club at California High School documenting student research projects.',
  sameAs: [DISCORD_URL],
  member: TEAM_MEMBERS.map((member) => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
  })),
}

export default function Home() {
  return (
    <div className="crc-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Nav />
      <DragonFlight />

      <main id="main" className="crc-main">
        <Hero />
        <ResearchProcess />
        <ProjectsSection />
        <TeamSection />
        <ResearchBoundary />
        <DiscordSection />
      </main>

      <Footer />
    </div>
  )
}
