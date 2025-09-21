import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Database, Globe } from "lucide-react"

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern technologies like React, Next.js, and Node.js.",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces with focus on user experience.",
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Database Management",
    description: "Designing and managing databases with MongoDB, MySQL, and PostgreSQL for optimal performance.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Web Optimization",
    description: "SEO optimization and performance enhancement to improve search rankings and user engagement.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            My <span className="text-primary">Services</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="glass-card border-0 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
