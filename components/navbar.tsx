"use client"

import { useState, useEffect } from "react"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const downloadCV = () => {
    // Create a link element for downloading from public folder
    const link = document.createElement('a')
    link.href = '/bishwas-pandey-cv.pdf'  // Path to file in public folder
    link.download = 'bishwas-pandey-cv.pdf'  // Force download with this filename
    link.style.display = 'none'
    
    // Add to DOM, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-light text-primary-foreground">
            BP
          </div>
          <span className="text-xl font-light text-foreground">Bishwas</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-muted-foreground hover:text-primary transition-colors font-light"
          >
            Contact
          </button>
          <Button onClick={downloadCV} className="bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-border/20">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors font-light py-2"
            >
              Contact
            </button>
            <Button onClick={downloadCV} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}