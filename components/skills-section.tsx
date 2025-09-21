"use client"

import { useEffect, useRef } from "react"

const skills = [
  { name: "HTML", icon: "🌐", color: "#E34F26" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "JavaScript", icon: "⚡", color: "#F7DF1E" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "React.js", icon: "⚛️", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "TypeScript", icon: "📘", color: "#3178C6" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
]

export default function SkillsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Skills</h2>

          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-8 md:gap-12 pb-4"
              style={{
                width: "max-content",
                animation: "scroll 20s linear infinite",
              }}
            >
              {[...skills, ...skills].map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 flex-shrink-0"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card/50 border border-border flex items-center justify-center mb-3 group-hover:border-primary transition-colors">
                    <span className="text-2xl md:text-3xl">{skill.icon}</span>
                  </div>
                  <span className="text-sm md:text-base font-light text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
