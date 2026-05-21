import Link from 'next/link'
import { MISSION_PILLARS } from '@/lib/data'

export default function MissionSections() {
  return (
    <section id="research" className="apollo-section">
      <div className="apollo-container">
        <span className="apollo-caption mb-4 block">Mission</span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-12 max-w-xl">
          How Apollo Labs works
        </h2>

        <div className="apollo-cards-row">
          {MISSION_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="apollo-card-vertical apollo-section-dark"
            >
              <span className="apollo-caption mb-3 block">{pillar.caption}</span>
              <h3 className="text-[clamp(22px,2.5vw,28px)] font-normal leading-[1.1] tracking-tight mb-4 whitespace-pre-line flex-1">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--apollo-text-body)] leading-relaxed mb-6">
                {pillar.description}
              </p>
              <Link href={pillar.href} className="apollo-link text-sm font-medium mt-auto">
                {pillar.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
