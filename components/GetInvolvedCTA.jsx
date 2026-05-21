import Link from 'next/link'

export default function GetInvolvedCTA() {
  return (
    <section id="get-involved" className="mx-4 mt-8 mb-0">
      <div className="apollo-cta-panel px-6 py-16 text-center sm:px-12 sm:py-20">
        <h2 className="mx-auto mb-4 max-w-lg text-[clamp(28px,3.5vw,44px)] font-normal leading-[1.1] tracking-tight text-[var(--apollo-text)]">
          Ready to launch your next research project?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-[var(--apollo-text-body)]">
          We are building our first cohort of student researchers. Reach out to
          collaborate, propose a project, or learn more about Apollo Labs.
        </p>
        <Link href="mailto:hello@apollolabs.org" className="apollo-hero-cta inline-block">
          Join a project
        </Link>
      </div>
    </section>
  )
}
