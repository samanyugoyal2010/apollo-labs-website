import type { Metadata } from "next";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Community",
  description:
    "A simple working rhythm for students who want to finish and publish meaningful work.",
};

const EXPECTATIONS = [
  {
    term: "Start small",
    detail: "Turn a broad interest into one question you can answer this term.",
  },
  {
    term: "Work in view",
    detail: "Share progress early enough for another member to help.",
  },
  {
    term: "Leave a record",
    detail: "Publish the method, result, and lessons learned in one lasting place.",
  },
];

const RHYTHM = [
  {
    title: "Open studio",
    cadence: "Weekly",
    body: "Work beside other members and ask for help while the project is still taking shape.",
  },
  {
    title: "Project review",
    cadence: "Biweekly",
    body: "Pressure-test scope, method, and evidence with people doing the same work.",
  },
  {
    title: "Mentor session",
    cadence: "As needed",
    body: "Bring one specific question to someone with experience in the field.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Community"
        title={
          <>
            A working group{" "}
            <span className="text-paper-dim">for unfinished ideas.</span>
          </>
        }
        lede="Apollo is a place to make progress in public, get useful feedback, and give finished work a permanent home."
      />

      <section className="gutter border-b border-hairline py-16 md:py-20">
        <div className="shell-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mono-label text-signal-text">The approach</p>
            <h2 className="t-section mt-5 max-w-[14ch] text-paper">
              Show up, make progress, share the result.
            </h2>
          </div>

          <ul className="divide-y divide-hairline border-y border-hairline lg:col-span-6 lg:col-start-7">
            {EXPECTATIONS.map((item) => (
              <li
                key={item.term}
                className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,0.7fr)_1fr] sm:gap-8"
              >
                <h3 className="t-sub text-paper">{item.term}</h3>
                <p className="t-body-sm text-paper-dim">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter border-b border-hairline bg-surface/35 py-16 md:py-20">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-5">
                <p className="mono-label text-signal-text">A simple rhythm</p>
                <h2 className="t-section mt-5 max-w-[14ch] text-paper">
                  Enough structure to keep moving.
                </h2>
              </div>
              <p className="t-lead max-w-[38ch] text-paper-dim lg:col-span-6 lg:col-start-7">
                The cadence is light by design. It makes asking for help normal
                without turning the work into a second class.
              </p>
            </div>
          </Reveal>

          <ol className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
            {RHYTHM.map((item) => (
              <li
                key={item.title}
                className="flex min-h-52 flex-col bg-base p-6 md:p-7"
              >
                <span className="mono-label text-signal-text">{item.cadence}</span>
                <h3 className="t-sub mt-10 text-paper">{item.title}</h3>
                <p className="t-body-sm mt-3 text-paper-dim">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gutter section-lg">
        <div className="shell-wide">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-hairline pt-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mono-label text-signal-text">Ready when you are</p>
                <h2 className="t-section mt-5 max-w-[15ch] text-paper">
                  Bring the question.
                </h2>
              </div>
              <ButtonLink href="/join" size="lg" className="group">
                Join Apollo <Arrow />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
