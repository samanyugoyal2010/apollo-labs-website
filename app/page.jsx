import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MissionSections from '@/components/MissionSections'
import TeamSection from '@/components/TeamSection'
import ProjectsSection from '@/components/ProjectsSection'
import JoinUsSection from '@/components/JoinUsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="apollo-site min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-15%] right-[-10%] h-[55vh] w-[55vw] max-w-[700px] rounded-full opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-[5%] left-1/2 h-[50vh] w-[90vw] max-w-[1000px] -translate-x-1/2 rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(ellipse, rgba(180, 180, 195, 0.35) 0%, transparent 68%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Nav />
      <main className="apollo-home">
        <Hero />
        <MissionSections />
        <TeamSection />
        <ProjectsSection />
        <JoinUsSection />
      </main>
      <Footer />
    </div>
  )
}
