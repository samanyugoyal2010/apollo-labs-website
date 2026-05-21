import { RESEARCH_TAGS } from '@/lib/data'

export default function ResearchTags() {
  const tags = [...RESEARCH_TAGS, ...RESEARCH_TAGS]

  return (
    <div className="mt-16 border-t border-[var(--apollo-border)] pt-12">
      <p className="apollo-caption text-center mb-6">
        Research areas we explore
      </p>
      <div className="apollo-tags-viewport">
        <div className="apollo-tags-track">
          {tags.map((tag, i) => (
            <span key={`${tag}-${i}`} className="apollo-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
