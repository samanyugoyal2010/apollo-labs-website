import Link from 'next/link'
import { FOOTER_LINKS, FOUNDERS } from '@/lib/data'

export default function Footer() {
  const founderNames = FOUNDERS.map((f) => f.name).join(', ')

  return (
    <footer className="apollo-footer">
      <div className="apollo-container">
        <div className="mb-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="mb-2 text-lg font-semibold text-[var(--apollo-text)]">
              Apollo Labs
            </p>
            <p className="apollo-body-sm max-w-xs">
              Student-led collaborative research for high school students. Founded
              by {founderNames}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="apollo-caption mb-4 text-[var(--apollo-text-faint)]">
                  {group}
                </p>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="apollo-footer-link">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-y-4 border-t border-[var(--apollo-border)] pt-8 apollo-body-sm text-[var(--apollo-text-body)]">
          <span>© Apollo Labs 2026</span>
          <span className="text-[var(--apollo-text-faint)]">
            Samanyu Goyal · Ram Rithvik Pagadala · Ashmit Pai
          </span>
        </div>
      </div>
    </footer>
  )
}
