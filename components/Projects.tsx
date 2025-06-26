"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Eye, Star, Calendar, Users } from "lucide-react"
import Image from "next/image"

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [filter, setFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "GreenStayFinder",
      category: "web-app",
      type: "Featured Project",
      description:
        "A comprehensive eco-friendly hotel and cottage booking platform for Nepal, featuring beautiful mountain landscapes and sustainable tourism options. Built with modern web technologies and responsive design.",
      image:
        "https://sjc.microlink.io/iuNI6z5vIP5iWktTvG4It5lvyePLiVx8M_QtF7xx6zXekbO_8z4VokFusLXyN6SVfpRYq46E8-qkNcBxyZ5-8w.jpeg",
      technologies: ["React", "Node.js", "MongoDB", "CSS3", "JavaScript"],
      features: ["Hotel Search & Booking", "Responsive Design", "Location-based Search", "User Authentication"],
      liveUrl: "https://v0-greenstayfinder-website.vercel.app/",
      githubUrl: "#",
      stats: { views: "2.5K", stars: "45", users: "150+" },
      year: "2024",
    },
    {
      id: 2,
      title: "JobHunt",
      category: "web-app",
      type: "Featured Project",
      description:
        "A modern job search and application platform that helps users find their dream jobs. Features a clean, intuitive interface with advanced search capabilities and application tracking.",
      image:
        "https://sjc.microlink.io/p_omUwOrR9YJYftcK7vKR1_Rv-aP7VPNirIxuW2ygpSC5RiaProWzGg_8Bxu4wBwtnvWDrOnssCBOssnb_9Z7g.jpeg",
      technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap", "CSS3"],
      features: ["Job Search & Filtering", "Application Tracking", "User Profiles", "Company Listings"],
      liveUrl: "https://hunt-mejob.vercel.app/",
      githubUrl: "#",
      stats: { views: "3.2K", stars: "62", users: "200+" },
      year: "2024",
    },
    {
      id: 3,
      title: "E-commerce Platform",
      category: "e-commerce",
      type: "Web Application",
      description:
        "Full-featured online store with payment integration, inventory management, and comprehensive admin dashboard for complete e-commerce solution.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      features: ["Payment Processing", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      liveUrl: "#",
      githubUrl: "#",
      stats: { views: "1.8K", stars: "38", users: "80+" },
      year: "2023",
    },
    {
      id: 4,
      title: "Task Management System",
      category: "web-app",
      type: "SaaS Platform",
      description:
        "Collaborative project management tool with real-time updates, team collaboration features, and comprehensive project tracking capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "Socket.io", "Express.js", "MongoDB"],
      features: ["Real-time Collaboration", "Project Tracking", "Team Management", "File Sharing"],
      liveUrl: "#",
      githubUrl: "#",
      stats: { views: "1.5K", stars: "29", users: "60+" },
      year: "2023",
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "website",
      type: "Personal Project",
      description:
        "Modern, responsive portfolio website showcasing development skills with advanced animations and interactive elements.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      features: ["3D Animations", "Interactive UI", "Responsive Design", "Performance Optimized"],
      liveUrl: "#",
      githubUrl: "#",
      stats: { views: "2.1K", stars: "52", users: "120+" },
      year: "2024",
    },
    {
      id: 6,
      title: "Learning Management System",
      category: "web-app",
      type: "Educational Platform",
      description:
        "Comprehensive LMS with course management, student tracking, and interactive learning features for educational institutions.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "PostgreSQL", "WebRTC"],
      features: ["Course Management", "Video Streaming", "Progress Tracking", "Interactive Quizzes"],
      liveUrl: "#",
      githubUrl: "#",
      stats: { views: "1.2K", stars: "34", users: "90+" },
      year: "2023",
    },
  ]

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web-app", name: "Web Apps" },
    { id: "e-commerce", name: "E-commerce" },
    { id: "website", name: "Websites" },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

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

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my recent work and the impact they've made
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 ${
                  index < 2 ? "lg:col-span-1" : ""
                }`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-64 lg:h-72">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Project Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                    >
                      <ExternalLink size={18} className="text-gray-700" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                    >
                      <Github size={18} className="text-gray-700" />
                    </motion.a>
                  </div>

                  {/* Project Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                      {project.type}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-4 left-4 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-1 text-white text-sm">
                      <Eye size={14} />
                      <span>{project.stats.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white text-sm">
                      <Star size={14} />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white text-sm">
                      <Users size={14} />
                      <span>{project.stats.users}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all"
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Projects */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Want to see more of my work? Check out my GitHub for additional projects and contributions.
            </p>
            <motion.a
              href="https://github.com/Codeygodd"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
            >
              <Github className="mr-2" size={20} />
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
