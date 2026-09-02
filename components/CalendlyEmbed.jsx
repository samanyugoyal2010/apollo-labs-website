import { CALENDLY_URL } from '@/lib/data'

export default function CalendlyEmbed() {
  const embedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fafaf9&text_color=0a0a0a&primary_color=0a0a0a`

  return (
    <div className="crc-calendly-wrap">
      <iframe
        src={embedUrl}
        title="Schedule a meeting with Collaborative Research Club"
        className="crc-calendly-iframe"
        loading="lazy"
      />
    </div>
  )
}
