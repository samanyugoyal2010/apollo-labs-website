import { TEAM, initials, type Member } from "@/lib/team";
import { Reveal } from "@/components/ui/Reveal";

function MemberCard({ member }: { member: Member }) {
  return (
    <Reveal as="li" className="h-full">
      <article className="group relative flex h-full min-h-72 flex-col overflow-hidden border border-hairline bg-card p-6 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-signal/45 hover:bg-card-hover md:p-8">
        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden="true"
            className="mono-label flex size-14 shrink-0 items-center justify-center border border-hairline-strong text-paper-dim transition-[border-color,color,background-color] duration-300 group-hover:border-signal group-hover:bg-signal/[0.08] group-hover:text-signal-text"
          >
            {initials(member.name)}
          </span>
        </div>

        <div className="mt-auto pt-10">
          <p className="mono-label text-signal-text">{member.role}</p>
          <h4 className="t-sub mt-3 text-paper">{member.name}</h4>
        </div>

        <span
          aria-hidden="true"
          className="mt-auto block pt-8 text-right text-xs text-faint transition-colors duration-300 group-hover:text-signal-text"
        >
          ◆
        </span>
      </article>
    </Reveal>
  );
}

function TeamGroup({
  label,
  description,
  members,
}: {
  label: string;
  description: string;
  members: Member[];
}) {
  return (
    <section aria-labelledby={`team-${label.toLowerCase()}`}>
      <div className="flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3
            id={`team-${label.toLowerCase()}`}
            className="mono-label text-signal-text"
          >
            {label}
          </h3>
          <p className="t-sub mt-3 text-paper">{description}</p>
        </div>
        <span className="mono-label text-faint">
          {String(members.length).padStart(2, "0")}{" "}
          {members.length === 1 ? "person" : "people"}
        </span>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </ul>
    </section>
  );
}

export function TeamGrid() {
  const founders = TEAM.filter((member) => member.group === "Founders");
  const engineering = TEAM.filter((member) => member.group === "Engineering");

  return (
    <section
      id="directory"
      className="gutter scroll-mt-20 border-b border-hairline py-20 md:py-28"
    >
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mono-label flex gap-3 text-muted">
                <span className="text-signal-text">01</span>
                <span>Directory</span>
              </p>
              <h2 className="t-section mt-6 max-w-[15ch] text-paper">
                Clear roles. One shared standard.
              </h2>
            </div>
            <p className="t-lead max-w-[42ch] text-paper-dim lg:col-span-6 lg:col-start-7 lg:mt-11">
              Apollo is led, engineered, and reviewed by students who are also
              doing the work themselves.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          <TeamGroup
            label="Founders"
            description="Direction, review, and member support."
            members={founders}
          />
          <TeamGroup
            label="Engineering"
            description="The platform and publication infrastructure."
            members={engineering}
          />
        </div>
      </div>
    </section>
  );
}
