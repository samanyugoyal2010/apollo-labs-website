import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { Arrow, Button, ButtonLink } from "@/components/ui/Button";
import { readSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { TEAM, initials } from "@/lib/team";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Apollo Labs projects and account.",
};

type Profile = {
  full_name: string | null;
  email: string | null;
  graduation_year: number | null;
  role: "member" | "reviewer" | "admin";
};

type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  status: string;
  updated_at: string;
};

const DASHBOARD_SECTIONS = [
  { index: "01", label: "Overview", href: "#overview" },
  { index: "02", label: "Projects", href: "#projects" },
  { index: "03", label: "Team", href: "#team" },
  { index: "04", label: "Account", href: "#account" },
];

function formatRole(role: Profile["role"] | undefined) {
  if (!role) return "Member";
  return `${role[0].toUpperCase()}${role.slice(1)}`;
}

export default async function DashboardPage() {
  if (!readSupabaseConfig()) redirect("/signin");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const [
    { data: profile, error: profileError },
    { data: projects, error: projectsError },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name,email,graduation_year,role")
      .eq("id", user.id)
      .maybeSingle<Profile>(),
    supabase
      .from("projects")
      .select("id,slug,title,status,updated_at")
      .eq("created_by", user.id)
      .order("updated_at", { ascending: false })
      .returns<ProjectSummary[]>(),
  ]);

  const name =
    profile?.full_name ??
    String(
      user.user_metadata.full_name ??
        user.email?.split("@")[0] ??
        "Apollo member",
    );
  const email = profile?.email ?? user.email ?? "Not provided";
  const role = formatRole(profile?.role);
  const dataUnavailable = Boolean(profileError || projectsError);

  const projectCount = projects?.length ?? 0;

  return (
    <div className="min-h-[100dvh] bg-base pb-24 pt-24 md:pt-28">
      <nav
        aria-label="Dashboard sections"
        className="gutter sticky top-16 z-20 border-y border-hairline bg-base/95 backdrop-blur-md"
      >
        <ul className="shell-wide flex gap-1 overflow-x-auto py-2">
          {DASHBOARD_SECTIONS.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="group flex min-h-10 items-center gap-2 px-3 text-sm text-muted transition-colors hover:bg-paper/[0.04] hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal sm:px-4"
              >
                <span className="mono-label text-signal-text" aria-hidden="true">
                  {section.index}
                </span>
                <span>{section.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell-wide gutter">
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="scroll-mt-36 border-b border-hairline py-12 md:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <p className="mono-label flex items-center gap-3 text-muted">
                <span className="text-signal-text">01</span>
                <span>Overview</span>
              </p>
              <h1
                id="overview-heading"
                className="mt-6 max-w-[18ch] text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.96] tracking-[-0.05em] text-paper"
              >
                Welcome, {name}.
              </h1>
              <p className="mt-5 max-w-[58ch] text-lg leading-8 text-paper-dim">
                Your projects, the people behind Apollo, and your account are now
                organized into one workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#projects" size="lg" className="group">
                  View your projects <Arrow />
                </ButtonLink>
                <ButtonLink href="#team" size="lg" variant="secondary">
                  Meet the team
                </ButtonLink>
              </div>
            </div>

            <dl className="grid grid-cols-2 border border-hairline bg-surface/35 lg:col-span-4">
              <div className="border-r border-hairline p-5 md:p-6">
                <dt className="mono-label text-faint">Projects</dt>
                <dd className="mt-4 text-3xl tracking-[-0.04em] text-paper">
                  {String(projectCount).padStart(2, "0")}
                </dd>
              </div>
              <div className="p-5 md:p-6">
                <dt className="mono-label text-faint">Role</dt>
                <dd className="mt-4 text-base text-paper">{role}</dd>
              </div>
            </dl>
          </div>

          {dataUnavailable && (
            <div
              className="mt-10 border border-signal/40 bg-signal/[0.06] p-5 text-sm leading-6 text-paper-dim"
              role="alert"
            >
              Your account is active, but the Apollo project database is not
              available yet. An administrator needs to apply the Supabase
              migration.
            </div>
          )}
        </section>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="scroll-mt-36 border-b border-hairline py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="mono-label flex items-center gap-3 text-muted">
                <span className="text-signal-text">02</span>
                <span>Projects</span>
              </p>
              <h2
                id="projects-heading"
                className="mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.04em] text-paper"
              >
                Your work, in one place.
              </h2>
              <p className="mt-5 max-w-[36ch] text-base leading-7 text-paper-dim">
                Follow every project from its latest update through publication.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
                <span className="mono-label text-faint">Current projects</span>
                <span className="mono-label text-signal-text">
                  {String(projectCount).padStart(2, "0")} total
                </span>
              </div>

              {projects?.length ? (
                <ol className="divide-y divide-hairline">
                  {projects.map((project, index) => (
                    <li
                      key={project.id}
                      className="grid gap-4 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center"
                    >
                      <span className="mono-label text-faint" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-lg font-medium text-paper">
                          {project.title}
                        </p>
                        <p className="mt-2 text-sm text-faint">
                          Updated{" "}
                          {new Date(project.updated_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                      <span className="mono-label w-fit border border-hairline px-2.5 py-2 text-muted">
                        {project.status.replaceAll("_", " ")}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="border-b border-hairline py-12">
                  <p className="text-lg text-paper">No projects yet.</p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                    Your account and publishing identity are ready for your first
                    Apollo project.
                  </p>
                </div>
              )}

              <div className="mt-7">
                <ButtonLink href="/explore" variant="secondary" className="group">
                  Browse the public archive <Arrow />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section
          id="team"
          aria-labelledby="team-heading"
          className="scroll-mt-36 border-b border-hairline py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="mono-label flex items-center gap-3 text-muted">
                <span className="text-signal-text">03</span>
                <span>Team</span>
              </p>
              <h2
                id="team-heading"
                className="mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.04em] text-paper"
              >
                The people behind Apollo.
              </h2>
              <p className="mt-5 max-w-[38ch] text-base leading-7 text-paper-dim">
                Know who is shaping the organization and where each person is
                focused.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid border-l border-t border-hairline sm:grid-cols-2">
                {TEAM.map((member, index) => (
                  <li
                    key={member.name}
                    className="group border-b border-r border-hairline p-6 transition-colors duration-300 hover:bg-surface/45 md:p-7"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span
                        aria-hidden="true"
                        className="mono-label flex size-12 shrink-0 items-center justify-center border border-hairline text-paper-dim transition-colors duration-300 group-hover:border-signal group-hover:bg-signal/[0.07] group-hover:text-signal-text"
                      >
                        {initials(member.name)}
                      </span>
                      <span className="mono-label text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium tracking-[-0.02em] text-paper">
                      {member.name}
                    </h3>
                    <p className="mono-label mt-3 text-signal-text">
                      {member.role}
                    </p>
                    <p className="mt-5 text-sm leading-6 text-muted">
                      {member.focus}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <ButtonLink href="/community" variant="secondary" className="group">
                  How the community works <Arrow />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section
          id="account"
          aria-labelledby="account-heading"
          className="scroll-mt-36 py-16 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="mono-label flex items-center gap-3 text-muted">
                <span className="text-signal-text">04</span>
                <span>Account &amp; resources</span>
              </p>
              <h2
                id="account-heading"
                className="mt-6 text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.04em] text-paper"
              >
                Your member details.
              </h2>
              <p className="mt-5 max-w-[36ch] text-base leading-7 text-paper-dim">
                Review the identity attached to your Apollo work, then jump into
                the organization&apos;s public resources.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
              <div className="border border-hairline bg-surface/35 p-6 md:p-8">
                <p className="mono-label text-signal-text">Account</p>
                <dl className="mt-7 divide-y divide-hairline border-y border-hairline text-sm">
                  <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="text-faint">Name</dt>
                    <dd className="text-paper">{name}</dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="text-faint">Email</dt>
                    <dd className="break-all text-paper">{email}</dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="text-faint">Role</dt>
                    <dd className="text-paper">{role}</dd>
                  </div>
                  {profile?.graduation_year && (
                    <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                      <dt className="text-faint">Class</dt>
                      <dd className="text-paper">
                        {profile.graduation_year}
                      </dd>
                    </div>
                  )}
                </dl>
                <form action={signOut} className="mt-7">
                  <Button type="submit" variant="secondary" size="sm">
                    Sign out
                  </Button>
                </form>
              </div>

              <aside className="border border-hairline p-6 md:p-8">
                <p className="mono-label text-signal-text">Resources</p>
                <h3 className="mt-7 text-2xl tracking-[-0.025em] text-paper">
                  Keep moving through Apollo.
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Explore published projects or revisit how membership and review
                  work.
                </p>
                <div className="mt-8 flex flex-col items-stretch gap-3">
                  <ButtonLink href="/explore" className="group justify-between">
                    Explore projects <Arrow />
                  </ButtonLink>
                  <ButtonLink
                    href="/community"
                    variant="secondary"
                    className="justify-between"
                  >
                    Community guide <Arrow />
                  </ButtonLink>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
