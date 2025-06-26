"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Smartphone, ShoppingCart, Wrench, Globe, Database, Zap } from "lucide-react"

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "End-to-end web application development using cutting-edge technologies and industry best practices.",
      features: [
        "Custom Web Applications",
        "API Development & Integration",
        "Database Design & Management",
        "Performance Optimization",
      ],
      technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Responsive Web Design",
      description:
        "Creating beautiful, mobile-first websites that deliver exceptional user experiences across all devices.",
      features: ["Mobile-First Design", "Cross-Browser Compatibility", "SEO Optimization", "Fast Loading Speed"],
      technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description:
        "Building robust online stores and booking platforms with secure payment processing and inventory management.",
      features: ["Online Store Development", "Payment Gateway Integration", "Inventory Management", "Admin Dashboard"],
      technologies: ["Next.js", "Stripe", "PayPal", "MySQL"],
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Web Applications",
      description:
        "Developing scalable web applications that solve real-world problems with intuitive user interfaces.",
      features: ["SPA Development", "Progressive Web Apps", "Real-time Features", "Cloud Integration"],
      technologies: ["React", "Vue.js", "WebSocket", "AWS"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: "Backend Development",
      description:
        "Creating robust server-side solutions with secure APIs, efficient databases, and scalable architecture.",
      features: ["RESTful APIs", "Database Design", "Authentication Systems", "Server Optimization"],
      technologies: ["Node.js", "PHP", "Python", "PostgreSQL"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Wrench,
      title: "Website Maintenance",
      description: "Ongoing support and maintenance to keep your website secure, updated, and performing at its best.",
      features: ["Regular Updates", "Security Monitoring", "Bug Fixes", "Performance Monitoring"],
      technologies: ["WordPress", "Git", "Monitoring Tools", "Security"],
      color: "from-gray-500 to-gray-700",
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

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with modern web technologies and exceptional user
              experiences.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="mr-2" size={20} />
              Get Started Today
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
