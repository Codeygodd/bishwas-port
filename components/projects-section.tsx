"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Hunt Me Job Platform",
    description:
      "Job-hunting platform featuring job listings, advanced filters, and responsive user interface for job seekers.",
    url: "https://hunt-mejob.vercel.app/",
    image: "/images/jobhunt-project.png",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Library Management System",
    description:
      "Complete CRUD-based system for managing books, students, and borrowing records, improving efficiency in library operations.",
    url: "https://crud-vert-theta.vercel.app/",
    image: "/images/library-management.png",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Basico - Productivity Web App",
    description:
      "Multi-feature website providing daily utilities such as WiFi speed test, currency converter, to-do list, grocery tracker, and more.",
    url: "https://basico-zeta.vercel.app/",
    image: "/images/basico-dashboard.png",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Smit Gifts E-commerce",
    description:
      "Full-stack e-commerce platform with product catalog, cart system, and order management tailored for a gift-selling company.",
    url: "https://smit-gift-react-99d4.vercel.app/",
    image: "/images/smit-gifts.png",
    tags: ["React", "Node.js", "Express"],
  },
  {
    title: "Wrouple - Crypto Trading",
    description:
      "Cryptocurrency trading platform with real-time market data, portfolio tracking, and secure transaction management.",
    url: "#",
    image: "/images/wrouple-crypto.png",
    tags: ["React", "TypeScript", "Web3"],
  },
]

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="glass-card border-0 overflow-hidden hover:scale-105 transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-balance">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
