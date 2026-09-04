'use client'

import { useCallback, useState } from 'react'
import Modal from '@/components/Modal'
import { MISSION_PILLARS } from '@/lib/data'

const TITLE_ID = 'crc-pillar-modal-title'

function PillarModal({ pillar, onClose }) {
  /* Close first, then scroll — the modal restores focus to the card on unmount,
     which would otherwise yank the page back to this section. */
  const goToSection = () => {
    const { href } = pillar
    onClose()
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <Modal
      open={!!pillar}
      onClose={onClose}
      labelledBy={TITLE_ID}
      className="crc-modal-pillar"
    >
      {pillar && (
        <>
          <span className="crc-caption mb-2 block">{pillar.caption}</span>
          <h3
            id={TITLE_ID}
            className="text-[clamp(24px,3.5vw,32px)] font-normal leading-tight tracking-tight mb-4"
          >
            {pillar.title.replace('\n', ' ')}
          </h3>

          <p className="crc-body-sm leading-relaxed mb-4">{pillar.description}</p>
          <p className="crc-body-sm leading-relaxed mb-6">{pillar.overview}</p>

          <p className="crc-caption mb-3">What that looks like</p>
          <ul className="crc-modal-highlights mb-7">
            {pillar.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <button
            type="button"
            onClick={goToSection}
            className="crc-link text-sm font-medium"
          >
            {pillar.cta}
          </button>
        </>
      )}
    </Modal>
  )
}

export default function MissionSections() {
  const [selectedPillar, setSelectedPillar] = useState(null)
  const closeDetail = useCallback(() => setSelectedPillar(null), [])

  return (
    <section id="research" className="crc-section">
      <div className="crc-container">
        <span className="crc-caption mb-4 block">Mission</span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4 max-w-xl">
          How CRC works
        </h2>
        <p className="crc-body max-w-xl mb-12">
          Tap a card to see how each part of the lab actually runs.
        </p>

        <div className="crc-cards-row">
          {MISSION_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              className="crc-card-vertical crc-section-dark crc-pillar-card text-left w-full"
              onClick={() => setSelectedPillar(pillar)}
              aria-haspopup="dialog"
            >
              <span className="crc-caption mb-3 block">{pillar.caption}</span>
              <h3 className="text-[clamp(22px,2.5vw,28px)] font-normal leading-[1.1] tracking-tight mb-4 whitespace-pre-line flex-1">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--crc-text-body)] leading-relaxed mb-6">
                {pillar.description}
              </p>
              <span className="crc-pillar-card-hint text-sm font-medium mt-auto">
                Tap to expand →
              </span>
            </button>
          ))}
        </div>
      </div>

      <PillarModal pillar={selectedPillar} onClose={closeDetail} />
    </section>
  )
}
