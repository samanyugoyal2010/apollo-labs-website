'use client'

import { useState } from 'react'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import DiscordIcon from '@/components/DiscordIcon'
import {
  CONTACT_EMAIL,
  DISCORD_PERKS,
  DISCORD_URL,
  JOIN_OPTIONS,
} from '@/lib/data'

function buildMailto({ name, email, interest, message }) {
  const subject = encodeURIComponent(
    `[Apollo Labs] ${interest || 'Join request'} — ${name || 'New message'}`
  )
  const body = encodeURIComponent(
    `Name: ${name || '—'}\nEmail: ${email || '—'}\nInterested in: ${interest || '—'}\n\n${message || ''}`
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

function JoinOptionLink({ option }) {
  if (option.action === 'discord') {
    return (
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="crc-link text-sm font-medium mt-auto"
      >
        {option.cta} →
      </a>
    )
  }

  return (
    <a
      href={buildMailto({
        name: '',
        email: '',
        interest: option.title,
        message: `Hi Apollo Labs,\n\nI'm interested in: ${option.title}\n\n`,
      })}
      className="crc-link text-sm font-medium mt-auto"
    >
      {option.cta} →
    </a>
  )
}

export default function JoinUsSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: JOIN_OPTIONS[0].title,
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = buildMailto(form)
  }

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <section id="join-us" className="crc-section crc-join-section">
      <div className="crc-container">
        <span className="crc-caption mb-4 block">Join us</span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4 max-w-xl">
          Find your place at Apollo Labs
        </h2>
        <p className="crc-body max-w-lg mb-10">
          Our Discord is the front door. It&apos;s where projects get staffed, drafts get
          read, and the whole team actually talks to each other.
        </p>

        <div className="crc-discord-panel mb-12">
          <div className="crc-discord-panel-glow" aria-hidden />
          <div className="crc-discord-panel-body">
            <div className="crc-discord-panel-main">
              <span className="crc-discord-badge">
                <DiscordIcon className="h-4 w-4" />
                Community
              </span>
              <h3 className="crc-discord-title">
                Everything happens on Discord.
              </h3>
              <p className="crc-discord-lede">
                Join the server to meet the team, follow live project channels, and jump
                into whichever research you care about. No application, no waiting list —
                introduce yourself and start contributing.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="crc-discord-cta crc-discord-cta-lg"
              >
                <DiscordIcon className="h-5 w-5" />
                Join the Apollo Labs Discord
              </a>
              <p className="crc-discord-meta">
                Free · Based at Cal High
              </p>
            </div>

            <ul className="crc-discord-perks">
              {DISCORD_PERKS.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="crc-cards-row mb-16">
          {JOIN_OPTIONS.map((option) => (
            <div key={option.id} className="crc-card-vertical crc-join-card">
              <h3 className="text-xl font-normal tracking-tight text-[var(--crc-text)] mb-3">
                {option.title}
              </h3>
              <p className="crc-body-sm leading-relaxed flex-1 mb-6">
                {option.description}
              </p>
              <JoinOptionLink option={option} />
            </div>
          ))}
        </div>

        <div id="get-involved" className="crc-contact-panel">
          <div className="crc-contact-schedule">
            <div className="crc-contact-schedule-header">
              <span className="crc-caption mb-3 block">Schedule</span>
              <h3 className="text-[clamp(24px,3vw,32px)] font-normal leading-tight tracking-tight mb-3">
                Book a meeting
              </h3>
              <p className="crc-body-sm max-w-lg">
                Prefer to talk one-on-one first? Pick a time that works for you — we&apos;ll
                walk through how you can join Apollo Labs or answer any questions.
              </p>
            </div>
            <CalendlyEmbed />
          </div>

          <hr className="crc-contact-divider" />

          <div className="crc-contact-top">
            <div className="crc-contact-intro">
              <span className="crc-caption mb-3 block">Contact</span>
              <h3 className="text-[clamp(24px,3vw,32px)] font-normal leading-tight tracking-tight mb-3">
                Let&apos;s talk
              </h3>
              <p className="crc-body-sm max-w-sm mb-6">
                Send us a message — it opens your email app ready to send. Or email us
                directly anytime.
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="crc-contact-email">
                <span className="crc-contact-email-label">Email us</span>
                <span className="crc-contact-email-address">{CONTACT_EMAIL}</span>
              </a>
            </div>

            <form className="crc-contact-form" onSubmit={handleSubmit}>
              <div className="crc-contact-form-row">
                <label className="crc-contact-field" htmlFor="crc-field-name">
                  <span>Name</span>
                  <input
                    id="crc-field-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="name"
                  />
                </label>
                <label className="crc-contact-field" htmlFor="crc-field-email">
                  <span>Email</span>
                  <input
                    id="crc-field-email"
                    type="email"
                    name="email"
                    placeholder="you@school.edu"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="crc-contact-field" htmlFor="crc-field-interest">
                <span>I&apos;m interested in</span>
                <select
                  id="crc-field-interest"
                  name="interest"
                  value={form.interest}
                  onChange={set('interest')}
                >
                  {JOIN_OPTIONS.map((o) => (
                    <option key={o.id} value={o.title}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crc-contact-field" htmlFor="crc-field-message">
                <span>Message</span>
                <textarea
                  id="crc-field-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us a bit about yourself and what you'd like to do..."
                  value={form.message}
                  onChange={set('message')}
                />
              </label>
              <button type="submit" className="crc-hero-cta w-full sm:w-auto">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
