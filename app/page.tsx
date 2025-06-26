"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Services from "@/components/Services"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Cursor from "@/components/Cursor"
import LoadingScreen from "@/components/LoadingScreen"
import ParticleBackground from "@/components/ParticleBackground"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative overflow-hidden">
      <Cursor />
      <ParticleBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <Navigation />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
