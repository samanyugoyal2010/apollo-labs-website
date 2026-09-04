import ApolloMark from '@/components/ApolloMark'

/**
 * The full lockup: mark + wordmark. "Apollo" is set in the display serif the
 * rest of the site headlines in; "Labs" is the tracked sans qualifier.
 *
 * size="sm" — nav, footer
 * size="lg" — intro sequence
 *
 * Layout classes stay on the existing `.crc-logo*` rules so the rest of the
 * site's spacing does not have to be duplicated.
 */
export default function ApolloLogo({ className = '', size = 'sm' }) {
  return (
    <span className={`crc-logo crc-logo-${size} ${className}`}>
      <ApolloMark className="crc-logo-mark" />
      <span className="crc-logo-type">
        <span className="crc-logo-name">Apollo</span>
        <span className="crc-logo-suffix">Labs</span>
      </span>
    </span>
  )
}
