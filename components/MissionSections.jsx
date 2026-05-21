import Link from 'next/link'
import { MISSION_PILLARS } from '@/lib/data'

function SectionHeading({ children }) {
  return (
    <h2 className="text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-tight text-[var(--apollo-text)] mb-5 whitespace-pre-line">
      {children}
    </h2>
  )
}

export default function MissionSections() {
  return (
    <>
      {MISSION_PILLARS.map((pillar, index) => (
        <section
          key={pillar.id}
          id={index === 0 ? 'research' : undefined}
          className="apollo-section apollo-section-dark"
        >
          <div className="apollo-container">
            <span className="apollo-caption block mb-2">{pillar.caption}</span>
            <SectionHeading>{pillar.title}</SectionHeading>
            <p className="text-lg text-[var(--apollo-text-body)] leading-relaxed mb-8 max-w-xl">
              {pillar.description}
            </p>
            <Link href={pillar.href} className="apollo-link text-base font-medium">
              {pillar.cta}
            </Link>
          </div>
        </section>
      ))}
    </>
  )
}
