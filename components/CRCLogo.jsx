import CRCMark from '@/components/CRCMark'

/**
 * The full lockup uses the short club name and its Cal High affiliation.
 *
 * size="sm" — nav, footer
 * size="lg" — intro sequence
 */
export default function CRCLogo({ className = '', size = 'sm' }) {
  return (
    <span className={`crc-logo crc-logo-${size} ${className}`}>
      <CRCMark className="crc-logo-mark" />
      <span className="crc-logo-type">
        <span className="crc-logo-name">CRC</span>
        <span className="crc-logo-suffix">Cal High</span>
      </span>
    </span>
  )
}
