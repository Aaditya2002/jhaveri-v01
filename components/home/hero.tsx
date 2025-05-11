"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: sectionRef, timeSpent, engagementScore } = useSectionTracking(
    "hero",
    "Hero Section",
    "Welcome to Jhaveri Securities - Your Wealth, Curated"
  )

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy/50 z-10"></div>
        <video ref={videoRef} className="object-cover w-full h-full" autoPlay muted loop playsInline>
          <source src="https://player.vimeo.com/progressive_redirect/playback/769653111/rendition/1080p/file.mp4?loc=external&signature=ed68edc6f93d6322ab788f73a6c328d62ef27555627cc8b2c6a85fdaf8e4c696" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 max-w-4xl"
        >
          Your Wealth, Curated
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl"
        >
          Experience wealth management reimagined with India's premier financial products aggregator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button className="bg-white hover:bg-white/90 text-navy rounded-none px-8 py-6 text-lg">
            Start Your Wealth Journey
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="text-white/80 h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}
