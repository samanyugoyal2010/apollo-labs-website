import { Hero } from "@/components/home/Hero";
import { Disciplines } from "@/components/home/Disciplines";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectSurface } from "@/components/projects/ProjectSurface";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectSurface>
        <ProjectGallery />
      </ProjectSurface>
      <Disciplines />
      <FinalCTA />
    </>
  );
}
