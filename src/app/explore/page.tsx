import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExploreArchive } from "@/components/projects/ExploreArchive";
import { ProjectSurface } from "@/components/projects/ProjectSurface";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Apollo Labs project areas, ready for the first student research submissions.",
};

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Archive"
        title={
          <>
            The archive is ready for its{" "}
            <span className="text-paper-dim">first entries.</span>
          </>
        }
        lede="Choose an area, bring a question, and help make the first project worth pinning here."
        aside={
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-6">
            <div>
              <dt className="mono-label text-faint">Projects</dt>
              <dd className="mt-2.5 text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-paper">
                {String(PROJECTS.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-faint">Disciplines</dt>
              <dd className="mt-2.5 text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-paper">
                {String(DISCIPLINES.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-faint">Archive opened</dt>
              <dd className="mt-2.5 text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-paper">2026</dd>
            </div>
          </dl>
        }
      />
      <ProjectSurface>
        <Suspense fallback={<div className="gutter py-24" />}>
          <ExploreArchive />
        </Suspense>
      </ProjectSurface>
    </>
  );
}
