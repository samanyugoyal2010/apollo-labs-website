import { RESEARCH_TAGS } from '@/lib/data'

export default function ResearchTags() {
  const tags = [...RESEARCH_TAGS, ...RESEARCH_TAGS]

  return (
    <div className="mt-12">
      <p className="text-center text-xs tracking-widest text-[var(--apollo-text-faint)] uppercase mb-4">
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
