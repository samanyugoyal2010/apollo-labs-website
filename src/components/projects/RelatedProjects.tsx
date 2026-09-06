import { ProjectCard } from "./ProjectCard";
import { ProjectSurface } from "./ProjectSurface";
import type { Project } from "@/lib/types";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section className="gutter section border-t border-hairline">
      <div className="shell-wide">
        <h2 className="mono-label border-b border-hairline pb-5 text-signal-text">
          Related Work
        </h2>
        <ProjectSurface>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </ProjectSurface>
      </div>
    </section>
  );
}
