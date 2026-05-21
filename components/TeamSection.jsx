import { FOUNDERS } from '@/lib/data'

export default function TeamSection() {
  return (
    <section id="team" className="apollo-section">
      <div className="apollo-container">
        <span className="apollo-caption mb-4 block">Team</span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4">
          Co-founders
        </h2>
        <p className="apollo-body max-w-xl mb-12">
          Apollo Labs was founded by three high school students committed to making
          collaborative research accessible and rigorous for their peers.
        </p>

        <div className="apollo-cards-row">
          {FOUNDERS.map((founder) => (
            <div key={founder.name} className="apollo-team-card">
              <div className="apollo-team-avatar">{founder.initials}</div>
              <h3 className="text-xl font-normal tracking-tight text-[var(--apollo-text)] mb-1">
                {founder.name}
              </h3>
              <p className="apollo-body-sm text-[var(--apollo-text-faint)]">{founder.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
