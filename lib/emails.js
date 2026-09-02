import { REVIEW_EMAIL } from '@/lib/data'
import { SITE_NAME, SITE_URL } from '@/lib/site'

/**
 * Email bodies for the paper submission flow.
 *
 * There is no database and no admin panel: the review email carries pre-written
 * Approve / Request-changes replies as mailto links, so approving a paper is
 * one tap in whatever mail client the reviewer already has open.
 */

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const BRAND = '#2563eb'
const INK = '#0a0a0a'
const MUTED = '#5a5a5a'

function shell(inner) {
  return `<!doctype html><html><body style="margin:0;padding:32px 16px;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid rgba(0,0,0,0.08);">
    <tr><td style="padding:32px 32px 36px;">${inner}</td></tr>
  </table>
  <p style="max-width:640px;margin:16px auto 0;font-size:12px;color:#8a8a8a;text-align:center;">${SITE_NAME} · ${SITE_URL}</p>
</body></html>`
}

function heading(text, kicker) {
  return `${kicker ? `<p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};">${escapeHtml(kicker)}</p>` : ''}
  <h1 style="margin:0 0 20px;font-size:24px;line-height:1.25;font-weight:600;color:${INK};">${escapeHtml(text)}</h1>`
}

function row(label, value, { link = false } = {}) {
  if (!value) return ''
  const safe = escapeHtml(value)
  const rendered = link
    ? `<a href="${safe}" style="color:${BRAND};word-break:break-all;">${safe}</a>`
    : safe
  return `<tr>
    <td style="padding:8px 16px 8px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:15px;color:${INK};vertical-align:top;">${rendered}</td>
  </tr>`
}

function button(href, text, { solid = true } = {}) {
  const style = solid
    ? `background:${INK};color:#ffffff;border:1px solid ${INK};`
    : `background:#ffffff;color:${INK};border:1px solid rgba(0,0,0,0.16);`
  return `<a href="${href}" style="display:inline-block;padding:12px 20px;border-radius:9999px;font-size:14px;font-weight:600;text-decoration:none;${style}">${escapeHtml(text)}</a>`
}

const mailto = (to, subject, body) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

/** The reply that goes out when a submission is approved. */
export function approvalReply(submission) {
  return `Hi ${submission.name},

Good news — your submission to ${SITE_NAME} has been approved for publication.

  ${submission.title}

Two things to send back so we can put it in the gallery:

  1. The final PDF of your paper (attach it to this email, or reply with a link
     that anyone can open).
  2. Your final abstract, 150-250 words, written so a curious non-specialist can
     follow it. This is what readers see before they open the paper.

Optional but encouraged: one figure or chart from the paper to use as the cover
image in the gallery.

Once we have those, your paper goes live at ${SITE_URL}/projects/ with its own
shareable link, and we announce it in the Discord.

Congratulations,
${SITE_NAME}`
}

/** The reply that asks for another pass before publication. */
export function changesReply(submission) {
  return `Hi ${submission.name},

Thanks for sending "${submission.title}" to ${SITE_NAME}. We read it closely, and
we would like one more pass before it goes in the gallery.

What to revise:

  -
  -

Send the revised version back to this address and we will take another look. This
is a normal part of the process, not a rejection — most papers go through it.

${SITE_NAME}`
}

/** What lands in the reviewer's inbox when a student submits. */
export function reviewEmail(submission) {
  const subject = `Re: Your Apollo Labs submission — ${submission.title}`
  const approve = mailto(submission.email, subject, approvalReply(submission))
  const changes = mailto(submission.email, subject, changesReply(submission))

  const abstract = escapeHtml(submission.abstract).replace(/\n/g, '<br>')
  const notes = submission.notes
    ? `<h2 style="margin:28px 0 10px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">Notes from the author</h2>
       <p style="margin:0;font-size:15px;line-height:1.6;color:${INK};">${escapeHtml(submission.notes).replace(/\n/g, '<br>')}</p>`
    : ''

  const html = shell(`
    ${heading(submission.title, 'New paper submission')}

    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${row('Authors', submission.authors)}
      ${row('School', submission.school)}
      ${row('Field', submission.field)}
      ${row('Contact', submission.email)}
      ${row('Paper', submission.paperUrl, { link: true })}
      ${row('Extras', submission.extraUrl, { link: true })}
    </table>

    <h2 style="margin:28px 0 10px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};">Abstract</h2>
    <p style="margin:0;font-size:15px;line-height:1.65;color:${INK};">${abstract}</p>

    ${notes}

    <hr style="margin:32px 0 24px;border:none;border-top:1px solid rgba(0,0,0,0.08);">

    <p style="margin:0 0 16px;font-size:14px;color:${MUTED};">
      Both buttons open a pre-written reply to ${escapeHtml(submission.name)}. Read it,
      edit anything you want, and send.
    </p>
    <p style="margin:0;">
      ${button(approve, 'Approve and reply')}
      &nbsp;
      ${button(changes, 'Request changes', { solid: false })}
    </p>
  `)

  const text = [
    `New paper submission — ${submission.title}`,
    '',
    `Authors: ${submission.authors}`,
    `School: ${submission.school}`,
    `Field: ${submission.field}`,
    `Contact: ${submission.email}`,
    `Paper: ${submission.paperUrl}`,
    submission.extraUrl ? `Extras: ${submission.extraUrl}` : '',
    '',
    'Abstract:',
    submission.abstract,
    submission.notes ? `\nNotes:\n${submission.notes}` : '',
    '',
    `Approve: ${approve}`,
    `Request changes: ${changes}`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    to: REVIEW_EMAIL,
    subject: `[Apollo Labs] Submission — ${submission.title}`,
    replyTo: submission.email,
    html,
    text,
  }
}

/** The receipt the student gets, so a submission never feels like a void. */
export function confirmationEmail(submission) {
  const html = shell(`
    ${heading('We have your paper.', 'Submission received')}

    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${INK};">
      Thanks, ${escapeHtml(submission.name)} — <strong>${escapeHtml(submission.title)}</strong>
      is in the review queue at ${SITE_NAME}.
    </p>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${MUTED};">
      A member of the team reads every submission by hand, so give us about a week.
      You will hear back either way: approved and scheduled for the gallery, or with
      specific notes on what to revise. Revisions are normal — most papers get them.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:${MUTED};">
      Anything to add in the meantime? Just reply to this email.
    </p>

    <p style="margin:0;">${button(`${SITE_URL}/#projects`, 'See the gallery')}</p>
  `)

  const text = `We have your paper.

Thanks, ${submission.name} — "${submission.title}" is in the review queue at ${SITE_NAME}.

A member of the team reads every submission by hand, so give us about a week. You
will hear back either way: approved and scheduled for the gallery, or with specific
notes on what to revise. Revisions are normal — most papers get them.

Anything to add in the meantime? Just reply to this email.

${SITE_URL}/#projects`

  return {
    to: submission.email,
    subject: `We have your paper — ${submission.title}`,
    replyTo: REVIEW_EMAIL,
    html,
    text,
  }
}
