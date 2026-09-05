import { HeroVisual } from "./HeroVisual";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * Asymmetric: the statement takes roughly three fifths of the grid and the
 * project visual the remainder, so the composition reads left-weighted rather
 * than as a centred slogan.
 */
export function Hero() {
  return (
    <section className="gutter pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="shell-wide grid min-w-0 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7 xl:col-span-6">
          <p className="mono-label flex items-center gap-2.5 text-signal-text">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            Student-Led Research
          </p>

          <h1 className="t-hero mt-7 max-w-[16ch] text-paper">
            Student work should have somewhere{" "}
            <span className="font-serif font-normal italic tracking-[-0.015em]">
              permanent
            </span>{" "}
            to live.
          </h1>

          <p className="t-lead mt-8 max-w-[46ch] text-paper-dim">
            Apollo Labs helps students turn a good question into work worth
            keeping.
          </p>

          <div className="mt-10">
            <ButtonLink href="#work" size="lg" className="group">
              Explore Projects <Arrow />
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5 xl:col-span-6 max-lg:mx-auto max-lg:w-full max-lg:max-w-lg">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
