"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Frontend",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TypeScript", level: 88, icon: "📘" },
        { name: "Tailwind CSS", level: 92, icon: "🎨" },
        { name: "JavaScript", level: 95, icon: "🟨" },
        { name: "HTML5", level: 98, icon: "🌐" },
        { name: "CSS3", level: 95, icon: "🎭" },
        { name: "Vue.js", level: 80, icon: "💚" },
      ],
    },
    {
      title: "Backend",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Node.js", level: 90, icon: "🟢" },
        { name: "PHP", level: 85, icon: "🐘" },
        { name: "Python", level: 82, icon: "🐍" },
        { name: "Java", level: 78, icon: "☕" },
        { name: "C++", level: 75, icon: "⚡" },
        { name: "Express.js", level: 88, icon: "🚀" },
        { name: "REST APIs", level: 92, icon: "🔗" },
        { name: "GraphQL", level: 75, icon: "📊" },
      ],
    },
    {
      title: "Database & Tools",
      color: "from-green-500 to-teal-500",
      skills: [
        { name: "MongoDB", level: 88, icon: "🍃" },
        { name: "MySQL", level: 90, icon: "🐬" },
        { name: "PostgreSQL", level: 82, icon: "🐘" },
        { name: "Git", level: 95, icon: "📝" },
        { name: "Docker", level: 78, icon: "🐳" },
        { name: "AWS", level: 75, icon: "☁️" },
        { name: "Vercel", level: 92, icon: "▲" },
        { name: "WordPress", level: 85, icon: "📰" },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertise across the full development stack with modern technologies
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl mb-4`}
                  >
                    <span className="text-2xl text-white font-bold">{category.title.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div key={skill.name} variants={itemVariants} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-gray-900">{skill.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{skill.level}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          variants={skillVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          custom={skill.level}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Responsive Design",
                "SEO Optimization",
                "Performance Tuning",
                "Testing",
                "Agile Development",
                "UI/UX Design",
                "API Integration",
                "DevOps",
                "Mobile Development",
                "E-commerce",
                "CMS Development",
                "Security",
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 text-gray-700 font-medium hover:shadow-lg transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
