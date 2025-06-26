// Navigation functionality
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const navbar = document.getElementById("navbar")
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay")
const mobileClose = document.getElementById("mobile-close")

// Toggle mobile menu
navToggle.addEventListener("click", () => {
  mobileMenuOverlay.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu
mobileClose.addEventListener("click", () => {
  mobileMenuOverlay.classList.remove("active")
  navToggle.classList.remove("active")
})

// Close mobile menu when clicking on overlay
mobileMenuOverlay.addEventListener("click", (e) => {
  if (e.target === mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuOverlay.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Update progress bar
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  document.getElementById("progress-bar").style.transform = `scaleX(${scrolled / 100})`
})

// Active navigation link
function updateActiveLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`)

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Mobile nav links smooth scrolling
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Typing effect for hero subtitle
function initTypingEffect() {
  const typedElement = document.getElementById("typed-text")
  const cursor = document.querySelector(".cursor")

  if (!typedElement) return

  const texts = ["Full-Stack Developer", "Problem Solver", "UI/UX Enthusiast", "Tech Innovator"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 150

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 75
    } else {
      typedElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 150
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of word
      typingSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typingSpeed = 500
    }

    setTimeout(type, typingSpeed)
  }

  // Start typing effect after a delay
  setTimeout(type, 1000)
}

// Contact form functionality
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error")
      return
    }

    // Simulate form submission
    showNotification("Message sent successfully! I'll get back to you soon.", "success")
    contactForm.reset()
  })
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `

  document.head.appendChild(style)
  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// FIXED Resume download functionality
async function handleResumeDownload() {
  // Using the CV image URL you provided
  const resumeUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bishwas%20cv_page-0001.jpg-1ojsLZFIaBxF5cTaAP6wdddxV2Wj90.jpeg"

  try {
    showNotification("Preparing your resume download...", "success")

    // Fetch the file as blob
    const response = await fetch(resumeUrl)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const blob = await response.blob()

    // Create blob URL
    const blobUrl = window.URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.href = blobUrl
    link.download = "Bishwas_Pandey_Resume.jpg"

    // Append to body and trigger download
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)

    // Show success message
    setTimeout(() => {
      showNotification("Resume downloaded successfully!", "success")
    }, 500)
  } catch (error) {
    console.error("Download failed:", error)

    // Fallback: open in new window
    const newWindow = window.open(resumeUrl, "_blank")
    if (newWindow) {
      showNotification("Resume opened in new tab. Right-click and save to download.", "success")
    } else {
      showNotification("Please allow popups to view the resume", "error")
    }
  }
}

// Alternative download function for better compatibility
function forceDownload(url, filename) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response
        const link = document.createElement("a")
        const objectUrl = URL.createObjectURL(blob)

        link.href = objectUrl
        link.download = filename
        link.style.display = "none"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(objectUrl)
        resolve()
      } else {
        reject(new Error("Download failed"))
      }
    }

    xhr.onerror = () => reject(new Error("Network error"))
    xhr.send()
  })
}

// Enhanced resume download with multiple fallbacks
async function downloadResume() {
  const resumeUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bishwas%20cv_page-0001.jpg-1ojsLZFIaBxF5cTaAP6wdddxV2Wj90.jpeg"
  const filename = "Bishwas_Pandey_Resume.jpg"

  showNotification("Starting download...", "success")

  try {
    // Method 1: Try fetch with blob
    await forceDownload(resumeUrl, filename)
    showNotification("Resume downloaded successfully!", "success")
  } catch (error) {
    console.log("Method 1 failed, trying method 2...")

    try {
      // Method 2: Create link with download attribute
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = filename
      link.target = "_blank"
      link.rel = "noopener noreferrer"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showNotification("Download initiated! Check your downloads folder.", "success")
    } catch (error2) {
      console.log("Method 2 failed, using fallback...")

      // Method 3: Open in new window as fallback
      const newWindow = window.open(resumeUrl, "_blank")
      if (newWindow) {
        showNotification(
          "Resume opened in new tab. Right-click the image and select 'Save image as...' to download.",
          "success",
        )
      } else {
        showNotification("Please allow popups and try again, or contact me directly for the resume.", "error")
      }
    }
  }
}

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter")

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter projects
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category")
      if (filter === "all" || category === filter) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "scale(1)"
        }, 10)
      } else {
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Skills animation on scroll
function animateSkills() {
  const skillProgressBars = document.querySelectorAll(".skill-progress-fill")

  skillProgressBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, index * 100)
  })
}

// Trigger skills animation when skills section is in view
const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills()
          skillsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillsObserver.observe(skillsSection)
}

// Back to top button
function createBackToTopButton() {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "back-to-top"
  button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `

  document.body.appendChild(button)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.opacity = "1"
      button.style.visibility = "visible"
    } else {
      button.style.opacity = "0"
      button.style.visibility = "hidden"
    }
  })

  // Scroll to top functionality
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Hover effects
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-3px)"
    button.style.background = "#1d4ed8"
  })

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)"
    button.style.background = "#2563eb"
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize typing effect
  initTypingEffect()

  // Create back to top button
  createBackToTopButton()

  // Add event listeners for ALL resume download buttons
  const resumeButtons = [
    document.getElementById("resume-download-btn"),
    document.getElementById("mobile-resume-btn"),
    document.getElementById("sidebar-resume-btn"),
    document.getElementById("footer-resume-btn"),
  ]

  resumeButtons.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        downloadResume() // Using the enhanced download function
      })
    }
  })

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .contact-item")
  animateElements.forEach((el) => observer.observe(el))

  // Add fade-in animation styles
  const style = document.createElement("style")
  style.textContent = `
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `
  document.head.appendChild(style)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Project card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Preloader
function createPreloader() {
  const preloader = document.createElement("div")
  preloader.className = "preloader"
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `

  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `

  const style = document.createElement("style")
  style.textContent = `
        .preloader-content {
            text-align: center;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `

  document.head.appendChild(style)
  document.body.appendChild(preloader)

  // Remove preloader when page is loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })
}

// Initialize preloader
createPreloader()
