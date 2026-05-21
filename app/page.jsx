import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MissionSections from '@/components/MissionSections'
import TeamSection from '@/components/TeamSection'
import ProjectsSection from '@/components/ProjectsSection'
import GetInvolvedCTA from '@/components/GetInvolvedCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="apollo-site min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] h-[60vh] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(ellipse, rgba(200,200,210,0.5) 0%, transparent 70%)',
            filter: 'blur(80px) saturate(0.5) brightness(0.85)',
          }}
        />
      </div>

      <Nav />
      <main className="apollo-home">
        <Hero />
        <MissionSections />
        <TeamSection />
        <ProjectsSection />
        <GetInvolvedCTA />
      </main>
      <Footer />
    </div>
  )
}
