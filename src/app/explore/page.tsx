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
    "The complete Apollo Labs archive — every published student project, searchable by title, author, discipline, and type.",
};

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Archive"
        title={
          <>
            Every project Apollo has{" "}
            <span className="text-paper-dim">published.</span>
          </>
        }
        lede="Search by title, author, tag, or abstract, then filter to a discipline or project type. Open any entry to read its abstract without leaving the page."
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
