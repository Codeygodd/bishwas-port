import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  )
}
