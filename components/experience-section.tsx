import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Freelance Web Developer",
    company: "Upwork",
    period: "August 2022 – Present",
    location: "Remote",
    description: [
      "Delivered 10+ full-stack web projects for global clients using React, Next.js, Node.js, and Tailwind CSS",
      "Built SEO-optimized, mobile-first websites that improved clients' search rankings and user engagement",
      "Managed all phases of development while maintaining 5-star client ratings",
    ],
  },
]

const achievements = [
  {
    title: "1st Position - CodeCraft: School Coding Challenge",
    organization: "National School of Sciences",
    date: "February 2025",
    description: "Secured first position in the school coding challenge organized by Department of Computer Science",
  },
  {
    title: "7 Days Robotics Training Certificate",
    organization: "National School of Sciences",
    date: "March 2025",
    description: "Completed intensive robotics training program facilitated by Engineers Vlogs",
  },
  {
    title: "APEX EcoSprint 2025 Participation",
    organization: "APEX Health Education",
    date: "February 2025",
    description: "Participated in health and wellness focused event with enthusiasm and dedication",
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
            Experience & <span className="text-primary">Achievements</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Experience */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Professional Experience</h3>
              {experiences.map((exp, index) => (
                <Card key={index} className="glass-card border-0 mb-6">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                    <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground text-sm leading-relaxed flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Achievements & Certifications</h3>
              {achievements.map((achievement, index) => (
                <Card key={index} className="glass-card border-0 mb-6">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{achievement.title}</h4>
                    <div className="flex items-center gap-1 mb-3 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{achievement.date}</span>
                    </div>
                    <p className="text-primary font-medium mb-2">{achievement.organization}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
