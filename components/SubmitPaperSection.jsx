'use client'

import { useState } from 'react'
import {
  CONTACT_EMAIL,
  DISCORD_URL,
  SUBMISSION_CHECKLIST,
  SUBMISSION_FIELDS,
} from '@/lib/data'

const EMPTY = {
  name: '',
  email: '',
  authors: '',
  school: '',
  field: SUBMISSION_FIELDS[0],
  title: '',
  paperUrl: '',
  extraUrl: '',
  abstract: '',
  notes: '',
  website: '', // honeypot
}

const WORDS = (text) => text.trim().split(/\s+/).filter(Boolean).length

/** How review works, spelled out so the wait afterwards is not a mystery. */
const STEPS = [
  {
    n: '01',
    title: 'You submit',
    body: 'Abstract, authors, and a link to your PDF. Takes a few minutes.',
  },
  {
    n: '02',
    title: 'We read it',
    body: 'A person on the team reads every submission by hand. Expect about a week.',
  },
  {
    n: '03',
    title: 'You hear back',
    body: 'Approved, or approved with notes to revise first. Revisions are normal.',
  },
  {
    n: '04',
    title: 'It goes live',
    body: 'Your paper gets a page in the gallery with its own shareable link.',
  },
]

export default function SubmitPaperSection() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [message, setMessage] = useState('')

  const set = (key) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const abstractWords = WORDS(form.abstract)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setErrors({})
    setMessage('')

    try {
      const res = await fetch('/api/submit-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus('sent')
        setMessage(
          data.confirmed
            ? 'Check your inbox — we sent a receipt with what happens next.'
            : 'Your paper is with the review team.'
        )
        setForm(EMPTY)
        return
      }

      if (data.errors) {
        setErrors(data.errors)
        setStatus('error')
        setMessage('A few fields need another look.')
        return
      }

      setStatus('error')
      setMessage(data.error ?? 'Something went wrong on our end.')
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Check your connection and try again.')
    }
  }

  if (status === 'sent') {
    return (
      <section id="submit" className="apollo-section apollo-submit-section">
        <div className="apollo-container">
          <div className="apollo-submit-success" role="status">
            <span className="apollo-caption mb-4 block">Submission received</span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-normal leading-[1.1] tracking-tight mb-4">
              Your paper is in the queue.
            </h2>
            <p className="apollo-body max-w-lg mb-8">{message}</p>
            <div className="apollo-submit-success-actions">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apollo-hero-cta"
              >
                Join the Discord <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                className="apollo-link text-sm font-medium"
                onClick={() => {
                  setStatus('idle')
                  setMessage('')
                }}
              >
                Submit another paper →
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="submit" className="apollo-section apollo-submit-section">
      <div className="apollo-container">
        <span className="apollo-caption mb-4 block">Publish with us</span>
        <h2 className="text-[clamp(28px,4vw,48px)] font-normal leading-[1.08] tracking-tight mb-4 max-w-2xl">
          Put your research in the gallery
        </h2>
        <p className="apollo-body max-w-xl mb-12">
          Finished a paper or a project write-up? Send it over. If it clears review, it
          gets its own page here — a real, citable link you can put on an application,
          send to a teacher, or share with anyone who asks what you have been working on.
        </p>

        <ol className="apollo-submit-steps mb-14">
          {STEPS.map((step) => (
            <li key={step.n} className="apollo-submit-step">
              <span className="apollo-submit-step-n">{step.n}</span>
              <h3 className="apollo-submit-step-title">{step.title}</h3>
              <p className="apollo-submit-step-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="apollo-submit-panel">
          <aside className="apollo-submit-aside">
            <h3 className="text-xl font-normal tracking-tight mb-4">
              Before you send
            </h3>
            <ul className="apollo-submit-checklist">
              {SUBMISSION_CHECKLIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="apollo-body-sm mt-6">
              Not there yet? Bring the draft to{' '}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apollo-link"
              >
                the Discord
              </a>{' '}
              and get it read first.
            </p>
          </aside>

          <form className="apollo-submit-form" onSubmit={handleSubmit} noValidate>
            <div className="apollo-contact-form-row">
              <Field
                id="sub-name"
                label="Your name"
                value={form.name}
                onChange={set('name')}
                error={errors.name}
                autoComplete="name"
                placeholder="Your name"
                required
              />
              <Field
                id="sub-email"
                label="Your email"
                type="email"
                value={form.email}
                onChange={set('email')}
                error={errors.email}
                autoComplete="email"
                placeholder="you@school.edu"
                required
              />
            </div>

            <div className="apollo-contact-form-row">
              <Field
                id="sub-authors"
                label="All authors"
                value={form.authors}
                onChange={set('authors')}
                error={errors.authors}
                placeholder="Comma-separated, in the order they should appear"
                required
              />
              <Field
                id="sub-school"
                label="School"
                value={form.school}
                onChange={set('school')}
                error={errors.school}
                placeholder="Your high school"
                required
              />
            </div>

            <label className="apollo-contact-field" htmlFor="sub-field">
              <span>Field of research</span>
              <select id="sub-field" value={form.field} onChange={set('field')}>
                {SUBMISSION_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>

            <Field
              id="sub-title"
              label="Paper title"
              value={form.title}
              onChange={set('title')}
              error={errors.title}
              placeholder="The title as it appears on the paper"
              required
            />

            <Field
              id="sub-paper"
              label="Link to your PDF"
              type="url"
              value={form.paperUrl}
              onChange={set('paperUrl')}
              error={errors.paperUrl}
              placeholder="https://drive.google.com/..."
              hint="Google Drive, Docs, Dropbox — anywhere we can open it. Check that sharing is on."
              required
            />

            <Field
              id="sub-extra"
              label="Code, data, or figures"
              type="url"
              value={form.extraUrl}
              onChange={set('extraUrl')}
              error={errors.extraUrl}
              placeholder="https://github.com/... (optional)"
            />

            <label className="apollo-contact-field" htmlFor="sub-abstract">
              <span>
                Abstract{' '}
                <span className="apollo-field-counter">
                  {abstractWords} {abstractWords === 1 ? 'word' : 'words'} · aim for 150–250
                </span>
              </span>
              <textarea
                id="sub-abstract"
                rows={8}
                value={form.abstract}
                onChange={set('abstract')}
                placeholder="What question did you ask, how did you go about answering it, and what did you find? Write it for a curious reader outside your field."
                aria-invalid={!!errors.abstract}
                required
              />
              {errors.abstract && (
                <span className="apollo-field-error">{errors.abstract}</span>
              )}
            </label>

            <label className="apollo-contact-field" htmlFor="sub-notes">
              <span>Anything else we should know</span>
              <textarea
                id="sub-notes"
                rows={3}
                value={form.notes}
                onChange={set('notes')}
                placeholder="Mentors, competitions it was entered in, parts you are unsure about... (optional)"
              />
            </label>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div className="apollo-honeypot" aria-hidden>
              <label htmlFor="sub-website">Website</label>
              <input
                id="sub-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={set('website')}
              />
            </div>

            <div className="apollo-submit-actions">
              <button
                type="submit"
                className="apollo-hero-cta"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Submit for review'}
              </button>
              <p className="apollo-submit-fineprint">
                Or email it to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="apollo-link">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <p
              className={`apollo-form-status ${
                status === 'error' ? 'apollo-form-status-error' : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, hint, type = 'text', ...props }) {
  return (
    <label className="apollo-contact-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} type={type} aria-invalid={!!error} {...props} />
      {hint && !error && <span className="apollo-field-hint">{hint}</span>}
      {error && <span className="apollo-field-error">{error}</span>}
    </label>
  )
}
