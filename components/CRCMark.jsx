import Image from 'next/image'

export default function CRCMark({
  className = '',
  title = '',
  priority = false,
  sizes = '96px',
}) {
  return (
    <span className={`crc-mark ${className}`} aria-hidden={title ? undefined : true}>
      <Image
        src="/brand/crc-dragon.png"
        alt={title}
        width={1312}
        height={1199}
        priority={priority}
        sizes={sizes}
        unoptimized
        className="crc-mark-image"
      />
    </span>
  )
}
