import CRCMark from '@/components/CRCMark'

export default function CRCLogo({ className = '', priority = false }) {
  return (
    <span className={`crc-logo ${className}`}>
      <CRCMark className="crc-logo-mark" sizes="44px" priority={priority} />
      <span className="crc-logo-type">
        <span className="crc-logo-name">CRC</span>
        <span className="crc-logo-full">Collaborative Research Club</span>
      </span>
    </span>
  )
}
