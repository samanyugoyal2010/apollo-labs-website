import ApolloMark from '@/components/ApolloMark'

/**
 * The full lockup: mark + wordmark. "Apollo" is set in the display serif the
 * rest of the site headlines in; "Labs" is the tracked sans qualifier, so the
 * name reads as a proper noun with a role attached rather than one flat string.
 *
 * size="sm" — nav, footer
 * size="lg" — intro sequence
 */
export default function ApolloLogo({ className = '', size = 'sm' }) {
  return (
    <span className={`apollo-logo apollo-logo-${size} ${className}`}>
      <ApolloMark className="apollo-logo-mark" />
      <span className="apollo-logo-type">
        <span className="apollo-logo-name">Apollo</span>
        <span className="apollo-logo-suffix">Labs</span>
      </span>
    </span>
  )
}
