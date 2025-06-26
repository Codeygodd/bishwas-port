"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Palette, Database, Globe, Award, Users } from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces that provide excellent user experiences.",
    },
    {
      icon: Database,
      title: "Full-Stack",
      description: "Expertise in both frontend and backend development with modern technologies.",
    },
    {
      icon: Globe,
      title: "Web Performance",
      description: "Optimizing applications for speed, accessibility, and search engine visibility.",
    },
  ]

  const achievements = [
    { icon: Award, label: "5-Star Rating", value: "Upwork & Fiverr" },
    { icon: Users, label: "Happy Clients", value: "25+" },
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Globe, label: "Countries Served", value: "10+" },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate developer with a love for creating innovative solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  I'm a dedicated full-stack developer currently studying at the National School of Sciences in Nepal.
                  My passion lies in creating innovative web solutions that address real-world challenges and improve
                  people's lives.
                </p>
                <p>
                  With expertise in modern web technologies and a keen eye for user experience, I've successfully
                  developed platforms like <strong className="text-blue-600">GreenStayFinder</strong> for eco-tourism
                  and
                  <strong className="text-purple-600"> JobHunt</strong> for career opportunities.
                </p>
                <p>
                  I believe in writing clean, efficient code and creating intuitive user interfaces that not only look
                  great but also provide exceptional functionality and performance.
                </p>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    variants={itemVariants}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                  >
                    <achievement.icon className="w-8 h-8 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{achievement.value}</div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">What I Bring</h3>
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                    <p className="text-gray-600">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education & Certifications */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Education</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900">National School of Sciences</h5>
                    <p className="text-gray-600">Computer Science • 2022 - 2025</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Little Step Academy</h5>
                    <p className="text-gray-600">Foundation Education • 2011 - 2022</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Certifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">HTML, CSS, JavaScript for Web Developers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Hardware Fellowship Training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Full-Stack Development Bootcamp</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
