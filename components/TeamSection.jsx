'use client'

import { useCallback, useEffect, useState } from 'react'
import { TEAM_MEMBERS } from '@/lib/data'

function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="apollo-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`apollo-modal ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-title"
      >
        <button type="button" className="apollo-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

function TeamMemberModal({ member, onClose }) {
  if (!member) return null

  return (
    <Modal open={!!member} onClose={onClose} className="apollo-modal-team">
      <div className="apollo-team-modal-header">
        <div className="apollo-team-avatar apollo-team-avatar-modal">{member.initials}</div>
        <div>
          <span className="apollo-caption mb-1 block">{member.role}</span>
          <h3
            id="team-modal-title"
            className="text-[clamp(24px,3.5vw,32px)] font-normal leading-tight tracking-tight"
          >
            {member.name}
          </h3>
        </div>
      </div>
      <p className="apollo-body-sm leading-relaxed mt-6">{member.bio}</p>
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
