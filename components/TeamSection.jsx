'use client'

import { useCallback, useState } from 'react'
import Modal from '@/components/Modal'
import { TEAM_MEMBERS } from '@/lib/data'

const TITLE_ID = 'apollo-team-modal-title'

function TeamMemberModal({ member, onClose }) {
  return (
    <Modal open={!!member} onClose={onClose} labelledBy={TITLE_ID} className="apollo-modal-team">
      {member && (
        <>
          <div className="apollo-team-modal-header">
            <div className="apollo-team-avatar apollo-team-avatar-modal">
              {member.initials}
            </div>
            <div>
              <span className="apollo-caption mb-1 block">{member.role}</span>
              <h3
                id={TITLE_ID}
                className="text-[clamp(24px,3.5vw,32px)] font-normal leading-tight tracking-tight"
              >
                {member.name}
              </h3>
            </div>
          </div>

          {member.tags?.length > 0 && (
            <ul className="apollo-member-tags">
              {member.tags.map((tag) => (
                <li key={tag} className="apollo-member-tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <p className="apollo-body-sm leading-relaxed mt-6">{member.bio}</p>
        </>
      )}
    </Modal>
  )
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null)
  const closeDetail = useCallback(() => setSelectedMember(null), [])

  return (
    <section id="team" className="apollo-section apollo-team-section">
      <div className="apollo-container">
        <span className="apollo-caption mb-4 block">Team</span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4">
          Our team
        </h2>
        <p className="apollo-body max-w-xl mb-12">
          Apollo Labs was founded by high school students committed to making collaborative
          research accessible and rigorous for their peers. Tap a card to read more about each
          member.
        </p>

        <div className="apollo-cards-row">
          {TEAM_MEMBERS.map((member) => (
            <button
              key={member.id}
              type="button"
              className="apollo-team-card text-left w-full"
              onClick={() => setSelectedMember(member)}
              aria-haspopup="dialog"
            >
              <div className="apollo-team-avatar">{member.initials}</div>
              <h3 className="text-xl font-normal tracking-tight text-[var(--apollo-text)] mb-1 text-center">
                {member.name}
              </h3>
              <p className="apollo-body-sm text-[var(--apollo-text-faint)] text-center mb-4">
                {member.role}
              </p>
              <span className="apollo-team-card-hint text-sm text-[var(--apollo-text-faint)] block text-center">
                Tap to read bio →
              </span>
            </button>
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} onClose={closeDetail} />
    </section>
  )
}
