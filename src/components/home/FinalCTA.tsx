import { ButtonLink, Arrow } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="gutter">
      <div className="shell-wide">
        <div className="flex flex-col gap-6 border-t border-hairline py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16 md:py-28">
          <div>
            <h2 className="t-section max-w-[16ch] text-paper">
              Have something worth publishing?
            </h2>
            <p className="t-body mt-4 max-w-[44ch] text-paper-dim">
              Bring a half-finished idea or a project that has been sitting
              unpublished. We will help you finish it.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/join" size="lg" className="group">
              Join Apollo <Arrow />
            </ButtonLink>
            <ButtonLink href="/explore" size="lg" variant="secondary">
              Browse the Archive
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
