import { ProjectCover } from "@/components/projects/ProjectCover";
import type { Figure as FigureType } from "@/lib/types";

export function Figure({ figure, seed }: { figure: FigureType; seed: string }) {
  return (
    <figure className="my-12">
      <div className="aspect-[16/9] w-full overflow-hidden border border-hairline bg-base">
        <ProjectCover variant={figure.variant} seed={seed} label={figure.caption} />
      </div>
      <figcaption className="mt-4 max-w-[62ch] border-l border-signal/50 pl-4 text-[0.9375rem] leading-relaxed text-muted">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
