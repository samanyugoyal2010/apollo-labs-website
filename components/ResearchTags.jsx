import { RESEARCH_TAGS } from '@/lib/data'

export default function ResearchTags() {
  const tags = [...RESEARCH_TAGS, ...RESEARCH_TAGS]

  return (
    <div className="mt-16 border-t border-[var(--crc-border)] pt-12">
      <p className="crc-caption text-center mb-6">
        Research areas we explore
      </p>
      <div className="crc-tags-viewport">
        <div className="crc-tags-track">
          {tags.map((tag, i) => (
            <span key={`${tag}-${i}`} className="crc-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
