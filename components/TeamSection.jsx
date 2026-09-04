import { OFFICIAL_CLUB_RECORD_URL, TEAM_MEMBERS } from '@/lib/data'

function PeopleList({ people }) {
  return (
    <ul className="crc-people-list">
      {people.map((person, index) => (
        <li key={person.id}>
          <span className="crc-person-index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="crc-person-name">{person.name}</span>
          <span className="crc-person-role">{person.role}</span>
          <span className="crc-person-context">{person.context}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TeamSection() {
  const leadership = TEAM_MEMBERS.filter((person) => person.kind === 'leadership')
  const founders = TEAM_MEMBERS.filter((person) => person.kind === 'founder')

  return (
    <section id="people" className="crc-people" data-scene="people">
      <div className="crc-page-frame">
        <div className="crc-section-heading crc-section-heading-light">
          <p className="crc-eyebrow">People</p>
          <h2>The names attached to the work.</h2>
          <p>
            School leadership and founding roles are listed separately so ownership
            remains clear.
          </p>
        </div>

        <div className="crc-people-groups">
          <section aria-labelledby="school-leadership">
            <div className="crc-people-group-heading">
              <h3 id="school-leadership">Current school leadership</h3>
              <a
                href={OFFICIAL_CLUB_RECORD_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official club record <span aria-hidden>↗</span>
              </a>
            </div>
            <PeopleList people={leadership} />
          </section>

          <section aria-labelledby="founding-team">
            <div className="crc-people-group-heading">
              <h3 id="founding-team">Founding team</h3>
              <span>CRC origin</span>
            </div>
            <PeopleList people={founders} />
          </section>
        </div>
      </div>
    </section>
  )
}
