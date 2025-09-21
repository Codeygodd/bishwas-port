"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="flex justify-center lg:justify-start">
            <div className="relative -mt-8">
              <div className="w-[26rem] h-[32rem] relative rounded-lg overflow-hidden">
                <Image src="/images/bishwas-photo.png" alt="Bishwas Pandey" fill className="object-cover" priority />
              </div>
              <div className="absolute top-16 -right-2 hidden lg:block">
                <svg width="180" height="100" viewBox="0 0 180 100" className="text-muted-foreground">
                  <path
                    d="M15 75 Q 90 20, 165 50"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                  />
                  <polygon points="160,45 170,50 160,55" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-balance">
              Hello, I'm <span className="text-foreground">Bishwas Pandey</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-balance">Driven to learn and grow</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl font-light leading-relaxed">
              I’m a passionate computer science student driven to create innovative technologies that make a real impact.
            </p>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-light"
            >
              Show my work →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}