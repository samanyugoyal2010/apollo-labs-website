import Link from 'next/link'
import HeroVisual from '@/components/HeroVisual'
import ResearchTags from '@/components/ResearchTags'

export default function Hero() {
  return (
    <section id="mission" className="apollo-home pt-28 pb-8">
      <div className="apollo-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="apollo-caption mb-4">Student-led · Collaborative · Research</p>
            <h1 className="apollo-hero-h1 mb-6">
              High school students building research, together.
            </h1>
            <p className="apollo-body mb-8 max-w-xl">
              Apollo Labs is a student-led organization where collaborators work on
              shared research projects — from hypothesis to write-up.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#team" className="apollo-hero-cta relative overflow-hidden apollo-shimmer">
                Meet the team
              </Link>
              <Link href="#research" className="apollo-hero-cta-secondary">
                Our research
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
        <ResearchTags />
      </div>
    </section>
  )
}
