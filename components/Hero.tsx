"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { Suspense } from "react"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Typed from "typed.js"

const AnimatedSphere = () => {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.3} speed={1.5} roughness={0} />
      </Sphere>
    </Float>
  )
}

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Full-Stack Developer", "Problem Solver", "UI/UX Enthusiast", "Tech Innovator"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      })

      return () => typed.destroy()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/Codeygodd", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/feed/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:pandeybiswas1@gmail.com", label: "Email" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bishwas Pandey
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-6 h-16"
            >
              <span ref={typedRef} className="text-blue-600" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-2xl">
              Passionate full-stack developer from Nepal, specializing in creating innovative web applications that
              solve real-world problems. From eco-friendly platforms to job hunting solutions, I build digital
              experiences that make a difference.
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300"
                >
                  <social.icon size={24} className="text-gray-600 hover:text-blue-600 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">25+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">2+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-96 lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-3xl" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Suspense>
            </Canvas>

            {/* Profile Image Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-jakadkqFqF2HPfRYY9QY8DwwXwT0eE.png"
                alt="Bishwas Pandey"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
