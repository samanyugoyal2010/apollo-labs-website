import { confirmationEmail, reviewEmail } from '@/lib/emails'
import { SUBMISSION_FIELDS } from '@/lib/data'

/**
 * Paper submissions → email, via Resend's REST API.
 *
 * Called directly with fetch rather than through the `resend` SDK: it is one
 * POST, and the site otherwise ships no server dependencies.
 *
 * Env:
 *   RESEND_API_KEY  required — without it the route returns 503 and the form
 *                   tells the student to email instead, so a missing key
 *                   degrades to the old mailto behaviour rather than a dead end.
 *   RESEND_FROM     optional — "Apollo Labs <papers@yourdomain.com>". Until a
 *                   domain is verified in Resend, the default sender can only
 *                   deliver to the account owner, so the reviewer copy arrives
 *                   and the student confirmation does not. That is why a failed
 *                   confirmation never fails the request.
 */

export const runtime = 'nodejs'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'Apollo Labs <onboarding@resend.dev>'

const LIMITS = {
  name: 120,
  email: 200,
  authors: 400,
  school: 200,
  field: 80,
  title: 250,
  paperUrl: 800,
  extraUrl: 800,
  abstract: 4000,
  notes: 2000,
}

// Best effort only: serverless instances come and go, so this stops a single
// client hammering one warm instance, not a distributed flood.
const RATE_WINDOW_MS = 60 * 60 * 1000
const RATE_MAX = 5
const recent = new Map()

function rateLimited(key) {
  const now = Date.now()
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (hits.length >= RATE_MAX) return true
  hits.push(now)
  recent.set(key, hits)
  if (recent.size > 500) {
    for (const [k, v] of recent) if (v.every((t) => now - t >= RATE_WINDOW_MS)) recent.delete(k)
  }
  return false
}

const clean = (value) => (typeof value === 'string' ? value.trim() : '')

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

function isHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validate(body) {
  const submission = Object.fromEntries(
    Object.keys(LIMITS).map((key) => [key, clean(body?.[key])])
  )
  const errors = {}

  if (!submission.name) errors.name = 'Tell us who you are.'
  if (!isEmail(submission.email)) errors.email = 'We need a valid email to reply to.'
  if (!submission.authors) errors.authors = 'List every author on the paper.'
  if (!submission.school) errors.school = 'Which school are you at?'
  if (!SUBMISSION_FIELDS.includes(submission.field)) errors.field = 'Pick a field.'
  if (submission.title.length < 4) errors.title = 'Give the paper its title.'
  if (!isHttpUrl(submission.paperUrl)) {
    errors.paperUrl = 'Paste a link that opens the PDF — Drive, Docs, or anywhere public.'
  }
  if (submission.extraUrl && !isHttpUrl(submission.extraUrl)) {
    errors.extraUrl = 'That does not look like a link.'
  }
  if (submission.abstract.length < 200) {
    errors.abstract = 'Abstracts run about 150–250 words. Give us a bit more.'
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    if (submission[key].length > max) errors[key] = `Keep this under ${max} characters.`
  }

  return { submission, errors }
}

async function send(message, from) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [message.to],
      subject: message.subject,
      reply_to: message.replyTo,
      html: message.html,
      text: message.text,
    }),
  })

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`)
  }
  return res.json()
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: 'Submissions are not configured yet. Please email us instead.' },
      { status: 503 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Hidden field: real people leave it empty, bots fill everything in.
  if (clean(body?.website)) return Response.json({ ok: true })

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return Response.json(
      { error: 'That is a lot of submissions. Try again later, or email us.' },
      { status: 429 }
    )
  }

  const { submission, errors } = validate(body)
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 })
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM

  try {
    await send(reviewEmail(submission), from)
  } catch (error) {
    console.error('[submit-paper] review email failed', error)
    return Response.json(
      { error: 'We could not send that just now. Please email us directly.' },
      { status: 502 }
    )
  }

  // The reviewer has it, so the submission succeeded. A bounced receipt — the
  // usual cause being an unverified sending domain — must not tell the student
  // their paper did not go through.
  let confirmed = true
  try {
    await send(confirmationEmail(submission), from)
  } catch (error) {
    confirmed = false
    console.error('[submit-paper] confirmation email failed', error)
  }

  return Response.json({ ok: true, confirmed })
}
