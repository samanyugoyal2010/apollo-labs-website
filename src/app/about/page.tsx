import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Apollo Labs exists, how students participate, and how work gets reviewed and published.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="About"
        title={
          <>
            A place for student work to be{" "}
            <span className="text-paper-dim">finished, not just started.</span>
          </>
        }
        lede="Apollo Labs is a student-led research community. We take projects from rough idea to reviewed, published work — and keep the archive that holds them."
      />

      <Prose
        index="01"
        label="Mission"
        title="Student work should have somewhere permanent to live."
        lead="Most of it disappears. It sits in a shared drive, gets shown once, and is never read again — the effort was real, the record of it was not."
        points={[
          {
            term: "Scoped projects",
            detail: "Sized at the start so finishing is realistic.",
          },
          {
            term: "Open review",
            detail: "Read by a member before anything publishes.",
          },
          {
            term: "Permanent pages",
            detail: "A citable URL with an author and a date.",
          },
        ]}
      >
        <p>
          Apollo exists to give serious student work a home and a standard worth
          meeting on the way there. We are{" "}
          <strong>not a showcase for polished summaries</strong> — a project page
          carries the methodology and the results that did not work alongside the
          ones that did, because that is what makes it useful to the next person.
        </p>
      </Prose>

      <Prose
        index="02"
        label="How students participate"
        title="Join with an interest, not a finished proposal."
        lead="The first step is usually a conversation that turns a broad curiosity into a question narrow enough to answer in a term."
      >
        <p>
          From there, work runs in the open. Members share progress, get feedback
          while decisions are still reversible, and pull in mentors when a
          project needs expertise the group does not have. Projects can be solo
          or collaborative; both are common.
        </p>
        <p>
          <strong>Nothing publishes without review.</strong> A member reads the
          draft, checks the claims against what the work actually shows, and
          sends it back if the two do not match. The reviewer is credited on the
          project.
        </p>
      </Prose>

      <section className="gutter section-lg">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-6">
                <p className="mono-label text-muted">
                  <span className="text-signal-text">◆</span>
                  <span className="ml-3">Next</span>
                </p>
                <h2 className="t-section mt-6 max-w-[15ch] text-paper">
                  See what members have{" "}
                  <span className="text-paper-dim">already published.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end lg:pb-2">
                <ButtonLink href="/explore" size="lg" className="group">
                  Browse the Archive <Arrow />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
