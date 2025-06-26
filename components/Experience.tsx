"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Award, ExternalLink } from "lucide-react"

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: "Freelance Full-Stack Developer",
      company: "Upwork & Fiverr",
      location: "Remote",
      period: "Nov 2022 - Present",
      type: "Freelance",
      description:
        "Working with international clients to deliver high-quality web applications and maintaining a 5-star rating across platforms.",
      achievements: [
        "Completed 50+ projects with 100% client satisfaction",
        "Maintained 5-star rating on both Upwork and Fiverr",
        "Specialized in React, Node.js, and modern web technologies",
        "Built long-term relationships with 25+ recurring clients",
      ],
      technologies: ["React", "Node.js", "MongoDB", "PHP", "MySQL"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Student Developer",
      company: "National School of Sciences",
      location: "Kathmandu, Nepal",
      period: "2022 - 2025",
      type: "Education",
      description:
        "Currently pursuing studies while actively working on real-world projects and expanding technical expertise in modern web development.",
      achievements: [
        "Developed GreenStayFinder - eco-tourism platform",
        "Created JobHunt - job search application",
        "Participated in coding competitions and hackathons",
        "Mentored junior students in web development",
      ],
      technologies: ["JavaScript", "Python", "Java", "C++", "Web Development"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Foundation Education",
      company: "Little Step Academy",
      location: "Kathmandu, Nepal",
      period: "2011 - 2022",
      type: "Education",
      description:
        "Completed foundational education with strong focus on mathematics and science, laying groundwork for programming journey.",
      achievements: [
        "Excellent performance in mathematics and science",
        "Developed logical thinking and problem-solving skills",
        "Participated in science fairs and competitions",
        "Built strong foundation for technical education",
      ],
      technologies: ["Mathematics", "Science", "Logic", "Problem Solving"],
      color: "from-green-500 to-teal-500",
    },
  ]

  const certifications = [
    {
      title: "CodeCraft: School Coding Challenge - 1st Position",
      issuer: "National School of Sciences",
      date: "2025",
      credential: "Certificate of Award",
      icon: "🏆",
    },
    {
      title: "7 Days Robotics Training",
      issuer: "National School of Sciences & Engineers Vlogs",
      date: "2025",
      credential: "Certificate of Participation",
      icon: "🤖",
    },
    {
      title: "APEX EcoSprint 2025",
      issuer: "APEX Health Education and Awareness Team",
      date: "2025",
      credential: "Certificate of Participation",
      icon: "🌱",
    },
    {
      title: "Full-Stack Development Bootcamp",
      issuer: "Online Learning Platform",
      date: "2022",
      credential: "Professional Certificate",
      icon: "💻",
    },
  ]

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Experience &{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My journey in web development and continuous learning
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

                {/* Experience Items */}
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative flex items-start space-x-6">
                      {/* Timeline Marker */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-lg">
                          {exp.type === "Freelance" ? "💼" : exp.type === "Education" ? "🎓" : "🏢"}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                            <p className="text-blue-600 font-semibold">{exp.company}</p>
                          </div>
                          <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                            <div className="flex items-center space-x-1 text-gray-500 text-sm mb-1">
                              <Calendar size={14} />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 text-sm">
                              <MapPin size={14} />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                          <div className="grid gap-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-600 text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-sm font-medium rounded-full`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Certifications */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{cert.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{cert.title}</h4>
                          <p className="text-blue-600 text-xs font-medium mb-1">{cert.issuer}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{cert.date}</span>
                            <span className="text-green-600 text-xs font-medium">{cert.credential}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills Summary */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Skills Summary</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Frontend Development</span>
                      <span className="text-sm text-gray-500">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "95%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Backend Development</span>
                      <span className="text-sm text-gray-500">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "90%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Database Management</span>
                      <span className="text-sm text-gray-500">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "88%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">UI/UX Design</span>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "85%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 1.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Download Resume */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.button
                  onClick={async () => {
                    try {
                      const resumeUrl =
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bishwas%20cv_page-0001.jpg-uCy9gy6gK1ZSBbvbKCIjrQMwUnR2eF.jpeg"

                      // For mobile devices, open in new tab
                      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        window.open(resumeUrl, "_blank")
                      } else {
                        // For desktop, force download
                        const response = await fetch(resumeUrl)
                        const blob = await response.blob()
                        const url = window.URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = "Bishwas_Pandey_Resume.jpg"
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        window.URL.revokeObjectURL(url)
                      }
                    } catch (error) {
                      console.error("Download failed:", error)
                      // Fallback: open in new tab
                      window.open(
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bishwas%20cv_page-0001.jpg-uCy9gy6gK1ZSBbvbKCIjrQMwUnR2eF.jpeg",
                        "_blank",
                      )
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <ExternalLink className="mr-2" size={18} />
                  Download Full Resume
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
